import express from 'express';
import { checkInUser } from '../controllers/checkin.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/in', authMiddleware, checkInUser);

export default router;
