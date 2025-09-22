// routes/holdings.js
const express = require("express");
const router = express.Router();
const Holding = require("../models/HoldingsModel");
const authMiddleware = require("../middleware/authMiddleware");

// GET user holdings
router.get("/", authMiddleware, async (req, res) => {
  try {
    const holdings = await Holding.find({ userId: req.user.id });
    res.json({ success: true, holdings });
  } catch (err) {
    console.error("Error fetching holdings:", err);
    res.status(500).json({ success: false, message: "Server error fetching holdings" });
  }
});

module.exports = router;
