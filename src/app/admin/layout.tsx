"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AdminHeader from "@/components/layout/admin/AdminHeader";
import AdminFooter from "@/components/layout/admin/AdminFooter";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPanel = pathname?.startsWith("/admin/admin-panel");
  const isDashboard = pathname?.startsWith("/admin/dashboard");

  // Jika sedang di dalam Admin Panel atau Dashboard, biarkan layout sidebar-navbar masing-masing yang merender
  if (isAdminPanel || isDashboard) {
    return <>{children}</>;
  }

  // Jika di beranda atau halaman publik admin, gunakan layout header & footer Modesy Admin
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-gray-800">
      <AdminHeader />
      <div className="flex-1 w-full">{children}</div>
      <AdminFooter />
    </div>
  );
}
