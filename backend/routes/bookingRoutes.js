const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST /api/bookings — Create a new booking
router.post('/bookings', async (req, res) => {
  try {
    const {
      carId,
      userId,
      bookingDate,
      returnDate,
      price,
      paymentDueDate,
      pickupLocation,
      returnLocation
    } = req.body;

    // Validate required fields
    if (!carId || !userId || !bookingDate || !price || !pickupLocation || !returnLocation) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided' });
    }

    const newBooking = new Booking({
      carId,
      userId,
      bookingDate,
      returnDate,
      price,
      paymentDueDate,
      pickupLocation,
      returnLocation,
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking: savedBooking
    });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/bookings — Get all bookings for a user
router.get('/bookings/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId }).populate('carId');
    
    res.status(200).json({
      success: true,
      bookings
    });
  } catch (err) {
    console.error('Get bookings error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/bookings — Get a specific booking
router.get('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('carId');
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    res.status(200).json({
      success: true,
      booking
    });
  } catch (err) {
    console.error('Get booking error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
