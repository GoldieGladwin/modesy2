"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

interface RegisterFormProps {
  onOpenLoginModal?: () => void;
  onSwitchToLogin?: () => void;
  onSuccess?: (user: { email: string; name: string; password?: string }) => void;
  isModal?: boolean;
}

export default function RegisterForm({
  onOpenLoginModal,
  onSwitchToLogin,
  onSuccess,
  isModal,
}: RegisterFormProps) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: true,
  });

  const [isCaptchaVerified, setIsCaptchaVerified] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("The password confirmation does not match.");
      return;
    }

    if (!formData.agreeTerms) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }

    if (!isCaptchaVerified) {
      setError("Verification is required.");
      return;
    }

    setIsLoading(true);

    try {
      await register({
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        password: formData.password,
        role: "member",
      });
      setIsLoading(false);
      setSuccess("Account created successfully!");
      if (onSuccess) {
        onSuccess({
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          password: formData.password,
        });
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-[440px] mx-auto font-sans">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center mb-6">
        Register
      </h1>

      {/* Connect with Google Button */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => alert("Fitur Login Google")}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium rounded border border-gray-300 shadow-xs transition cursor-pointer"
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

        <div className="text-center my-3.5">
          <span className="text-xs sm:text-sm text-gray-500 font-normal">
            Or register with email
          </span>
        </div>
      </div>

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

      {/* Inputs Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            maxLength={255}
            required
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00a99d] focus:ring-1 focus:ring-[#00a99d] transition text-gray-800 placeholder-gray-400"
          />
        </div>

        <div>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            maxLength={255}
            required
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00a99d] focus:ring-1 focus:ring-[#00a99d] transition text-gray-800 placeholder-gray-400"
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            maxLength={255}
            required
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00a99d] focus:ring-1 focus:ring-[#00a99d] transition text-gray-800 placeholder-gray-400"
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            minLength={4}
            maxLength={255}
            required
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00a99d] focus:ring-1 focus:ring-[#00a99d] transition text-gray-800 placeholder-gray-400"
          />
        </div>

        <div>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            maxLength={255}
            required
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:border-[#00a99d] focus:ring-1 focus:ring-[#00a99d] transition text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Terms Checkbox */}
        <div className="pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm text-gray-700 select-none">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-300 text-[#00a99d] focus:ring-[#00a99d] accent-[#00a99d] cursor-pointer"
              required
            />
            <span>
              I have read and agree to the{" "}
              <a
                href="#terms"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Terms & Conditions");
                }}
                className="font-semibold text-gray-900 underline hover:text-[#00a99d]"
              >
                Terms &amp; Conditions
              </a>
            </span>
          </label>
        </div>

        {/* Cloudflare Turnstile Box */}
        <div className="py-2 flex justify-center">
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
                {/* Cloudflare icon */}
                <svg className="w-5 h-5 text-[#f6821f]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                </svg>
                <span className="text-[11px] font-black tracking-tight text-gray-900">CLOUDFLARE</span>
              </div>
              <span className="text-[9px] text-gray-400">Privacy • Help</span>
            </div>
          </div>
        </div>

        {/* Register Button */}
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
              <span>Creating account...</span>
            </>
          ) : (
            <span>Register</span>
          )}
        </button>

        {/* Have an account? Login */}
        <div className="text-center pt-3">
          <p className="text-xs sm:text-sm text-gray-600">
            Have an account?{" "}
            <button
              type="button"
              onClick={() => {
                if (onOpenLoginModal) onOpenLoginModal();
                else if (onSwitchToLogin) onSwitchToLogin();
              }}
              className="text-[#00a99d] hover:text-[#008f85] font-semibold hover:underline cursor-pointer ml-1"
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
