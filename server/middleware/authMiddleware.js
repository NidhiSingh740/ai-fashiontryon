const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // 1. Get the header
  const authHeader = req.header('Authorization');

  // 2. Check if header exists
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // 3. Robust Token Extraction
    // This handles both "Bearer <token>" and just "<token>" formats
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.split(" ")[1] 
      : authHeader;

    // 4. Verify with Fallback
    // CRITICAL: The secret here MUST match the one in your server.js login route
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || "your_jwt_secret"
    );

    // 5. Attach user and move to next step
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT Auth Error:", err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};