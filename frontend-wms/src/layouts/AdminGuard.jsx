import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const AdminGuard = () => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!currentUser || currentUser.userType !== "ADMIN") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
