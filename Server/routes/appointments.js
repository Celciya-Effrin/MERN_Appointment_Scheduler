const express = require('express');
const router = express.Router();
const sendAppointmentMail = require('../utils/sendAppointmentMail'); // we'll define this next
const Appointment = require('../models/Appointment');

//send appointment Date and time throught mail
router.post('/send-appointment', async (req, res) => {
  const { email, name, date, time } = req.body;

  if (!email || !name || !date || !time) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await sendAppointmentMail(email, name, date, time);
    res.status(200).json({ message: 'Appointment email sent successfully' });
  } catch (err) {
    console.error('Email send error:', err.message);
    res.status(500).json({ message: 'Failed to send email' });
  }
});



// Add new appointment
router.post('/add', async (req, res) => {
  const { patientId, date, time } = req.body;

  try {
    const newAppointment = new Appointment({ patientId, date, time });
    await newAppointment.save();
    res.status(200).json({ message: 'Appointment saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save appointment' });
  }
});

// Get appointment history by patient ID
router.get('/history/:patientId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.params.patientId });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// Get all appointments (for Admin Dashboard)
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patientId', 'username email');
    const formattedAppointments = appointments.map(appt => ({
      _id: appt._id,
      patientId: appt.patientId._id,
      username: appt.patientId.username,
      email: appt.patientId.email,
      date: appt.date,
      time: appt.time
    }));
    res.json(formattedAppointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});


module.exports = router;
