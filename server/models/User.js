const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String }, 
  fullBodyImage: { type: String },
  gender: { type: String, default: "" }, // Default to empty string
  skinTone: { type: String, default: "" },
  height: { type: Number, default: 0 },
  weight: { type: Number, default: 0 },
  chest: { type: Number, default: 0 },
  waist: { type: Number, default: 0 },
  hips: { type: Number, default: 0 },
  stats: {
    totalTrials: { type: Number, default: 0 },
    savedLooks: { type: Number, default: 0 },
    perfectFits: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);