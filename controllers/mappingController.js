import { Mapping, Patient, Doctor } from '../models/index.js';

// Assign doctor to patient
export const createMapping = async (req, res, next) => {
  try {
    const { patientId, doctorId } = req.body;
    if (!patientId || !doctorId) {
      return res.status(400).json({ error: 'patientId and doctorId required' });
    }

    const patient = await Patient.findOne({ where: { id: patientId, userId: req.user.id } });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found or unauthorized' });
    }

    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    const [mapping, created] = await Mapping.findOrCreate({
      where: { patientId, doctorId }
    });

    if (!created) {
      return res.status(409).json({ error: 'Mapping already exists' });
    }

    res.status(201).json(mapping);
  } catch (error) {
    next(error);
  }
};

// Get all mappings for user's patients
export const getAllMappings = async (req, res, next) => {
  try {
    const mappings = await Mapping.findAll({
      include: [
        {
          model: Patient,
          where: { userId: req.user.id }
        },
        {
          model: Doctor
        }
      ]
    });
    res.json(mappings);
  } catch (error) {
    next(error);
  }
};

// Get doctors for a specific patient
export const getDoctorsByPatient = async (req, res, next) => {
  try {
    const patientId = parseInt(req.params.patientId, 10);
    if (isNaN(patientId)) {
      return res.status(400).json({ error: 'Invalid patient ID' });
    }

    const patient = await Patient.findOne({ where: { id: patientId, userId: req.user.id } });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found or unauthorized' });
    }

    const mappings = await Mapping.findAll({
      where: { patientId },
      include: [Doctor]
    });

    const doctors = mappings.map(m => m.Doctor);
    res.json(doctors);
  } catch (error) {
    next(error);
  }
};


// Delete mapping
export const deleteMapping = async (req, res, next) => {
  try {
    const mappingId = parseInt(req.params.id, 10);
    if (isNaN(mappingId)) {
      return res.status(400).json({ error: 'Invalid mapping ID' });
    }

    const mapping = await Mapping.findByPk(mappingId, {
      include: [Patient]
    });

    if (!mapping) {
      return res.status(404).json({ error: 'Mapping not found' });
    }

    if (mapping.Patient.userId !== req.user.id) {
      return res.status(403).json({ error: 'Permission denied' });
    }

    await mapping.destroy();
    res.json({ message: 'Mapping removed successfully' });
  } catch (error) {
    next(error);
  }
};

