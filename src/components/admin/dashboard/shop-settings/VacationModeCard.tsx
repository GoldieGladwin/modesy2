"use client";

import React, { useState } from "react";
import {
  Check,
  Maximize2,
  Code,
  Eye,
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  MoreHorizontal,
} from "lucide-react";
import { VacationModeData } from "./types";
import { initialVacationMode } from "./mockData";

interface VacationModeCardProps {
  onSuccess?: (msg: string) => void;
}

export default function VacationModeCard({ onSuccess }: VacationModeCardProps) {
  const [formData, setFormData] = useState<VacationModeData>(initialVacationMode);
  const [isPreview, setIsPreview] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrike, setIsStrike] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSuccess) {
      onSuccess("Vacation mode settings have been saved successfully!");
    }
  };

  return (
    <div
      className={`bg-white border border-[#ebebeb] rounded-[4px] p-6 shadow-xs font-sans transition-all ${
        isFullscreen ? "fixed inset-6 z-50 overflow-y-auto" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[16px] font-bold text-[#2d3748] mb-0.5">
            Vacation Mode
          </h2>
          <p className="text-xs text-gray-400 mb-5">
            Vacation mode allows you to pause your store for a certain period of
            time
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Status */}
        <div>
          <label className="block text-xs font-semibold text-[#333e48] mb-2">
            Status
          </label>
          <div className="flex items-center gap-8">
            {/* Enable */}
            <div
              onClick={() => setFormData({ ...formData, status: true })}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                  formData.status
                    ? "bg-[#00a99d] text-white"
                    : "border border-[#d1d5db] bg-white"
                }`}
              >
                {formData.status && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
              <span className="text-xs font-semibold text-[#333e48]">Enable</span>
            </div>

            {/* Disable */}
            <div
              onClick={() => setFormData({ ...formData, status: false })}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                  !formData.status
                    ? "bg-[#00a99d] text-white"
                    : "border border-[#d1d5db] bg-white"
                }`}
              >
                {!formData.status && (
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                )}
              </div>
              <span className="text-xs font-semibold text-[#333e48]">
                Disable
              </span>
            </div>
          </div>
        </div>

        {/* Vacation Message */}
        <div>
          <label className="block text-xs font-semibold text-[#333e48] mb-2">
            Vacation Message
          </label>

          <div className="border border-[#d1d5db] rounded-[4px] overflow-hidden focus-within:border-[#00a99d] transition-colors">
            {/* Toolbar */}
            <div className="bg-[#fcfcfc] border-b border-[#e5e7eb] px-3 py-2 flex items-center justify-between select-none">
              <div className="flex items-center gap-2 text-gray-700">
                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  title="Fullscreen"
                  className="p-1 hover:bg-gray-200/60 rounded text-gray-600 hover:text-black transition"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Source code"
                  className="p-1 hover:bg-gray-200/60 rounded text-gray-600 hover:text-black transition"
                >
                  <Code className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsPreview(!isPreview)}
                  title="Preview"
                  className={`p-1 rounded transition ${
                    isPreview
                      ? "bg-gray-200 text-[#00a99d]"
                      : "hover:bg-gray-200/60 text-gray-600 hover:text-black"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>

                <div className="h-4 w-[1px] bg-gray-300 mx-1" />

                <button
                  type="button"
                  title="Undo"
                  className="p-1 hover:bg-gray-200/60 rounded text-gray-600 hover:text-black transition"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Redo"
                  className="p-1 hover:bg-gray-200/60 rounded text-gray-600 hover:text-black transition"
                >
                  <Redo2 className="w-3.5 h-3.5" />
                </button>

                <div className="h-4 w-[1px] bg-gray-300 mx-1" />

                <button
                  type="button"
                  onClick={() => setIsBold(!isBold)}
                  title="Bold"
                  className={`p-1 rounded text-xs font-bold transition px-1.5 ${
                    isBold
                      ? "bg-gray-200 text-[#00a99d]"
                      : "hover:bg-gray-200/60 text-gray-700 hover:text-black"
                  }`}
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => setIsItalic(!isItalic)}
                  title="Italic"
                  className={`p-1 rounded text-xs italic font-serif transition px-1.5 ${
                    isItalic
                      ? "bg-gray-200 text-[#00a99d]"
                      : "hover:bg-gray-200/60 text-gray-700 hover:text-black"
                  }`}
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => setIsUnderline(!isUnderline)}
                  title="Underline"
                  className={`p-1 rounded text-xs underline transition px-1.5 ${
                    isUnderline
                      ? "bg-gray-200 text-[#00a99d]"
                      : "hover:bg-gray-200/60 text-gray-700 hover:text-black"
                  }`}
                >
                  U
                </button>
                <button
                  type="button"
                  onClick={() => setIsStrike(!isStrike)}
                  title="Strikethrough"
                  className={`p-1 rounded text-xs line-through transition px-1.5 ${
                    isStrike
                      ? "bg-gray-200 text-[#00a99d]"
                      : "hover:bg-gray-200/60 text-gray-700 hover:text-black"
                  }`}
                >
                  S
                </button>
                <button
                  type="button"
                  title="More..."
                  className="p-1 hover:bg-gray-200/60 rounded text-gray-600 hover:text-black transition"
                >
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            {isPreview ? (
              <div
                className={`p-4 text-xs text-[#333e48] leading-relaxed min-h-[190px] bg-white whitespace-pre-wrap ${
                  isBold ? "font-bold" : ""
                } ${isItalic ? "italic" : ""} ${
                  isUnderline ? "underline" : ""
                } ${isStrike ? "line-through" : ""}`}
              >
                {formData.vacationMessage}
              </div>
            ) : (
              <textarea
                rows={8}
                value={formData.vacationMessage}
                onChange={(e) =>
                  setFormData({ ...formData, vacationMessage: e.target.value })
                }
                className={`w-full p-4 text-xs text-[#333e48] leading-relaxed min-h-[190px] focus:outline-none bg-white resize-y ${
                  isBold ? "font-bold" : ""
                } ${isItalic ? "italic" : ""} ${
                  isUnderline ? "underline" : ""
                } ${isStrike ? "line-through" : ""}`}
                placeholder="Enter vacation message..."
              />
            )}

            {/* Footer Bar (TinyMCE look) */}
            <div className="bg-[#f8f9fa] border-t border-[#e5e7eb] px-3 py-1 flex items-center justify-between text-[11px] text-gray-500 font-sans">
              <span className="font-mono text-gray-600">p</span>
              <span className="flex items-center gap-1 text-[11px] text-gray-500 font-semibold select-none">
                <span>tiny</span>
                <span className="text-[10px] text-gray-400">◢</span>
              </span>
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
