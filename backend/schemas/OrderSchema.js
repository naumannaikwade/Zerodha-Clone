const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  symbol: { 
    type: String, 
    required: true,
    trim: true
  },
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  type: { 
    type: String, 
    enum: ["BUY", "SELL"], 
    required: true 
  },
  price: { 
    type: Number, 
    required: true,
    min: 0
  },
  quantity: { 
    type: Number, 
    required: true,
    min: 1
  },
  total: { 
    type: Number, 
    required: true,
    min: 0
  },
  status: { 
    type: String, 
    enum: ["OPEN", "COMPLETED", "CANCELLED"], 
    default: "COMPLETED" 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  collection: 'orders'
});

// Add indexes
OrdersSchema.index({ userId: 1, createdAt: -1 });
OrdersSchema.index({ userId: 1, symbol: 1 });

module.exports = OrdersSchema;