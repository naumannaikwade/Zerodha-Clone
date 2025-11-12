// routes/portfolioRoutes.js
const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");
const StocksModel = require("../models/StocksModel");

// ✅ GET all portfolio holdings
router.get("/", async (req, res) => {
  try {
    const portfolio = await Portfolio.find();
    res.json(portfolio);
  } catch (err) {
    console.error("Error fetching portfolio:", err);
    res.status(500).json({ error: "Failed to fetch portfolio" });
  }
});

// ✅ BUY stock
router.post("/buy", async (req, res) => {
  try {
    const { symbol, quantity, price } = req.body;

    if (!symbol || !quantity || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let holding = await Portfolio.findOne({ symbol });

    if (holding) {
      // Update quantity and average price
      const totalCost = holding.quantity * holding.avgPrice + quantity * price;
      const newQuantity = holding.quantity + quantity;
      holding.avgPrice = totalCost / newQuantity;
      holding.quantity = newQuantity;
      await holding.save();
    } else {
      holding = new Portfolio({ symbol, quantity, avgPrice: price });
      await holding.save();
    }

    res.json({ success: true, holding });
  } catch (err) {
    console.error("Error buying stock:", err);
    res.status(500).json({ error: "Failed to buy stock" });
  }
});

// ✅ SELL stock
router.post("/sell", async (req, res) => {
  try {
    const { symbol, quantity, price } = req.body;

    if (!symbol || !quantity || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const holding = await Portfolio.findOne({ symbol });

    if (!holding || holding.quantity < quantity) {
      return res
        .status(400)
        .json({ error: "Not enough shares to sell" });
    }

    holding.quantity -= quantity;

    if (holding.quantity === 0) {
      await holding.deleteOne();
    } else {
      await holding.save();
    }

    res.json({ success: true, holding });
  } catch (err) {
    console.error("Error selling stock:", err);
    res.status(500).json({ error: "Failed to sell stock" });
  }
});

module.exports = router;
