// routes/orders.js
const express = require("express");
const router = express.Router();
const Order = require("../models/OrdersModel");
const Funds = require("../models/FundsModel");
const Holding = require("../models/HoldingsModel");
const Position = require("../models/PositionsModel");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

// GET user orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 }).select("-__v");
    res.json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ success: false, message: "Server error fetching orders" });
  }
});

// POST buy stock
router.post("/buy", async (req, res) => {
  try {
    const { symbol, name, price, quantity } = req.body;
    const total = price * quantity;

    let funds = await Funds.findOne({ userId: req.user.id });
    if (!funds || funds.currency < total) return res.status(400).json({ success: false, message: "Not enough funds" });

    // Deduct funds
    funds.currency -= total;
    funds.transactions.push({ type: "Debit", segment: "Equity", amount: total, description: `Bought ${quantity} shares of ${symbol}`, timestamp: new Date() });
    await funds.save();

    // Create order
    const order = new Order({ userId: req.user.id, symbol, name, type: "BUY", price, quantity, total, status: "COMPLETED" });
    await order.save();

    // Update holdings
    let holding = await Holding.findOne({ userId: req.user.id, symbol });
    if (holding) {
      holding.avgPrice = (holding.avgPrice * holding.quantity + total) / (holding.quantity + quantity);
      holding.quantity += quantity;
    } else {
      holding = new Holding({ userId: req.user.id, symbol, name, quantity, avgPrice: price });
    }
    await holding.save();

    // Update positions
    let position = await Position.findOne({ userId: req.user.id, symbol });
    if (position) {
      position.quantity += quantity;
      position.currentPrice = price;
      position.pnl = (price - position.buyPrice) * position.quantity;
    } else {
      position = new Position({ userId: req.user.id, symbol, name, quantity, buyPrice: price, currentPrice: price, pnl: 0 });
    }
    await position.save();

    res.json({ success: true, message: "Stock purchased successfully", order, holding, position, funds });
  } catch (err) {
    console.error("Error buying stock:", err);
    res.status(500).json({ success: false, message: "Failed to buy stock" });
  }
});

module.exports = router;
