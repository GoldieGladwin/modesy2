"use client";

import React from "react";
import { Check } from "lucide-react";
import PreferencesRadioGroup from "./PreferencesRadioGroup";
import { FileUploadPreferences } from "./types";
import { DEFAULT_FILE_UPLOAD_PREFERENCES } from "./initialData";

interface PreferencesFileUploadTabProps {
  preferences?: FileUploadPreferences;
  onChange?: (updated: FileUploadPreferences) => void;
}

export default function PreferencesFileUploadTab({
  preferences = DEFAULT_FILE_UPLOAD_PREFERENCES,
  onChange,
}: PreferencesFileUploadTabProps) {
  const updateField = <K extends keyof FileUploadPreferences>(
    key: K,
    val: FileUploadPreferences[K]
  ) => {
    onChange?.({ ...preferences, [key]: val });
  };

  const imageFormats: { label: string; value: FileUploadPreferences["imageFormat"] }[] = [
    { label: "JPG", value: "jpg" },
    { label: "PNG", value: "png" },
    { label: "WEBP", value: "webp" },
    { label: "Keep Original File Format", value: "keep_original" },
  ];

  return (
    <div className="space-y-4">
      {/* 1. Image File Format (2 columns of 2 items) */}
      <div className="space-y-1.5">
        <label className="block text-[13px] font-semibold text-[#555555]">
          Image File Format
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 max-w-xl pt-0.5">
          <div className="space-y-2">
            {[imageFormats[0], imageFormats[1]].map((fmt) => {
              const isChecked = preferences.imageFormat === fmt.value;
              return (
                <button
                  key={fmt.value}
                  type="button"
                  onClick={() => updateField("imageFormat", fmt.value)}
                  className="flex items-center gap-2 cursor-pointer text-[13px] text-[#555555] select-none hover:text-[#222]"
                >
                  {isChecked ? (
                    <div className="w-[17px] h-[17px] rounded-full bg-[#524497] flex items-center justify-center text-white shrink-0 shadow-2xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-[17px] h-[17px] rounded-full border-[1.5px] border-[#9ca3af] bg-white shrink-0" />
                  )}
                  <span>{fmt.label}</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-2">
            {[imageFormats[2], imageFormats[3]].map((fmt) => {
              const isChecked = preferences.imageFormat === fmt.value;
              return (
                <button
                  key={fmt.value}
                  type="button"
                  onClick={() => updateField("imageFormat", fmt.value)}
                  className="flex items-center gap-2 cursor-pointer text-[13px] text-[#555555] select-none hover:text-[#222]"
                >
                  {isChecked ? (
                    <div className="w-[17px] h-[17px] rounded-full bg-[#524497] flex items-center justify-center text-white shrink-0 shadow-2xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-[17px] h-[17px] rounded-full border-[1.5px] border-[#9ca3af] bg-white shrink-0" />
                  )}
                  <span>{fmt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Product Image Upload */}
      <PreferencesRadioGroup<"required" | "optional">
        label="Product Image Upload"
        options={[
          { label: "Required", value: "required" },
          { label: "Optional", value: "optional" },
        ]}
        value={preferences.productImageUpload}
        onChange={(val) => updateField("productImageUpload", val)}
      />

      {/* 3. Product Image Upload Limit */}
      <div>
        <label
          htmlFor="pref-image-limit"
          className="block text-[13px] font-semibold text-[#555555] mb-1.5"
        >
          Product Image Upload Limit
        </label>
        <input
          id="pref-image-limit"
          type="number"
          value={preferences.productImageUploadLimit}
          onChange={(e) => updateField("productImageUploadLimit", e.target.value)}
          className="w-full border border-[#d2d6de] rounded-[3px] px-3.5 py-2 text-[13px] text-[#444] focus:outline-none focus:border-[#007bff]"
        />
      </div>

      {/* 4. Max File Size (Image) */}
      <div>
        <label
          htmlFor="pref-max-size-img"
          className="block text-[13px] font-semibold text-[#555555] mb-1.5"
        >
          Max File Size (Image)
        </label>
        <div className="flex w-full">
          <input
            id="pref-max-size-img"
            type="number"
            value={preferences.maxFileSizeImage}
            onChange={(e) => updateField("maxFileSizeImage", e.target.value)}
            className="flex-1 border border-r-0 border-[#d2d6de] rounded-l-[3px] px-3.5 py-2 text-[13px] text-[#444] focus:outline-none focus:border-[#007bff]"
          />
          <span className="inline-flex items-center px-3.5 py-2 bg-[#f4f4f4] border border-[#d2d6de] text-[13px] text-[#555555] font-medium rounded-r-[3px] select-none">
            MB
          </span>
        </div>
      </div>

      {/* 5. Max File Size (Video) */}
      <div>
        <label
          htmlFor="pref-max-size-vid"
          className="block text-[13px] font-semibold text-[#555555] mb-1.5"
        >
          Max File Size (Video)
        </label>
        <div className="flex w-full">
          <input
            id="pref-max-size-vid"
            type="number"
            value={preferences.maxFileSizeVideo}
            onChange={(e) => updateField("maxFileSizeVideo", e.target.value)}
            className="flex-1 border border-r-0 border-[#d2d6de] rounded-l-[3px] px-3.5 py-2 text-[13px] text-[#444] focus:outline-none focus:border-[#007bff]"
          />
          <span className="inline-flex items-center px-3.5 py-2 bg-[#f4f4f4] border border-[#d2d6de] text-[13px] text-[#555555] font-medium rounded-r-[3px] select-none">
            MB
          </span>
        </div>
      </div>

      {/* 6. Max File Size (Audio) */}
      <div>
        <label
          htmlFor="pref-max-size-aud"
          className="block text-[13px] font-semibold text-[#555555] mb-1.5"
        >
          Max File Size (Audio)
        </label>
        <div className="flex w-full">
          <input
            id="pref-max-size-aud"
            type="number"
            value={preferences.maxFileSizeAudio}
            onChange={(e) => updateField("maxFileSizeAudio", e.target.value)}
            className="flex-1 border border-r-0 border-[#d2d6de] rounded-l-[3px] px-3.5 py-2 text-[13px] text-[#444] focus:outline-none focus:border-[#007bff]"
          />
          <span className="inline-flex items-center px-3.5 py-2 bg-[#f4f4f4] border border-[#d2d6de] text-[13px] text-[#555555] font-medium rounded-r-[3px] select-none">
            MB
          </span>
        </div>
      </div>
    </div>
  );
}
