import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate instead of useRouter
import {
  CurrencyDollar,
  BellRinging,
  Target,
  SignOut,
  House,
 
  PlusCircle,
} from "phosphor-react";
import { resetNotificationCount } from "../redux/ui-slice";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "./Header";
import Cookies from 'js-cookie'
import BaseUrl from "../config";

const Sidebar = () => {
  const navigate = useNavigate(); // Use useNavigate for navigation
  const { darkMode } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const reset = () => {
    dispatch(resetNotificationCount());
  };

  const logout = async () => {
    try {
      await axios.get(`${BaseUrl}/api/logout`);
      Cookies.remove("token"); // Remove token from cookies
      navigate("/login"); // Navigate to the login page
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div
        className={`lg:flex lg:flex-col sm:hidden gap-y-4 pt-4 w-48 z-20 min-h-screen border-r border-gray-400  fixed top-0 ${
          darkMode ? "bg-gray-700" : "bg-white"
        }`}
      >
        <Header />
        <Link to="/dashboard">
          {" "}
          {/* Change href to to in Link components */}
          <button className=" text-[0.8rem] font-bold uppercase flex items-center gap-4 hover:bg-gray-300 cursor-pointer text-green-700 focus:bg-gray-400 ml-2 p-3 w-40">
            <House size={20} /> Dashboard
          </button>
        </Link>
        <Link to="/add">
          <button className=" text-[0.8rem] font-bold uppercase flex items-center gap-2 hover:bg-gray-300 cursor-pointer text-green-700 focus:bg-gray-400 p-3 ml-2 w-32">
            <PlusCircle size={20} />
            Create
          </button>
        </Link>
        <Link to="/transactions">
          <button className=" text-[0.8rem] font-bold uppercase flex items-center gap-2 hover:bg-gray-300 cursor-pointer text-green-700 focus:bg-gray-400 p-3 ml-2 w-40">
            <CurrencyDollar size={20} /> Transactions
          </button>
        </Link>
        <Link to="/notifications">
          <button
            onClick={reset}
            className=" text-[0.8rem] font-bold uppercase flex items-center gap-2 hover:bg-gray-300 cursor-pointer text-green-700 focus:bg-gray-400 p-3 ml-2 w-40"
          >
            <BellRinging size={20} />
            Notifications
          </button>
        </Link>
        
        <Link to="/">
          <button
            onClick={logout}
            className="bg-red-500 text-white mt-24 w-32 p-3 ml-6 rounded-md flex flex-row gap-x-3"
          >
            <SignOut size={20} />
            Logout
          </button>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
