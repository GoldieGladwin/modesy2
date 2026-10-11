"use client";

import React from "react";
import { Check } from "lucide-react";

interface CustomRadioProps {
  name: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export default function CustomRadio({
  name,
  label,
  value,
  checked,
  onChange,
}: CustomRadioProps) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-[#444] font-normal group">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <div
        className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-all ${
          checked
            ? "bg-[#605ca8] border border-[#605ca8]"
            : "border border-[#c2c5c9] bg-white group-hover:border-[#999]"
        }`}
      >
        {checked && <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />}
      </div>
      <span>{label}</span>
    </label>
  );
}
