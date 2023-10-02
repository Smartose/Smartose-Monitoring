import React, { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { app } from "../config/firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faFileAlt,
  faCog,
  faSignOutAlt,
  faStethoscope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const auth = getAuth(app);
  const router = useRouter();
  const displayName = auth.currentUser
    ? auth.currentUser.displayName?.split(" ").slice(0, 3).join(" ") || ""
    : "Guest";

  const [greeting, setGreeting] = useState<string>("");
  const currentTime = new Date().getHours();

  useEffect(() => {
    if (currentTime >= 5 && currentTime < 12) {
      setGreeting("Good Morning");
    } else if (currentTime >= 12 && currentTime < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, [currentTime]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        router.push("/login");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <div
      className={`sidebar md:w-1/4 p-1 bg-gray-800 font-montserrat text-white ${
        isOpen ? "block" : "hidden md:block"
      }`}
    >
      {" "}
      <div className="py-6 px-4">
        <h1 className="text-2xl font-bold mb-4 text-center text-white hover:text-blue-500 transition-all duration-300">
          Smartose Monitoring Page
        </h1>
        <div className="flex items-center space-x-2">
          {auth.currentUser && auth.currentUser.photoURL ? (
            <img
              src={auth.currentUser.photoURL}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-400"></div>
          )}
          <h2 className="text-base font-bold">{displayName} </h2>
        </div>

        <div className="mt-6">
          <ul className="space-y-2">
            <li>
              <p className="text-gray-400 text-sm mb-2">{greeting}</p>
            </li>
            <li>
              <a href="#dashboard" className="menu-item block">
                <FontAwesomeIcon icon={faChartBar} className="mr-2" />
                Dashboard
              </a>
            </li>
            <li>
              <a href="#profile" className="menu-item block">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Profile
              </a>
            </li>
            <li>
              <a href="#reports" className="menu-item block">
                <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                Reports
              </a>
            </li>
            <li>
              <a href="#consultation" className="menu-item block">
                <FontAwesomeIcon icon={faStethoscope} className="mr-2" />
                Consultation
              </a>
            </li>
            <li>
              <a href="#settings" className="menu-item block">
                <FontAwesomeIcon icon={faCog} className="mr-2" />
                Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="py-4 px-4 mt-20">
        <button
          className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 hover:shadow-lg transform hover:scale-105 transition-transform font-montserrat"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
