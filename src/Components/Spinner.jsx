import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-green-600 border-b-green-400 border-l-transparent border-r-transparent rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-green-700 font-bold text-xl">
          🌿
        </div>
      </div>
    </div>
  );
};

export default Spinner;
