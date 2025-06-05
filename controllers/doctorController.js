import { Doctor } from '../models/index.js';

// Add doctor
export const createDoctor = async (req, res, next) => {
  try {
    const { name, specialization } = req.body;
    if (!name || !specialization) {
      return res.status(400).json({ error: 'Name and specialization required' });
    }
    const doctor = await Doctor.create({ 
      name, 
      specialization, 
      userId: req.user.id 
    });
    res.status(201).json(doctor);
  } catch (error) {
    next(error);
  }
};

// Get all doctors (global)
export const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.findAll();
    res.json(doctors);
  } catch (error) {
    next(error);
  }
};

// Get single doctor by ID
export const getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    next(error);
  }
};

// Update doctor
export const updateDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    if (doctor.userId !== req.user.id) {
      return res.status(403).json({ error: 'Permission denied' });
    }
    const { name, specialization } = req.body;
    if (name !== undefined) doctor.name = name;
    if (specialization !== undefined) doctor.specialization = specialization;
    await doctor.save();
    res.json(doctor);
  } catch (error) {
    next(error);
  }
};

// Delete doctor
export const deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    if (doctor.userId !== req.user.id) {
      return res.status(403).json({ error: 'Permission denied' });
    }
    await doctor.destroy();
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    next(error);
  }
};
