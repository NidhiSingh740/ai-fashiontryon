const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// 1. GET Profile
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      name: user.name || "",
      gender: user.gender || "",
      height: user.height || 0,
      weight: user.weight || 0,
      skinTone: user.skinTone || "",
      chest: user.chest || 0,
      waist: user.waist || 0,
      hips: user.hips || 0,
      fullBodyImage: user.fullBodyImage || ""
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// 2. UPDATE Profile
router.put('/update', authMiddleware, async (req, res) => {
  try {
    const updateData = req.body;
    
    // Convert strings to numbers for measurements before saving
    const numericFields = ['height', 'weight', 'chest', 'waist', 'hips'];
    numericFields.forEach(field => {
      if (updateData[field]) updateData[field] = Number(updateData[field]);
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.json({ message: "Profile Updated", user: updatedUser });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;