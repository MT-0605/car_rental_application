const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { addCar, getCarById, getAllCars, getNextAvailableDate } = require('../controllers/carController');

// Multer config for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // Make sure 'uploads/' exists
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// @route GET /api/cars
router.get("/", getAllCars);

// @route GET /api/cars/:id
router.get("/:id", getCarById);

// @route POST /api/cars/add
router.post('/add', upload.single('image'), addCar);

module.exports = router;