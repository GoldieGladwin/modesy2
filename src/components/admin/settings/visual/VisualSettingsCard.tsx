"use client";

import React, { useState } from "react";
import { VisualConfig } from "./types";

interface VisualSettingsCardProps {
  initialConfig?: VisualConfig;
  onSave: (config: VisualConfig) => void;
}

export default function VisualSettingsCard({
  initialConfig = {
    color: "#00a99d",
    logoWidth: 160,
    logoHeight: 60,
  },
  onSave,
}: VisualSettingsCardProps) {
  const [color, setColor] = useState(initialConfig.color);
  const [logoWidth, setLogoWidth] = useState(initialConfig.logoWidth);
  const [logoHeight, setLogoHeight] = useState(initialConfig.logoHeight);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoEmailPreview, setLogoEmailPreview] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      color,
      logoWidth,
      logoHeight,
      logoUrl: logoPreview || undefined,
      logoEmailUrl: logoEmailPreview || undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5 flex flex-col justify-between h-full space-y-5"
    >
      <div>
        <h2 className="text-sm font-bold text-gray-800 pb-2 border-b border-gray-100 mb-4">
          Visual Settings
        </h2>

        <div className="space-y-4 text-xs">
          {/* Color */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Color
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="flex-1 bg-white border border-gray-300 rounded-l-[3px] px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
              />
              <div
                className="w-10 h-[34px] rounded-r-[3px] border-y border-r border-gray-300 flex items-center justify-center shrink-0 cursor-pointer"
                style={{ backgroundColor: color }}
              >
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="opacity-0 w-full h-full cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Logo */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Logo
            </label>
            <div className="py-2">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="max-h-12 object-contain"
                />
              ) : (
                <div className="flex items-center text-3xl font-extrabold tracking-tight select-none">
                  <span className="text-[#2b3445]">M</span>
                  <span className="text-[#00a99d]">o</span>
                  <span className="text-[#2b3445]">desy</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <label className="inline-flex items-center bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] cursor-pointer shadow-xs transition">
                <span>Select Logo</span>
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.gif,.svg"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setLogoPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
              <span className="text-[11px] text-gray-500">
                (.png, .jpg, .jpeg, .gif, .svg)
              </span>
            </div>
          </div>

          {/* Logo Email */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Logo Email
            </label>
            <div className="py-2">
              {logoEmailPreview ? (
                <img
                  src={logoEmailPreview}
                  alt="Email Logo Preview"
                  className="max-h-12 object-contain"
                />
              ) : (
                <div className="flex items-center text-3xl font-extrabold tracking-tight select-none">
                  <span className="text-[#2b3445]">M</span>
                  <span className="text-[#00a99d]">o</span>
                  <span className="text-[#2b3445]">desy</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <label className="inline-flex items-center bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] cursor-pointer shadow-xs transition">
                <span>Select Logo</span>
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setLogoEmailPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
              <span className="text-[11px] text-gray-500">
                (.png, .jpg, .jpeg)
              </span>
            </div>
          </div>

          {/* Logo Size */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Logo Size
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] text-gray-600 mb-1">
                  Width (px)
                </label>
                <input
                  type="number"
                  value={logoWidth}
                  onChange={(e) => setLogoWidth(Number(e.target.value))}
                  className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-gray-600 mb-1">
                  Height (px)
                </label>
                <input
                  type="number"
                  value={logoHeight}
                  onChange={(e) => setLogoHeight(Number(e.target.value))}
                  className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                />
              </div>
            </div>
          </div>
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
