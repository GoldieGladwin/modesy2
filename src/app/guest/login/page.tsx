"use client";

import React, { useState } from "react";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import LoginModal from "@/components/auth/LoginModal";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-2 w-full">
        <nav className="text-xs text-gray-500 flex items-center gap-1.5">
          <Link href="/guest" className="hover:text-[#00a99d]">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Login</span>
        </nav>
      </div>

      <main className="max-w-md w-full mx-auto px-4 py-8 sm:py-12 flex-1 flex flex-col justify-center">
        <LoginForm
          onSwitchToRegister={() => router.push("/guest/register")}
          onSuccess={(user) => {
            setCurrentUser(user);
            setTimeout(() => router.push("/guest"), 1000);
          }}
        />
      </main>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
          setTimeout(() => router.push("/guest"), 1000);
        }}
      />
    </div>
  );
}
