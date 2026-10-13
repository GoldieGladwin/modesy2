"use client";

import React, { useState } from "react";
import {
  Check,
  Maximize2,
  Code,
  Eye,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Image as ImageIcon,
  Video,
  Link2,
  ChevronDown,
} from "lucide-react";
import { ShopPoliciesData } from "./types";
import { initialShopPolicies } from "./mockData";

export default function ShopPoliciesCard() {
  const [formData, setFormData] = useState<ShopPoliciesData>(initialShopPolicies);
  const [notification, setNotification] = useState<string | null>(null);

  // Editor states
  const [isPreview, setIsPreview] = useState(false);
  const [isSourceCode, setIsSourceCode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Formatting states
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrike, setIsStrike] = useState(false);
  const [alignment, setAlignment] = useState<"left" | "center" | "right" | "justify">("left");
  const [textColor, setTextColor] = useState<string>("#333e48");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("Shop policies have been saved successfully!");
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleClearFormat = () => {
    setIsBold(false);
    setIsItalic(false);
    setIsUnderline(false);
    setIsStrike(false);
    setAlignment("left");
    setTextColor("#333e48");
  };

  return (
    <div
      className={`bg-white border border-[#ebebeb] rounded-[4px] p-6 shadow-xs font-sans transition-all ${
        isFullscreen ? "fixed inset-4 z-50 overflow-y-auto" : ""
      }`}
    >
      {/* Toast Notification */}
      {notification && (
        <div className="mb-6 bg-[#d4edda] border border-[#c3e6cb] text-[#155724] px-4 py-2.5 rounded-[3px] text-xs font-medium flex items-center justify-between shadow-2xs transition-all">
          <span>{notification}</span>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-[#155724] font-bold text-sm cursor-pointer ml-4"
          >
            ×
          </button>
        </div>
      )}

      {/* Title */}
      <h1 className="text-[18px] font-bold text-[#2d3748] mb-6">
        Shop Policies
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
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
                {formData.status && (
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                )}
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

        {/* Content */}
        <div>
          <label className="block text-xs font-semibold text-[#333e48] mb-2">
            Content
          </label>

          {/* Rich Text Editor (TinyMCE look) */}
          <div className="border border-[#d1d5db] rounded-[4px] overflow-hidden focus-within:border-[#00a99d] transition-colors bg-white">
            {/* Top Menu Bar: File, Insert, Format, Table */}
            <div className="bg-[#fcfcfc] border-b border-[#e5e7eb] px-3 py-1.5 flex items-center gap-3 text-xs text-gray-700 select-none relative">
              {["File", "Insert", "Format", "Table"].map((menu) => (
                <div key={menu} className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveMenu(activeMenu === menu ? null : menu)
                    }
                    className={`px-2 py-0.5 rounded text-xs transition cursor-pointer ${
                      activeMenu === menu
                        ? "bg-gray-200 text-gray-900"
                        : "hover:bg-gray-200/60 text-gray-700"
                    }`}
                  >
                    {menu}
                  </button>

                  {/* Dropdown Menu */}
                  {activeMenu === menu && (
                    <div className="absolute left-0 top-full mt-1 w-44 bg-white border border-[#d1d5db] rounded shadow-md z-30 py-1 text-xs">
                      {menu === "File" && (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, content: "" });
                              setActiveMenu(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-gray-100"
                          >
                            New document
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsPreview(!isPreview);
                              setActiveMenu(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-gray-100"
                          >
                            Preview
                          </button>
                        </>
                      )}
                      {menu === "Insert" && (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              const url = prompt("Enter image URL:");
                              if (url) {
                                setFormData((prev) => ({
                                  ...prev,
                                  content: prev.content + `\n![Image](${url})\n`,
                                }));
                              }
                              setActiveMenu(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-gray-100"
                          >
                            Insert Image...
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const link = prompt("Enter Link URL:");
                              if (link) {
                                setFormData((prev) => ({
                                  ...prev,
                                  content: prev.content + `\n[Link](${link})\n`,
                                }));
                              }
                              setActiveMenu(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-gray-100"
                          >
                            Insert Link...
                          </button>
                        </>
                      )}
                      {menu === "Format" && (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setIsBold(!isBold);
                              setActiveMenu(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-gray-100 font-bold"
                          >
                            Bold
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsItalic(!isItalic);
                              setActiveMenu(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-gray-100 italic"
                          >
                            Italic
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              handleClearFormat();
                              setActiveMenu(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-gray-100"
                          >
                            Clear formatting
                          </button>
                        </>
                      )}
                      {menu === "Table" && (
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              content:
                                prev.content +
                                "\n| Column 1 | Column 2 |\n| --- | --- |\n| Data 1 | Data 2 |\n",
                            }));
                            setActiveMenu(null);
                          }}
                          className="w-full text-left px-3 py-1.5 hover:bg-gray-100"
                        >
                          Insert Table
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Main Action Toolbar */}
            <div className="bg-[#fcfcfc] border-b border-[#e5e7eb] px-3 py-2 flex flex-wrap items-center gap-1.5 text-gray-700 select-none">
              {/* Expand/Fullscreen */}
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                title="Fullscreen"
                className="p-1 hover:bg-gray-200/60 rounded text-gray-600 hover:text-black transition"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              {/* Source code */}
              <button
                type="button"
                onClick={() => setIsSourceCode(!isSourceCode)}
                title="Source code"
                className={`p-1 rounded transition ${
                  isSourceCode
                    ? "bg-gray-200 text-[#00a99d]"
                    : "hover:bg-gray-200/60 text-gray-600 hover:text-black"
                }`}
              >
                <Code className="w-3.5 h-3.5" />
              </button>

              {/* Preview */}
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

              {/* Undo / Redo */}
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

              {/* B I U S */}
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

              <div className="h-4 w-[1px] bg-gray-300 mx-1" />

              {/* Alignments */}
              <button
                type="button"
                onClick={() => setAlignment("left")}
                title="Align left"
                className={`p-1 rounded transition ${
                  alignment === "left"
                    ? "bg-gray-200 text-[#00a99d]"
                    : "hover:bg-gray-200/60 text-gray-600 hover:text-black"
                }`}
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setAlignment("center")}
                title="Align center"
                className={`p-1 rounded transition ${
                  alignment === "center"
                    ? "bg-gray-200 text-[#00a99d]"
                    : "hover:bg-gray-200/60 text-gray-600 hover:text-black"
                }`}
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setAlignment("right")}
                title="Align right"
                className={`p-1 rounded transition ${
                  alignment === "right"
                    ? "bg-gray-200 text-[#00a99d]"
                    : "hover:bg-gray-200/60 text-gray-600 hover:text-black"
                }`}
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setAlignment("justify")}
                title="Justify"
                className={`p-1 rounded transition ${
                  alignment === "justify"
                    ? "bg-gray-200 text-[#00a99d]"
                    : "hover:bg-gray-200/60 text-gray-600 hover:text-black"
                }`}
              >
                <AlignJustify className="w-3.5 h-3.5" />
              </button>

              <div className="h-4 w-[1px] bg-gray-300 mx-1" />

              {/* Lists */}
              <button
                type="button"
                title="Bullet list"
                className="p-1 hover:bg-gray-200/60 rounded text-gray-600 hover:text-black transition"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                title="Numbered list"
                className="p-1 hover:bg-gray-200/60 rounded text-gray-600 hover:text-black transition"
              >
                <ListOrdered className="w-3.5 h-3.5" />
              </button>

              <div className="h-4 w-[1px] bg-gray-300 mx-1" />

              {/* Text color */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  title="Text color"
                  className="flex items-center gap-0.5 p-1 hover:bg-gray-200/60 rounded text-gray-700 transition"
                >
                  <span className="font-bold text-xs underline decoration-2 decoration-[#00a99d]">
                    A
                  </span>
                  <ChevronDown className="w-2.5 h-2.5 text-gray-400" />
                </button>
                {showColorPicker && (
                  <div className="absolute left-0 top-full mt-1 bg-white border border-[#d1d5db] rounded shadow p-2 flex gap-1 z-20">
                    {["#333e48", "#00a99d", "#e53e3e", "#3182ce", "#d69e2e"].map(
                      (c) => (
                        <div
                          key={c}
                          onClick={() => {
                            setTextColor(c);
                            setShowColorPicker(false);
                          }}
                          className="w-5 h-5 rounded-full cursor-pointer border border-gray-200 hover:scale-110 transition"
                          style={{ backgroundColor: c }}
                        />
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Clear format */}
              <button
                type="button"
                onClick={handleClearFormat}
                title="Clear format"
                className="p-1 hover:bg-gray-200/60 rounded text-gray-600 hover:text-black text-xs font-mono font-bold transition px-1"
              >
                T<span className="text-[10px]">x</span>
              </button>

              <div className="h-4 w-[1px] bg-gray-300 mx-1" />

              {/* Media icons */}
              <button
                type="button"
                title="Insert Image"
                onClick={() => {
                  const url = prompt("Enter image URL:");
                  if (url) {
                    setFormData((prev) => ({
                      ...prev,
                      content: prev.content + `\n![Image](${url})\n`,
                    }));
                  }
                }}
                className="p-1 hover:bg-gray-200/60 rounded text-gray-600 hover:text-black transition"
              >
                <ImageIcon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                title="Insert Video"
                onClick={() => {
                  const url = prompt("Enter video URL:");
                  if (url) {
                    setFormData((prev) => ({
                      ...prev,
                      content: prev.content + `\n[Video](${url})\n`,
                    }));
                  }
                }}
                className="p-1 hover:bg-gray-200/60 rounded text-gray-600 hover:text-black transition"
              >
                <Video className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                title="Insert Link"
                onClick={() => {
                  const url = prompt("Enter Link URL:");
                  if (url) {
                    setFormData((prev) => ({
                      ...prev,
                      content: prev.content + `\n[Link](${url})\n`,
                    }));
                  }
                }}
                className="p-1 hover:bg-gray-200/60 rounded text-gray-600 hover:text-black transition"
              >
                <Link2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Content Area */}
            {isSourceCode ? (
              <textarea
                rows={14}
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full p-4 text-xs font-mono bg-gray-50 text-gray-800 leading-relaxed min-h-[320px] focus:outline-none resize-y"
              />
            ) : isPreview ? (
              <div
                style={{
                  textAlign: alignment,
                  color: textColor,
                }}
                className={`p-4 text-xs leading-relaxed min-h-[320px] bg-white whitespace-pre-wrap ${
                  isBold ? "font-bold" : ""
                } ${isItalic ? "italic" : ""} ${
                  isUnderline ? "underline" : ""
                } ${isStrike ? "line-through" : ""}`}
              >
                {formData.content}
              </div>
            ) : (
              <textarea
                rows={14}
                style={{
                  textAlign: alignment,
                  color: textColor,
                }}
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className={`w-full p-4 text-xs leading-relaxed min-h-[320px] focus:outline-none bg-white resize-y ${
                  isBold ? "font-bold" : ""
                } ${isItalic ? "italic" : ""} ${
                  isUnderline ? "underline" : ""
                } ${isStrike ? "line-through" : ""}`}
                placeholder="Enter shop policies content..."
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
