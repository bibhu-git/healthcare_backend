import express from 'express';
import {
  createMapping,
  getAllMappings,
  getDoctorsByPatient,
  deleteMapping
} from '../controllers/mappingController.js';

const router = express.Router();

router.post('/', createMapping);
router.get('/', getAllMappings);
router.get('/:patientId', getDoctorsByPatient);
router.delete('/:id', deleteMapping);

export default router;
