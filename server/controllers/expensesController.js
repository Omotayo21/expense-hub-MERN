
const Expense = require("../models/expenseModel");
const User = require("../models/userModel");

exports.addExpense = async (req, res) => {
  try {
    const { dataid, expenseItem } = req.body;
    const user = await User.findById(dataid);

    if (!user) {
      return res.json({ error: "User not found" }, { status: 404 });
    }

    // Add the new expense item to the user's expenses array
    user.expenses.push(expenseItem);
    console.log("sucessssfllll");
    // Save the updated user document
    await user.save();

    return res.json(user.expenses);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};




exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(Id);

    if (!deletedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    return res
      .status(200)
      .json({ message: "Expense deleted", expense: deletedExpense });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { dataid,  updatedExpense } = req.body;
const {expenseId} = req.params
    // Find the user by ID
    const user = await User.findById(dataid);

    if (!user) {
      return res.status(500).json({ error: "User not found" });
    }

    // Find the index of the expense item to update
    const expenseIndex = user.expenses.findIndex(
      (expense) => expense._id.toString() === expenseId
    );

    if (expenseIndex === -1) {
      return res.status(500).json({ error: "Expense item not found" });
    }

    // Update the expense item
    user.expenses[expenseIndex] = {
      ...user.expenses[expenseIndex],
      ...updatedExpense,
    };

    // Save the updated user document
    await user.save();

    return res.json(user.expenses);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};