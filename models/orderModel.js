const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      Quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
      size: {
        type: String,
        required: true,
      },
      color: {
        type: String,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalQuantity: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: {
      values: ["Pending", "Processing", "Shipped", "Delivered"],
      message: 'status is either Pending, Processing, Shipped, Delivered',
    }, 
    default: "Pending",
  },
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
