import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Sun, Moon, X } from "lucide-react";
import AuthContext from "../Context/AuthContext";

const activeNavLink = ({ isActive }) =>
  `block px-4 py-3 rounded-md text-lg font-semibold transition ${
    isActive
      ? "bg-[var(--accent)] text-[var(--base-100)] shadow-lg"
      : "hover:bg-[var(--secondary)] hover:text-[var(--neutral)] text-white"
  }`;

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const handleLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-[var(--primary)] text-white shadow-md sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/Images/logo-transparent.png"
            alt="Leafy Logo"
            className="w-10 h-10 hidden lg:block object-contain"
          />
          <Link
            to="/"
            className="text-2xl font-bold hover:text-[var(--accent)] transition-colors"
          >
            Leafy
          </Link>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex gap-6 text-lg">
          {["/", "/allplants", "/addplants", "/myplants"].map((path, idx) => (
            <li key={path}>
              <NavLink to={path} className={activeNavLink}>
                {["Home", "All Plants", "Add Plant", "My Plants"][idx]}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-[var(--primary)] border-2 border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--neutral)] transition-all duration-300 flex items-center justify-center"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon size={20} className="m-0 p-0" />
            ) : (
              <Sun size={20} className="m-0 p-0" />
            )}
          </button>

          {/* Auth Desktop */}
          <div className="hidden lg:flex">
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="avatar tooltip tooltip-left cursor-pointer"
                  data-tip={user.displayName || "User"}
                >
                  <div className="w-10 rounded-full ring ring-[var(--accent)] ring-offset-base-100 ring-offset-2">
                    <img src={user.photoURL} alt="User Avatar" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow-md bg-[var(--secondary)] text-[var(--neutral)] rounded-xl w-48 mt-2 z-50"
                >
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Log Out</button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn ml-2">
                  Login
                </Link>
                <Link to="/register" className="btn ml-2">
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-60 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          <aside className="fixed top-0 right-0 h-full w-72 bg-[var(--secondary)] backdrop-blur-md shadow-2xl z-50 flex flex-col rounded-l-xl transition-transform">
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                className="text-white hover:text-[var(--accent)]"
              >
                <X size={24} />
              </button>
            </div>

            {/* User Info */}
            {user && (
              <div className="flex items-center gap-3 p-4 border-b border-white/20">
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full ring ring-[var(--accent)]"
                />
                <div>
                  <p className="font-semibold">{user.displayName}</p>
                  <p className="text-sm text-[var(--neutral)]">{user.email}</p>
                </div>
              </div>
            )}

            {/* Nav Links */}
            <nav className="flex flex-col p-4 gap-3 text-lg text-white">
              {[
                { name: "Home", path: "/" },
                { name: "All Plants", path: "/allplants" },
                { name: "Add Plant", path: "/addplants" },
                { name: "My Plants", path: "/myplants" },
              ].map(({ name, path }) => (
                <NavLink
                  to={path}
                  key={path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={activeNavLink}
                >
                  {name}
                </NavLink>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="p-4 mt-auto">
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full rounded-md bg-red-600 hover:bg-red-700 py-3 font-semibold transition"
                >
                  Log Out
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block mb-3 rounded-md bg-[var(--accent)] py-3 text-center font-semibold hover:bg-blue-700 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-md bg-[var(--accent)] py-3 text-center font-semibold hover:bg-blue-700 transition"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>

            {/* Theme Toggle */}
            <div className="p-4 flex justify-center border-t border-white/20">
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full bg-[var(--primary)] border-2 border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--neutral)] transition-all duration-300 flex items-center justify-center"
                title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Moon size={20} className="m-0 p-0" />
                ) : (
                  <Sun size={20} className="m-0 p-0" />
                )}
              </button>
            </div>
          </aside>
        </>
      )}
    </nav>
  );
};

export default Navbar;
