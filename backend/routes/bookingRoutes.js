import express from 'express';
import { bookHotel } from '../controllers/booking.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/b',authMiddleware, bookHotel);

export default router;
