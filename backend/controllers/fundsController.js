const Funds = require('../models/Funds');

exports.getUserFunds = async (req, res) => {
  try {
    let funds = await Funds.findOne({ userId: req.user._id });

    if (!funds) {
      funds = await Funds.create({
        userId: req.user._id,
        equity: 0,
        commodity: 0,
        currency: 100000,
        transactions: [],
      });
    }

    res.json(funds);
  } catch (err) {
    console.error("Error fetching funds:", err);
    res.status(500).json({ message: "Server error fetching funds" });
  }
};

exports.addDemoFunds = async (req, res) => {
  try {
    let funds = await Funds.findOne({ userId: req.user._id });

    if (!funds) {
      funds = await Funds.create({
        userId: req.user._id,
        equity: 0,
        commodity: 0,
        currency: 0,
        transactions: [],
      });
    }

    const maxFunds = 100000;
    const totalBalance = (funds.equity || 0) + (funds.commodity || 0) + (funds.currency || 0);
    const remainingFunds = Math.max(0, maxFunds - totalBalance);

    if (remainingFunds <= 0) {
      return res.json({ 
        success: false, 
        error: "Maximum fund limit reached" 
      });
    }

    funds.currency += remainingFunds;
    funds.transactions.push({
      type: "Credit",
      segment: "Currency",
      amount: remainingFunds,
      description: "Demo funds added",
      timestamp: new Date(),
    });

    await funds.save();

    res.json({
      success: true,
      message: `Added ₹${remainingFunds}`,
      funds,
    });
  } catch (err) {
    console.error("Error adding demo funds:", err);
    res.status(500).json({ 
      success: false, 
      error: "Server error adding funds" 
    });
  }
};