// models/Car.js

const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  transmission: {
    type: String,
    required: true
  },
  fuelType: {
    type: String,
    required: true
  },
  seating: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  imageUrl: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  available: { 
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "approved", "rejected"]
  }
}, { timestamps: true });

module.exports = mongoose.model("Car", carSchema);
