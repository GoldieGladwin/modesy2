"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated as admin or moderator, automatically redirect to admin panel
  useEffect(() => {
    if (user?.role === "admin") {
      router.push("/admin");
    } else if (user?.role === "moderator") {
      router.push("/moderator");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const isModerator = email.toLowerCase().includes("moderator");
      const res = await login({
        email: email.trim(),
        password: password.trim(),
        role: isModerator ? "moderator" : "admin",
      });

      if (res && res.error && !res.success) {
        setError(res.error);
        setIsLoading(false);
        return;
      }

      const role = res?.user?.role || (isModerator ? "moderator" : "admin");
      if (role === "admin") {
        router.push("/admin");
      } else if (role === "moderator") {
        router.push("/moderator");
      } else {
        router.push("/admin");
      }
    } catch (err: any) {
      setError(err?.message || "Login failed.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#d2d6de] flex flex-col items-center justify-center font-sans antialiased text-[#333] px-4 py-8">
      <div className="w-full max-w-[360px] mx-auto">
        {/* Modesy Panel Logo */}
        <div className="text-center mb-[20px]">
          <Link
            href="/admin/login"
            className="text-[35px] font-light text-[#333] hover:text-[#333] transition-none"
          >
            <b className="font-bold">Modesy</b>&nbsp;Panel
          </Link>
        </div>

        {/* Login Box Body */}
        <div className="bg-white p-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] text-[#666]">
          <h4 className="text-[14px] text-center font-normal m-0 pb-[20px] text-[#666]">
            Login
          </h4>

          {error && (
            <div className="bg-[#f8d7da] border border-[#f5c6cb] text-[#721c24] text-[13px] p-[10px] rounded-[2px] mb-[15px]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-[15px]">
            {/* Email Field with Envelope Glyphicon */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full h-[34px] px-[12px] pr-[35px] text-[14px] text-[#555] bg-white border border-[#ccc] rounded-none shadow-[inset_0_1px_1px_rgba(0,0,0,0.075)] focus:border-[#3c8dbc] focus:outline-none transition-none"
              />
              <span className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[#777] pointer-events-none">
                <Mail className="w-[14px] h-[14px]" />
              </span>
            </div>

            {/* Password Field with Lock Glyphicon */}
            <div className="relative">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full h-[34px] px-[12px] pr-[35px] text-[14px] text-[#555] bg-white border border-[#ccc] rounded-none shadow-[inset_0_1px_1px_rgba(0,0,0,0.075)] focus:border-[#3c8dbc] focus:outline-none transition-none"
              />
              <span className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[#777] pointer-events-none">
                <Lock className="w-[14px] h-[14px]" />
              </span>
            </div>

            {/* Submit Button Row (Matches AdminLTE layout) */}
            <div className="flex items-center justify-end pt-[5px]">
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#3c8dbc] hover:bg-[#367fa9] text-white text-[14px] font-normal px-[15px] py-[6px] border border-[#367fa9] rounded-none cursor-pointer disabled:opacity-75 transition-none"
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Go to the Homepage Link */}
        <div className="text-center mt-[15px]">
          <Link
            href="/"
            className="text-[14px] text-[#444] hover:text-[#222] hover:underline"
          >
            Go to the Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
