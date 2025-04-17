import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/layoutComponents/Navbar";
import Footer from "../components/layoutComponents/Footer";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Sidebar from "../components/layoutComponents/Sidebar";
import HomepageSidebar from "../components/homepage/HomepageSidebar";

export const ProtectedLayout = () => {
  const { currentUser } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!currentUser) return <Navigate to="/" />;
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
