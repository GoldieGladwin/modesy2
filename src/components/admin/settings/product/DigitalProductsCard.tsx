"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { DigitalProductsSettings } from "./types";

interface DigitalProductsCardProps {
  initialSettings?: DigitalProductsSettings;
  onSave: (settings: DigitalProductsSettings) => void;
}

export default function DigitalProductsCard({
  initialSettings = {
    demoUrl: true,
    videoPreview: true,
    audioPreview: true,
    externalDownloadLink: true,
    allowedExtensions: ["zip"],
  },
  onSave,
}: DigitalProductsCardProps) {
  const [settings, setSettings] =
    useState<DigitalProductsSettings>(initialSettings);
  const [extInput, setExtInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = extInput.trim().replace(/^\./, "").toLowerCase();
      if (trimmed && !settings.allowedExtensions.includes(trimmed)) {
        setSettings((prev) => ({
          ...prev,
          allowedExtensions: [...prev.allowedExtensions, trimmed],
        }));
      }
      setExtInput("");
    }
  };

  const removeExtension = (ext: string) => {
    setSettings((prev) => ({
      ...prev,
      allowedExtensions: prev.allowedExtensions.filter((e) => e !== ext),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(settings);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5 flex flex-col justify-between h-full space-y-5"
    >
      <div>
        <h2 className="text-sm font-bold text-gray-800 pb-2 border-b border-gray-100 mb-4">
          Digital Products
        </h2>

        <div className="space-y-3.5 text-xs text-gray-700">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Demo URL
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.demoUrl}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, demoUrl: e.target.checked }))
                }
                className="w-4 h-4 text-[#007bff] rounded-[2px]"
              />
              <span>Enable</span>
            </label>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Video Preview
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.videoPreview}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    videoPreview: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-[#007bff] rounded-[2px]"
              />
              <span>Enable</span>
            </label>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Audio Preview
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.audioPreview}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    audioPreview: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-[#007bff] rounded-[2px]"
              />
              <span>Enable</span>
            </label>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              External Download Link
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.externalDownloadLink}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    externalDownloadLink: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-[#007bff] rounded-[2px]"
              />
              <span>Enable</span>
            </label>
          </div>

          {/* Allowed File Extensions chips */}
          <div className="pt-1">
            <label className="block font-semibold text-gray-700 mb-1">
              Allowed File Extensions
            </label>
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-white border border-gray-300 rounded-[3px] min-h-[38px] focus-within:border-[#00a99d]">
              {settings.allowedExtensions.map((ext) => (
                <span
                  key={ext}
                  className="inline-flex items-center gap-1 bg-gray-100 border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-[11px] font-mono"
                >
                  <span>{ext}</span>
                  <button
                    type="button"
                    onClick={() => removeExtension(ext)}
                    className="text-gray-400 hover:text-gray-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={extInput}
                onChange={(e) => setExtInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={settings.allowedExtensions.length === 0 ? "zip" : ""}
                className="flex-1 min-w-[70px] outline-none text-xs text-gray-800 bg-transparent"
              />
            </div>
            <span className="text-[11px] text-gray-400 mt-1 block">
              (Type an extension and hit enter. E.g. zip, jpg, doc, pdf...)
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-3 border-t border-gray-100">
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
