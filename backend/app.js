import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import checkinRoutes from './routes/checkinRoutes.js';
import addhotelRoutes from  './routes/addhotelRoutes.js'

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors()); 

app.use('/api/users', userRoutes);
app.use('/api/add', addhotelRoutes)
app.use('/api/bookings', bookingRoutes);
app.use('/api/check', checkinRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
