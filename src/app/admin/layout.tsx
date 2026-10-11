<<<<<<< HEAD
'use client';

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#ecf0f5] flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <main className="flex-1 p-5 md:p-6 bg-[#ecf0f5] overflow-y-auto">
          {children}
        </main>
      </div>
=======
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
>>>>>>> c655ecfdb4356cc568d1e0b5019776b3e7d94317
    </div>
  );
}
