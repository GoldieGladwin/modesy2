"use client";

import React, { useState } from "react";
import {
  Image as ImageIcon,
  Maximize2,
  Code,
  Eye,
  Undo,
  Redo,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Type,
  Highlighter,
  Video,
  Link as LinkIcon,
} from "lucide-react";

interface AffiliateContentEditorCardProps {
  initialTitle?: string;
  initialBody?: string;
  onSave?: (data: { title: string; body: string }) => void;
}

export default function AffiliateContentEditorCard({
  initialTitle = "",
  initialBody = "",
  onSave,
}: AffiliateContentEditorCardProps) {
  const [contentTitle, setContentTitle] = useState(initialTitle);
  const [contentBody, setContentBody] = useState(initialBody);

  const handleSaveClick = () => {
    onSave?.({ title: contentTitle, body: contentBody });
    alert("Success: Content settings have been saved!");
  };

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-[4px] shadow-2xs p-5 relative pb-16">
      <h2 className="text-[15px] font-semibold text-[#333333] pb-3 border-b border-[#f0f0f0] mb-5">
        Content
      </h2>

      <div className="space-y-4 text-[13px]">
        {/* Title */}
        <div>
          <label className="block text-[13px] font-semibold text-[#555] mb-1.5">
            Title
          </label>
          <input
            type="text"
            placeholder="Title"
            value={contentTitle}
            onChange={(e) => setContentTitle(e.target.value)}
            className="w-full border border-[#d2d6de] rounded-[3px] px-3 py-2 text-[13px] text-[#444] placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
          />
        </div>

        {/* Content (TinyMCE Toolbar) */}
        <div>
          <label className="block text-[13px] font-semibold text-[#555] mb-1.5">
            Content
          </label>

          {/* Add Image Button */}
          <button
            type="button"
            className="px-2.5 py-1 bg-white border border-[#d2d6de] hover:bg-gray-50 text-[12px] text-[#444] rounded-[3px] mb-2 flex items-center gap-1.5 transition cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5 text-gray-500" />
            <span>Add Image</span>
          </button>

          {/* TinyMCE Mock Toolbar & Editor Box */}
          <div className="border border-[#d2d6de] rounded-[3px] overflow-hidden bg-white">
            {/* Menu Bar: File Edit View Insert Format Tools Table */}
            <div className="flex items-center gap-4 px-3 py-1.5 border-b border-[#e5e5e5] bg-[#fbfbfb] text-[12px] text-[#555] overflow-x-auto">
              <span className="cursor-pointer hover:text-black">File</span>
              <span className="cursor-pointer hover:text-black">Edit</span>
              <span className="cursor-pointer hover:text-black">View</span>
              <span className="cursor-pointer hover:text-black">Insert</span>
              <span className="cursor-pointer hover:text-black">Format</span>
              <span className="cursor-pointer hover:text-black">Tools</span>
              <span className="cursor-pointer hover:text-black">Table</span>
            </div>

            {/* Icon Toolbars Row */}
            <div className="flex flex-wrap items-center gap-1 p-2 border-b border-[#e5e5e5] bg-[#fdfdfd] text-gray-600">
              <button
                type="button"
                title="Fullscreen"
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                title="Source code"
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Code className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                title="Preview"
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
              <div className="w-[1px] h-4 bg-gray-300 mx-1" />

              <button
                type="button"
                title="Undo"
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Undo className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                title="Redo"
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Redo className="w-3.5 h-3.5" />
              </button>
              <div className="w-[1px] h-4 bg-gray-300 mx-1" />

              <button
                type="button"
                title="Bold"
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                title="Italic"
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                title="Underline"
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Underline className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                title="Strikethrough"
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Strikethrough className="w-3.5 h-3.5" />
              </button>
              <div className="w-[1px] h-4 bg-gray-300 mx-1" />

              <button
                type="button"
                title="Align left"
                className="p-1 hover:bg-gray-100 rounded"
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                title="Align center"
                className="p-1 hover:bg-gray-100 rounded"
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                title="Align right"
                className="p-1 hover:bg-gray-100 rounded"
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                title="Justify"
                className="p-1 hover:bg-gray-100 rounded"
              >
                <AlignJustify className="w-3.5 h-3.5" />
              </button>
              <div className="w-[1px] h-4 bg-gray-300 mx-1" />

              <button
                type="button"
                title="Bullet list"
                className="p-1 hover:bg-gray-100 rounded"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                title="Numbered list"
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ListOrdered className="w-3.5 h-3.5" />
              </button>
              <div className="w-[1px] h-4 bg-gray-300 mx-1" />

              <button
                type="button"
                title="Font color"
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Type className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                title="Highlight"
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Highlighter className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                title="Insert image"
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ImageIcon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                title="Insert video"
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Video className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                title="Insert link"
                className="p-1 hover:bg-gray-100 rounded"
              >
                <LinkIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Editable Area */}
            <textarea
              rows={9}
              value={contentBody}
              onChange={(e) => setContentBody(e.target.value)}
              placeholder="Write your comprehensive affiliate terms, marketing guidelines, or payout instructions here..."
              className="w-full p-4 text-[13px] text-gray-800 placeholder-gray-400 focus:outline-none resize-y min-h-[180px]"
            />

            {/* TinyMCE Bottom Status Bar: "p" on left, "tiny" on right */}
            <div className="flex items-center justify-between px-3 py-1 bg-[#f9f9f9] border-t border-[#e5e5e5] text-[11px] text-gray-500">
              <span className="font-mono">p</span>
              <span className="font-semibold text-gray-400 flex items-center gap-1">
                <span>⚡</span> tiny
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Save Changes Button (Bottom Right) */}
      <div className="absolute right-5 bottom-4">
        <button
          type="button"
          onClick={handleSaveClick}
          className="px-4 py-2 bg-[#007bff] hover:bg-[#0069d9] text-white rounded-[3px] text-[13px] font-semibold transition cursor-pointer shadow-2xs"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
