import React, { useEffect, useState } from "react";
import { UserCircle, SignOut } from "phosphor-react";
//@ts-ignore
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BaseUrl from "../config";

interface UserData {
  _id: string;
  username: string;
  email: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<string>("nothing");
  const [name, setName] = useState<string>("No name yet");
  const [email, setEmail] = useState<string>("no mail yet");

  const getUserDetails = async () => {
    try {
      const token = Cookies.get("token"); // Retrieve token from cookies
      if (!token) {
        throw new Error("No token found");
      }

      const res = await axios.get<{ data: UserData }>(`${BaseUrl}/api/me`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });

      setData(res.data.data._id);
      setName(res.data.data.username);
      setEmail(res.data.data.email);
    } catch (error: any) {
      console.error(error.message || "An error occurred");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const logout = async () => {
    try {
      await axios.get(`${BaseUrl}/api/logout`);
      Cookies.remove("token"); // Remove token from cookies
      navigate("/login"); // Navigate to the login page
    } catch (error: any) {
      console.error(error.message || "An error occurred");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 mt-4">
      <h2 className="font-bold text-lg ">My Account</h2>
      <div className="flex flex-col items-center justify-center gap-y-4 w-64 h-40 ">
        <UserCircle size={50} className="" />{" "}
        <h2 className="font-semibold ">{name}</h2>
      </div>

      <div className="rounded-md lg:w-96 sm:w-[22rem] h-64 text-black flex flex-col gap-y-4 bg-gray-100 pb-8 pl-4 ">
        <h2 className="border-b border-green-600 text-green-600 pt-4 font-semibold">
          Profile Information
        </h2>
        <div className="flex flex-row gap-x-2">
          <label className="text-[1rem] font-semibold">Display Name : </label>
          <p>{name}</p>
        </div>
        <div className="flex flex-row gap-x-2">
          {" "}
          <label className="text-[1rem] font-semibold">Email Adress : </label>
          <p>{email}</p>
        </div>
        <div className="flex flex-row gap-x-2">
          {" "}
          <label className="text-[1rem] font-semibold">User Id : </label>
          <p>{data}</p>
        </div>
      </div>
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
  );
};

export default Profile;
