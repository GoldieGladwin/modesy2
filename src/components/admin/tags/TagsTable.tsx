"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import { AdminTag } from "./types";

interface TagsTableProps {
  tags: AdminTag[];
  onEdit: (tag: AdminTag) => void;
  onDelete: (tag: AdminTag) => void;
}

export default function TagsTable({ tags, onEdit, onDelete }: TagsTableProps) {
  if (tags.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-gray-500 bg-white border border-gray-200 rounded-[3px]">
        No tags found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full border-t border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-[#333333] text-xs font-semibold bg-white">
            <th className="py-3 px-3.5 w-16">Id</th>
            <th className="py-3 px-3.5">Tag</th>
            <th className="py-3 px-3.5 w-36">Language</th>
            <th className="py-3 px-3.5 w-24">Posts</th>
            <th className="py-3 px-3.5 w-28 text-right">Options</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
          {tags.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-[#fbfcfd] transition-colors"
            >
              <td className="py-3 px-3.5 text-gray-500 font-medium">
                {item.id}
              </td>
              <td className="py-3 px-3.5 text-gray-800 font-normal">
                {item.tag}
              </td>
              <td className="py-3 px-3.5 text-gray-600">
                {item.language}
              </td>
              <td className="py-3 px-3.5 text-gray-700 font-medium">
                {item.posts}
              </td>
              <td className="py-3 px-3.5 text-right whitespace-nowrap">
                <div className="inline-flex items-center gap-1.5 justify-end">
                  {/* Edit button */}
                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    className="bg-white border border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-2.5 py-1 text-xs rounded-[3px] font-medium shadow-2xs transition cursor-pointer"
                    title="Edit tag"
                  >
                    Edit
                  </button>

                  {/* Delete button */}
                  <button
                    type="button"
                    onClick={() => onDelete(item)}
                    className="bg-white border border-gray-300 text-gray-600 hover:text-red-600 hover:border-red-300 px-2 py-1 text-xs rounded-[3px] shadow-2xs transition cursor-pointer"
                    title="Delete tag"
                    aria-label={`Delete tag ${item.tag}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
