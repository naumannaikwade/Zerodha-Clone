const mongoose = require("mongoose");

const HoldingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  symbol: String,
  name: String,
  quantity: Number,
  avgPrice: Number,
});

module.exports = HoldingsSchema;