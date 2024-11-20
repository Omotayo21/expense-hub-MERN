import React, { useState, useEffect } from "react";
import axios from "axios";
import BaseUrl from "../config";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// Define the structure of the revenue object
interface Revenue {
  _id: string;
  name: string;
  amount: number;
}

// Define the props for the component
interface EditRevenueFormProps {
  revenue: Revenue;
  onClose: () => void;
  onSave: (updatedRevenue: Revenue) => void;
}

const EditRevenueForm: React.FC<EditRevenueFormProps> = ({
  revenue,
  onClose,
  onSave,
}) => {
  const [dataid, setData] = useState<string>("nothing");
  const [updatedRevenue, setUpdatedRevenue] = useState<Revenue>(revenue);

  const getUserDetails = async () => {
    try {
      const token = Cookies.get("token"); // Retrieve token from cookies
      if (!token) {
        throw new Error("Token not found");
      }
      const res = await axios.get<{ data: { _id: string } }>(
        `${BaseUrl}/api/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );
      setData(res.data.data._id);
    } catch (error: any) {
      console.error("Error fetching user details:", error.message || error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedRevenue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`${BaseUrl}/api/revenues/${revenue._id}`, {
        dataid,
        updatedRevenue,
      });
      onSave(updatedRevenue);
      onClose();
      toast.success("Revenue updated successfully");
    } catch (error: any) {
      console.error("Error updating revenue:", error.message || error);
      toast.error("Failed to update revenue");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Revenue</h2>
        <label className="block mb-2">Title</label>
        <input
          type="text"
          name="name"
          value={updatedRevenue.name}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
        <label className="block mb-2">Amount</label>
        <input
          type="number"
          name="amount"
          value={updatedRevenue.amount}
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

export default EditRevenueForm;
