"use client";

import React, { useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import { StorageSettings, StorageProvider } from "./types";
import { DEFAULT_STORAGE_SETTINGS } from "./initialData";

interface StorageSettingsCardProps {
  initialSettings?: StorageSettings;
  onSave?: (settings: StorageSettings) => void;
}

export default function StorageSettingsCard({
  initialSettings = DEFAULT_STORAGE_SETTINGS,
  onSave,
}: StorageSettingsCardProps) {
  const [settings, setSettings] = useState<StorageSettings>(initialSettings);
  const [currentTab, setCurrentTab] = useState<StorageProvider>("local");

  const handleActiveStorageChange = (provider: StorageProvider) => {
    setSettings((prev) => ({ ...prev, activeStorage: provider }));
    setCurrentTab(provider);
  };

  const handleSaveClick = () => {
    onSave?.(settings);
    alert("Success: Storage settings have been saved!");
  };

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-[4px] shadow-2xs p-5 relative pb-16">
      <h2 className="text-[15px] font-semibold text-[#333333] pb-3 border-b border-[#f0f0f0] mb-5">
        Storage
      </h2>

      <div className="space-y-5 text-[13px]">
        {/* 1. Active Storage Dropdown */}
        <div>
          <label
            htmlFor="storage-active-select"
            className="block text-[13px] font-semibold text-[#555] mb-1.5"
          >
            Active Storage
          </label>
          <div className="relative">
            <select
              id="storage-active-select"
              value={settings.activeStorage}
              onChange={(e) =>
                handleActiveStorageChange(e.target.value as StorageProvider)
              }
              className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3.5 py-2 rounded-[3px] appearance-none focus:outline-none focus:border-[#007bff]"
            >
              <option value="local">Local Storage</option>
              <option value="aws_s3">AWS S3</option>
              <option value="cloudflare_r2">Cloudflare R2</option>
              <option value="backblaze_b2">Backblaze B2</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* 2. Storage Settings (Provider Pills) */}
        <div>
          <label className="block text-[13px] font-semibold text-[#555] mb-2">
            Storage Settings
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentTab("local")}
              className={`px-3.5 py-1.5 rounded-[3px] text-[12px] font-medium border transition-colors cursor-pointer ${
                currentTab === "local"
                  ? "border-[#007bff] text-[#007bff] bg-blue-50/20 font-semibold"
                  : "border-[#d2d6de] text-[#555555] bg-white hover:bg-gray-50"
              }`}
            >
              Local Storage
            </button>
            <button
              type="button"
              onClick={() => setCurrentTab("aws_s3")}
              className={`px-3.5 py-1.5 rounded-[3px] text-[12px] font-medium border transition-colors cursor-pointer ${
                currentTab === "aws_s3"
                  ? "border-[#007bff] text-[#007bff] bg-blue-50/20 font-semibold"
                  : "border-[#d2d6de] text-[#555555] bg-white hover:bg-gray-50"
              }`}
            >
              AWS S3
            </button>
            <button
              type="button"
              onClick={() => setCurrentTab("cloudflare_r2")}
              className={`px-3.5 py-1.5 rounded-[3px] text-[12px] font-medium border transition-colors cursor-pointer ${
                currentTab === "cloudflare_r2"
                  ? "border-[#007bff] text-[#007bff] bg-blue-50/20 font-semibold"
                  : "border-[#d2d6de] text-[#555555] bg-white hover:bg-gray-50"
              }`}
            >
              Cloudflare R2
            </button>
            <button
              type="button"
              onClick={() => setCurrentTab("backblaze_b2")}
              className={`px-3.5 py-1.5 rounded-[3px] text-[12px] font-medium border transition-colors cursor-pointer ${
                currentTab === "backblaze_b2"
                  ? "border-[#007bff] text-[#007bff] bg-blue-50/20 font-semibold"
                  : "border-[#d2d6de] text-[#555555] bg-white hover:bg-gray-50"
              }`}
            >
              Backblaze B2
            </button>
          </div>
        </div>

        {/* 3. Provider Settings Content */}
        {currentTab === "local" && (
          <div className="bg-[#d9edf7] border border-[#bce8f1] text-[#31708f] rounded-[3px] px-3.5 py-2.5 flex items-center gap-2 text-[12px] leading-relaxed">
            <Info className="w-4 h-4 text-[#31708f] shrink-0" />
            <span>
              There is no need to enter additional API settings for Local Storage. Uploaded files are hosted directly on your server.
            </span>
          </div>
        )}

        {currentTab === "aws_s3" && (
          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-[12px] font-semibold text-[#555] mb-1">
                AWS Access Key
              </label>
              <input
                type="text"
                placeholder="AWS Access Key"
                value={settings.awsAccessKey}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, awsAccessKey: e.target.value }))
                }
                className="w-full border border-[#d2d6de] rounded-[3px] px-3 py-1.5 text-[13px] text-[#444] focus:outline-none focus:border-[#007bff]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#555] mb-1">
                AWS Secret Key
              </label>
              <input
                type="password"
                placeholder="AWS Secret Key"
                value={settings.awsSecretKey}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, awsSecretKey: e.target.value }))
                }
                className="w-full border border-[#d2d6de] rounded-[3px] px-3 py-1.5 text-[13px] text-[#444] focus:outline-none focus:border-[#007bff]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#555] mb-1">
                Bucket Name
              </label>
              <input
                type="text"
                placeholder="Bucket Name"
                value={settings.awsBucket}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, awsBucket: e.target.value }))
                }
                className="w-full border border-[#d2d6de] rounded-[3px] px-3 py-1.5 text-[13px] text-[#444] focus:outline-none focus:border-[#007bff]"
              />
            </div>
          </div>
        )}

        {currentTab === "cloudflare_r2" && (
          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-[12px] font-semibold text-[#555] mb-1">
                Cloudflare Account ID
              </label>
              <input
                type="text"
                placeholder="Account ID"
                value={settings.cloudflareAccountId}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    cloudflareAccountId: e.target.value,
                  }))
                }
                className="w-full border border-[#d2d6de] rounded-[3px] px-3 py-1.5 text-[13px] text-[#444] focus:outline-none focus:border-[#007bff]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#555] mb-1">
                R2 Access Key ID
              </label>
              <input
                type="text"
                placeholder="Access Key ID"
                value={settings.cloudflareAccessKey}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    cloudflareAccessKey: e.target.value,
                  }))
                }
                className="w-full border border-[#d2d6de] rounded-[3px] px-3 py-1.5 text-[13px] text-[#444] focus:outline-none focus:border-[#007bff]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#555] mb-1">
                R2 Bucket Name
              </label>
              <input
                type="text"
                placeholder="Bucket Name"
                value={settings.cloudflareBucket}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    cloudflareBucket: e.target.value,
                  }))
                }
                className="w-full border border-[#d2d6de] rounded-[3px] px-3 py-1.5 text-[13px] text-[#444] focus:outline-none focus:border-[#007bff]"
              />
            </div>
          </div>
        )}

        {currentTab === "backblaze_b2" && (
          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-[12px] font-semibold text-[#555] mb-1">
                Key ID
              </label>
              <input
                type="text"
                placeholder="Key ID"
                value={settings.backblazeKeyId}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    backblazeKeyId: e.target.value,
                  }))
                }
                className="w-full border border-[#d2d6de] rounded-[3px] px-3 py-1.5 text-[13px] text-[#444] focus:outline-none focus:border-[#007bff]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#555] mb-1">
                Application Key
              </label>
              <input
                type="password"
                placeholder="Application Key"
                value={settings.backblazeAppKey}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    backblazeAppKey: e.target.value,
                  }))
                }
                className="w-full border border-[#d2d6de] rounded-[3px] px-3 py-1.5 text-[13px] text-[#444] focus:outline-none focus:border-[#007bff]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#555] mb-1">
                Bucket Name
              </label>
              <input
                type="text"
                placeholder="Bucket Name"
                value={settings.backblazeBucket}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    backblazeBucket: e.target.value,
                  }))
                }
                className="w-full border border-[#d2d6de] rounded-[3px] px-3 py-1.5 text-[13px] text-[#444] focus:outline-none focus:border-[#007bff]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Save Changes Button (Bottom Right) */}
      <div className="absolute right-5 bottom-4">
        <button
          type="button"
          onClick={handleSaveClick}
          className="px-4 py-2 bg-[#007bff] hover:bg-[#0069d9] text-white rounded-[3px] text-[13px] font-semibold transition cursor-pointer shadow-2xs"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
