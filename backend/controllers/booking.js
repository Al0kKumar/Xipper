

export const bookHotel = async (req, res) => {

  const { userId, hotelName } = req.body;
  if (!userId || !hotelName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const booking = await prisma.hotelBooking.create({
    data: {
      userId,
      hotelName,
    },
  });
  res.json(booking);
  };
  