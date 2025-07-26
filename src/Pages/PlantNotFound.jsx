import React from "react";
import { Link } from "react-router-dom";

const PlantNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-100 text-center p-4 sm:p-6">
      <div className="text-5xl sm:text-6xl md:text-8xl mb-4 sm:mb-6">🌵😕</div>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 mb-2 sm:mb-3">
        No such plant found!
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-green-700 max-w-xs sm:max-w-md mb-5 sm:mb-6 px-2">
        We searched the garden high and low, but couldn’t find the plant you
        were looking for. Maybe it hasn’t sprouted yet?
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4">
        <Link
          to="/plants"
          className="bg-green-600 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-full font-semibold hover:bg-green-700 transition text-sm sm:text-base"
        >
          🌿 Browse All Plants
        </Link>
        <Link
          to="/"
          className="bg-white border-2 border-green-600 text-green-700 px-5 py-2 sm:px-6 sm:py-3 rounded-full font-semibold hover:bg-green-50 transition text-sm sm:text-base"
        >
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PlantNotFound;
