
export const checkInUser = async (req, res) => {
  
  const { bookingId, aadhaarNumbers } = req.body;
  if (!bookingId || !Array.isArray(aadhaarNumbers)) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  // Verify that the booking exists
  const booking = await prisma.hotelBooking.findUnique({ where: { id: bookingId } });
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  // Create a check-in record
  const checkin = await prisma.checkIn.create({
    data: {
      bookingId,
      aadhaarNumbers,
    },
  });
  res.json(checkin);
} 
  