"use client";

import React from "react";
import {
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
  ListOrdered,
  List,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react";

interface RichTextEditorToolbarProps {
  onFormat?: (command: string) => void;
}

export default function RichTextEditorToolbar({
  onFormat,
}: RichTextEditorToolbarProps) {
  return (
    <div className="border-b border-gray-200 bg-white">
      {/* Top Menu Bar */}
      <div className="flex items-center gap-4 px-3 py-1 text-xs text-[#555] border-b border-gray-100 select-none">
        <span className="hover:text-black cursor-pointer">File</span>
        <span className="hover:text-black cursor-pointer">Edit</span>
        <span className="hover:text-black cursor-pointer">Insert</span>
        <span className="hover:text-black cursor-pointer">Format</span>
        <span className="hover:text-black cursor-pointer">Table</span>
      </div>

      {/* Main Buttons Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 text-gray-700">
        {/* Fullscreen / Code / Eye */}
        <button
          type="button"
          onClick={() => onFormat?.("fullscreen")}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-600 hover:text-black"
          title="Fullscreen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onFormat?.("code")}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-600 hover:text-black"
          title="Source code"
        >
          <Code className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onFormat?.("preview")}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-600 hover:text-black"
          title="Preview"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>

        <span className="w-[1px] h-4 bg-gray-200 mx-1" />

        {/* Undo / Redo */}
        <button
          type="button"
          onClick={() => onFormat?.("undo")}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-600 hover:text-black"
          title="Undo"
        >
          <Undo className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onFormat?.("redo")}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-600 hover:text-black"
          title="Redo"
        >
          <Redo className="w-3.5 h-3.5" />
        </button>

        <span className="w-[1px] h-4 bg-gray-200 mx-1" />

        {/* Text Styles */}
        <button
          type="button"
          onClick={() => onFormat?.("bold")}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-black font-bold"
          title="Bold"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onFormat?.("italic")}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-black"
          title="Italic"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onFormat?.("underline")}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-black"
          title="Underline"
        >
          <Underline className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onFormat?.("strikeThrough")}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-700 hover:text-black"
          title="Strikethrough"
        >
          <Strikethrough className="w-3.5 h-3.5" />
        </button>

        <span className="w-[1px] h-4 bg-gray-200 mx-1" />

        {/* Alignment */}
        <button
          type="button"
          onClick={() => onFormat?.("justifyLeft")}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-600 hover:text-black"
          title="Align Left"
        >
          <AlignLeft className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onFormat?.("justifyCenter")}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-600 hover:text-black"
          title="Align Center"
        >
          <AlignCenter className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onFormat?.("justifyRight")}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-600 hover:text-black"
          title="Align Right"
        >
          <AlignRight className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onFormat?.("justifyFull")}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-600 hover:text-black"
          title="Justify"
        >
          <AlignJustify className="w-3.5 h-3.5" />
        </button>

        <span className="w-[1px] h-4 bg-gray-200 mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => onFormat?.("insertOrderedList")}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-600 hover:text-black flex items-center"
          title="Numbered List"
        >
          <ListOrdered className="w-3.5 h-3.5" />
          <ChevronDown className="w-2.5 h-2.5 ml-0.5" />
        </button>
        <button
          type="button"
          onClick={() => onFormat?.("insertUnorderedList")}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-600 hover:text-black flex items-center"
          title="Bullet List"
        >
          <List className="w-3.5 h-3.5" />
          <ChevronDown className="w-2.5 h-2.5 ml-0.5" />
        </button>

        <span className="w-[1px] h-4 bg-gray-200 mx-1" />

        {/* Text color & Highlight */}
        <button
          type="button"
          className="px-1.5 py-1 hover:bg-gray-100 rounded text-xs font-bold text-gray-800 flex items-center gap-0.5"
          title="Text Color"
        >
          <span>A</span>
          <ChevronDown className="w-2.5 h-2.5" />
        </button>
        <button
          type="button"
          className="px-1.5 py-1 hover:bg-gray-100 rounded text-xs text-gray-700 flex items-center gap-0.5"
          title="Highlight Color"
        >
          <span>🖊️</span>
          <ChevronDown className="w-2.5 h-2.5" />
        </button>
        <button
          type="button"
          className="px-1.5 py-1 hover:bg-gray-100 rounded text-xs font-serif text-gray-600"
          title="Clear formatting"
        >
          T<sub className="text-[9px]">x</sub>
        </button>
        <button
          type="button"
          className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-black"
          title="More options"
        >
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
