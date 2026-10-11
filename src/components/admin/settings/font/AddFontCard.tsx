"use client";

import React, { useState } from "react";
import { NewFontPayload } from "./types";

interface AddFontCardProps {
  onAddFont: (payload: NewFontPayload) => void;
}

export default function AddFontCard({ onAddFont }: AddFontCardProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [fontFamily, setFontFamily] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !fontFamily.trim()) return;

    onAddFont({
      name: name.trim(),
      url: url.trim(),
      fontFamily: fontFamily.trim(),
    });

    setName("");
    setUrl("");
    setFontFamily("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5 space-y-4"
    >
      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
        <h2 className="text-sm font-bold text-gray-800">Add Font</h2>
        <a
          href="https://fonts.google.com"
          target="_blank"
          rel="noreferrer"
          className="text-xs font-bold text-[#007bff] hover:underline"
        >
          Google Fonts
        </a>
      </div>

      <div className="space-y-3.5 text-xs">
        {/* Name */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
          />
          <span className="text-[11px] text-gray-400 mt-0.5 block">
            (E.g: Open Sans)
          </span>
        </div>

        {/* URL */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            URL
          </label>
          <textarea
            rows={2}
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
          />
          <span className="text-[11px] text-gray-400 mt-0.5 block">
            (E.g: &lt;link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"&gt;)
          </span>
        </div>

        {/* Font Family */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Font Family
          </label>
          <input
            type="text"
            required
            placeholder="Font Family"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
          />
          <span className="text-[11px] text-gray-400 mt-0.5 block">
            (E.g: font-family: "Open Sans", Helvetica, sans-serif)
          </span>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          className="bg-[#007bff] hover:bg-[#0069d9] text-white text-xs font-semibold px-4 py-2 rounded-[3px] shadow-xs transition cursor-pointer"
        >
          Add Font
        </button>
      </div>
    </form>
  );
}
