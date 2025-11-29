const mongoose = require("mongoose");
const HoldingSchema = require("../schemas/HoldingSchema");

const Holding = mongoose.model("Holding", HoldingSchema);
module.exports = Holding;