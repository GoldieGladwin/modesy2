"use client";

import React, { useState } from "react";

interface GoogleLoginCardProps {
  initialClientId?: string;
  initialClientSecret?: string;
  onSave: (clientId: string, clientSecret: string) => void;
}

export default function GoogleLoginCard({
  initialClientId = "•••••",
  initialClientSecret = "•••••",
  onSave,
}: GoogleLoginCardProps) {
  const [clientId, setClientId] = useState(initialClientId);
  const [clientSecret, setClientSecret] = useState(initialClientSecret);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(clientId, clientSecret);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-6 space-y-5 max-w-xl"
    >
      <h2 className="text-sm font-bold text-gray-800 pb-2 border-b border-gray-100">
        Google Login
      </h2>

      <div className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-gray-700 mb-1.5">
            Client ID
          </label>
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            placeholder="Client ID"
            className="w-full bg-white border border-gray-300 rounded-[3px] px-3.5 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1.5">
            Client Secret
          </label>
          <input
            type="password"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
            placeholder="Client Secret"
            className="w-full bg-white border border-gray-300 rounded-[3px] px-3.5 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
          />
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          className="bg-[#007bff] hover:bg-[#0069d9] text-white text-xs font-semibold px-4 py-2 rounded-[3px] shadow-xs transition cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
