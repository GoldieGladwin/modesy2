"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { ShopSettingsData } from "./types";
import { initialShopSettings } from "./mockData";

interface ShopSettingsCardProps {
  onSuccess?: (msg: string) => void;
}

export default function ShopSettingsCard({ onSuccess }: ShopSettingsCardProps) {
  const [formData, setFormData] = useState<ShopSettingsData>(initialShopSettings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSuccess) {
      onSuccess("Shop settings have been saved successfully!");
    }
  };

  return (
    <div className="bg-white border border-[#ebebeb] rounded-[4px] p-6 shadow-xs font-sans">
      <h2 className="text-[16px] font-bold text-[#2d3748] mb-5">Shop Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Shop Name */}
        <div>
          <label className="block text-xs font-semibold text-[#333e48] mb-1.5">
            Shop Name
          </label>
          <input
            type="text"
            value={formData.shopName}
            onChange={(e) =>
              setFormData({ ...formData, shopName: e.target.value })
            }
            className="w-full px-3 py-2 text-xs border border-[#d1d5db] rounded-[4px] focus:outline-none focus:border-[#00a99d] text-[#333e48]"
            placeholder="Shop Name"
          />
        </div>

        {/* Shop Description */}
        <div>
          <label className="block text-xs font-semibold text-[#333e48] mb-1.5">
            Shop Description
          </label>
          <textarea
            rows={4}
            value={formData.shopDescription}
            onChange={(e) =>
              setFormData({ ...formData, shopDescription: e.target.value })
            }
            className="w-full px-3 py-2 text-xs border border-[#d1d5db] rounded-[4px] focus:outline-none focus:border-[#00a99d] text-[#333e48] resize-y leading-relaxed"
            placeholder="Shop Description"
          />
        </div>

        {/* Show WhatsApp Button */}
        <div>
          <label className="block text-xs font-semibold text-[#333e48] mb-2">
            Show WhatsApp Button
          </label>
          <div className="flex items-center gap-8">
            {/* Yes */}
            <div
              onClick={() => setFormData({ ...formData, showWhatsApp: true })}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                  formData.showWhatsApp
                    ? "bg-[#00a99d] text-white"
                    : "border border-[#d1d5db] bg-white"
                }`}
              >
                {formData.showWhatsApp && (
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                )}
              </div>
              <span className="text-xs font-semibold text-[#333e48]">Yes</span>
            </div>

            {/* No */}
            <div
              onClick={() => setFormData({ ...formData, showWhatsApp: false })}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                  !formData.showWhatsApp
                    ? "bg-[#00a99d] text-white"
                    : "border border-[#d1d5db] bg-white"
                }`}
              >
                {!formData.showWhatsApp && (
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                )}
              </div>
              <span className="text-xs font-semibold text-[#333e48]">No</span>
            </div>
          </div>
        </div>

        {/* WhatsApp Number */}
        <div>
          <label className="block text-xs font-semibold text-[#333e48] mb-1.5">
            WhatsApp Number
          </label>
          <input
            type="text"
            value={formData.whatsAppNumber}
            onChange={(e) =>
              setFormData({ ...formData, whatsAppNumber: e.target.value })
            }
            className="w-full px-3 py-2 text-xs border border-[#d1d5db] rounded-[4px] focus:outline-none focus:border-[#00a99d] text-[#333e48]"
            placeholder="WhatsApp Number"
          />
        </div>

        {/* RSS Feeds */}
        <div>
          <label className="block text-xs font-semibold text-[#333e48] mb-2">
            RSS Feeds
          </label>
          <div className="flex items-center gap-8">
            {/* Enable */}
            <div
              onClick={() => setFormData({ ...formData, rssFeeds: true })}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                  formData.rssFeeds
                    ? "bg-[#00a99d] text-white"
                    : "border border-[#d1d5db] bg-white"
                }`}
              >
                {formData.rssFeeds && (
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                )}
              </div>
              <span className="text-xs font-semibold text-[#333e48]">Enable</span>
            </div>

            {/* Disable */}
            <div
              onClick={() => setFormData({ ...formData, rssFeeds: false })}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                  !formData.rssFeeds
                    ? "bg-[#00a99d] text-white"
                    : "border border-[#d1d5db] bg-white"
                }`}
              >
                {!formData.rssFeeds && (
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                )}
              </div>
              <span className="text-xs font-semibold text-[#333e48]">Disable</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold px-4 py-2 rounded-[4px] shadow-xs transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
