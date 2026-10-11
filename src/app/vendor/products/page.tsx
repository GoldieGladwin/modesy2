import React from "react";
import Link from "next/link";
import { Package, PlusCircle, Search, Edit3, Trash2 } from "lucide-react";
import { jewelryProductsData } from "@/data/products";

export default function VendorProductsPage() {
  const products = jewelryProductsData.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/vendor" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <Link href="/vendor/dashboard" className="hover:text-[#00a99d]">Dashboard</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Products</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#00a99d]" />
              Manage Products
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">Total {products.length} products listed</p>
          </div>
          <Link
            href="/vendor/products/add"
            className="px-4 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-bold rounded-xs inline-flex items-center gap-1.5 transition shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-3 my-4">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded text-xs outline-none focus:border-[#00a99d]"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
          </div>
          <select className="border border-gray-300 text-xs text-gray-600 rounded px-3 py-1.5 outline-none">
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Draft</option>
          </select>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img src={p.image} alt={p.title} className="w-10 h-10 object-cover rounded border border-gray-200" />
                    <span className="font-semibold text-gray-900 line-clamp-1">{p.title}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{p.category || "Jewelry"}</td>
                  <td className="py-3 px-4 font-bold text-gray-900">{p.price}</td>
                  <td className="py-3 px-4 text-green-700 font-medium">In Stock</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-xs text-[11px] font-semibold">
                      Active
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button type="button" className="text-gray-500 hover:text-[#00a99d]">
                      <Edit3 className="w-4 h-4 inline" />
                    </button>
                    <button type="button" className="text-gray-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
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
