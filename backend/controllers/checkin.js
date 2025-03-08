import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const checkInUser = async (req, res) => {
  const { aadhaar , bookingId } = req.body;

  if (!bookingId || !aadhaar) {
    return res.status(400).json({ error: 'Invalid input. Booking ID and Aadhaar are required.' });
  }

  try {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { checkin: true },
    });

    const checkinRecord = await prisma.checkIn.create({
      data: {
        bookingId:bookingId,
        aadhaar,
      },
    });

    return res.json({
      message: 'Check-in successful',
      updatedBooking,
      checkinRecord,
    });
  } catch (error) {
    console.error('Error during check-in:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
