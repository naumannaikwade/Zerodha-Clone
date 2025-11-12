const mongoose = require("mongoose");
const StockSchema = require("../schemas/StocksSchema");

const Stock = mongoose.model("Stock", StockSchema);
module.exports = Stock;
