import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import logo from "../images/logo.png"; // Adjust the path based on your project structure

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleFiturClick = () => {
    router.push("/fitur");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-900 to-blue-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white">
          <span className="font-bold text-2xl sm:text-3xl lg:text-4xl">
            Smartose
          </span>
        </div>
        <div className="flex items-center space-x-4 lg:space-x-6">
          <button
            className="text-white border-b-2 border-transparent hover:border-white"
            onClick={handleLoginClick}
          >
            Login
          </button>
          <button
            className="text-white border-b-2 border-transparent hover:border-white"
            onClick={handleFiturClick}
          >
            Articles
          </button>
          <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={toggleDropdown}
              className="text-white border-b-2 border-transparent hover:border-white"
              id="dropdown-menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              More
            </button>

            {isDropdownOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-32 sm:w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="dropdown-menu-button"
              >
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    /* Add the click functionality */
                  }}
                  role="menuitem"
                >
                  About Us
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    /* Add the click functionality */
                  }}
                  role="menuitem"
                >
                  Help
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
              <Image
                src={logo}
                alt="Smartose"
                width={120}
                height={120}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
