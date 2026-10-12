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

  // Jika sedang di dalam Admin Panel, biarkan layout sidebar-navbar yang merender
  if (isAdminPanel) {
    return <>{children}</>;
  }

  // Jika di beranda atau halaman toko admin, gunakan layout header & footer Modesy Admin
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-gray-800">
      <AdminHeader />
      <div className="flex-1 w-full">{children}</div>
      <AdminFooter />
    </div>
  );
}
