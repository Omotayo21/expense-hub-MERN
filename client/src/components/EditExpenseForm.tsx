// EditExpenseForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import BaseUrl from "../config";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface Expense {
  _id: string;
  category: string;
  name: string;
  amount: number;
}
interface EditExpenseFormProps {
  expense: Expense;
  onClose: () => void;
  onSave: (updatedExpense: Expense) => void;
}
const EditExpenseForm: React.FC<EditExpenseFormProps> = ({ expense, onClose, onSave }) => {
    const [dataid, setData] = useState("nothing");

    const getUserDetails = async () => {
      const token = Cookies.get("token"); // Retrieve token from cookies
      const res = await axios.get(`${BaseUrl}/api/me`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });
      setData(res.data.data._id);
    };
    useEffect(() => {
      getUserDetails();
    }, []);
  const [updatedExpense, setUpdatedExpense] = useState(expense);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`${BaseUrl}/api/expenses/${expense._id}`,{dataid, updatedExpense});
      onSave(updatedExpense);
      onClose();
      toast.success("Expense updated successfully");
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Expense</h2>
        <label className="block mb-2">Title</label>
        <input
          type="text"
          name="name"
          value={updatedExpense.name}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
        <label className="block mb-2">Amount</label>
        <input
          type="number"
          name="amount"
          value={updatedExpense.amount}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-black py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditExpenseForm;
