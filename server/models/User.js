// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String }, // URL or Path
  gender: { type: String },
  height: { type: Number },
  weight: { type: Number },
  skinTone: { type: String },
  bodyMeasurements: {
    chest: { type: Number },
    waist: { type: Number },
    hips: { type: Number }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);