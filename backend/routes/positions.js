const express = require("express");
const router = express.Router();
const Position = require("../models/PositionsModel");
const authMiddleware = require("../middleware/authMiddleware");

// GET user positions
router.get("/", authMiddleware, async (req, res) => {
  try {
    console.log("Fetching positions for user:", req.user.id);
    
    const positions = await Position.find({ userId: req.user.id });
    
    console.log("Positions found:", positions.length);
    
    if (positions.length > 0) {
      console.log("Sample position:", {
        symbol: positions[0].symbol,
        quantity: positions[0].quantity,
        buyPrice: positions[0].buyPrice
      });
    }
    
    res.json(positions);
  } catch (err) {
    console.error("Error fetching positions:", err);
    res.status(500).json({ message: "Server error fetching positions" });
  }
});

module.exports = router;