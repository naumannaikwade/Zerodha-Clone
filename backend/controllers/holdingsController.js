const Holding = require('../models/Holding');
const Stock = require('../models/Stock');

exports.getUserHoldings = async (req, res) => {
  try {
    const holdings = await Holding.find({ userId: req.user._id });

    const detailedHoldings = await Promise.all(
      holdings.map(async (h) => {
        const stock = await Stock.findOne({ symbol: h.symbol });
        const ltp = stock ? stock.ltp : h.avgPrice;
        const investment = h.avgPrice * h.quantity;
        const currentValue = ltp * h.quantity;
        const pnl = currentValue - investment;
        const pnlPercent = (pnl / investment) * 100;

        return {
          _id: h._id,
          symbol: h.symbol,
          name: h.name || (stock ? stock.name : ""),
          quantity: h.quantity,
          avgPrice: h.avgPrice,
          ltp,
          investment,
          currentValue,
          pnl,
          pnlPercent,
        };
      })
    );

    res.json(detailedHoldings);
  } catch (err) {
    console.error("Error fetching holdings:", err);
    res.status(500).json({ message: "Server error fetching holdings" });
  }
};