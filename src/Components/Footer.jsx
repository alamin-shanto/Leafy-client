import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[var(--primary)] text-[var(--base-100)] relative z-10 backdrop-blur-md border-t border-[var(--border-color)] shadow-[inset_0_4px_10px_rgba(0,0,0,0.2)]">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-center text-center md:text-left">
        {/* Brand/Title */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-[var(--accent)] tracking-tight">
            🌿 Leafy
          </h2>
          <p className="text-sm text-[var(--text)] max-w-xs mx-auto md:mx-0">
            Your smart plant companion. Grow better, live greener.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row justify-center items-center gap-4 text-base font-medium">
          {["/", "/allplants", "/addplants", "/myplants"].map((path, i) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `transition-all duration-300 hover:text-[var(--accent)] ${
                  isActive ? "text-[var(--accent)]" : ""
                }`
              }
            >
              {["Home", "All Plants", "Add Plant", "My Plants"][i]}
            </NavLink>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-end gap-6">
          {[
            {
              href: "https://x.com/mdalamin94402",
              label: "Twitter",
              svg: <path d="M24 4.557c-.883.392-1.832.656-2.828.775..." />,
            },
            {
              href: "https://www.youtube.com/@wisdomsquad8741",
              label: "YouTube",
              svg: <path d="M19.615 3.184c-3.604-.246-11.631-.245..." />,
            },
            {
              href: "https://www.facebook.com/mohammad.alamin.94402/",
              label: "Facebook",
              svg: <path d="M9 8h-3v4h3v12h5v-12h3.642l..." />,
            },
          ].map(({ href, label, svg }, idx) => (
            <a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group hover:text-[var(--accent)] transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="group-hover:scale-110 transition-transform duration-300"
              >
                {svg}
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center py-4 text-sm text-[var(--secondary)] border-t border-[var(--border-color)]">
        &copy; {new Date().getFullYear()} Leafy Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
