import { Patient } from '../models/index.js';

// Add patient
export const createPatient = async (req, res, next) => {
  try {
    const { name, age, gender } = req.body;
    if (!name || !age || !gender) {
      return res.status(400).json({ error: 'Name, age and gender required' });
    }
    const patient = await Patient.create({ 
      name, 
      age, 
      gender, 
      userId: req.user.id 
    });
    res.status(201).json(patient);
  } catch (error) {
    next(error);
  }
};

// Get all patients for authenticated user
export const getPatients = async (req, res, next) => {
  try {
    const patients = await Patient.findAll({ where: { userId: req.user.id } });
    res.json(patients);
  } catch (error) {
    next(error);
  }
};

// Get single patient
export const getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    next(error);
  }
};

// Update patient
export const updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    const { name, age, gender } = req.body;
    if (name !== undefined) patient.name = name;
    if (age !== undefined) patient.age = age;
    if (gender !== undefined) patient.gender = gender;
    await patient.save();
    res.json(patient);
  } catch (error) {
    next(error);
  }
};

// Delete patient
export const deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    await patient.destroy();
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    next(error);
  }
};
