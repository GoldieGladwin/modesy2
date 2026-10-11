import React from "react";
import Link from "next/link";
import { PackageCheck, CheckCircle, XCircle, Eye } from "lucide-react";

export default function ModeratorPendingProductsPage() {
  const pendingProducts = [
    { id: "PRD-501", title: "Handmade Ceramic Coffee Mug Set", vendor: "CeramicStudio", date: "10 mins ago", price: "$28.00", category: "Home & Living" },
    { id: "PRD-498", title: "Vintage Bohemian Silver Earrings", vendor: "TrendShop", date: "45 mins ago", price: "$42.00", category: "Jewelry & Accessories" },
    { id: "PRD-492", title: "Custom Leather Card Wallet", vendor: "UrbanCrafts", date: "2 hours ago", price: "$19.50", category: "Clothing" },
    { id: "PRD-487", title: "Digital Planner 2027 PDF Template", vendor: "PixelDesigns", date: "5 hours ago", price: "$12.00", category: "Graphics & Photos" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/moderator" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <Link href="/moderator/dashboard" className="hover:text-[#00a99d]">Dashboard</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Pending Products</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <div className="pb-4 border-b border-gray-100 mb-4">
          <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-amber-600" />
            Products Pending Approval ({pendingProducts.length})
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Products submitted by vendors that require review before going live
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Item ID</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Vendor</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Submitted</th>
                <th className="py-3 px-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pendingProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 font-bold text-amber-700">{p.id}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900">{p.title}</td>
                  <td className="py-3 px-4 text-gray-600">{p.vendor}</td>
                  <td className="py-3 px-4 text-gray-500">{p.category}</td>
                  <td className="py-3 px-4 font-bold">{p.price}</td>
                  <td className="py-3 px-4 text-gray-400">{p.date}</td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      type="button"
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xs text-[11px] font-semibold transition inline-flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3" /> Approve
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-xs text-[11px] font-semibold transition inline-flex items-center gap-1"
                    >
                      <XCircle className="w-3 h-3" /> Reject
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
