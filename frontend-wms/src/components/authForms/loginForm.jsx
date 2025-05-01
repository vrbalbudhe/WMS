// frontend-wms\src\components\authForms\loginForm.jsx
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  LogIn,
  User,
  Building,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { refreshLoginContext, setCurrentUser, loading, setLoading } =
    useContext(AuthContext);

  // New state to control whether the modal can be closed
  const [allowClose, setAllowClose] = useState(true);

  // When error is set, don't allow closing
  useEffect(() => {
    if (error) {
      setAllowClose(false);
    } else {
      setAllowClose(true);
    }
  }, [error]);

  // When submitting, don't allow closing
  useEffect(() => {
    if (isSubmitting) {
      setAllowClose(false);
    }
  }, [isSubmitting]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    setAllowClose(false); // Prevent closing during submission
    setLoading(true);

    try {
      // Determine which login endpoint to use based on user type
      const endpoint = isUserLogin
        ? `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`
        : `${import.meta.env.VITE_BACKEND_URL}/api/admin/login`;

      const response = await axios.post(
        endpoint,
        { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        // Get user info from response
        const userData = response.data.user;

        // Store the user data in context
        if (userData) {
          // Ensure userType is available for routing logic
          if (response.data.role === "ADMIN" && !userData.userType) {
            userData.userType = "ADMIN";
          }

          setCurrentUser(userData);
        }

        setAllowClose(true); // Only allow closing on success

        // Close the login modal ONLY on successful login
        setIsLogin(false);

        // Refresh login context
        await refreshLoginContext();

        // Determine redirect path based on user role
        let redirectPath = "/";

        const userType = userData?.userType || response.data.role;

        if (userType === "ADMIN") {
          redirectPath = "/admin/dashboard";
        } else if (userType === "warehouse_manager") {
          redirectPath = "/warehouse/dashboard";
        } else if (userType === "procurement_officer") {
          redirectPath = "/procurement/dashboard";
        }

        navigate(redirectPath);
      } else {
        // Do NOT close the login modal on failure
        setAllowClose(false);
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      // Do NOT close the login modal on failure
      setAllowClose(false);
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  // Safe close function that checks if we're allowed to close
  const safeClose = (e) => {
    if (e) e.stopPropagation();
    if (allowClose && !isSubmitting) {
      setIsLogin(false);
    }
  };

  // Override modal click handlers
  const handleModalContentClick = (e) => {
    e.stopPropagation(); // Prevent clicks from propagating to parent
  };

  return (
    // Fixed the click handler to use our safe close function
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Backdrop - using separate handler for backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={safeClose}
      />

      {/* Modal content */}
      <div
        onClick={handleModalContentClick}
        className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 z-10 p-8 transition-all duration-300 transform"
      >
        {/* Close button */}
        <button
          onClick={safeClose}
          disabled={!allowClose || isSubmitting}
          className={`absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none ${!allowClose || isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <X size={20} />
        </button>

        {/* Login Header with Icon */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Building size={32} className="text-blue-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to access the Warehouse Management System
          </p>
        </div>

        {/* User type toggle */}
        <div className="mb-6">
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setIsUserLogin(false)}
              className={`w-1/2 py-3 px-4 text-sm font-medium rounded-l-md border transition-colors duration-200 ${
                !isUserLogin
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              } ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <div className="flex items-center justify-center">
                <User size={16} className="mr-2" />
                Admin
              </div>
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setIsUserLogin(true)}
              className={`w-1/2 py-3 px-4 text-sm font-medium rounded-r-md border transition-colors duration-200 ${
                isUserLogin
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              } ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              <div className="flex items-center justify-center">
                <User size={16} className="mr-2" />
                User
              </div>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center animate-fadeIn">
            <AlertCircle
              size={20}
              className="mr-3 flex-shrink-0 text-red-500"
            />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                isSubmitting ? "bg-gray-100 cursor-not-allowed" : "bg-white"
              }`}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <a href="#" className="text-xs text-blue-600 hover:text-blue-800">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  isSubmitting ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                }`}
                required
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  togglePasswordVisibility();
                }}
                disabled={isSubmitting}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember me checkbox */}
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              disabled={isSubmitting}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin mr-2" />
                Signing In...
              </>
            ) : (
              <>
                <LogIn size={18} className="mr-2" />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            {isUserLogin
              ? "Contact your administrator if you're having trouble logging in."
              : "Admin access is restricted to authorized personnel only."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
