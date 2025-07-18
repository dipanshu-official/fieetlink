import express from 'express';
import {
  addVehicle,
  getAvailableVehicles,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle
} from '../controllers/vehicle.Controller.js';

const router = express.Router();

router.post('/', addVehicle);

router.get('/available', getAvailableVehicles);

router.get('/', getAllVehicles);

router.get('/:id', getVehicleById);

router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

export default router;