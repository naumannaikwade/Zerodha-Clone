const mongoose = require("mongoose");
const OrderSchema = require("../schemas/OrderSchema");

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;