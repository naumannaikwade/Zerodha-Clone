const express = require("express");
const { getAllStocks, getStockBySymbol } = require("../controllers/stocksController");
const router = express.Router();

router.get("/", getAllStocks);
router.get("/:symbol", getStockBySymbol);

module.exports = router;