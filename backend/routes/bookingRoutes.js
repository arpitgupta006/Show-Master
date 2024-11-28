const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Movie = require('../models/Movie');

router.post('/create', async (req, res) => {
  try {
    const { movieId, tickets, seatSection } = req.body;

    // Create a new booking
    const newBooking = new Booking({
      movieId,
      tickets,
      seatSection,
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: 'Error creating booking' });
  }
});

module.exports = router;
