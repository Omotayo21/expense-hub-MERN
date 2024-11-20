
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import BaseUrl from "../config";

export default function VerifyEmailPage() {
  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  

  const verifyUserEmail = async () => {
    try {
      await axios.post(`${BaseUrl}/api/verify`, { token });
      setVerified(true);
    } catch (error : any) {
      setError(true);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl">verify email</h1>
        <h2 className="sm:text-sm">{token ? `${token}` : "no token"}</h2>

        {verified && (
          <div className="mt-4">
            <h2 className="lg:text-2xl sm:text-lg">Verified Sucessfully</h2>
            <Link to="/login">
              <button className="bg-green-600 w-64 mt-12 text-white font-semibold p-2 rounded-md">
                Login
              </button>
            </Link>
          </div>
        )}
        {error && (
          <div>
            <h2 className="text-2xl text-red-800">Error</h2>
          </div>
        )}
      </div>
    </>
  );
}
