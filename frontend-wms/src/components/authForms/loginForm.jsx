// frontend-wms\src\components\authForms\loginForm.jsx
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const { refreshLoginContext, setCurrentUser, loading, setLoading } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      console.log("Attempting to login as:", isUserLogin ? "User" : "Admin");
      console.log("Login data:", { email, password });
      
      // Determine which login endpoint to use based on user type
      const endpoint = isUserLogin 
        ? "http://localhost:8000/api/auth/login" 
        : "http://localhost:8000/api/admin/login";
      
      const response = await axios.post(
        endpoint,
        { email, password },
        { withCredentials: true }
      );
      
      console.log("Login response:", response.data);

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
        
        // Close the login modal
        setIsLogin(false);
        
        // Refresh login context
        await refreshLoginContext();
        
        // Determine redirect path based on user role
        let redirectPath = "/";
        
        const userType = userData?.userType || response.data.role;
        console.log("User type for redirection:", userType);
        
        if (userType === "ADMIN") {
          redirectPath = "/admin/dashboard";
        } else if (userType === "warehouse_manager") {
          redirectPath = "/warehouse/dashboard";
        } else if (userType === "procurement_officer") {
          redirectPath = "/procurement/dashboard";
        }
        
        console.log("Redirecting to:", redirectPath);
        navigate(redirectPath);
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      console.error("Error response:", err.response?.data);
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => setIsLogin(false)}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 z-10 p-6"
      >
        <div className="text-left mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Login</h2>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to access the Warehouse Management System
          </p>
        </div>

        {/* User type toggle */}
        <div className="mb-6">
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => setIsUserLogin(false)}
              className={`w-1/2 py-2 px-4 text-sm font-medium rounded-l-md border ${
                !isUserLogin
                  ? "bg-blue-50 text-blue-700 border-blue-300"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => setIsUserLogin(true)}
              className={`w-1/2 py-2 px-4 text-sm font-medium rounded-r-md border ${
                isUserLogin
                  ? "bg-blue-50 text-blue-700 border-blue-300"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              User
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center">
            <AlertCircle size={18} className="mr-2" />
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        
        <div className="mt-4 text-center text-sm text-gray-500">
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