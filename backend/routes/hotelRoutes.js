import express from 'express';
import { getAllHotels } from '../controllers/hotel.js';

const router = express.Router();

router.get('/', getAllHotels);

export default router;
