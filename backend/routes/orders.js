const express = require("express");
const router = express.Router();
const Order = require("../models/OrdersModel");
const Funds = require("../models/FundsModel");
const Holding = require("../models/HoldingsModel");
const Position = require("../models/PositionsModel");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

// Buy stock - saves to Orders, Holdings, and Positions
router.post("/buy", async (req, res) => {
  try {
    const { symbol, name, price, quantity } = req.body;
    const total = price * quantity;

    console.log("🛒 Buy request:", { symbol, name, price, quantity, total, userId: req.user.id });

    // 1. Get user funds
    let funds = await Funds.findOne({ userId: req.user.id });
    if (!funds) {
      return res.status(404).json({ message: "Funds not found" });
    }

    if (funds.currency < total) {
      return res.status(400).json({ message: "Not enough funds" });
    }

    // 2. Deduct funds
    funds.currency -= total;
    funds.transactions.push({
      type: "Debit",
      segment: "Equity",
      amount: total,
      description: `Bought ${quantity} shares of ${symbol}`,
      timestamp: new Date(),
    });
    await funds.save();
    console.log("✅ Funds updated");

    // 3. Create order (Orders collection)
    console.log("📝 Creating order...");
    
    const orderData = {
      userId: req.user.id,
      symbol: symbol,
      name: name,
      type: "BUY",
      price: price,
      quantity: quantity,
      total: total,
      status: "COMPLETED"
    };
    
    console.log("Order data:", orderData);
    
    const order = new Order(orderData);
    const savedOrder = await order.save();
    console.log("✅ Order saved with ID:", savedOrder._id);

    // 4. Update holdings (Holdings collection)
    console.log("📊 Updating holdings...");
    let holding = await Holding.findOne({ userId: req.user.id, symbol });
    
    if (holding) {
      console.log("📦 Existing holding found");
      // Calculate new average price
      holding.avgPrice = (holding.avgPrice * holding.quantity + total) / (holding.quantity + quantity);
      holding.quantity += quantity;
    } else {
      console.log("🆕 Creating new holding");
      holding = new Holding({
        userId: req.user.id,
        symbol: symbol,
        name: name,
        quantity: quantity,
        avgPrice: price,
      });
    }
    
    const savedHolding = await holding.save();
    console.log("✅ Holding saved:", savedHolding._id);

    // 5. Update positions (Positions collection)
    console.log("📈 Updating positions...");
    let position = await Position.findOne({ userId: req.user.id, symbol });
    
    if (position) {
      console.log("📍 Existing position found");
      // Update existing position
      position.quantity += quantity;
      position.currentPrice = price;
      // Calculate P&L
      position.pnl = (price - position.buyPrice) * position.quantity;
    } else {
      console.log("🆕 Creating new position");
      // Create new position
      position = new Position({
        userId: req.user.id,
        symbol: symbol,
        name: name,
        quantity: quantity,
        buyPrice: price,
        currentPrice: price,
        pnl: 0, // No P&L for new position yet
      });
    }
    
    const savedPosition = await position.save();
    console.log("✅ Position saved:", savedPosition._id);

    console.log("🎉 All operations completed successfully!");

    res.json({ 
      success: true, 
      message: "Stock purchased successfully",
      order: savedOrder,
      holding: savedHolding,
      position: savedPosition,
      funds: {
        equity: funds.equity,
        commodity: funds.commodity,
        currency: funds.currency
      } 
    });

  } catch (err) {
    console.error("💥 Error in buy route:", err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to buy stock",
      error: process.env.NODE_ENV === 'development' ? err.message : "Internal server error"
    });
  }
});

// GET user orders
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .select('-__v');
    
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Server error fetching orders" });
  }
});

module.exports = router;