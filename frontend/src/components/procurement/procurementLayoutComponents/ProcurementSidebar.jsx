import React, { useState } from "react";
import {
  FaChartBar,
  FaFileAlt,
  FaUsers,
  FaShoppingCart,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const ProcurementSidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleItemClick = (item) => {
    setActiveItem(item);
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
          <h1 className="text-white text-lg font-medium">Procurement Panel</h1>
        </div>
        <nav className="py-4">
          <ul className="space-y-1 px-2">
            <li
              className={`flex items-center space-x-3 py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                activeItem === "dashboard"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Link
                to="/procurement/dashboard"
                className="flex items-center space-x-3"
                onClick={() => handleItemClick("dashboard")}
              >
                <FaChartBar
                  className={
                    activeItem === "dashboard"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }
                />
                <span className="font-medium">Dashboard</span>
              </Link>
            </li>

            <li
              className={`flex items-center space-x-3 py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                activeItem === "purchase-requests"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Link
                to="/procurement/purchase-requests"
                className="flex items-center space-x-3"
                onClick={() => handleItemClick("purchase-requests")}
              >
                <FaFileAlt
                  className={
                    activeItem === "purchase-requests" ? "text-blue-600" : "text-gray-500"
                  }
                />
                <span className="font-medium">Purchase Requests</span>
              </Link>
            </li>

            <li
              className={`flex items-center space-x-3 py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                activeItem === "vendors"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Link
                to="/procurement/vendors"
                className="flex items-center space-x-3"
                onClick={() => handleItemClick("vendors")}
              >
                <FaUsers
                  className={
                    activeItem === "vendors"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }
                />
                <span className="font-medium">Vendor Management</span>
              </Link>
            </li>

            <li
              className={`flex items-center space-x-3 py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                activeItem === "orders"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Link
                to="/procurement/orders"
                className="flex items-center space-x-3"
                onClick={() => handleItemClick("orders")}
              >
                <FaShoppingCart
                  className={
                    activeItem === "orders"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }
                />
                <span className="font-medium">Purchase Orders</span>
              </Link>
            </li>

            <li
              className={`flex items-center space-x-3 py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                activeItem === "reports"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Link
                to="/procurement/reports"
                className="flex items-center space-x-3"
                onClick={() => handleItemClick("reports")}
              >
                <FaClipboardList
                  className={
                    activeItem === "reports"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }
                />
                <span className="font-medium">Procurement Reports</span>
              </Link>
            </li>

            <li
              className={`flex items-center space-x-3 py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                activeItem === "settings"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Link 
                to="/procurement/settings" 
                className="flex items-center space-x-3"
                onClick={() => handleItemClick("settings")}
              >
                <FaCog
                  className={
                    activeItem === "settings"
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
              onClick={() => {
                // Add your logout logic here
                handleItemClick("logout");
              }}
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

export default ProcurementSidebar;