const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET /api/dashboard/stats
// @desc    Get real-time user stats for the dashboard
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    // req.user.id is provided by your JWT authMiddleware
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      name: user.name,
      stats: {
        totalTrials: user.stats?.totalTrials || 0,
        savedLooks: user.stats?.savedLooks || 0,
        perfectFits: user.stats?.perfectFits || 0
      },
      // We will fill these as we build the "Try-On" and "AI Stylist" sections
      recentTrials: [], 
      recommendations: [] 
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error fetching dashboard stats" });
  }
});

module.exports = router;