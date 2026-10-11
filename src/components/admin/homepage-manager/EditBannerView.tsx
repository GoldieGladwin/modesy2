"use client";

import React, { useState } from "react";
import { AlignJustify, Image as ImageIcon, Check } from "lucide-react";
import { ModesyBannerItem } from "@/types/uliladmin";

interface Props {
  banner: ModesyBannerItem;
  onBack: () => void;
  onSave: (updatedBanner: ModesyBannerItem) => void;
}

export default function EditBannerView({ banner, onBack, onSave }: Props) {
  const [language, setLanguage] = useState(banner.language || "English");
  const [url, setUrl] = useState(banner.url || "");
  const [order, setOrder] = useState(String(banner.order || 1));
  const [width, setWidth] = useState(banner.width?.replace("%", "") || "33,33");
  const [location, setLocation] = useState<
    "Featured Categories" | "Special Offers" | "Featured Products" | "New Arrivals"
  >(
    (banner.location as any) || "New Arrivals"
  );
  const [imageUrl, setImageUrl] = useState(banner.imageUrl || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: ModesyBannerItem = {
      ...banner,
      language,
      url,
      order: Number(order) || 1,
      width: width.includes("%") ? width : `${width}%`,
      location,
      imageUrl,
    };
    onSave(updated);
  };

  const RadioOption = ({
    value,
    label,
  }: {
    value: "Featured Categories" | "Special Offers" | "Featured Products" | "New Arrivals";
    label: string;
  }) => {
    const isChecked = location === value;

    return (
      <label
        onClick={() => setLocation(value)}
        className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-gray-700 py-1"
      >
        <div
          className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-200 ${
            isChecked
              ? "bg-[#5046e5] text-white ring-2 ring-[#5046e5]/20"
              : "border-2 border-gray-300 bg-white hover:border-gray-400"
          }`}
        >
          {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
        </div>
        <span className="font-normal text-gray-800">{label}</span>
      </label>
    );
  };

  return (
    <div className="space-y-4 animate-form-view">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-normal text-gray-700">Edit Banner</h1>
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 bg-[#008f5a] hover:bg-[#007a4d] text-white text-xs font-medium rounded-xs transition inline-flex items-center gap-2 shadow-none cursor-pointer active:scale-95"
        >
          <AlignJustify className="w-3.5 h-3.5 stroke-[2.5]" />
          Homepage Manager
        </button>
      </div>

      {/* Main Form Card */}
      <div className="bg-white border border-gray-200 rounded-xs p-6 shadow-none">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* 1. Language */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full border border-gray-300 rounded-xs px-3 py-2 text-xs text-gray-700 bg-white focus:outline-none focus:border-[#0084ff] transition"
            >
              <option value="English">English</option>
              <option value="Indonesian">Indonesian</option>
              <option value="Spanish">Spanish</option>
            </select>
          </div>

          {/* 2. Banner URL */}
          <div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full border border-gray-300 rounded-xs px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#0084ff] transition"
            />
          </div>

          {/* 3. Order */}
          <div>
            <input
              type="text"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              placeholder="Order"
              className="w-full border border-gray-300 rounded-xs px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#0084ff] transition"
            />
          </div>

          {/* 4. Banner Width + % addon */}
          <div className="flex">
            <input
              type="text"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="33,33"
              className="flex-1 border border-r-0 border-gray-300 rounded-l-xs px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#0084ff] transition"
            />
            <span className="border border-gray-300 bg-gray-50 px-4 py-2 text-gray-500 font-medium text-xs rounded-r-xs flex items-center justify-center select-none">
              %
            </span>
          </div>

          {/* 5. Location */}
          <div className="pt-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Location{" "}
              <span className="text-[11px] font-normal text-gray-400">
                (The banner will be added under the selected section)
              </span>
            </label>
            <div className="space-y-1">
              <RadioOption
                value="Featured Categories"
                label="Featured Categories"
              />
              <RadioOption
                value="Special Offers"
                label="Special Offers"
              />
              <RadioOption
                value="Featured Products"
                label="Featured Products"
              />
              <RadioOption
                value="New Arrivals"
                label="New Arrivals"
              />
            </div>
          </div>

          {/* 6. Banner Preview & File Picker */}
          <div className="pt-2">
            <label className="block font-semibold text-gray-700 mb-2">
              Banner
            </label>
            <div className="max-w-md w-full bg-gray-50 rounded-xs border border-gray-200 overflow-hidden mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Banner Preview"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>

            <label className="inline-flex items-center gap-2 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xs cursor-pointer transition active:scale-95 shadow-none">
              <ImageIcon className="w-3.5 h-3.5 text-gray-500" />
              <span>Select Image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    const blobUrl = URL.createObjectURL(file);
                    setImageUrl(blobUrl);
                  }
                }}
              />
            </label>
          </div>

          {/* 7. Save Changes Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-[#0084ff] hover:bg-[#0073e6] text-white font-medium rounded-xs transition shadow-none cursor-pointer active:scale-95"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
