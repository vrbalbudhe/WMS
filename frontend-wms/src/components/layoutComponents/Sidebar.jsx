// frontend-wms\src\components\layoutComponents\Sidebar.jsx
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, refreshLoginContext, setLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      console.log("Logging out from sidebar");
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

  // Only show sidebar if user is logged in
  if (!currentUser) return null;

  return (
    <div className="flex">
      {/* Sidebar Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 text-white bg-blue-600 p-2 rounded-full shadow-lg"
      >
        {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-300 z-40`}
      >
        <div className="p-5 font-bold text-lg border-b border-gray-700">
          {currentUser?.name || "My Dashboard"}
        </div>
        <ul className="mt-4 space-y-2">
          <li>
            <Link
              to="/"
              className="flex items-center gap-3 p-3 hover:bg-gray-700 transition"
            >
              <FiHome size={20} />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-3 p-3 hover:bg-gray-700 transition"
            >
              <FiUser size={20} />
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center gap-3 p-3 hover:bg-gray-700 transition"
            >
              <FiSettings size={20} />
              Settings
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 p-3 hover:bg-red-600 transition"
            >
              <FiLogOut size={20} />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
