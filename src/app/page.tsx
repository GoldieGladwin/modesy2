"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RootPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === "admin") {
      router.replace("/admin");
    } else if (user?.role === "vendor") {
      router.replace("/vendor");
    } else if (user?.role === "moderator") {
      router.replace("/moderator");
    } else if (user?.role === "member") {
      router.replace("/member");
    } else {
      router.replace("/guest");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-[#00a99d] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
