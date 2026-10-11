"use client";

import React, { useState } from "react";

interface GoogleAdsenseCardProps {
  initialCode?: string;
  onSave: (code: string) => void;
}

export default function GoogleAdsenseCard({
  initialCode = "",
  onSave,
}: GoogleAdsenseCardProps) {
  const [adsenseCode, setAdsenseCode] = useState(initialCode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(adsenseCode);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5 space-y-3"
    >
      <h3 className="text-xs font-bold text-gray-800">
        Google Adsense Code{" "}
        <span className="font-normal text-gray-500">
          (This code will be added to the head of the page)
        </span>
      </h3>

      <textarea
        rows={5}
        placeholder="Google Adsense Code"
        value={adsenseCode}
        onChange={(e) => setAdsenseCode(e.target.value)}
        className="w-full bg-white border border-gray-300 rounded-[3px] p-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d] transition resize-y font-mono"
      />

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="bg-[#007bff] hover:bg-[#0069d9] text-white text-xs font-semibold px-4 py-1.5 rounded-[3px] shadow-xs transition cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
