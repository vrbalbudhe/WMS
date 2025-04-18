import React, { useState } from "react";
import {
  FaChartBar,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [selected, setSelected] = useState("dashboard");

  const onSelect = (item) => {
    setSelected(item);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleSidebar}
        className="fixed z-30 top-4 left-4 p-3 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors duration-200 lg:hidden"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-xl z-20 transition-all duration-300 ease-in-out ${
          isOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full w-0 lg:w-64 lg:translate-x-0"
        }`}
      >
        <div className="h-16 bg-blue-600 flex items-center px-6">
          <h1 className="text-white text-lg font-medium">Admin Panel</h1>
        </div>
        <nav className="py-4">
          <ul className="space-y-1 px-2">
            <li
              className={`flex items-center space-x-3 py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                selected === "dashboard"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Link to="/dashboard" className="flex items-center space-x-3">
                <FaChartBar
                  className={
                    selected === "dashboard"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }
                />
                <span className="font-medium">Dashboard</span>
              </Link>
            </li>
            

            <li
              className={`flex items-center space-x-3 py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                selected === "assets"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Link to="/assets-deals" className="flex items-center space-x-3">
                <FaUser
                  className={
                    selected === "assets"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }
                />
                <span className="font-medium">Assets Deals</span>
              </Link>
            </li>

            <li
              className={`flex items-center space-x-3 py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                selected === "settings"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Link to="/settings" className="flex items-center space-x-3">
                <FaCog
                  className={
                    selected === "settings"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }
                />
                <span className="font-medium">Settings</span>
              </Link>
            </li>
          </ul>

          <div className="absolute bottom-8 w-full px-2">
            <div className="border-t border-gray-200 pt-4 mx-4 mb-2"></div>
            <div
              className="flex items-center space-x-3 py-3 px-4 mx-2 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => onSelect("logout")}
            >
              <FaSignOutAlt className="text-gray-500" />
              <span className="font-medium">Logout</span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
