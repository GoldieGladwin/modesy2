"use client";

import AdminPanelNavbar from "@/components/admin/AdminPanelNavbar";
import AdminPanelSidebar from "@/components/admin/AdminPanelSidebar";
import React, { useState } from "react";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // State untuk mengontrol buka/tutup sidebar (default true / terbuka di desktop)
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] font-sans text-gray-800 flex overflow-x-hidden">
      {/* 1. SIDEBAR */}
      <AdminPanelSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Backdrop for mobile devices when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 2. MAIN CONTENT WRAPPER */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "lg:pl-64" : "lg:pl-0"
        }`}
      >
        {/* HEADER / NAVBAR */}
        <AdminPanelNavbar onToggleSidebar={toggleSidebar} />

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7">
          {children}
        </main>

        {/* FOOTER (Exact copy from Modesy photo) */}
        <footer className="bg-white border-t border-gray-200 px-6 py-3.5 text-xs text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
          <div>
            Copyright 2025 <strong>Modesy</strong> - All Rights Reserved.
          </div>
          <div className="text-gray-500 font-medium">
            Version <strong>2.7</strong>
          </div>
        </footer>
      </div>
    </div>
  );
}

