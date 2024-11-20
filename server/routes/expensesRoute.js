// routes/expenseRoutes.js

const express = require("express")
const { addExpense, deleteExpense, updateExpense } =require( "../controllers/expensesController.js");

const router = express.Router();

router.post("/", addExpense);
router.delete("/:id", deleteExpense);
router.put("/:expenseId", updateExpense);
module.exports = router;
