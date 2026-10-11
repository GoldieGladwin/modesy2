import React from "react";

export default function ModesyLogo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Modesy Cart/Shop Icon */}
      <div className="w-8 h-8 rounded-lg bg-[#00a99d] flex items-center justify-center text-white shadow-sm">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </div>
      <span className="font-extrabold text-2xl tracking-tight text-gray-900">
        mode<span className="text-[#00a99d]">sy</span>
      </span>
    </div>
  );
}
