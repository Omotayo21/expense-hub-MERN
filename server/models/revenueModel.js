const mongoose = require("mongoose");

const revenueSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Revenue =
  mongoose.models.revenues || mongoose.model("revenues", revenueSchema);

module.exports = Revenue;
