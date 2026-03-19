const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path'); // Added path import
require('dotenv').config();

const app = express();

// --- Middleware ---
app.use(express.json()); 
app.use(cors());

// Serve the uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Add this in server.js
app.use('/api/dashboard', require('./routes/dashboard'));
// --- MongoDB Connection ---
const MONGO_URI = process.env.MONGO_URI || "your_mongodb_atlas_connection_string_here";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- User Schema ---
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: String,
  height: Number,
  weight: Number,
  skinTone: String,
  chest: Number,
  profileImage: String
});

const User = mongoose.model('User', userSchema);

// --- Routes ---

// 1. Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, gender, height, weight, skinTone, chest, profileImage } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name, email, gender, height, weight, skinTone, chest, profileImage,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// 2. Login (FIXED TO RETURN profileImage)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: '1h' });

    // Return the name and profileImage so the Sidebar can display them
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

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));