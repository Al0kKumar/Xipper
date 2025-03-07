import express from 'express';
import { checkInUser } from '../controllers/checkin.js';

const router = express.Router();

router.post('/checkin', checkInUser);

export default router;
