import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import BaseUrl from "../config";
import {
  Bell,
  User,
  MoonStars,
  List,
  House,
  Book,
  CurrencyDollar,
  PlusCircle,
  BellRinging,
  X,
  ChatTeardropDots,
} from "phosphor-react";
import Cookies from "js-cookie"
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { resetNotificationCount, setDarkMode } from "../redux/ui-slice";
import axios from "axios";
import Header from "./Header";

const Navbar = () => {
  const { darkMode, notificationCount } = useAppSelector((state) => state.ui);
  const [theme, setTheme] = useState(false);
  const [name, setName] = useState("No name yet");
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isDropdown, setIsDropdown] = useState(false);

  // Function to get the current page name based on pathname
  const getPageName = (path : any) => {
    const routeMap: any = {
      "/": "login",
      "/dashboard": "Dashboard",
      "/notifications": "Notifications",
      "/transactions": "Transactions",
      "/profile": "Profile",
      "/budget": "Budget",
      "/add": "Create",
      "/about": "About",
    };
    return routeMap[path] || "Page";
  };

  // Function to toggle dark mode theme
  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme);
    dispatch(setDarkMode());
  };

  // Function to reset notification count
  const reset = () => {
    dispatch(resetNotificationCount());
  };

  // Function to toggle dropdown
  const dropIt = () => {
    setIsDropdown(!isDropdown);
  };

  // Function to close dropdown
  const raise = () => {
    setIsDropdown(false);
  };

  // Function to get user details
  const getUserDetails = async () => {
    try {
         const token = Cookies.get("token");
      const res = await axios.get(`${BaseUrl}/api/me` , {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });
      setName(res.data.data.username);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <div
        className={`flex flex-row  w-full  lg:gap-8 h-16 fixed sm:gap-8 sm:z-10 lg:z-10 top-0 ${
          darkMode ? "bg-black" : "bg-gray-200"
        }`}
      >
        {isDropdown ? (
          <X
            size={24}
            onClick={raise}
            className={`lg:hidden mt-4 ml-2 ${
              darkMode ? "text-white" : "text-black"
            }`}
          />
        ) : (
          <List
            size={24}
            onClick={dropIt}
            className={`lg:hidden mt-4 ml-2 ${
              darkMode ? "text-white" : "text-black"
            }`}
          />
        )}

        <h1
          className={`lg:text-2xl sm:text-lg font-semibold lg:ml-64 lg:mt-4 sm:mt-3  ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          {getPageName(location.pathname)}
        </h1>

        

        <div className="flex absolute lg:right-20 gap-x-4 pt-2 sm:right-4">
          <Link to="/notifications">
            <Bell
              size={35}
              className="rounded-full p-2 bg-gray-400 mt-2 text-black"
              onClick={reset}
            />
            <span className="absolute top-0 ml-5 mt-2 bg-red-500 rounded-full w-5 h-5 flex justify-center items-center text-white">
              {notificationCount}
            </span>
          </Link>
          <div
            className={`h-12 ${
              darkMode ? "bg-white" : "bg-black"
            } w-[0.2rem] pb-8`}
          ></div>
          <div className="flex flex-row gap-x-2 pt-2">
            <Link to="/profile">
              <User
                size={35}
                className="rounded-full p-2 bg-gray-400 text-black"
              />
            </Link>
            <h1
              className={`${
                darkMode ? "text-white" : "text-black"
              } sm:text-[0.4rem] lg:text-[1.1rem] sm:mt-2 `}
            >
              {name}
            </h1>
          </div>
        </div>
      </div>

      {isDropdown && (
        <div className="lg:hidden sm:fixed flex flex-col mt-16 min-h-screen w-64 bg-gray-100 z-30">
          <div className="ml-12 mb-4">
            <Header />
          </div>
          <Link to="/dashboard">
            <button className="text-[0.8rem] font-bold uppercase flex items-center gap-4 hover:bg-gray-300 cursor-pointer text-green-700 focus:bg-gray-400 ml-2 p-3 w-40">
              <House size={20} /> Dashboard
            </button>
          </Link>
          <Link to="/add">
            <button className="text-[0.8rem] font-bold uppercase flex items-center gap-4 hover:bg-gray-300 cursor-pointer text-green-700 focus:bg-gray-400 p-3 ml-2 w-32">
              <PlusCircle size={20} /> Create
            </button>
          </Link>
          <Link to="/transactions">
            <button className="text-[0.8rem] font-bold uppercase flex items-center gap-4 hover:bg-gray-300 cursor-pointer text-green-700 focus:bg-gray-400 p-3 ml-2 w-40">
              <CurrencyDollar size={20} /> Transactions
            </button>
          </Link>
          <Link to="/notifications">
            <button
              onClick={reset}
              className="text-[0.8rem] font-bold uppercase flex items-center gap-4 hover:bg-gray-300 cursor-pointer text-green-700 focus:bg-gray-400 p-3 ml-2 w-40"
            >
              <BellRinging size={20} /> Notifications
            </button>
          </Link>
         
        </div>
      )}
    </>
  );
};

export default Navbar;
