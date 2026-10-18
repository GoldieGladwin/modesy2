"use client";

import React, { useEffect } from "react";
import VendorHeader from "@/components/layout/vendor/VendorHeader";
import VendorFooter from "@/components/layout/vendor/VendorFooter";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const VENDOR_USER = {
  name: "Trendshop",
  email: "trendshop@gmail.com",
  role: "vendor" as const,
  avatar: "/assets/img/trendshop-avatar.jpg",
};

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, login } = useAuth();
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/vendor/dashboard");

  useEffect(() => {
    // If user is already authenticated as vendor or admin, preserve their active session
    if (user?.role === "vendor" || user?.role === "admin") {
      return;
    }

    // In demo mode, only fallback if no user is authenticated and has not explicitly logged out
    const isExplicitLogout = typeof window !== "undefined" && sessionStorage.getItem("modesy_explicit_logout") === "true";
    if (!user && !isExplicitLogout) {
      login(VENDOR_USER);
    }
  }, [user, login]);

  // If in dashboard, or storefront vendor pages (which have their own full public layout), let the page handle its layout to avoid duplicate headers
  if (
    isDashboard ||
    pathname?.startsWith("/vendor/profile") ||
    pathname?.startsWith("/vendor/cart") ||
    pathname?.startsWith("/vendor/wishlist") ||
    pathname?.startsWith("/vendor/wallet") ||
    pathname?.startsWith("/vendor/orders") ||
    pathname?.startsWith("/vendor/my-coupons") ||
    pathname?.startsWith("/vendor/messages") ||
    pathname?.startsWith("/vendor/profile-settings")
  ) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-gray-800">
      <VendorHeader currentUser={user?.role === "vendor" ? user : VENDOR_USER} />
      <div className="flex-1 w-full">{children}</div>
      <VendorFooter />
    </div>
  );
}
