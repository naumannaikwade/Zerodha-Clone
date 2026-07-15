const mongoose = require("mongoose");
const FundsSchema = require("../schemas/FundsSchema");

const Funds = mongoose.model("Funds", FundsSchema);
module.exports = Funds;