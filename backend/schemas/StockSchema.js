const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  symbol: { type: String, unique: true, required: true },
  name: { type: String, default: "" },
  ltp: { type: Number, required: true },           // latest trading price
  change: { type: Number, default: 0 },
  changePercent: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = StockSchema;