// models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming your patient model is User
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);
