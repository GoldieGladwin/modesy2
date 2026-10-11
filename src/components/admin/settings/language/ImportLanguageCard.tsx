"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";

interface ImportLanguageCardProps {
  onImport: (file: File) => void;
}

export default function ImportLanguageCard({
  onImport,
}: ImportLanguageCardProps) {
  const [jsonFile, setJsonFile] = useState<File | null>(null);
  const [flagName, setFlagName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jsonFile) {
      alert("Please select a JSON Language file first.");
      return;
    }
    onImport(jsonFile);
    setJsonFile(null);
    setFlagName("");
  };

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5 space-y-4"
      >
        <h2 className="text-sm font-bold text-gray-800 pb-2 border-b border-gray-100">
          Import Language
        </h2>

        {/* JSON Language File */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            JSON Language File
          </label>
          <div className="flex items-center gap-2">
            <label className="inline-flex items-center gap-1.5 bg-[#555] hover:bg-[#444] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] cursor-pointer shadow-xs transition">
              <Upload className="w-3.5 h-3.5" />
              <span>Select File</span>
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setJsonFile(f);
                }}
              />
            </label>
            {jsonFile && (
              <span className="text-xs text-gray-600 truncate max-w-xs">
                {jsonFile.name}
              </span>
            )}
          </div>
        </div>

        {/* Flag Image */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Flag
          </label>
          <div className="flex items-center gap-2">
            <label className="inline-flex items-center gap-1.5 bg-[#555] hover:bg-[#444] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] cursor-pointer shadow-xs transition">
              <Upload className="w-3.5 h-3.5" />
              <span>Select Image</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setFlagName(f.name);
                }}
              />
            </label>
            {flagName && (
              <span className="text-xs text-gray-600 truncate max-w-xs">
                {flagName}
              </span>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            className="bg-[#007bff] hover:bg-[#0069d9] text-white text-xs font-semibold px-4 py-2 rounded-[3px] shadow-xs transition cursor-pointer"
          >
            Import Language
          </button>
        </div>
      </form>

      {/* Info notice box */}
      <div className="bg-[#d9edf7] border border-[#bce8f1] text-[#31708f] p-3 rounded-[3px] text-xs">
        <span>Languages: </span>
        <a
          href="https://codingest.com/languages"
          target="_blank"
          rel="noreferrer"
          className="font-bold underline hover:text-[#245269]"
        >
          https://codingest.com/languages
        </a>
      </div>
    </div>
  );
}
