const mongoose = require("mongoose");

const FundsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  equity: { type: Number, default: 0 },
  commodity: { type: Number, default: 0 },
  currency: { type: Number, default: 100000 },
  transactions: [
    {
      type: { type: String },
      segment: String,
      amount: Number,
      description: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

module.exports = FundsSchema;