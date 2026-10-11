"use client";

import React from "react";
import { Check } from "lucide-react";

export interface RadioOption<T> {
  label: string;
  value: T;
}

interface PreferencesRadioGroupProps<T> {
  label: string;
  subtitle?: string;
  options?: RadioOption<T>[];
  value: T;
  onChange: (val: T) => void;
}

export default function PreferencesRadioGroup<T extends string | boolean>({
  label,
  subtitle,
  options = [
    { label: "Enable", value: true as unknown as T },
    { label: "Disable", value: false as unknown as T },
  ],
  value,
  onChange,
}: PreferencesRadioGroupProps<T>) {
  return (
    <div className="space-y-1.5">
      <div>
        <label className="block text-[13px] font-semibold text-[#555555]">
          {label}
        </label>
        {subtitle && (
          <p className="text-[11px] text-[#888888] mt-0.5">{subtitle}</p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-10 gap-y-2 pt-0.5">
        {options.map((opt, idx) => {
          const isChecked = value === opt.value;
          // For 2-option sets, fix the first option's width so the 2nd option aligns across rows
          const widthClass =
            options.length === 2 && idx === 0
              ? "w-36 sm:w-44 shrink-0"
              : options.length === 3 && idx < 2
              ? "shrink-0 pr-2 sm:pr-4"
              : "shrink-0";

          return (
            <div key={String(opt.value)} className={widthClass}>
              <button
                type="button"
                onClick={() => onChange(opt.value)}
                className="flex items-center gap-2 cursor-pointer text-[13px] text-[#555555] select-none hover:text-[#222] transition-colors text-left"
              >
                {isChecked ? (
                  <div className="w-[17px] h-[17px] rounded-full bg-[#524497] flex items-center justify-center text-white shrink-0 shadow-2xs">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-[17px] h-[17px] rounded-full border-[1.5px] border-[#9ca3af] bg-white shrink-0" />
                )}
                <span className="whitespace-normal sm:whitespace-nowrap">{opt.label}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
