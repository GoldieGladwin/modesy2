"use client";

import React from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
}

export default function ToggleSwitch({
  checked,
  onChange,
  label,
  id,
}: ToggleSwitchProps) {
  return (
    <label
      htmlFor={id}
      className="inline-flex items-center gap-3 cursor-pointer select-none"
    >
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        {/* Track */}
        <div
          className={`w-10 h-5 rounded-full transition-colors duration-200 ease-in-out ${
            checked ? "bg-[#00a99d]" : "bg-[#d2d6de]"
          }`}
        />
        {/* Knob */}
        <div
          className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full shadow-xs transition-transform duration-200 ease-in-out ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
      {label && <span className="text-xs text-gray-700">{label}</span>}
    </label>
  );
}
