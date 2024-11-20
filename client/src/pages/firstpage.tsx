// components/SplashScreen.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import background from '../assets/expensehub-background.jpg'

const FirstPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login"); // Redirect to the login page after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  return (
    <div
      className="w-full absolute inset-0"
     
    >
  <img src={background} className="  w-full h-full object-cover transition-opacity duration-300 bg-black bg-opacity-20" />
   
    
      <div className="inset-0 absolute top-10"><div className="flex flex-row items-center justify-center space-x-2">
        <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-150"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-300"></div>
      </div>
      </div>
    </div>
  );
};

export default FirstPage;
