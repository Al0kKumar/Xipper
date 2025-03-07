import { z } from 'zod';

const hotelSearchSchema = z.object({
  location: z.string().min(2, "Location is required"),
  date: z.string().optional(), 
});


export const getAllHotels = (req, res) => {
    res.send('Fetch all hotels logic goes here');
  };
  