// server/routes/tryon.js

const express = require('express');
const router = express.Router();
const Replicate = require('replicate');
const authMiddleware = require('../middleware/authMiddleware'); // ✅ CORRECT PATH

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Test route — hit GET /api/tryon/ping to confirm route is registered
router.get('/ping', (req, res) => {
  res.json({ 
    status: 'tryon route is working',
    hasToken: !!process.env.REPLICATE_API_TOKEN 
  });
});

// POST /api/tryon
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { personImage, garmentImage } = req.body;

    if (!personImage || !garmentImage) {
      return res.status(400).json({ error: 'Both personImage and garmentImage are required.' });
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return res.status(500).json({ error: 'REPLICATE_API_TOKEN is not set in your .env file.' });
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

module.exports = router;