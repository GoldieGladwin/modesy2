"use client";

import React from "react";
import { Check } from "lucide-react";

interface CustomRadioProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export default function CustomRadio({
  label,
  value,
  checked,
  onChange,
}: CustomRadioProps) {
  return (
    <label
      onClick={() => onChange(value)}
      className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#333] hover:text-black transition-colors"
    >
      <div
        className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
          checked
            ? "bg-[#605ca8] text-white shadow-2xs"
            : "border border-[#bbb] bg-white hover:border-[#888]"
        }`}
      >
        {checked && <Check className="w-2.5 h-2.5 stroke-[3.5]" />}
      </div>
      <span>{label}</span>
    </label>
  );
}
