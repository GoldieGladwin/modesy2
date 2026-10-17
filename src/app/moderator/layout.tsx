"use client";

import React from "react";
import { usePathname } from "next/navigation";
import ModeratorHeader from "@/components/layout/moderator/ModeratorHeader";
import ModeratorFooter from "@/components/layout/moderator/ModeratorFooter";

export default function ModeratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isModeratorAdminPanel = pathname?.startsWith("/moderator/admin-panel");
  const isModeratorPanel = pathname?.startsWith("/moderator/moderator-panel");
  const isDashboard = pathname?.startsWith("/moderator/dashboard");

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
