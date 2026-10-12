"use client";

import React, { useState, useRef } from "react";
import {
  ChevronDown,
  Sparkles,
  Image as ImageIcon,
  X,
} from "lucide-react";
import RichTextEditorToolbar from "./RichTextEditorToolbar";
import ValidationTooltip from "./ValidationTooltip";

export interface EnglishDetailsData {
  title: string;
  shortDescription: string;
  tags: string[];
  description: string;
}

interface ProductDetailsEnglishProps {
  data: EnglishDetailsData;
  onChange: (data: EnglishDetailsData) => void;
  showTitleError?: boolean;
}

export default function ProductDetailsEnglish({
  data,
  onChange,
  showTitleError = false,
}: ProductDetailsEnglishProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [tagInput, setTagInput] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  const handleKeyDownTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!data.tags.includes(tagInput.trim())) {
        onChange({
          ...data,
          tags: [...data.tags, tagInput.trim()],
        });
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange({
      ...data,
      tags: data.tags.filter((t) => t !== tagToRemove),
    });
  };

  const handleGenerateAI = () => {
    if (!data.title) {
      alert("Please enter a Title first to generate AI description.");
      return;
    }
    const aiGenerated = `Experience premium elegance with our ${data.title}. Designed with superior craftsmanship, durable materials, and timeless aesthetics for everyday lifestyle.`;
    onChange({
      ...data,
      shortDescription:
        data.shortDescription ||
        `High-quality ${data.title} designed for maximum comfort and style.`,
      description: data.description
        ? `${data.description}\n\n${aiGenerated}`
        : aiGenerated,
    });
  };

  const handleToolbarFormat = (command: string) => {
    document.execCommand(command, false);
  };

  return (
    <div className="border border-[#e2e8f0] rounded-[3px] overflow-hidden bg-white">
      {/* Accordion Bar Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3.5 flex items-center justify-between text-sm font-semibold text-[#495057] bg-white hover:bg-gray-50/60 transition-colors cursor-pointer select-none border-b border-transparent"
      >
        <span>Details: English</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="p-5 sm:p-6 border-t border-[#f0f0f0] space-y-5">
          {/* Generate with AI Button (Top Right) */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleGenerateAI}
              className="bg-[#0d6efd] hover:bg-[#0b5ed7] text-white text-xs font-semibold px-3.5 py-2 rounded-[3px] inline-flex items-center gap-1.5 shadow-xs transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate with AI</span>
            </button>
          </div>

          {/* Title Field */}
          <div className="relative">
            <label className="block text-[14px] font-semibold text-[#333] mb-1.5">
              Title
            </label>
            <input
              type="text"
              placeholder="Title"
              value={data.title}
              onChange={(e) => onChange({ ...data, title: e.target.value })}
              className={`w-full px-4 py-2.5 border rounded-[3px] text-sm text-[#495057] placeholder-gray-400 outline-none transition-colors ${
                showTitleError
                  ? "border-[#f05023]"
                  : "border-[#e2e8f0] focus:border-[#00a99d]"
              }`}
            />
            {showTitleError && (
              <ValidationTooltip
                message="Please fill out this field."
                className="top-full left-0 mt-1"
                arrowOffsetPx={30}
              />
            )}
          </div>

          {/* Short Description Field */}
          <div>
            <label className="block text-[14px] font-semibold text-[#333] mb-1.5">
              Short Description
            </label>
            <input
              type="text"
              placeholder="Short Description"
              value={data.shortDescription}
              onChange={(e) =>
                onChange({ ...data, shortDescription: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-[3px] text-sm text-[#495057] placeholder-gray-400 outline-none focus:border-[#00a99d]"
            />
          </div>

          {/* Tags Field */}
          <div>
            <label className="block text-[14px] font-semibold text-[#333] mb-1.5">
              Tags{" "}
              <span className="text-xs font-normal text-gray-400">
                (Add relevant keywords for your product to increase visibility in search results)
              </span>
            </label>
            <div className="border border-[#e2e8f0] rounded-[3px] p-2 flex flex-wrap items-center gap-2 bg-white focus-within:border-[#00a99d]">
              {data.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-[3px] flex items-center gap-1.5"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-red-500 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Type tag and hit enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDownTag}
                className="flex-1 min-w-[180px] text-sm text-[#495057] placeholder-gray-400 outline-none py-1 px-1 bg-transparent"
              />
            </div>
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-[14px] font-semibold text-[#333] mb-2">
              Description
            </label>

            {/* Add Image Button */}
            <button
              type="button"
              onClick={() => {
                const url = prompt("Enter image URL to insert:");
                if (url) {
                  document.execCommand("insertImage", false, url);
                }
              }}
              className="bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-medium px-3.5 py-1.5 rounded-[3px] inline-flex items-center gap-1.5 mb-2 shadow-xs transition cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Add Image</span>
            </button>

            {/* Rich Text Editor Frame */}
            <div className="border border-gray-300 rounded-[3px] overflow-hidden bg-white shadow-xs">
              <RichTextEditorToolbar onFormat={handleToolbarFormat} />

              {/* Editable Area */}
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  onChange({ ...data, description: e.currentTarget.innerHTML })
                }
                className="min-h-[220px] p-4 text-sm text-gray-800 outline-none overflow-y-auto leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data.description || "<p></p>" }}
              />

              {/* Editor Bottom Bar (TinyMCE Style - Screenshot 3 & 4) */}
              <div className="border-t border-gray-200 px-3 py-1 flex items-center justify-between text-[11px] text-gray-400 bg-gray-50/50 select-none">
                <span>p</span>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-500">⚡ tiny</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
