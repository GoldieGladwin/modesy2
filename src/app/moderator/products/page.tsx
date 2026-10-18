import React from "react";
import Link from "next/link";
import { Package, Search, CheckCircle, XCircle } from "lucide-react";
import { jewelryProductsData } from "@/data/products";

export default function ModeratorProductsPage() {
  const products = jewelryProductsData.slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/moderator" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <Link href="/moderator/dashboard" className="hover:text-[#00a99d]">Dashboard</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">All Products</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 mb-4">
          <div>
            <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-600" />
              All Marketplace Products
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">Showing all approved &amp; published product listings</p>
          </div>
          <Link
            href="/moderator/products/pending"
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xs text-xs font-semibold"
          >
            Pending Queue (12)
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Seller</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img src={p.image} alt={p.title} className="w-10 h-10 object-cover rounded border border-gray-200" />
                    <span className="font-semibold text-gray-900 line-clamp-1">{p.title}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{p.seller}</td>
                  <td className="py-3 px-4 text-gray-500">{p.category || "Jewelry"}</td>
                  <td className="py-3 px-4 font-bold">{p.price}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-xs text-[11px] font-semibold">
                      Approved
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button type="button" className="text-red-600 hover:underline font-semibold">
                      Unpublish
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
