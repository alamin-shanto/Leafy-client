import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "plantcare"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "plantcare" ? "plantcareDark" : "plantcare"));
  };
  return (
    <div className="navbar bg-primary shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/allplants">All Plants</NavLink>
            </li>
            <li>
              <NavLink to="/addplants">Add Plant</NavLink>
            </li>
            <li>
              <NavLink to="myplants">My Plants</NavLink>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Leafy</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/allplants">All Plants</NavLink>
          </li>
          <li>
            <NavLink to="/addplants">Add Plant</NavLink>
          </li>
          <li>
            <NavLink to="myplants">My Plants</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="btn btn-circle btn-ghost text-xl"
          aria-label="Toggle Theme"
        >
          {theme === "plantcare" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <a className="btn">Button</a>
      </div>
    </div>
  );
};

export default Navbar;
