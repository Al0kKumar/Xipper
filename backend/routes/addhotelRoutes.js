import express from 'express';
import { addhotel } from '../controllers/addhotel.js';

const router = express.Router();

router.post('/hotels', addhotel);

export default router;
