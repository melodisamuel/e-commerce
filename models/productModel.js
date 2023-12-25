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
      enum: {
        values: ["Men", "Women", "kids"],
        message: 'size is either: Men, Women, Kids'
      },
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
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
  },
  {
    timestamps: true,
    select: false
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
