import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const bookHotel = async (req, res) => {
  try {
    const { hotelName } = req.body;
    const userId = req.userId; 
    
    if (!hotelName) {
      return res.status(400).json({ error: 'Hotel name is required' });
    }

    const hotel = await prisma.hotel.findFirst({
      where: {
        name: hotelName,
      },
    });

    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    const booking = await prisma.booking.create({
      data: {
        userId, 
        hotelId: hotel.id, 
      },
    });

    res.json(booking);
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
