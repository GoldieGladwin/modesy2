"use client";

import React, { useState } from "react";
import {
  Check,
  Globe,
  Download,
  ChevronDown,
  Edit2,
  Trash2,
} from "lucide-react";
import { LanguageItem } from "./types";

interface LanguagesTableProps {
  languages: LanguageItem[];
  onSetDefault: (id: number) => void;
  onEditTranslations: (lang: LanguageItem) => void;
  onExport: (lang: LanguageItem) => void;
  onEdit: (lang: LanguageItem) => void;
  onDelete: (id: number) => void;
}

export default function LanguagesTable({
  languages,
  onSetDefault,
  onEditTranslations,
  onExport,
  onEdit,
  onDelete,
}: LanguagesTableProps) {
  const [pageSize, setPageSize] = useState<number>(15);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);

  const filteredLanguages = languages.filter((l) =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5 space-y-4">
      {/* Card Header & Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
        <h2 className="text-sm font-bold text-gray-800">Languages</h2>

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
              <th className="py-2.5 px-3">Language Name</th>
              <th className="py-2.5 px-3 w-44">Default Language</th>
              <th className="py-2.5 px-3 w-56">Translation / Export</th>
              <th className="py-2.5 px-3 w-36 text-right">Options</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
            {filteredLanguages.map((lang) => (
              <tr key={lang.id} className="hover:bg-gray-50/70 transition-colors">
                <td className="py-3 px-3 text-gray-500">{lang.id}</td>

                {/* Language Name + Active badge */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">
                      {lang.name}
                    </span>
                    {lang.isActive && (
                      <span className="bg-[#28a745] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-[2px] shadow-2xs">
                        Active
                      </span>
                    )}
                  </div>
                </td>

                {/* Default Language Column */}
                <td className="py-3 px-3">
                  {lang.isDefault ? (
                    <span className="inline-block bg-[#e4e7ea] text-gray-600 font-semibold text-xs px-3 py-1 rounded-[3px]">
                      Default
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSetDefault(lang.id)}
                      className="inline-flex items-center gap-1 bg-[#28a745] hover:bg-[#218838] text-white font-medium text-xs px-3 py-1 rounded-[3px] shadow-xs transition cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Set as Default</span>
                    </button>
                  )}
                </td>

                {/* Translation / Export Column */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onEditTranslations(lang)}
                      className="inline-flex items-center gap-1.5 bg-[#17a2b8] hover:bg-[#138496] text-white text-xs font-semibold px-2.5 py-1 rounded-[3px] shadow-xs transition cursor-pointer"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Edit Translations</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onExport(lang)}
                      className="inline-flex items-center gap-1.5 bg-[#f39c12] hover:bg-[#e08e0b] text-white text-xs font-semibold px-2.5 py-1 rounded-[3px] shadow-xs transition cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export</span>
                    </button>
                  </div>
                </td>

                {/* Options Dropdown Column */}
                <td className="py-3 px-3 text-right relative">
                  <div className="inline-block text-left">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdownId(
                          activeDropdownId === lang.id ? null : lang.id
                        )
                      }
                      className="inline-flex items-center gap-1.5 bg-[#605ca8] hover:bg-[#504c94] text-white text-xs font-semibold px-3 py-1 rounded-[3px] shadow-xs transition cursor-pointer"
                    >
                      <span>Select an option</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>

                    {activeDropdownId === lang.id && (
                      <div className="absolute right-3 mt-1 w-32 bg-white border border-gray-200 rounded-[3px] shadow-lg z-30 py-1 text-left">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveDropdownId(null);
                            onEdit(lang);
                          }}
                          className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-gray-500" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveDropdownId(null);
                            onDelete(lang.id);
                          }}
                          className="w-full px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
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
      <div className="flex justify-end pt-3 border-t border-gray-100">
        <div className="inline-flex items-center gap-1">
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 text-gray-500 text-xs rounded-[3px]"
          >
            ‹
          </button>
          <span className="w-7 h-7 flex items-center justify-center bg-[#337ab7] text-white text-xs font-bold rounded-[3px]">
            1
          </span>
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-300 text-gray-500 text-xs rounded-[3px]"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
