const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const catchAsync = require("../utils/catchAsync");

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
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el  === this.password
      },
      message: 'Passwords are not the same'
    }
  }
});

userSchema.pre('save', async function (next) {
  // Only run this if password was actually modified
  if (!this.isModified('password')) return (next);

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12)

  // Delete password confirm field
  this.passwordConfirm = undefined;
  next()
})

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword)
}
  
const User = mongoose.model("user", userSchema);

module.exports = User;
