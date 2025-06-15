const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // ✅ Import bcrypt
const User = require('../models/User');
const crypto = require('crypto');
const sendVerificationEmail = require('../utils/sendVerificationEmail');


// ✅ Patient ID generator
function generatePatientId() {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `PID${randomNum}`;
}

//For HOME.JS display
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('username email');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    console.error('Fetch user error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


//For REGISTRATION
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password ✅
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const patientId = generatePatientId(); // ✅ Generate random patient ID


    // Save user with hashed password
    const user = new User({
      username,
      email,
      password: hashedPassword, // ✅ Store hashed password
      verificationToken,
      patientId, // ✅ Save patient ID
    });

    await user.save();

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    res.status(200).json({ message: 'Verification email sent' });
  } catch (err) {
    console.error('Registration Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

//After verifing the link
router.get('/verify/:token', async (req, res) => {
  const token = req.params.token;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) return res.status(400).send('Invalid or expired token');

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    // Redirect to frontend login page
    res.redirect(process.env.REACT_APP_FRONTEND_URL + '/login'); // 👈 this line redirects
  } catch (err) {
    console.error('Verification error:', err);
    res.status(500).send('Server error');
  }
});


//LOGIN
// Simple login: only check username and password
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Successful login
    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
