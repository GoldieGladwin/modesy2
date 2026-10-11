"use client";

import React from "react";
import { Eye, EyeOff } from "lucide-react";

interface PagesVisibilityBadgeProps {
  isVisible: boolean;
  onToggle?: () => void;
}

export default function PagesVisibilityBadge({
  isVisible,
  onToggle,
}: PagesVisibilityBadgeProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      title={isVisible ? "Visible" : "Hidden"}
      className={`w-6 h-6 rounded-[2px] inline-flex items-center justify-center text-white transition-colors cursor-pointer ${
        isVisible ? "bg-[#00a65a] hover:bg-[#008d4c]" : "bg-[#dd4b39] hover:bg-[#c9302c]"
      }`}
    >
      {isVisible ? (
        <Eye className="w-3.5 h-3.5" />
      ) : (
        <EyeOff className="w-3.5 h-3.5" />
      )}
    </button>
  );
}
