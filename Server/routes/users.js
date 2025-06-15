const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
