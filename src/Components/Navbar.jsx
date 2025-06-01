import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import AuthContext from "./../Context/AuthContext";

const activeNavLink = ({ isActive }) =>
  `font-bold ${
    isActive
      ? "bg-[var(--info)] text-white shadow"
      : "hover:bg-[var(--neutral)] text-white"
  }`;

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("log out failed", error);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="bg-[var(--primary)] flex justify-center shadow-sm p-5">
      <div className="max-w-[1440px] w-full mx-auto navbar">
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

            {/* Navbar Dropdown Menus For Smaller Devices */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/" className={activeNavLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/allplants" className={activeNavLink}>
                  All Plants
                </NavLink>
              </li>
              <li>
                <NavLink to="/addplants" className={activeNavLink}>
                  Add Plant
                </NavLink>
              </li>
              <li>
                <NavLink to="myplants" className={activeNavLink}>
                  My Plants
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex items-center">
            <img
              src="/Images/logo-transparent.png"
              alt=""
              className="w-20 hidden lg:flex"
            />
            <Link
              to="/"
              className="btn btn-ghost text-2xl lg:text-4xl font-bold"
            >
              Leafy
            </Link>
          </div>
        </div>

        {/* Navbar Menus For larger Devices */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-5 text-lg font-bold">
            <li>
              <NavLink to="/" className={activeNavLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/allplants" className={activeNavLink}>
                All Plants
              </NavLink>
            </li>
            <li>
              <NavLink to="/addplants" className={activeNavLink}>
                Add Plant
              </NavLink>
            </li>
            <li>
              <NavLink to="/myplants" className={activeNavLink}>
                My Plants
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-1 lg:gap-2">
          <button
            onClick={toggleTheme}
            className="btn btn-circle btn-ghost text-[8px] lg:text-xl bg-[var(--secondary)] "
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="avatar tooltip tooltip-left"
                data-tip={user.displayName || "User"}
              >
                <div className="w-10 rounded-full ring ring-blue-400 ring-offset-base-100 ring-offset-2">
                  <img src={user.photoURL} alt="User Avatar" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-blue-400 text-white rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <Link to="profile"> Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Log Out</button>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <div className="text-center flex items-center gap-2">
                <Link
                  to="/login"
                  className="btn bg-[var(--secondary)] p-2 lg:p-5 rounded-2xl text-xs lg:text-base"
                >
                  Login
                </Link>
                <p>/</p>
                <Link
                  to="/register"
                  className="btn bg-[var(--secondary)] p-2 lg:p-5 rounded-2xl text-xs lg:text-base"
                >
                  Signup
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
