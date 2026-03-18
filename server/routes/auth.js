
// server/routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, gender, height, weight, skinTone, chest, waist, hips } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name, email, password: hashedPassword, gender,
      height, weight, skinTone,
      bodyMeasurements: { chest, waist, hips }
    });

    await user.save();
    res.status(201).json({ message: "Registration Successful! Please Sign In." });
  } catch (err) {
    res.status(500).json({ message: "Server error during registration" });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { name: user.name, email: user.email }, message: "Welcome back!" });
  } catch (err) {
    res.status(500).json({ message: "Server error during login" });
  }
});

// FORGOT PASSWORD (Basic Logic)
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });
  
  // In a real app, you would send an email with a reset link here.
  res.json({ message: "Password reset instructions sent to your email" });
});

module.exports = router;