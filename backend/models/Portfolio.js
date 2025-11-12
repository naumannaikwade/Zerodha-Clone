// models/Portfolio.js
const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  avgPrice: { type: Number, required: true },
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
