"use client";

import React from "react";
import { ArrowUpDown } from "lucide-react";
import { BlogCategory } from "./types";
import CategoryRowOptions from "./CategoryRowOptions";

interface CategoryTableProps {
  categories: BlogCategory[];
  onEdit?: (cat: BlogCategory) => void;
  onDelete?: (id: number) => void;
}

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  if (categories.length === 0) {
    return (
      <div className="py-10 text-center text-gray-500 bg-white border border-gray-100 rounded-[3px]">
        No categories found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-[#333333] text-[13px] font-semibold">
            <th className="py-2.5 px-3 w-16">
              <div className="flex items-center gap-1.5 cursor-pointer">
                <span>Id</span>
                <ArrowUpDown className="w-3 h-3 text-gray-400" />
              </div>
            </th>
            <th className="py-2.5 px-3">
              <div className="flex items-center gap-1.5 cursor-pointer">
                <span>Category Name</span>
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
                <span>Order</span>
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
          {categories.map((cat) => (
            <tr key={cat.id} className="hover:bg-[#fbfcfd] transition-colors">
              <td className="py-3 px-3 text-[#6c757d]">{cat.id}</td>
              <td className="py-3 px-3 font-normal text-[#333333]">{cat.name}</td>
              <td className="py-3 px-3">{cat.language}</td>
              <td className="py-3 px-3">{cat.order}</td>
              <td className="py-3 px-3">
                <CategoryRowOptions
                  category={cat}
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
