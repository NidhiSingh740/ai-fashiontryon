const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  // Images
  profileImage: { type: String }, // Avatar/Face
  fullBodyImage: { type: String }, // NEW: Dedicated for AI Virtual Try-On
  
  // Basic Info
  gender: { type: String },
  skinTone: { type: String },
  
  // Physical Data
  height: { type: Number },
  weight: { type: Number },
  bodyMeasurements: {
    chest: { type: Number, default: 0 },
    waist: { type: Number, default: 0 },
    hips: { type: Number, default: 0 }
  },
  
  // Real-time Stats
  stats: {
    totalTrials: { type: Number, default: 0 },
    savedLooks: { type: Number, default: 0 },
    perfectFits: { type: Number, default: 0 }
  },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);