"use client";

import React, { useEffect } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface AuthModalProps {
  isOpen: boolean;
  initialView?: "login" | "register";
  onClose: () => void;
  onSuccess?: (user: { email: string; name: string }) => void;
}

export default function AuthModal({
  isOpen,
  initialView = "login",
  onClose,
  onSuccess,
}: AuthModalProps) {
  const [view, setView] = React.useState<"login" | "register">(initialView);

  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop click listener */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-[450px] bg-white rounded-lg shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Tab switch header */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            type="button"
            onClick={() => setView("login")}
            className={`pb-2.5 px-4 text-sm font-semibold transition-all relative ${
              view === "login"
                ? "text-[#00a99d] border-b-2 border-[#00a99d]"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setView("register")}
            className={`pb-2.5 px-4 text-sm font-semibold transition-all relative ${
              view === "register"
                ? "text-[#00a99d] border-b-2 border-[#00a99d]"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Register
          </button>
        </div>

        {/* Dynamic Form View */}
        {view === "login" ? (
          <LoginForm
            isModal={true}
            onSwitchToRegister={() => setView("register")}
            onSuccess={(user) => {
              if (onSuccess) onSuccess(user);
              setTimeout(onClose, 1200);
            }}
          />
        ) : (
          <RegisterForm
            isModal={true}
            onSwitchToLogin={() => setView("login")}
            onSuccess={(user) => {
              if (onSuccess) onSuccess(user);
              setTimeout(() => setView("login"), 1400);
            }}
          />
        )}
      </div>
    </div>
  );
}
