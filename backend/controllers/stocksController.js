const Stock = require('../models/Stock');

exports.getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({});
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stocks" });
  }
};

exports.getStockBySymbol = async (req, res) => {
  try {
    const stock = await Stock.findOne({ symbol: req.params.symbol.toUpperCase() });
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stock" });
  }
};