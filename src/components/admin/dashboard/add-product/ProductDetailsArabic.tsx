"use client";

import React, { useState } from "react";
import { ChevronDown, Image as ImageIcon } from "lucide-react";
import RichTextEditorToolbar from "./RichTextEditorToolbar";

export interface ArabicDetailsData {
  title: string;
  shortDescription: string;
  tags: string[];
  description: string;
}

interface ProductDetailsArabicProps {
  data: ArabicDetailsData;
  onChange: (data: ArabicDetailsData) => void;
}

export default function ProductDetailsArabic({
  data,
  onChange,
}: ProductDetailsArabicProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToolbarFormat = (command: string) => {
    document.execCommand(command, false);
  };

  return (
    <div className="border border-[#e2e8f0] rounded-[3px] overflow-hidden bg-white">
      {/* Accordion Bar Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3.5 flex items-center justify-between text-sm font-semibold text-[#495057] bg-white hover:bg-gray-50/60 transition-colors cursor-pointer select-none"
      >
        <span>Details: Arabic (Optional)</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Accordion Content (RTL) */}
      {isOpen && (
        <div className="p-5 sm:p-6 border-t border-[#f0f0f0] space-y-5" dir="rtl">
          <div>
            <label className="block text-[14px] font-semibold text-[#333] mb-1.5">
              العنوان
            </label>
            <input
              type="text"
              placeholder="العنوان"
              value={data.title}
              onChange={(e) => onChange({ ...data, title: e.target.value })}
              className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-[3px] text-sm text-[#495057] placeholder-gray-400 outline-none focus:border-[#00a99d]"
            />
          </div>

          <div>
            <label className="block text-[14px] font-semibold text-[#333] mb-1.5">
              الوصف المختصر
            </label>
            <input
              type="text"
              placeholder="الوصف المختصر"
              value={data.shortDescription}
              onChange={(e) =>
                onChange({ ...data, shortDescription: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-[3px] text-sm text-[#495057] placeholder-gray-400 outline-none focus:border-[#00a99d]"
            />
          </div>

          <div>
            <label className="block text-[14px] font-semibold text-[#333] mb-2">
              الوصف
            </label>

            <button
              type="button"
              onClick={() => {
                const url = prompt("أدخل رابط الصورة:");
                if (url) {
                  document.execCommand("insertImage", false, url);
                }
              }}
              className="bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-medium px-3.5 py-1.5 rounded-[3px] inline-flex items-center gap-1.5 mb-2 shadow-xs transition cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>إضافة صورة</span>
            </button>

            <div className="border border-gray-300 rounded-[3px] overflow-hidden bg-white shadow-xs">
              <RichTextEditorToolbar onFormat={handleToolbarFormat} />
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  onChange({ ...data, description: e.currentTarget.innerHTML })
                }
                className="min-h-[180px] p-4 text-sm text-gray-800 outline-none overflow-y-auto leading-relaxed text-right"
                dangerouslySetInnerHTML={{ __html: data.description || "<p></p>" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
