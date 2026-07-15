const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    console.log('🔐 Auth Middleware - Token received:', token ? 'Present' : 'Missing');
    
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('🔐 Token decoded for user:', decoded.userId);
    
    // Find user
    const user = await User.findById(decoded.userId).select("-password");
    
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    req.userId = user._id;
    
    console.log('✅ Auth successful for user:', user.email);
    next();
  } catch (err) {
    console.error("❌ Auth middleware error:", err.message);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = authMiddleware;