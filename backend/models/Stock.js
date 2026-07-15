const mongoose = require("mongoose");
const StockSchema = require("../schemas/StockSchema");

const Stock = mongoose.model("Stock", StockSchema);
module.exports = Stock;