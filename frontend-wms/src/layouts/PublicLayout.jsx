import { Outlet } from "react-router-dom";
import Navbar from "../components/layoutComponents/Navbar";
import Footer from "../components/layoutComponents/Footer";
import React, { useState } from "react";
import HomepageSidebar from "../components/homepage/HomepageSidebar";

export const PublicLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-white">
      <div className="sticky top-0 z-40 w-full">
        <Navbar />
      </div>
      <div className="w-[100%] h-full">
        <HomepageSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Outlet />
      </div>
    </div>
  );
};
