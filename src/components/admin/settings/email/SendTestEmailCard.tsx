"use client";

import React, { useState } from "react";

interface SendTestEmailCardProps {
  onSendTestEmail: (email: string) => void;
}

export default function SendTestEmailCard({
  onSendTestEmail,
}: SendTestEmailCardProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onSendTestEmail(email.trim());
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5 space-y-4"
    >
      <div>
        <h2 className="text-sm font-bold text-gray-800 pb-1">
          Send Test Email
        </h2>
        <p className="text-[11px] text-gray-500 pb-2 border-b border-gray-100">
          Send a test email to check if your mail server is working.
        </p>
      </div>

      <div className="space-y-1 text-xs">
        <label className="block font-semibold text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
        />
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          className="bg-[#007bff] hover:bg-[#0069d9] text-white text-xs font-semibold px-4 py-2 rounded-[3px] shadow-xs transition cursor-pointer"
        >
          Send Email
        </button>
      </div>
    </form>
  );
}
