const mongoose = require("mongoose");

const PositionsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  symbol: String,
  name: String,
  quantity: Number,
  buyPrice: Number,
  currentPrice: Number,
  pnl: Number, // profit/loss
});

module.exports = PositionsSchema;