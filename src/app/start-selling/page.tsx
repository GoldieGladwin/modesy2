"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function StartSellingRedirectPage() {
  const router = useRouter();
  const { user, isInitialized } = useAuth();

  useEffect(() => {
    if (!isInitialized) return;
    if (user?.role === "vendor") {
      router.replace("/vendor");
    } else if (user?.role === "member") {
      router.replace("/member/start-selling");
    } else if (user?.role === "admin") {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/guest/start-selling");
    }
  }, [user, isInitialized, router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-[#00a99d] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
