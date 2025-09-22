router.get("/", authMiddleware, async (req, res) => {
  try {
    let funds = await Funds.findOne({ userId: req.user.id });

    if (!funds) {
      funds = await Funds.create({
        userId: req.user.id,
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
});
