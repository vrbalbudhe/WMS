// Path: frontend-wms\src\components\admin\adminLayoutComponents\Sidebar.jsx
import React, { useState, useContext } from "react";
import {
  FaChartBar,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaWarehouse,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const { refreshLoginContext, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleLogout = async () => {
    try {
      console.log("Logging out from admin sidebar");
      setLoading(true);
      
      const response = await axios.post(
        "http://localhost:8000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      console.log("Logout response:", response.data);
      
      // Even if the response has an error, we'll still clear local state
      await refreshLoginContext();
      
      // Navigate to home page
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
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
                activeItem === "dashboard"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Link
                to="/admin/dashboard"
                className="flex items-center space-x-3"
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

            {/* Add Warehouse Management Link */}
            <li
              className={`flex items-center space-x-3 py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                activeItem === "warehouses"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Link
                to="/admin/warehouses"
                className="flex items-center space-x-3"
                onClick={() => handleItemClick("warehouses")}
              >
                <FaWarehouse
                  className={
                    activeItem === "warehouses"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }
                />
                <span className="font-medium">Warehouses</span>
              </Link>
            </li>

            <li
              className={`flex items-center space-x-3 py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                activeItem === "users"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Link
                to="/admin/create-users"
                className="flex items-center space-x-3"
                onClick={() => handleItemClick("users")}
              >
                <FaUser
                  className={
                    activeItem === "users" ? "text-blue-600" : "text-gray-500"
                  }
                />
                <FaUser
                  className={
                    activeItem === "users" ? "text-blue-600" : "text-gray-500"
                  }
                />
                <span className="font-medium">Create Users</span>
              </Link>
            </li>

            <li
              className={`flex items-center space-x-3 py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                activeItem === "procurement-officers"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Link
                to="/admin/procurement-officers"
                className="flex items-center space-x-3"
                onClick={() => handleItemClick("procurement-officers")}
              >
                <FaUser
                  className={
                    activeItem === "procurement-officers"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }
                />
                <span className="font-medium">Procurement Officers</span>
              </Link>
            </li>

            <li
              className={`flex items-center space-x-3 py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                activeItem === "warehouse-officers"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Link
                to="/admin/warehouse-officers"
                className="flex items-center space-x-3"
                onClick={() => handleItemClick("warehouse-officers")}
              >
                <FaUser
                  className={
                    activeItem === "warehouse-officers"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }
                />
                <span className="font-medium">Warehouse Officers</span>
              </Link>
            </li>

            {/* Add Warehouse Settings Link */}
            <li
              className={`flex items-center space-x-3 py-3 px-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                activeItem === "warehouse-settings"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Link
                to="/admin/warehouse-settings"
                className="flex items-center space-x-3"
                onClick={() => handleItemClick("warehouse-settings")}
              >
                <FaCog
                  className={
                    activeItem === "warehouse-settings"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }
                />
                <span className="font-medium">Warehouse Settings</span>
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
                to="/admin/settings"
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
              className="flex items-center space-x-3 py-3 px-4 mx-2 rounded-lg cursor-pointer text-red-500 hover:bg-red-50 transition-colors duration-200"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="text-red-500" />
              <span className="font-medium">Logout</span>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;