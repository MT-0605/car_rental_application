const Car = require('../models/Car');
const Booking = require('../models/Booking');

// @desc    Add new car listing
// @route   POST /api/cars/add
// @access  Public
const addCar = async (req, res) => {
  try {
    const {
      brand,
      model,
      year,
      price,
      category,
      transmission,
      fuelType,
      seating,
      location,
      description,
      userId,
    } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newCar = new Car({
      brand,
      model,
      year,
      price,
      category,
      transmission,
      fuelType,
      seating,
      location,
      description: description || '',
      imageUrl,
      owner: userId,
      status: 'pending',
      available: false,
    });

    console.log('New Car:', newCar);

    await newCar.save();
    return res.status(201).json({ message: 'Rental request has been successfully sent to Admin', car: newCar });
  } catch (err) {
    console.error('Car Add Error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @desc    Get a car by ID
// @route   GET /api/cars/:id
// @access  Public
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({ status: 'approved'}); 
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Export both functions
module.exports = {
  addCar,
  getCarById,
  getAllCars,
};
