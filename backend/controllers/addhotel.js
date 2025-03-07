import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addhotel = async (req, res) => {
    try {
      const { name, location, rooms } = req.body;
  
      if (!name || !location || !rooms) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      const newHotel = await prisma.hotel.create({
        data: { name, location, rooms },
      });
  
      res.json(newHotel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  