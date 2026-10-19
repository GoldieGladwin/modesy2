"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminHeader from "@/components/layout/admin/AdminHeader";
import AdminFooter from "@/components/layout/admin/AdminFooter";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isInitialized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isAdminPanel = pathname?.startsWith("/admin/admin-panel");
  const isDashboard = pathname?.startsWith("/admin/dashboard");

  // Auth Guard: If not admin (or moderator in admin-panel), redirect immediately to /admin/login
  useEffect(() => {
    if (!isInitialized) return;
    const isExplicitLogout =
      typeof window !== "undefined" &&
      sessionStorage.getItem("modesy_explicit_logout") === "true";

    const isAllowed =
      user && (user.role === "admin" || (isAdminPanel && user.role === "moderator"));

    if (isExplicitLogout || !isAllowed) {
      router.replace("/admin/login");
    }
  }, [user, isInitialized, isAdminPanel, router]);

  // While checking auth or if not authorized, do not render AdminHeader or admin content
  if (
    !isInitialized ||
    !user ||
    (user.role !== "admin" && !(isAdminPanel && user.role === "moderator"))
  ) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#00a99d] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
