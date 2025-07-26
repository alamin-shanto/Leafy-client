// components/SubSpinner.jsx
import React from "react";

const SubSpinner = () => {
  return (
    <div className="flex justify-center items-center py-6">
      <div className="relative w-10 h-10">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-green-500 border-b-green-300 border-l-transparent border-r-transparent rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-green-600 text-lg">
          🌱
        </div>
      </div>
    </div>
  );
};

export default SubSpinner;
