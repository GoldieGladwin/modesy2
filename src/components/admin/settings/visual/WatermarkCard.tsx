"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { WatermarkConfig } from "./types";

interface WatermarkCardProps {
  initialConfig?: WatermarkConfig;
  onSave: (config: WatermarkConfig) => void;
}

export default function WatermarkCard({
  initialConfig = {
    watermarkText: "Modesy",
    fontSize: 48,
    verticalAlignment: "Top",
    horizontalAlignment: "Left",
    addWatermarkProduct: false,
    addWatermarkBlog: false,
    addWatermarkThumbnail: false,
  },
  onSave,
}: WatermarkCardProps) {
  const [config, setConfig] = useState<WatermarkConfig>(initialConfig);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(config);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5 flex flex-col justify-between h-full space-y-5"
    >
      <div>
        <h2 className="text-sm font-bold text-gray-800 pb-2 border-b border-gray-100 mb-4">
          Watermark
        </h2>

        <div className="space-y-4 text-xs">
          {/* Watermark Text */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Watermark Text
            </label>
            <input
              type="text"
              value={config.watermarkText}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  watermarkText: e.target.value,
                }))
              }
              placeholder="Watermark Text"
              className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
            />
          </div>

          {/* 3 Columns: Font Size, Vertical Alignment, Horizontal Alignment */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1.5">
                Font Size
              </label>
              <input
                type="number"
                value={config.fontSize}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    fontSize: Number(e.target.value),
                  }))
                }
                className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1.5">
                Vertical Alignment
              </label>
              <div className="relative">
                <select
                  value={config.verticalAlignment}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      verticalAlignment: e.target.value as any,
                    }))
                  }
                  className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-2 text-xs text-gray-700 pr-8 appearance-none focus:outline-none focus:border-[#00a99d]"
                >
                  <option value="Top">Top</option>
                  <option value="Center">Center</option>
                  <option value="Bottom">Bottom</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1.5">
                Horizontal Alignment
              </label>
              <div className="relative">
                <select
                  value={config.horizontalAlignment}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      horizontalAlignment: e.target.value as any,
                    }))
                  }
                  className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-2 text-xs text-gray-700 pr-8 appearance-none focus:outline-none focus:border-[#00a99d]"
                >
                  <option value="Left">Left</option>
                  <option value="Center">Center</option>
                  <option value="Right">Right</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="space-y-3 pt-2">
            {/* Add Watermark to Product Images */}
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <button
                type="button"
                role="switch"
                aria-checked={config.addWatermarkProduct}
                onClick={() =>
                  setConfig((prev) => ({
                    ...prev,
                    addWatermarkProduct: !prev.addWatermarkProduct,
                  }))
                }
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  config.addWatermarkProduct ? "bg-[#007bff]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    config.addWatermarkProduct
                      ? "translate-x-4"
                      : "translate-x-0"
                  }`}
                />
              </button>
              <span className="text-xs text-gray-700">
                Add Watermark to Product Images
              </span>
            </label>

            {/* Add Watermark to Blog Images */}
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <button
                type="button"
                role="switch"
                aria-checked={config.addWatermarkBlog}
                onClick={() =>
                  setConfig((prev) => ({
                    ...prev,
                    addWatermarkBlog: !prev.addWatermarkBlog,
                  }))
                }
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  config.addWatermarkBlog ? "bg-[#007bff]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    config.addWatermarkBlog
                      ? "translate-x-4"
                      : "translate-x-0"
                  }`}
                />
              </button>
              <span className="text-xs text-gray-700">
                Add Watermark to Blog Images
              </span>
            </label>

            {/* Add Watermark to Thumbnail (Small) Images */}
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <button
                type="button"
                role="switch"
                aria-checked={config.addWatermarkThumbnail}
                onClick={() =>
                  setConfig((prev) => ({
                    ...prev,
                    addWatermarkThumbnail: !prev.addWatermarkThumbnail,
                  }))
                }
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  config.addWatermarkThumbnail ? "bg-[#007bff]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    config.addWatermarkThumbnail
                      ? "translate-x-4"
                      : "translate-x-0"
                  }`}
                />
              </button>
              <span className="text-xs text-gray-700">
                Add Watermark to Thumbnail (Small) Images
              </span>
            </label>
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
