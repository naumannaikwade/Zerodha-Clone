const Order = require('../models/Order');
const Funds = require('../models/Funds');
const Holding = require('../models/Holding');
const Position = require('../models/Position');

exports.buyStock = async (req, res) => {
  try {
    const { symbol, name, price, quantity } = req.body;
    const total = price * quantity;

    console.log("🛒 Buy request:", { symbol, name, price, quantity, total, userId: req.user._id });

    // 1. Check and deduct funds
    let funds = await Funds.findOne({ userId: req.user._id });
    if (!funds) {
      return res.status(404).json({ message: "Funds not found" });
    }

    if (funds.currency < total) {
      return res.status(400).json({ message: "Not enough funds" });
    }

    funds.currency -= total;
    funds.transactions.push({
      type: "Debit",
      segment: "Equity",
      amount: total,
      description: `Bought ${quantity} shares of ${symbol}`,
      timestamp: new Date(),
    });
    await funds.save();

    // 2. Create order
    const order = await Order.create({
      userId: req.user._id,
      symbol,
      name,
      type: "BUY",
      price,
      quantity,
      total,
      status: "COMPLETED"
    });

    // 3. Update holdings
    let holding = await Holding.findOne({ userId: req.user._id, symbol });
    
    if (holding) {
      holding.avgPrice = (holding.avgPrice * holding.quantity + total) / (holding.quantity + quantity);
      holding.quantity += quantity;
    } else {
      holding = new Holding({
        userId: req.user._id,
        symbol,
        name,
        quantity,
        avgPrice: price,
      });
    }
    await holding.save();

    // 4. Update positions
    let position = await Position.findOne({ userId: req.user._id, symbol });
    
    if (position) {
      position.quantity += quantity;
      position.currentPrice = price;
      position.pnl = (price - position.buyPrice) * position.quantity;
    } else {
      position = new Position({
        userId: req.user._id,
        symbol,
        name,
        quantity,
        buyPrice: price,
        currentPrice: price,
        pnl: 0,
      });
    }
    await position.save();

    res.json({
      success: true,
      message: "Stock purchased successfully",
      order,
      holding,
      position,
      funds: {
        equity: funds.equity,
        commodity: funds.commodity,
        currency: funds.currency
      }
    });

  } catch (err) {
    console.error("Error in buy route:", err);
    res.status(500).json({
      success: false,
      message: "Failed to buy stock",
      error: process.env.NODE_ENV === 'development' ? err.message : "Internal server error"
    });
  }
};

exports.sellStock = async (req, res) => {
  try {
    const { symbol, price, quantity } = req.body;

    console.log("💸 Sell request:", { symbol, price, quantity, userId: req.user._id });

    // 1. Find holding
    const holding = await Holding.findOne({ userId: req.user._id, symbol });
    if (!holding) {
      return res.status(400).json({
        success: false,
        message: "You don't own any shares of this stock."
      });
    }

    if (holding.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough shares to sell."
      });
    }

    // 2. Calculate profit/loss
    const sellValue = price * quantity;
    const costValue = holding.avgPrice * quantity;
    const pnl = sellValue - costValue;

    holding.quantity -= quantity;
    if (holding.quantity === 0) {
      await Holding.deleteOne({ _id: holding._id });
    } else {
      await holding.save();
    }

    // 3. Update funds
    let funds = await Funds.findOne({ userId: req.user._id });
    funds.currency += sellValue;
    funds.transactions.push({
      type: "Credit",
      segment: "Equity",
      amount: sellValue,
      description: `Sold ${quantity} shares of ${symbol}`,
      timestamp: new Date(),
    });
    await funds.save();

    // 4. Create sell order
    const order = await Order.create({
      userId: req.user._id,
      symbol,
      name: holding.name,
      type: "SELL",
      price,
      quantity,
      total: sellValue,
      status: "COMPLETED",
    });

    // 5. Update position
    let position = await Position.findOne({ userId: req.user._id, symbol });
    if (position) {
      position.quantity -= quantity;
      position.currentPrice = price;
      position.pnl = (price - position.buyPrice) * position.quantity;

      if (position.quantity <= 0) {
        await Position.deleteOne({ _id: position._id });
      } else {
        await position.save();
      }
    }

    res.json({
      success: true,
      message: `Sold ${quantity} shares of ${symbol}`,
      order,
      funds: { currency: funds.currency },
      pnl,
    });

  } catch (err) {
    console.error("Error in sell route:", err);
    res.status(500).json({
      success: false,
      message: "Error while selling stock",
      error: process.env.NODE_ENV === "development" ? err.message : "Internal server error",
    });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select('-__v');
    
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Server error fetching orders" });
  }
};