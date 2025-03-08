import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const checkInUser = async (req, res) => {
  // Extract aadhaar from the request body and bookingId from URL params
  const { aadhaar } = req.body;
  const { bookingId } = req.params;

  if (!bookingId || !aadhaar) {
    return res.status(400).json({ error: 'Invalid input. Booking ID and Aadhaar are required.' });
  }

  try {
    // Verify that the booking exists; convert bookingId to a number if needed
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    
    // Update the booking to mark check-in as true
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { checkin: true },
    });

    // Create a check-in record linked to the booking
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
