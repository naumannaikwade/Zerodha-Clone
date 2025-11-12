const express = require("express");
const Stock = require("../models/StocksModel");

const router = express.Router();

// Get all stocks
router.get("/", async (req, res) => {
  try {
    const stocks = await Stock.find({});
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stocks" });
  }
});

// Get single stock by symbol
router.get("/:symbol", async (req, res) => {
  try {
    const stock = await Stock.findOne({ symbol: req.params.symbol.toUpperCase() });
    if (!stock) return res.status(404).json({ message: "Stock not found" });
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stock" });
  }
});

module.exports = router;