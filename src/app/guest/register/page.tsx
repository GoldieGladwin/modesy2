"use client";

import React from "react";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { openLoginModal, login } = useAuth();

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-2 w-full">
        <nav className="text-xs text-gray-500 flex items-center gap-1.5">
          <Link href="/guest" className="hover:text-[#00a99d]">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Register</span>
        </nav>
      </div>

      {/* Main Register Form */}
      <main className="max-w-md w-full mx-auto px-4 py-8 sm:py-12 flex-1 flex flex-col justify-center">
        <RegisterForm
          onOpenLoginModal={openLoginModal}
          onSuccess={async (user) => {
            const res = await login(user);
            const role = res?.user?.role || "member";
            setTimeout(() => router.push(`/${role}`), 800);
          }}
        />
      </main>
    </div>
  );
}
