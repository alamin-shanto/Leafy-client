import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center px-4 py-10">
      <h1 className="text-7xl md:text-9xl font-extrabold text-green-700">
        404
      </h1>
      <p className="mt-4 text-2xl md:text-3xl font-semibold text-green-800">
        Oops! Page not found 🌿
      </p>
      <p className="mt-2 text-lg md:text-xl text-green-600 max-w-md">
        Seems like this plant has withered away or never existed. Let’s bring
        you back to greener grounds.
      </p>
      <div className="mt-8">
        <Link
          to="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300"
        >
          🌱 Go Back Home
        </Link>
      </div>
      <div className="mt-10 text-4xl">🪴🌾🌱🫛</div>
    </div>
  );
};

export default NotFound;
