const mongoose = require("mongoose");
const HoldingsSchema = require("../schemas/HoldingsSchema");

const HoldingModel = mongoose.model("Holding", HoldingsSchema);

module.exports = HoldingModel;
