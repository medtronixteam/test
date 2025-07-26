"use client";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { useState } from "react";

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => setSidebarOpen(!isSidebarOpen);
  const handleSidebarClose = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen overflow-hidden  text-white bg-[url('/dashboard/dashboardBg.png')] bg-[length:100%_100%]  bg-no-repeat ">
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />

      <div className="flex flex-col flex-1">
        <Header
          onSidebarToggle={handleSidebarToggle}
          onClose={handleSidebarClose}
          isSidebarOpen={isSidebarOpen}
        />
        <main className="flex-1  overflow-y-auto p-4 ">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
