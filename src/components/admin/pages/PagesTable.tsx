"use client";

import React from "react";
import { ArrowUpDown } from "lucide-react";
import { CMSPage } from "./types";
import PagesVisibilityBadge from "./PagesVisibilityBadge";
import PagesTypeBadge from "./PagesTypeBadge";
import PagesRowOptions from "./PagesRowOptions";

interface PagesTableProps {
  pages: CMSPage[];
  onToggleVisibility?: (id: number) => void;
  onEdit?: (page: CMSPage) => void;
  onDelete?: (id: number) => void;
}

export default function PagesTable({
  pages,
  onToggleVisibility,
  onEdit,
  onDelete,
}: PagesTableProps) {
  if (pages.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500 bg-white border border-gray-100 rounded-[3px]">
        No pages found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-[#333333] text-[13px] font-semibold">
            <th className="py-2.5 px-3 w-14">
              <div className="flex items-center gap-1.5 cursor-pointer">
                <span>Id</span>
                <ArrowUpDown className="w-3 h-3 text-gray-400" />
              </div>
            </th>
            <th className="py-2.5 px-3">
              <div className="flex items-center gap-1.5 cursor-pointer">
                <span>Title</span>
                <ArrowUpDown className="w-3 h-3 text-gray-400" />
              </div>
            </th>
            <th className="py-2.5 px-3">
              <div className="flex items-center gap-1.5 cursor-pointer">
                <span>Language</span>
                <ArrowUpDown className="w-3 h-3 text-gray-400" />
              </div>
            </th>
            <th className="py-2.5 px-3">
              <div className="flex items-center gap-1.5 cursor-pointer">
                <span>Location</span>
                <ArrowUpDown className="w-3 h-3 text-gray-400" />
              </div>
            </th>
            <th className="py-2.5 px-3">
              <div className="flex items-center gap-1.5 cursor-pointer">
                <span>Visibility</span>
                <ArrowUpDown className="w-3 h-3 text-gray-400" />
              </div>
            </th>
            <th className="py-2.5 px-3">
              <div className="flex items-center gap-1.5 cursor-pointer">
                <span>Page Type</span>
                <ArrowUpDown className="w-3 h-3 text-gray-400" />
              </div>
            </th>
            <th className="py-2.5 px-3">
              <div className="flex items-center gap-1.5 cursor-pointer">
                <span>Date</span>
                <ArrowUpDown className="w-3 h-3 text-gray-400" />
              </div>
            </th>
            <th className="py-2.5 px-3">
              <div className="flex items-center gap-1.5 cursor-pointer">
                <span>Options</span>
                <ArrowUpDown className="w-3 h-3 text-gray-400" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-[13px] text-[#555555]">
          {pages.map((p) => (
            <tr key={p.id} className="hover:bg-[#fbfcfd] transition-colors">
              <td className="py-3 px-3 text-[#6c757d]">{p.id}</td>
              <td className="py-3 px-3 font-normal text-[#333333]">{p.title}</td>
              <td className="py-3 px-3">{p.language}</td>
              <td className="py-3 px-3">{p.location}</td>
              <td className="py-3 px-3">
                <PagesVisibilityBadge
                  isVisible={p.isVisible}
                  onToggle={() => onToggleVisibility?.(p.id)}
                />
              </td>
              <td className="py-3 px-3">
                <PagesTypeBadge pageType={p.pageType} />
              </td>
              <td className="py-3 px-3 text-[#777777] text-[12.5px] whitespace-nowrap">
                {p.date}
              </td>
              <td className="py-3 px-3 whitespace-nowrap">
                <PagesRowOptions
                  page={p}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
