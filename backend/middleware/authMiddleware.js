const authMiddleware = (req, res, next) => {
  if (req.session && req.session.userId) {
    req.user = { id: req.session.userId };
    return next();
  }
  return res.status(401).json({ success: false, message: "Not logged in" });
};

module.exports = authMiddleware;
