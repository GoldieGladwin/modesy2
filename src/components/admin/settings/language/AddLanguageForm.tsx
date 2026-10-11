"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import { NewLanguagePayload } from "./types";

interface AddLanguageFormProps {
  onAddLanguage: (payload: NewLanguagePayload) => void;
}

export default function AddLanguageForm({
  onAddLanguage,
}: AddLanguageFormProps) {
  const [name, setName] = useState("");
  const [shortForm, setShortForm] = useState("");
  const [languageCode, setLanguageCode] = useState("");
  const [order, setOrder] = useState(1);
  const [textDirection, setTextDirection] = useState<"ltr" | "rtl">("ltr");
  const [textEditorLanguage, setTextEditorLanguage] = useState("Select");
  const [flagName, setFlagName] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddLanguage({
      name: name.trim(),
      shortForm: shortForm.trim() || name.slice(0, 2).toLowerCase(),
      languageCode: languageCode.trim() || `${name.slice(0, 2).toLowerCase()}-${name.slice(0, 2).toUpperCase()}`,
      order,
      textDirection,
      textEditorLanguage,
      flagImage: flagName,
      isActive,
    });

    // Reset form
    setName("");
    setShortForm("");
    setLanguageCode("");
    setOrder(1);
    setTextDirection("ltr");
    setTextEditorLanguage("Select");
    setFlagName("");
    setIsActive(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5 space-y-4"
    >
      <h2 className="text-sm font-bold text-gray-800 pb-2 border-b border-gray-100">
        Add Language
      </h2>

      {/* Language Name */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Language Name
        </label>
        <input
          type="text"
          required
          placeholder="Language Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
        />
        <span className="text-[11px] text-gray-400 mt-0.5 block">(e.g. English)</span>
      </div>

      {/* Short Form */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Short Form
        </label>
        <input
          type="text"
          placeholder="Short Form"
          value={shortForm}
          onChange={(e) => setShortForm(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
        />
        <span className="text-[11px] text-gray-400 mt-0.5 block">(e.g. en)</span>
      </div>

      {/* Language Code */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Language Code
        </label>
        <input
          type="text"
          placeholder="Language Code"
          value={languageCode}
          onChange={(e) => setLanguageCode(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
        />
        <span className="text-[11px] text-gray-400 mt-0.5 block">(e.g. en-US)</span>
      </div>

      {/* Order */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Order
        </label>
        <input
          type="number"
          min={1}
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
          className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
        />
      </div>

      {/* Text Direction */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          Text Direction
        </label>
        <div className="flex items-center gap-6 text-xs text-gray-700">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="textDirection"
              checked={textDirection === "ltr"}
              onChange={() => setTextDirection("ltr")}
              className="text-[#007bff]"
            />
            <span>Left to Right (LTR)</span>
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="textDirection"
              checked={textDirection === "rtl"}
              onChange={() => setTextDirection("rtl")}
              className="text-[#007bff]"
            />
            <span>Right to Left (RTL)</span>
          </label>
        </div>
      </div>

      {/* Text Editor Language */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Text Editor Language
        </label>
        <select
          value={textEditorLanguage}
          onChange={(e) => setTextEditorLanguage(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
        >
          <option value="Select">Select</option>
          <option value="English">English</option>
          <option value="Arabic">Arabic</option>
          <option value="Indonesian">Indonesian</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
        </select>
      </div>

      {/* Flag Upload */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Flag
        </label>
        <label className="inline-flex items-center gap-1.5 bg-[#555] hover:bg-[#444] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] cursor-pointer shadow-xs transition">
          <Upload className="w-3.5 h-3.5" />
          <span>Select Image</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) setFlagName(e.target.files[0].name);
            }}
          />
        </label>
        {flagName && (
          <span className="text-xs text-gray-500 ml-2">{flagName}</span>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
          Status
        </label>
        <div className="flex items-center gap-6 text-xs text-gray-700">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="langStatus"
              checked={isActive}
              onChange={() => setIsActive(true)}
              className="text-[#007bff]"
            />
            <span>Active</span>
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="langStatus"
              checked={!isActive}
              onChange={() => setIsActive(false)}
              className="text-[#007bff]"
            />
            <span>Inactive</span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-3 border-t border-gray-100">
        <button
          type="submit"
          className="bg-[#007bff] hover:bg-[#0069d9] text-white text-xs font-semibold px-4 py-2 rounded-[3px] shadow-xs transition cursor-pointer"
        >
          Add Language
        </button>
      </div>
    </form>
  );
}
