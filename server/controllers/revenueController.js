// controllers/revenueController.js

//import Revenue from "../models/revenueModel.js";
//import User from "../models/userModel.js";
const User = require("../models/userModel.js")

exports.addRevenue = async (req, res) => {
  try {
    const { dataid, revenueItem } = req.body;
    const user = await User.findById(dataid);

    if (!user) {
      return res.json({ error: "User not found" }, { status: 404 });
    }

    // Add the new expense item to the user's expenses array
    user.revenues.push(revenueItem);
    console.log("sucessssfllll");
    // Save the updated user document
    await user.save();

    return res.json(user.revenues);
  } catch (error) {
    return res.status(500).json({ error: error.message }, { status: 500 });
  }
};

exports.deleteRevenue = async (req, res) => {
  try {
    const { Id } = req.params;
    const deletedRevenue = await Revenue.findByIdAndDelete(Id);

    if (!deletedRevenue) {
      return res.status(404).json({ error: "Revenue not found" });
    }

    return res
      .status(200)
      .json({ message: "Revenue deleted", revenue: deletedRevenue });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
exports.updateRevenue = async (req, res) => {
  try {
    const { dataid, updatedRevenue } = req.body;
    const { revenueId } = req.params;
    // Find the user by ID
    const user = await User.findById(dataid);

    if (!user) {
      return res.status(500).json({ error: "User not found" });
    }

    // Find the index of the expense item to update
    const revenueIndex = user.revenues.findIndex(
      (revenue) => revenue._id.toString() === revenueId
    );

    if (revenueIndex === -1) {
      return res.status(500).json({ error: "Revenuee item not found" });
    }

    // Update the expense item
    user.revenues[revenueIndex] = {
      ...user.revenues[revenueIndex],
      ...updatedRevenue,
    };

    // Save the updated user document
    await user.save();

    return res.json(user.revenues);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
