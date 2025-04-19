// frontend-wms\src\components\layoutComponents\Navbar.jsx
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import LoginForm from "../authForms/loginForm";
import RegisterForm from "../authForms/registerForm";
import PasswordChangeForm from "../authForms/PasswordChangeForm";
import {
  User,
  Bell,
  Settings,
  LogOut,
  Search,
  Menu,
  Warehouse,
  Users
} from "lucide-react";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [error, setError] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const { currentUser, refreshLoginContext, setLoading, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check for user authentication and password change requirement
  useEffect(() => {
    console.log("Current user state:", currentUser);

    // Check if user needs to change password
    if (currentUser?.mustChangePassword) {
      console.log("User needs to change password");
      setIsPasswordChange(true);
    }

    // Mock notifications - replace with real API call
    const mockNotifications = [
      { id: 1, message: "Inventory level low: Item #1234", timestamp: new Date() },
      { id: 2, message: "New purchase order approved", timestamp: new Date(Date.now() - 3600000) }
    ];
    setNotifications(mockNotifications);
  }, [currentUser]);

  // Initial load of user data
  useEffect(() => {
    refreshLoginContext();
  }, []);

  const handleLoginToggle = () => {
    setIsLogin((prev) => !prev);
    if (isRegister) setIsRegister(false);
  };

  const handleRegisterToggle = () => {
    setIsRegister((prev) => !prev);
    if (isLogin) setIsLogin(false);
  };

  const handlePasswordChangeSuccess = () => {
    setIsPasswordChange(false);
    refreshLoginContext();
  };

  const handleLogout = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      if (response?.data?.success) {
        setIsDropdownOpen(false);
        await refreshLoginContext();
        navigate("/");
      } else {
        setError(response?.data?.message || "Logout failed");
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigationToProfile = () => {
    navigate(`/profile`);
    setIsDropdownOpen(false);
  };

  const handleDropdownToggle = (e) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const handleNotificationsToggle = (e) => {
    e.stopPropagation();
    setIsNotificationsOpen((prev) => !prev);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const getUserTypeLabel = (userType) => {
    switch (userType) {
      case "procurement_officer":
        return "Procurement Officer";
      case "warehouse_manager":
        return "Warehouse Manager";
      case "ADMIN":
        return "Administrator";
      default:
        return userType;
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = () => {
      if (isDropdownOpen) setIsDropdownOpen(false);
      if (isNotificationsOpen) setIsNotificationsOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen, isNotificationsOpen]);

  // Determine if user is logged in
  const isLoggedIn = !!currentUser && (currentUser.id || currentUser.email);

  return (
    <>
      <nav className="w-full h-16 bg-white border-b shadow-sm border-gray-200 flex items-center px-4 justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden text-gray-500 hover:text-gray-600"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <Warehouse className="h-5 w-5 text-white" />
            </div>
            <span className="text-gray-800 font-semibold hidden sm:inline-block">
              Warehouse Management System
            </span>
            <span className="text-gray-800 font-semibold sm:hidden">
              WMS
            </span>
          </div>
        </div>

        {isLoggedIn && (
          <div className="flex-1 max-w-xl mx-4 hidden md:block">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search inventory, orders, shipments..."
                className="w-full bg-gray-50 text-gray-800 border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            {/* Users Icon - Only show for admin */}
            {currentUser?.userType === "ADMIN" && (
              <button
                onClick={() => navigate('/admin/user-registration')}
                className="text-gray-500 hover:text-gray-700 relative"
              >
                <Users size={20} />
              </button>
            )}

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={handleNotificationsToggle}
                className="text-gray-500 hover:text-gray-700 relative"
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-20 border border-gray-200"
                >
                  <div className="px-4 py-3 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-6 text-center text-gray-500">
                        <p>No notifications</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100"
                        >
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(notification.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
                      <button className="text-sm text-blue-600 hover:text-blue-800 w-full text-center">
                        View all notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Settings */}
            <button className="text-gray-500 hover:text-gray-700">
              <Settings size={20} />
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={handleDropdownToggle}
                className="flex items-center space-x-2"
              >
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                  {getInitials(currentUser?.name)}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden md:block">
                  {currentUser?.name?.split(' ')[0] || "User"}
                </span>
              </button>

              {isDropdownOpen && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-20 border border-gray-200"
                >
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{currentUser?.name || "User"}</p>
                    <p className="text-xs text-gray-500 mt-1">{currentUser?.email || "No email"}</p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {getUserTypeLabel(currentUser?.userType) || "User"}
                      </span>
                    </div>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={handleNavigationToProfile}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User size={16} className="mr-3 text-gray-500" />
                      Your Profile
                    </button>
                    <button
                      onClick={() => setIsPasswordChange(true)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings size={16} className="mr-3 text-gray-500" />
                      Account Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} className="mr-3 text-red-500" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLoginToggle}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
          </div>
        )}
      </nav>

      {/* Password Change Modal */}
      {isPasswordChange && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-md">
            <PasswordChangeForm onSuccess={handlePasswordChangeSuccess} />
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLogin && <LoginForm setIsLogin={setIsLogin} />}

      {/* Register Modal */}
      {isRegister && <RegisterForm setIsRegister={setIsRegister} />}
    </>
  );
};

export default Navbar;