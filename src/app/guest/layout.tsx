"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import ModesyHeader from "@/components/layout/guest/ModesyHeader";
import ModesyFooter from "@/components/layout/guest/ModesyFooter";
import { useAuth } from "@/context/AuthContext";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isInitialized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isInitialized) return;
    // If authenticated user lands on guest pages, redirect to their role's page
    if (user) {
      if (pathname === "/guest" || pathname === "/guest/") {
        router.replace(`/${user.role}`);
      } else if (pathname === "/guest/cart") {
        router.replace(`/${user.role}/cart`);
      } else if (pathname === "/guest/wishlist") {
        router.replace(`/${user.role}/wishlist`);
      }
    }
  }, [user, isInitialized, pathname, router]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-gray-800">
      <ModesyHeader currentUser={null} />
      <div className="flex-1 w-full">{children}</div>
      <ModesyFooter />
    </div>
  );
}
