const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const Booking = require('../models/Booking');
const Car = require('../models/Car');
const User = require('../models/User');
const router = express.Router();

// All routes require admin auth
router.use(authMiddleware, adminMiddleware);

// Dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const [totalUsers, totalCars, totalBookings] = await Promise.all([
      User.countDocuments(),
      Car.countDocuments({available: true}),
      Booking.countDocuments({endDate: { $gt: new Date() }}),
    ]);

    const revenueAgg = await Booking.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);
    const totalRevenue = revenueAgg[0]?.total || 0;

    res.json({ totalUsers, totalCars, totalBookings, totalRevenue });
  } catch (e) {
    res.status(500).json({ message: 'Failed to load stats', error: e.message });
  }
});

// Bookings list with user and car info
router.get('/bookings', async (req, res) => {
  try {
    // Note: You could also apply pagination to bookings in the future using the same pattern as below.
    const bookings = await Booking.find().populate('carId').populate('userId');
    res.json(bookings);
  } catch (e) {
    res.status(500).json({ message: 'Failed to load bookings', error: e.message });
  }
});

// =================================================================
// MODIFIED SECTION: Cars management with Pagination and Search
// =================================================================
router.get('/cars', async (req, res) => {
  try {
    // 1. Get query parameters with default values
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    // 2. Create a search query filter for brand or model
    const query = search
      ? {
          $or: [
            { brand: { $regex: search, $options: 'i' } }, // 'i' for case-insensitive
            { model: { $regex: search, $options: 'i' } }
          ]
        }
      : {};

    // 3. Get the total number of cars that match the search query
    const totalCars = await Car.countDocuments(query);
    const totalPages = Math.ceil(totalCars / limit);

    // 4. Find the cars for the current page, applying search, sorting, and pagination
    const cars = await Car.find(query)
      .populate('owner')
      .sort({ createdAt: -1 }) // Show newest cars first
      .skip((page - 1) * limit) // Logic to skip documents for previous pages
      .limit(limit); // Limit the results to the number per page

    // 5. Send the response in the expected format
    res.json({
      cars,
      totalPages,
      currentPage: page,
    });
  } catch (e) {
    res.status(500).json({ message: 'Failed to load cars', error: e.message });
  }
});
// =================================================================
// END OF MODIFIED SECTION
// =================================================================

router.post('/cars', async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (e) {
    res.status(400).json({ message: 'Failed to create car', error: e.message });
  }
});

router.put('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (e) {
    res.status(400).json({ message: 'Failed to update car', error: e.message });
  }
});

router.delete('/cars/:id', async (req, res) => {
  try {
    console.log(req.body)
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: 'Car deleted' });
  } catch (e) {
    res.status(400).json({ message: 'Failed to delete car', error: e.message });
  }
});

// Approve / Reject car listing
router.post('/cars/:id/approve', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('owner');
    if (!car) return res.status(404).json({ message: 'Car not found' });
    car.status = 'approved';
    car.available = true;
    await car.save();

    res.json({ message: 'Car approved', car });
  } catch (e) {
    res.status(400).json({ message: 'Failed to approve car', error: e.message });
  }
});

router.post('/cars/:id/reject', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('owner');
    console.log(car)
    if (!car) return res.status(404).json({ message: 'Car not found' });
    car.status = 'rejected';
    car.available = false;
    await car.save();
    res.json({ message: 'Car rejected', car });
  } catch (e) {
    res.status(400).json({ message: 'Failed to reject car', error: e.message });
  }
});

// Users list
router.get('/users', async (req, res) => {
  try {
    // Note: You could also apply pagination here.
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: 'Failed to load users', error: e.message });
  }
});

module.exports = router;