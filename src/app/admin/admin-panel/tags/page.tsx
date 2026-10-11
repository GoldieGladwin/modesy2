import React from "react";
import { Tag, PlusCircle, Trash2, Edit } from "lucide-react";

export default function AdminTagsPage() {
  const tags = [
    { id: 1, name: "Handmade", slug: "handmade", usageCount: 68 },
    { id: 2, name: "Organic", slug: "organic", usageCount: 42 },
    { id: 3, name: "Vintage", slug: "vintage", usageCount: 39 },
    { id: 4, name: "Summer", slug: "summer", usageCount: 25 },
    { id: 5, name: "Leather", slug: "leather", usageCount: 19 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#00a99d]" /> Tags
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage search keywords and product classification tags</p>
        </div>
        <button className="px-3.5 py-1.5 bg-[#00a99d] text-white text-xs font-bold rounded hover:bg-[#008f85] transition flex items-center gap-1.5 cursor-pointer">
          <PlusCircle className="w-3.5 h-3.5" /> Add Tag
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200 uppercase">
              <tr>
                <th className="py-2.5 px-3">Tag Name</th>
                <th className="py-2.5 px-3">Slug</th>
                <th className="py-2.5 px-3">Products Associated</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tags.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50/70">
                  <td className="py-3 px-3 font-semibold text-gray-900">{t.name}</td>
                  <td className="py-3 px-3 font-mono text-gray-500">#{t.slug}</td>
                  <td className="py-3 px-3 font-bold text-[#00a99d]">{t.usageCount}</td>
                  <td className="py-3 px-3 text-right space-x-2">
                    <button className="text-gray-500 hover:text-[#00a99d]"><Edit className="w-3.5 h-3.5 inline" /></button>
                    <button className="text-gray-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5 inline" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
