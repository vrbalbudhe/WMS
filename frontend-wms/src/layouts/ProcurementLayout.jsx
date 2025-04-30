import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/layoutComponents/Navbar";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ProcurementSidebar from "../components/procurement/procurementLayoutComponents/ProcurementSidebar";

export const ProcurementLayout = () => {
  const { currentUser } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // Uncomment to check user role
  // if (!currentUser || currentUser.role !== "procurement_officer")
  //   return <Navigate to="/" />;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <ProcurementSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : ""
        }`}
      >
        <div className="sticky top-0 z-30 w-full">
          <Navbar />
        </div>
        <div className="flex-grow p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProcurementLayout;