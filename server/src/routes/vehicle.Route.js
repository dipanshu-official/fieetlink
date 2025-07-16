import express from 'express';
import {
  addVehicle,
  getAvailableVehicles,
  getAllVehicles,
  getVehicleById
} from '../controllers/vehicle.Controller.js';

const router = express.Router();

router.post('/', addVehicle);

router.get('/available', getAvailableVehicles);

router.get('/', getAllVehicles);

router.get('/:id', getVehicleById);

export default router;