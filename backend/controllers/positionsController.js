const Position = require('../models/Position');

exports.getUserPositions = async (req, res) => {
  try {
    const positions = await Position.find({ userId: req.user._id });
    res.json(positions);
  } catch (err) {
    console.error("Error fetching positions:", err);
    res.status(500).json({ message: "Server error fetching positions" });
  }
};