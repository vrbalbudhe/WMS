// frontend-wms\src\layouts\ProtectedLayout.jsx
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/layoutComponents/Navbar";
import Footer from "../components/layoutComponents/Footer";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Sidebar from "../components/layoutComponents/Sidebar";
import HomepageSidebar from "../components/homepage/HomepageSidebar";

export const ProtectedLayout = () => {
  const { currentUser, loading } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect users to their appropriate dashboard based on role
    if (currentUser && !loading) {
      const path = getRedirectPathForRole(currentUser.userType);
      if (path && window.location.pathname === "/user") {
        navigate(path);
      }
    }
  }, [currentUser, loading, navigate]);

  const getRedirectPathForRole = (userType) => {
    switch (userType) {
      case "ADMIN":
        return "/admin/dashboard";
      case "warehouse_manager":
        return "/warehouse/dashboard";
      case "procurement_officer":
        return "/procurement/dashboard";
      default:
        return null;
    }
  };

  // If not authenticated, redirect to home page
  if (!currentUser && !loading) {
    return <Navigate to="/" />;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  return (
    <div className="min-h-screen w-full flex bg-white">
      <HomepageSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1">
        <div className="sticky top-0 z-40 w-full">
          <Navbar />
        </div>
        <div className="flex-grow w-full min-h-screen flex justify-center items-start ml-64 p-5">
          <div className="w-[95%] h-full">
            <Outlet />
          </div>
        </div>
        <div className="w-full bg-white">
          <Footer />
        </div>
      </div>
    </div>
  );
};