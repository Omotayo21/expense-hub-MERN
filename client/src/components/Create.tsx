import React, { useState, useEffect } from "react";
import {
  addExpense,
  incrementNotificationCount,
  addExpenseFailure,
} from "../redux/ui-slice";
import { useAppDispatch } from "../redux/hook";
import { toast } from "react-toastify";
import axios from "axios";
import BaseUrl from "../config";
import Cookies from "js-cookie";

const Create = () => {
  const [dataid, setData] = useState<string>("nothing");
  const dispatch = useAppDispatch();
  const categories = [
    "Food",
    "Transportation",
    "Utilities",
    "Entertainment",
    "Others",
    "Groceries",
    "Health & Fitness",
    "Shopping",
    "Travel",
    "Education",
    "Insurance",
    "Rent",
    "Utilities",
    "Gifts",
  ];
  const [category, setCategory] = useState("");
  const [newExpense, setNewExpense] = useState({
    category: "",
    name: "",
    amount: "",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [empty, setEmpty] = useState(false);

  const getUserDetails = async () => {
    try {
      const token = Cookies.get("token");
      const res = await axios.get(`${BaseUrl}/api/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(res.data.data._id);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleAddExpense = async () => {
    if (newExpense.name !== "" && newExpense.amount !== "" && category !== "") {
      const expenseItem = {
        category: category,
        name: newExpense.name,
        amount: newExpense.amount,
      };
      try {
        const response = await axios.post(`${BaseUrl}/api/expenses`, {
          dataid,
          expenseItem,
        });
        dispatch(addExpense(response.data));
      } catch (error: any) {
        dispatch(addExpenseFailure(error.message));
        console.error("Error adding expense:", error);
      }

      dispatch(incrementNotificationCount());
      setNewExpense({ name: "", amount: "", category: "" });
      toast.success("Item added to expense list");
    } else {
      setEmpty(true);
    }
  };

  return (
    <div className="max-w-md p-4 py-6 w-80 h-96 my-8 bg-white border border-green-600 rounded-md">
      <h1 className="text-2xl font-semibold mb-6 text-red-600">Add Expense</h1>

      {/* Custom Dropdown */}
      <div className="relative mb-4">
        <label className="block mb-2 text-gray-600 font-semibold">
          Category
        </label>
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="border border-green-600 rounded px-4 py-2 bg-white cursor-pointer flex justify-between items-center"
        >
          {category || "Select Category"}
          <span className="ml-2">{dropdownOpen ? "▲" : "▼"}</span>
        </div>
        {dropdownOpen && (
          <div className="absolute mt-2 bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto z-10 w-full">
            {categories.map((cat) => (
              <div
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setDropdownOpen(false);
                }}
                className="px-4 py-2 hover:bg-green-100 cursor-pointer"
              >
                {cat}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Fields */}
      <div className="mb-4">
        <label className="block text-gray-600 font-semibold">Expense</label>
        <input
          value={newExpense.name}
          onChange={(e) =>
            setNewExpense({ ...newExpense, name: e.target.value })
          }
          placeholder="e.g rent"
          type="text"
          className="w-full p-2 border border-green-600 rounded outline-none text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 font-semibold">Amount</label>
        <input
          value={newExpense.amount}
          onChange={(e) =>
            setNewExpense({ ...newExpense, amount: e.target.value })
          }
          placeholder="$00.00"
          type="number"
          className="w-full p-2 border border-green-600 rounded outline-none text-black"
        />
      </div>

      {/* Buttons */}
      <button
        onClick={handleAddExpense}
        className="bg-blue-500 text-white py-2 px-4 rounded w-full mb-2"
      >
        Add
      </button>
      {empty && (
        <p className="text-red-600">
          Please fill all inputs and select a category
        </p>
      )}
    </div>
  );
};

export default Create;
