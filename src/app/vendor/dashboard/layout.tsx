"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import VendorDashboardSidebar from "@/components/vendor/dashboard/VendorDashboardSidebar";
import VendorDashboardNavbar from "@/components/vendor/dashboard/VendorDashboardNavbar";
import { useAuth } from "@/context/AuthContext";

export default function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isInitialized } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auth Guard: If not vendor or admin, redirect to guest
  useEffect(() => {
    if (!isInitialized) return;
    if (!user || (user.role !== "vendor" && user.role !== "admin")) {
      router.replace("/guest");
    }
  }, [user, isInitialized, router]);

  if (!isInitialized || !user || (user.role !== "vendor" && user.role !== "admin")) {
    return (
      <div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#00a99d] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex font-sans text-gray-800 overflow-x-hidden">
      {/* 1. FIXED SIDEBAR (Keeps position on scroll) */}
      <VendorDashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 2. MAIN CONTENT AREA (Offset lg:pl-64 for fixed sidebar) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-300">
        <VendorDashboardNavbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-7">{children}</main>
      </div>
    </div>
  );
}
