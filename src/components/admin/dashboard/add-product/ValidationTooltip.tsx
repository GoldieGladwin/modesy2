"use client";

import React from "react";

interface ValidationTooltipProps {
  message?: string;
  className?: string;
  arrowOffsetPx?: number; // Distance in px from left edge of tooltip box to center of arrow
}

export default function ValidationTooltip({
  message = "Please select one of these options.",
  className = "",
  arrowOffsetPx = 80,
}: ValidationTooltipProps) {
  return (
    <div
      role="alert"
      className={`absolute z-30 select-none animate-in fade-in-50 duration-150 ${className}`}
    >
      <div className="relative inline-flex flex-col">
        {/* Upward pointing arrow with subtle border and white fill */}
        <svg
          className="absolute -top-[9px] z-20 pointer-events-none"
          style={{ left: `${arrowOffsetPx - 9}px` }}
          width="18"
          height="10"
          viewBox="0 0 18 10"
        >
          {/* Triangle outline and fill */}
          <polygon
            points="9,0.5 0.5,9.5 17.5,9.5"
            fill="#ffffff"
            stroke="#888888"
            strokeWidth="1"
          />
          {/* Mask the bottom border line to connect seamlessly with the box */}
          <line
            x1="1"
            y1="9.5"
            x2="17"
            y2="9.5"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
        </svg>

        {/* Tooltip Box (Persis Screenshot) */}
        <div className="bg-white border border-[#888888] rounded-[3px] shadow-[0_3px_10px_rgba(0,0,0,0.22)] px-2.5 py-1.5 flex items-center gap-2 whitespace-nowrap">
          {/* Orange Exclamation Icon */}
          <div className="w-[17px] h-[17px] bg-[#ee4d2d] rounded-[2px] flex items-center justify-center text-white font-bold text-[12px] shrink-0 leading-none shadow-xs">
            !
          </div>

          {/* Message */}
          <span className="text-[13px] text-[#222222] font-normal leading-tight">
            {message}
          </span>
        </div>
      </div>
    </div>
  );
}
