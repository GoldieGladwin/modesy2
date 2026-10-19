"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import ModeratorHeader from "@/components/layout/moderator/ModeratorHeader";
import ModeratorFooter from "@/components/layout/moderator/ModeratorFooter";
import { useAuth } from "@/context/AuthContext";

export default function ModeratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isInitialized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isModeratorAdminPanel = pathname?.startsWith("/moderator/admin-panel");
  const isModeratorPanel = pathname?.startsWith("/moderator/moderator-panel");
  const isDashboard = pathname?.startsWith("/moderator/dashboard");

  // Auth Guard: If not moderator or admin, redirect to admin login
  useEffect(() => {
    if (!isInitialized) return;
    const isExplicitLogout =
      typeof window !== "undefined" &&
      sessionStorage.getItem("modesy_explicit_logout") === "true";

    const isAllowed = user && (user.role === "moderator" || user.role === "admin");

    if (isExplicitLogout || !isAllowed) {
      router.replace("/admin/login");
    }
  }, [user, isInitialized, router]);

  // While checking auth or if not authorized, do not render content
  if (!isInitialized || !user || (user.role !== "moderator" && user.role !== "admin")) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#00a99d] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Jika sedang di dalam Moderator Admin Panel, Moderator Panel, atau Dashboard, biarkan layout sidebar-navbar masing-masing yang merender
  if (isModeratorAdminPanel || isModeratorPanel || isDashboard) {
    return <>{children}</>;
  }

  // Jika di beranda atau halaman publik moderator, gunakan layout header & footer Modesy Moderator
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-800">
      <ModeratorHeader />
      <div className="flex-1 w-full">{children}</div>
      <ModeratorFooter />
    </div>
  );
}
