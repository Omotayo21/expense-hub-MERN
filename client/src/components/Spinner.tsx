import React from "react";
//@ts-ignore
import rolling from "../assets/rolling.svg";


const Spinner = () => {
  return (
    <div>
      <img src={rolling} className="text-blue-700" alt="spinner"  />
    </div>
  );
};

export default Spinner;
