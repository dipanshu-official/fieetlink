import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';


import { login, register } from '../controllers/auth.Controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/register',register );



export default router;  