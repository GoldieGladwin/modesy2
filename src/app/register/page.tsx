"use client";

import React, { useState } from "react";
import Link from "next/link";
import ModesyHeader from "@/components/layout/header/ModesyHeader";
import ModesyFooter from "@/components/layout/footer/ModesyFooter";
import RegisterForm from "@/components/auth/RegisterForm";
import LoginModal from "@/components/auth/LoginModal";

export default function RegisterPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string } | null>(null);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-800">
      {/* Header with Login Modal trigger and Register direct link */}
      <ModesyHeader
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
      />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-2 w-full">
        <nav className="text-xs text-gray-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#00a99d] transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Register</span>
        </nav>
      </div>

      {/* Main Register Form - Seamless White Background */}
      <main className="max-w-md w-full mx-auto px-4 py-8 sm:py-12 flex-1 flex flex-col justify-center">
        <RegisterForm
          onOpenLoginModal={() => setIsLoginModalOpen(true)}
          onSuccess={(user) => {
            setCurrentUser(user);
          }}
        />
      </main>

      {/* Directly below Register is the Modesy Footer */}
      <ModesyFooter />

      {/* Modal khusus Login */}
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
