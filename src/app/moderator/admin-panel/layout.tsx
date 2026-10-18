"use client";

import ModeratorPanelNavbar from "@/components/moderator/ModeratorPanelNavbar";
import ModeratorPanelSidebar from "@/components/moderator/ModeratorPanelSidebar";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ModeratorPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Guard: if user is not moderator/admin or explicitly logged out, redirect to admin login
  useEffect(() => {
    const isExplicitLogout =
      typeof window !== "undefined" &&
      sessionStorage.getItem("modesy_explicit_logout") === "true";
    if (
      isExplicitLogout ||
      (user && user.role !== "moderator" && user.role !== "admin")
    ) {
      router.push("/admin/login");
    }
  }, [user, router]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] font-sans text-gray-800 flex overflow-x-hidden">
      {/* 1. SIDEBAR (Matching Image 2) */}
      <ModeratorPanelSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Mobile Backdrop */}
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
        {/* HEADER / NAVBAR (Matching Image 1 top bar) */}
        <ModeratorPanelNavbar onToggleSidebar={toggleSidebar} />

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7">
          {children}
        </main>

        {/* FOOTER */}
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
