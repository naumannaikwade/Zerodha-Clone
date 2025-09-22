const express = require("express");
const router = express.Router();
const Holding = require("../models/HoldingsModel");
const authMiddleware = require("../middleware/authMiddleware");

// GET user holdings
router.get("/", authMiddleware, async (req, res) => {
  try {
    const holdings = await Holding.find({ userId: req.user.id });
    
    // If you want to include live prices, you could add them here
    // For now, we'll just return the holdings as they are
    
    res.json(holdings);
  } catch (err) {
    console.error("Error fetching holdings:", err);
    res.status(500).json({ message: "Server error fetching holdings" });
  }
});

module.exports = router;