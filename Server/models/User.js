// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  patientId: { type: String, required: true, unique: true }, // ✅ Add this field
});

module.exports = mongoose.model('User', userSchema);
