const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

// IMPORT THE USER MODEL FROM THE EXTERNAL FILE
const User = require('./models/User'); 

const app = express();

// --- Middleware ---
// CRITICAL: Increased limit for Base64 Image Uploads
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// Serve the uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Routes Registration ---
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/profile', require('./routes/profile'));

// --- MongoDB Connection ---
const MONGO_URI = process.env.MONGO_URI || "your_mongodb_atlas_connection_string_here";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- Auth Routes (Moved inside server.js as per your structure) ---

// 1. Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, gender, height, weight, skinTone, chest, profileImage } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name, email, gender, height, weight, skinTone, 
      bodyMeasurements: { chest: chest || 0 }, // Map chest to the bodyMeasurements object
      profileImage,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// 2. Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Use secret from .env or fallback
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "your_jwt_secret", { expiresIn: '24h' });

    res.json({ 
      message: "Login successful", 
      token, 
      user: { 
        name: user.name, 
        email: user.email, 
        profileImage: user.profileImage 
      } 
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));