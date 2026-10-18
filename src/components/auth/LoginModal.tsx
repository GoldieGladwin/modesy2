"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: { email: string; name: string; password?: string }) => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onSuccess,
}: LoginModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSuccess(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccess("Login successful!");
      if (onSuccess) {
        const isVendor =
          email.toLowerCase().includes("trendshop") ||
          email.toLowerCase().includes("vendor");
        const isModerator = email.toLowerCase().includes("moderator");
        const isAdmin = !isVendor && !isModerator && email.toLowerCase().includes("admin");
        onSuccess({
          email,
          password,
          name: isVendor
            ? "Trendshop"
            : isModerator
            ? "Moderator"
            : isAdmin
            ? "Admin"
            : "Member",
        });
      }
      setTimeout(onClose, 800);
    }, 600);
  };

  const handleGoToRegister = () => {
    onClose();
    router.push("/register");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn">
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-[430px] bg-white rounded-md shadow-2xl p-6 sm:p-8 z-10">
        {/* Close button X */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full transition"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Login</h2>

        {/* Connect with Google */}
        <button
          type="button"
          onClick={() => alert("Fitur Login Google")}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded border border-gray-300 shadow-xs transition"
        >
          <svg width="20" height="20" viewBox="0 0 128 128">
            <rect clipRule="evenodd" fill="none" height="128" width="128" />
            <path
              clipRule="evenodd"
              d="M27.585,64c0-4.157,0.69-8.143,1.923-11.881L7.938,35.648 C3.734,44.183,1.366,53.801,1.366,64c0,10.191,2.366,19.802,6.563,28.332l21.558-16.503C28.266,72.108,27.585,68.137,27.585,64"
              fill="#FBBC05"
            />
            <path
              clipRule="evenodd"
              d="M65.457,26.182c9.031,0,17.188,3.2,23.597,8.436L107.698,16 C96.337,6.109,81.771,0,65.457,0C40.129,0,18.361,14.484,7.938,35.648l21.569,16.471C34.477,37.033,48.644,26.182,65.457,26.182"
              fill="#EA4335"
            />
            <path
              clipRule="evenodd"
              d="M65.457,101.818c-16.812,0-30.979-10.851-35.949-25.937 L7.938,92.349C18.361,113.516,40.129,128,65.457,128c15.632,0,30.557-5.551,41.758-15.951L86.741,96.221 C80.964,99.86,73.689,101.818,65.457,101.818"
              fill="#34A853"
            />
            <path
              clipRule="evenodd"
              d="M126.634,64c0-3.782-0.583-7.855-1.457-11.636H65.457v24.727 h34.376c-1.719,8.431-6.397,14.912-13.092,19.13l20.474,15.828C118.981,101.129,126.634,84.861,126.634,64"
              fill="#4285F4"
            />
          </svg>
          <span>Connect with Google</span>
        </button>

        <div className="text-center my-4">
          <span className="text-xs text-gray-500 font-normal">Or login with email</span>
        </div>

        {/* Error / Success messages */}
        {error && (
          <div className="mb-3 p-2.5 rounded bg-red-50 border border-red-200 text-red-600 text-xs">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-3 p-2.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs">
            {success}
          </div>
        )}

        {/* Form fields */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00a99d] focus:ring-1 focus:ring-[#00a99d] transition text-gray-800 placeholder-gray-400"
              required
            />
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00a99d] focus:ring-1 focus:ring-[#00a99d] transition text-gray-800 placeholder-gray-400 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="text-right mt-1.5">
              <Link
                href="/forgot-password"
                onClick={() => onClose()}
                className="text-xs text-[#00a99d] hover:text-[#008f85] font-medium"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-[#00a99d] hover:bg-[#008f85] text-white font-semibold text-sm rounded transition cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Logging in...</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>

        {/* Direct Link to /register */}
        <div className="text-center mt-5 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={handleGoToRegister}
              className="text-[#00a99d] hover:text-[#008f85] font-semibold hover:underline cursor-pointer ml-1"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
