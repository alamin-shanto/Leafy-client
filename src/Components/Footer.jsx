import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link as ScrollLink } from "react-scroll"; // ✅ import this

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white py-12 px-6 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-green-400 mb-4">PlantCare</h2>
          <p className="text-sm text-gray-300 mb-4">
            Your green companion for plant care. Discover tips, track your
            plants, and grow a better indoor jungle.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-300">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="/" className="hover:text-green-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#allplants" className="hover:text-green-400 transition">
                All Plants
              </a>
            </li>
            <li>
              <a href="#addplants" className="hover:text-green-400 transition">
                Add Plant
              </a>
            </li>
            <li>
              <a href="#myplants" className="hover:text-green-400 transition">
                My Plants
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-300">
            Resources
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <ScrollLink
                to="recent-plants"
                smooth={true}
                duration={600}
                offset={-70}
                className="hover:text-green-400 transition cursor-pointer"
              >
                Recent Plants
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="beginner-plants"
                smooth={true}
                duration={600}
                offset={-70}
                className="hover:text-green-400 transition cursor-pointer"
              >
                Beginner Friendly Plants
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="top-mistakes"
                smooth={true}
                duration={600}
                offset={-70}
                className="hover:text-green-400 transition cursor-pointer"
              >
                Top Mistakes
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to="leafy"
                smooth={true}
                duration={600}
                offset={-70}
                className="hover:text-green-400 transition cursor-pointer"
              >
                Leafy
              </ScrollLink>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-green-300">
            Follow Us
          </h3>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 p-2 rounded-full hover:bg-green-500 transition"
            >
              <Facebook className="text-white" size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 p-2 rounded-full hover:bg-blue-400 transition"
            >
              <Twitter className="text-white" size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-500 p-2 rounded-full hover:bg-pink-400 transition"
            >
              <Instagram className="text-white" size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 p-2 rounded-full hover:bg-blue-600 transition"
            >
              <Linkedin className="text-white" size={20} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 p-2 rounded-full hover:bg-red-500 transition"
            >
              <Youtube className="text-white" size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-400 border-t border-gray-700 pt-6">
        &copy; {new Date().getFullYear()} PlantCare. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
