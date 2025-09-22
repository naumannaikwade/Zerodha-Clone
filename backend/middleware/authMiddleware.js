// middleware/authMiddleware.js

const authMiddleware = (req, res, next) => {
  try {
    // Check if session exists and user is logged in
    if (req.session && req.session.userId) {
      // Attach user info to the request object
      req.user = {
        id: req.session.userId,
        username: req.session.username, // optional, can be used in frontend responses
      };
      return next();
    }

    // If no session or userId, respond with 401
    return res.status(401).json({
      success: false,
      message: "Not logged in",
    });
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error in auth middleware",
    });
  }
};

module.exports = authMiddleware;
