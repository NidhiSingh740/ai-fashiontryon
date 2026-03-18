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
      name, 
      email, 
      password: hashedPassword, 
      gender,
      height, 
      weight, 
      skinTone,
      bodyMeasurements: { chest, waist, hips },
      // Assuming profileImage is handled via a default or separate upload logic
      profileImage: req.body.profileImage || "" 
    });

    await user.save();

    // Create token so they are logged in immediately after registration
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ 
      token,
      user: { 
        name: user.name, 
        email: user.email,
        profileImage: user.profileImage,
        gender: user.gender,
        bodyMeasurements: user.bodyMeasurements
      },
      message: "Registration Successful!" 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user and include the fields we need
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    // Send full user info back to frontend for localStorage storage
    res.json({ 
      token, 
      user: { 
        name: user.name, 
        email: user.email,
        profileImage: user.profileImage, // Ensure this field exists in your Mongoose Schema
        gender: user.gender,
        bodyMeasurements: user.bodyMeasurements
      }, 
      message: "Welcome back!" 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login" });
  }
});

// FORGOT PASSWORD
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    
    // Logic for sending email would go here
    res.json({ message: "Password reset instructions sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;