const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: [true, "A model name is required"],
      unique: true,
    },
    colorway: {
      type: String,
      required: [true, "A colorway is required"],
    },
    size: {
      type: String,
      enum: ["Men", "Women", "kids"],
      required: [true, "A size category is required"],
    },
    releaseYear: {
      type: Number,
      required: [true, "A release year is required"],
    },
    price: {
      type: Number,
      required: [true, "A price category is required"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
