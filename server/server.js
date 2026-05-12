// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const Replicate = require('replicate');
require('dotenv').config();

const User = require('./models/User');

const app = express();

// --- Middleware ---
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Auth Check Helper ---
const verifyToken = (req, res) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    res.status(401).json({ error: 'No token provided.' });
    return null;
  }
  try {
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
    return jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
  } catch (err) {
    res.status(401).json({ error: 'Invalid token.' });
    return null;
  }
};

// --- Replicate Setup ---
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// --- Routes Registration ---
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/profile', require('./routes/profile'));

// --- VIRTUAL TRY-ON ROUTES (inline — no separate file needed) ---

// Test: http://localhost:5000/api/tryon/ping
app.get('/api/tryon/ping', (req, res) => {
  res.json({
    status: 'tryon route working ✅',
    hasReplicateToken: !!process.env.REPLICATE_API_TOKEN,
    tokenPreview: process.env.REPLICATE_API_TOKEN
      ? process.env.REPLICATE_API_TOKEN.substring(0, 6) + '...'
      : 'NOT SET',
  });
});

// Main try-on
app.post('/api/tryon', async (req, res) => {
  // Verify token
  const decoded = verifyToken(req, res);
  if (!decoded) return; // verifyToken already sent error response

  try {
    const { personImage, garmentImage } = req.body;

    if (!personImage || !garmentImage) {
      return res.status(400).json({ error: 'Both personImage and garmentImage are required.' });
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return res.status(500).json({ error: 'REPLICATE_API_TOKEN is not set in .env file.' });
    }

    console.log('🚀 Starting Virtual Try-On...');

    const output = await replicate.run(
      'cuuupid/idm-vton:c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4',
      {
        input: {
          human_img: personImage,
          garm_img: garmentImage,
          garment_des: 'outfit',
          is_checked: true,
          is_checked_crop: false,
          denoise_steps: 30,
          seed: 42,
        },
      }
    );

    console.log('✅ Replicate output:', output);

    const resultUrl = Array.isArray(output) ? output[0] : output;

    if (!resultUrl) {
      return res.status(500).json({ error: 'Replicate returned empty output.' });
    }

    return res.status(200).json({ success: true, resultImage: resultUrl });

  } catch (error) {
    console.error('❌ Try-On Error:', error);
    return res.status(500).json({ error: error.message || 'Virtual try-on failed.' });
  }
});

// --- MongoDB Connection ---
const MONGO_URI = process.env.MONGO_URI || 'your_mongodb_atlas_connection_string_here';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- Auth Routes ---

// 1. Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, gender, height, weight, skinTone, chest, profileImage } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name, email, gender, height, weight, skinTone,
      bodyMeasurements: { chest: chest || 0 },
      profileImage,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'Registration successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// 2. Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { name: user.name, email: user.email, profileImage: user.profileImage },
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));