"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import { AdSpaceConfig, AdBannerSlot } from "./types";

interface AdBannerConfigCardProps {
  config: AdSpaceConfig;
  onSave: (updated: AdSpaceConfig) => void;
}

export default function AdBannerConfigCard({
  config,
  onSave,
}: AdBannerConfigCardProps) {
  const [formData, setFormData] = useState<AdSpaceConfig>(config);

  // Sync state if config changes from dropdown
  React.useEffect(() => {
    setFormData(config);
  }, [config]);

  const updateDesktop = (fields: Partial<AdBannerSlot>) => {
    setFormData((prev) => ({
      ...prev,
      desktop: { ...prev.desktop, ...fields },
    }));
  };

  const updateMobile = (fields: Partial<AdBannerSlot>) => {
    setFormData((prev) => ({
      ...prev,
      mobile: { ...prev.mobile, ...fields },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5 space-y-6"
    >
      <h2 className="text-sm font-bold text-gray-800 pb-2 border-b border-gray-100">
        {formData.name}
      </h2>

      {/* ================= DESKTOP BANNER ================= */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-gray-800">
          Desktop Banner{" "}
          <span className="font-normal text-gray-500">
            (This ad will be displayed on screens larger than 992px)
          </span>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Ad Size & Paste Code */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Ad Size
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="Width"
                  value={formData.desktop.width}
                  onChange={(e) =>
                    updateDesktop({ width: Number(e.target.value) })
                  }
                  className="w-24 bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                />
                <input
                  type="number"
                  placeholder="Height"
                  value={formData.desktop.height}
                  onChange={(e) =>
                    updateDesktop({ height: Number(e.target.value) })
                  }
                  className="w-24 bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Paste Ad Code
              </label>
              <textarea
                rows={4}
                placeholder="Paste Ad Code"
                value={formData.desktop.adCode}
                onChange={(e) => updateDesktop({ adCode: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-[3px] p-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d] transition resize-y font-mono"
              />
            </div>
          </div>

          {/* Right Column: Create Banner from Image & URL */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Create Your Banner{" "}
                <span className="font-normal text-gray-500">
                  (If you don&#39;t have an ad code, you can create an ad code by
                  selecting an image and entering a link)
                </span>
              </label>
              <input
                type="text"
                placeholder="Paste ad URL"
                value={formData.desktop.adUrl}
                onChange={(e) => updateDesktop({ adUrl: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d] mb-2"
              />

              <div className="flex items-center gap-2">
                <label className="inline-flex items-center gap-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold px-3.5 py-1.5 rounded-[3px] cursor-pointer shadow-xs transition">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Select Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        updateDesktop({ imageName: file.name });
                      }
                    }}
                  />
                </label>
                {formData.desktop.imageName && (
                  <span className="text-xs text-gray-500 truncate max-w-xs">
                    {formData.desktop.imageName}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* ================= MOBILE BANNER ================= */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-gray-800">
          Mobile Banner{" "}
          <span className="font-normal text-gray-500">
            (This ad will be displayed on screens smaller than 992px)
          </span>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Ad Size & Paste Code */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Ad Size
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="Width"
                  value={formData.mobile.width}
                  onChange={(e) =>
                    updateMobile({ width: Number(e.target.value) })
                  }
                  className="w-24 bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                />
                <input
                  type="number"
                  placeholder="Height"
                  value={formData.mobile.height}
                  onChange={(e) =>
                    updateMobile({ height: Number(e.target.value) })
                  }
                  className="w-24 bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Paste Ad Code
              </label>
              <textarea
                rows={4}
                placeholder="Paste Ad Code"
                value={formData.mobile.adCode}
                onChange={(e) => updateMobile({ adCode: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-[3px] p-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d] transition resize-y font-mono"
              />
            </div>
          </div>

          {/* Right Column: Create Banner from Image & URL */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Create Your Banner{" "}
                <span className="font-normal text-gray-500">
                  (If you don&#39;t have an ad code, you can create an ad code by
                  selecting an image and entering a link)
                </span>
              </label>
              <input
                type="text"
                placeholder="Paste ad URL"
                value={formData.mobile.adUrl}
                onChange={(e) => updateMobile({ adUrl: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d] mb-2"
              />

              <div className="flex items-center gap-2">
                <label className="inline-flex items-center gap-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold px-3.5 py-1.5 rounded-[3px] cursor-pointer shadow-xs transition">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Select Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        updateMobile({ imageName: file.name });
                      }
                    }}
                  />
                </label>
                {formData.mobile.imageName && (
                  <span className="text-xs text-gray-500 truncate max-w-xs">
                    {formData.mobile.imageName}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Changes button on bottom right */}
      <div className="flex justify-end pt-4 border-t border-gray-100">
        <button
          type="submit"
          className="bg-[#007bff] hover:bg-[#0069d9] text-white text-xs font-semibold px-4 py-1.5 rounded-[3px] shadow-xs transition cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
