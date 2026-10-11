"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FontItem } from "./types";

interface FontsTableCardProps {
  fonts: FontItem[];
  onDelete: (id: number) => void;
}

export default function FontsTableCard({
  fonts,
  onDelete,
}: FontsTableCardProps) {
  const [pageSize, setPageSize] = useState<number>(15);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);

  const filteredFonts = fonts.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.fontFamily.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5 space-y-4">
      {/* Header and Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
        <h2 className="text-sm font-bold text-gray-800">Fonts</h2>

        <div className="flex items-center gap-4 flex-wrap">
          {/* Show count */}
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span>Show</span>
            <div className="relative">
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="bg-white border border-gray-300 rounded-[3px] px-2 py-1 text-xs text-gray-700 pr-6 appearance-none focus:outline-none focus:border-[#00a99d]"
              >
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
              <ChevronDown className="w-3 h-3 text-gray-500 absolute right-1.5 top-2 pointer-events-none" />
            </div>
          </div>

          {/* Search box */}
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span>Search:</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-gray-300 rounded-[3px] px-2.5 py-1 text-xs text-gray-700 focus:outline-none focus:border-[#00a99d] w-36 sm:w-44"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-[#333333] text-xs font-semibold bg-white">
              <th className="py-2.5 px-3 w-16">Id</th>
              <th className="py-2.5 px-3 w-40">Name</th>
              <th className="py-2.5 px-3">Font Family</th>
              <th className="py-2.5 px-3 w-36 text-right">Options</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
            {filteredFonts.map((font) => (
              <tr key={font.id} className="hover:bg-gray-50/70 transition-colors">
                <td className="py-3 px-3 text-gray-500">{font.id}</td>

                {/* Name */}
                <td className="py-3 px-3 font-semibold text-gray-800">
                  {font.name}
                </td>

                {/* Font Family */}
                <td className="py-3 px-3 text-gray-600 font-mono text-[11px]">
                  {font.fontFamily}
                </td>

                {/* Options Dropdown */}
                <td className="py-3 px-3 text-right relative">
                  <div className="inline-block text-left">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdownId(
                          activeDropdownId === font.id ? null : font.id
                        )
                      }
                      className="inline-flex items-center gap-1.5 bg-[#605ca8] hover:bg-[#504c94] text-white text-xs font-semibold px-3 py-1 rounded-[3px] shadow-xs transition cursor-pointer"
                    >
                      <span>Select an option</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>

                    {activeDropdownId === font.id && (
                      <div className="absolute right-3 mt-1 w-32 bg-white border border-gray-200 rounded-[3px] shadow-lg z-30 py-1 text-left">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveDropdownId(null);
                            alert(`Edit font "${font.name}"`);
                          }}
                          className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveDropdownId(null);
                            onDelete(font.id);
                          }}
                          className="w-full px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-500">
        <div>
          Showing 1 to {filteredFonts.length} of {fonts.length} entries
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-[2px] hover:bg-gray-100 cursor-pointer text-gray-600"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center bg-[#007bff] text-white rounded-[2px] font-bold shadow-2xs"
          >
            1
          </button>
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-[2px] hover:bg-gray-100 cursor-pointer text-gray-700"
          >
            2
          </button>
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-[2px] hover:bg-gray-100 cursor-pointer text-gray-700"
          >
            3
          </button>
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-[2px] hover:bg-gray-100 cursor-pointer text-gray-600"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
