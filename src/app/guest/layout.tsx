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
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If authenticated user lands on the guest homepage, redirect to their role's landing page
    if (pathname === "/guest") {
      if (user?.role === "admin") {
        router.replace("/admin");
      } else if (user?.role === "vendor") {
        router.replace("/vendor");
      } else if (user?.role === "moderator") {
        router.replace("/moderator");
      } else if (user?.role === "member") {
        router.replace("/member");
      }
    }
  }, [user, pathname, router]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-gray-800">
      <ModesyHeader currentUser={null} />
      <div className="flex-1 w-full">{children}</div>
      <ModesyFooter />
    </div>
  );
}
