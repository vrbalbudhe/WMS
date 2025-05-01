// frontend-wms\src\contexts\AuthContext.jsx (updated)
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { RefreshCw } from "lucide-react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshLoginContext = async () => {
    await fetchUser();
  };

  const fetchUser = async () => {
    try {
      console.log("Fetching user data...");

      // First, check if the token is valid
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/isToken`,
        {
          withCredentials: true,
        }
      );

      console.log("Token verification response:", response.data);

      if (response?.data?.success && response?.data?.payload) {
        const userInfo = response?.data?.payload;
        let userData;

        try {
          if (userInfo.role === "ADMIN") {
            // Fetch admin details
            console.log("Fetching admin details...");
            const adminResponse = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/api/admin/fetch/${userInfo?.email}`
            );

            console.log("Admin data response:", adminResponse.data);

            userData = {
              ...adminResponse?.data?.userInfo,
              userType: "ADMIN", // Ensure userType is set for admins
            };
          } else {
            // Fetch regular user details including warehouse info
            console.log("Fetching user details...");
            const userResponse = await axios.get(
              `${import.meta.env.VITE_BACKEND_URL}/api/user/${userInfo?.email}`,
              { withCredentials: true }
            );

            console.log("User data response:", userResponse.data);

            userData = userResponse?.data?.userInfo;
          }

          console.log("Setting user data:", userData);
          setCurrentUser(userData);
        } catch (userDetailsError) {
          console.error("Error fetching user details:", userDetailsError);
          // Even if details fetch fails, we know the user is authenticated
          setCurrentUser({
            id: userInfo.id,
            email: userInfo.email,
            userType: userInfo.role,
            warehouseId: userInfo.warehouseId,
            // Basic info from token
          });
        }
      } else {
        console.log("Token verification failed or no payload");
        setCurrentUser(null);
      }
    } catch (error) {
      // Handle 401 errors gracefully - just means not logged in
      if (error.response && error.response.status === 401) {
        console.log("Not authenticated (401)");
      } else {
        console.error("Auth context error:", error);
      }
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-white">
        <RefreshCw className="h-10 w-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // Context value with all necessary user info and functions
  const contextValue = {
    currentUser,
    setCurrentUser,
    fetchUser,
    setLoading,
    loading,
    refreshLoginContext,
    isAdmin: currentUser?.userType === "ADMIN",
    isProcurementOfficer: currentUser?.userType === "procurement_officer",
    isWarehouseManager: currentUser?.userType === "warehouse_manager",
    warehouseId: currentUser?.warehouseId,
    warehouseName: currentUser?.warehouse?.name,
    mustChangePassword: currentUser?.mustChangePassword || false,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
