const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  expenses: [
    {
      category: { type: String },
      name: { type: String, required: true, unique: true },
      amount: { type: Number, required: true, unique: true },
    },
  ],
  revenues: [
    {
      name: { type: String, required: true, unique: true },
      amount: { type: Number, required: true, unique: true },
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
