"use client";

import React, { useState } from "react";
import Link from "next/link";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import LoginModal from "@/components/auth/LoginModal";

export default function ForgotPasswordPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-2 w-full">
        <nav className="text-xs text-gray-500 flex items-center gap-1.5">
          <Link href="/guest" className="hover:text-[#00a99d] transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Reset Password</span>
        </nav>
      </div>

      {/* Main Content Form */}
      <main className="max-w-md w-full mx-auto px-4 py-8 sm:py-12 flex-1 flex flex-col justify-center">
        <ForgotPasswordForm />
      </main>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
        }}
      />
    </div>
  );
}
