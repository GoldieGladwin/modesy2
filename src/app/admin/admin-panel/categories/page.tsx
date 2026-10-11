import React from "react";
import { FolderTree, PlusCircle, Edit, Trash2 } from "lucide-react";

export default function AdminCategoriesPage() {
  const categories = [
    { id: 1, name: "Clothing & Shoes", slug: "clothing-shoes", parent: "None (Main)", order: 1, productsCount: 142 },
    { id: 2, name: "Home & Living", slug: "home-living", parent: "None (Main)", order: 2, productsCount: 98 },
    { id: 3, name: "Jewelry & Accessories", slug: "jewelry-accessories", parent: "None (Main)", order: 3, productsCount: 75 },
    { id: 4, name: "Toys & Entertainment", slug: "toys-entertainment", parent: "None (Main)", order: 4, productsCount: 54 },
    { id: 5, name: "Vintage", slug: "vintage", parent: "None (Main)", order: 5, productsCount: 31 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-[#00a99d]" /> Categories
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage hierarchical marketplace product taxonomies</p>
        </div>
        <button className="px-3.5 py-1.5 bg-[#00a99d] text-white text-xs font-bold rounded hover:bg-[#008f85] transition flex items-center gap-1.5 cursor-pointer">
          <PlusCircle className="w-3.5 h-3.5" /> Add Category
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200 uppercase">
              <tr>
                <th className="py-2.5 px-3">Order</th>
                <th className="py-2.5 px-3">Category Name</th>
                <th className="py-2.5 px-3">Slug</th>
                <th className="py-2.5 px-3">Parent</th>
                <th className="py-2.5 px-3">Total Items</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/70">
                  <td className="py-3 px-3 font-bold text-gray-400">#{c.order}</td>
                  <td className="py-3 px-3 font-semibold text-gray-900">{c.name}</td>
                  <td className="py-3 px-3 font-mono text-gray-500">{c.slug}</td>
                  <td className="py-3 px-3 text-gray-600">{c.parent}</td>
                  <td className="py-3 px-3 font-bold text-[#00a99d]">{c.productsCount}</td>
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
