const mongoose = require("mongoose");
const OrdersSchema = require("../schemas/OrdersSchema");

// Use explicit collection name to avoid pluralization issues
const OrderModel = mongoose.model("Order", OrdersSchema, "orders");

module.exports = OrderModel;