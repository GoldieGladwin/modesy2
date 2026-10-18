"use client";

import React, { useState } from "react";

interface ForgotPasswordFormProps {
  onSuccess?: (email: string) => void;
}

export default function ForgotPasswordForm({ onSuccess }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!isCaptchaVerified) {
      setError("Verification is required.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccess("We have sent password reset instructions to your email address.");
      if (onSuccess) onSuccess(email);
    }, 1000);
  };

  return (
    <div className="w-full max-w-[440px] mx-auto font-sans">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center mb-2">
        Reset Password
      </h1>

      {/* Subtitle */}
      <p className="text-sm text-gray-500 text-center mb-6">
        Enter your email address
      </p>

      {/* Error or Success notification */}
      {error && (
        <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-600 text-xs">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs">
          {success}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Email Address"
            maxLength={255}
            required
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00a99d] focus:ring-1 focus:ring-[#00a99d] transition text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Cloudflare Turnstile Box */}
        <div className="py-1 flex justify-center">
          <div
            onClick={() => setIsCaptchaVerified(!isCaptchaVerified)}
            className="w-full max-w-[280px] bg-white border border-gray-300 rounded-md p-3 flex items-center justify-between shadow-2xs cursor-pointer select-none"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-800">Success!</span>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5 text-[#f6821f]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                </svg>
                <span className="text-[11px] font-black tracking-tight text-gray-900">CLOUDFLARE</span>
              </div>
              <span className="text-[9px] text-gray-400">Privacy • Help</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-[#00a99d] hover:bg-[#008f85] text-white font-semibold text-sm sm:text-base rounded transition shadow-xs disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Submitting...</span>
            </>
          ) : (
            <span>Submit</span>
          )}
        </button>
      </form>
    </div>
  );
}
