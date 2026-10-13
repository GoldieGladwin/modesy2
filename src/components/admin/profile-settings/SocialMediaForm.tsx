"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { SocialMediaSettingsData } from "./types";
import { initialSocialMediaData } from "./mockData";

interface SocialMediaFormProps {
  onSaved?: (data: SocialMediaSettingsData) => void;
}

interface SocialField {
  key: keyof SocialMediaSettingsData;
  label: string;
  placeholder?: string;
}

const SOCIAL_FIELDS: SocialField[] = [
  { key: "facebook", label: "Facebook URL" },
  { key: "twitter", label: "X (Twitter) URL" },
  { key: "instagram", label: "Instagram URL" },
  { key: "tiktok", label: "TikTok URL" },
  { key: "whatsapp", label: "WhatsApp URL" },
  { key: "youtube", label: "YouTube URL" },
  { key: "discord", label: "Discord Url" },
  { key: "telegram", label: "Telegram URL", placeholder: "Telegram URL" },
  { key: "pinterest", label: "Pinterest URL", placeholder: "Pinterest URL" },
  { key: "linkedin", label: "Linkedin URL", placeholder: "Linkedin URL" },
  { key: "twitch", label: "Twitch Url" },
  { key: "vk", label: "VK URL", placeholder: "VK URL" },
  { key: "personalWebsite", label: "Personal Website URL" },
];

export const SocialMediaForm: React.FC<SocialMediaFormProps> = ({ onSaved }) => {
  const [formData, setFormData] = useState<SocialMediaSettingsData>(
    initialSocialMediaData
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleInputChange = (
    key: keyof SocialMediaSettingsData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSaved) {
      onSaved(formData);
    }
    setToastMessage("Social media settings updated successfully!");
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div className="w-full">
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-[#00a99d] text-white px-5 py-3 rounded-[3px] shadow-lg text-[14px]">
          <Check className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {SOCIAL_FIELDS.map((field) => (
          <div key={field.key}>
            <label
              htmlFor={field.key}
              className="block text-[13px] font-medium text-[#495057] mb-1.5"
            >
              {field.label}
            </label>
            <input
              type="text"
              id={field.key}
              name={field.key}
              placeholder={field.placeholder || ""}
              value={formData[field.key]}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder:text-[#6c757d] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] transition-colors"
            />
          </div>
        ))}

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            className="bg-[#00a99d] hover:bg-[#008f85] text-white font-normal text-[14px] px-6 py-2.5 rounded-[2px] transition-colors cursor-pointer shadow-xs"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
