const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    funds: {
      equity: { type: Number, default: 0 },
      commodity: { type: Number, default: 0 },
      currency: { type: Number, default: 100000 },
    },
    transactions: [
      {
        type: { type: String, enum: ["BUY", "SELL"] },
        amount: Number,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = UserSchema;