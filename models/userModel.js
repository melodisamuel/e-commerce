const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email address"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  role: {
    type: String,
    enum: ["user", "admin", "vendor", "support"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
