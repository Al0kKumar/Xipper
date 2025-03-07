import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const bookHotel = async (req, res) => {
  try {
    const { hotelName } = req.body;
    const userId = req.userId; // Extracted from token by authMiddleware

    // Validate required fields
    if (!hotelName) {
      return res.status(400).json({ error: 'Hotel name is required' });
    }

    // Find the hotel by name
    const hotel = await prisma.hotel.findFirst({
      where: {
        name: hotelName,
      },
    });

    // If the hotel is not found, return an error
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }

    // Create a booking
    const booking = await prisma.booking.create({
      data: {
        userId, // Extracted from token
        hotelId: hotel.id, // Link to the found hotel
        checkin: true, // Assuming default check-in status
      },
    });

    res.json(booking);
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
