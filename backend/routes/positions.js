// routes/positions.js
const express = require("express");
const router = express.Router();
const Position = require("../models/PositionsModel");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const positions = await Position.find({ userId: req.user.id });
    res.json({ success: true, positions });
  } catch (err) {
    console.error("Error fetching positions:", err);
    res.status(500).json({ success: false, message: "Server error fetching positions" });
  }
});

module.exports = router;
