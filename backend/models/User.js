const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  isGoogleUser: { type: Boolean, default: false },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for Google users
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
