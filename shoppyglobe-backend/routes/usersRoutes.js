
import express from 'express';
import { register, login } from '../controllers/userController.js';

const router = express.Router();

//Define routes for the user details
router.post('/register', register);
router.post('/login', login);

export default router;
