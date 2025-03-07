import express from 'express';
import { bookHotel } from '../controllers/booking.js';

const router = express.Router();

router.post('/book', bookHotel);

export default router;
