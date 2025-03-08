import express from 'express';
import { checkInUser } from '../controllers/checkin.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Updated route to capture bookingId from the URL
router.post('/:bookingId/checkin', authMiddleware, checkInUser);

export default router;
