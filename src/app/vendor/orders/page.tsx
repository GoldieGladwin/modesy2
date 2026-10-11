import React from "react";
import Link from "next/link";
import { ShoppingBag, Eye } from "lucide-react";

export default function VendorOrdersPage() {
  const vendorOrders = [
    { id: "#ORD-9901", date: "Oct 09, 2026", product: "Vintage Leather Jacket", qty: 1, total: "$149.00", fee: "$14.90", earned: "$134.10", status: "Completed" },
    { id: "#ORD-9884", date: "Oct 06, 2026", product: "Minimalist Gold Ring", qty: 2, total: "$150.00", fee: "$15.00", earned: "$135.00", status: "Processing" },
    { id: "#ORD-9872", date: "Sep 28, 2026", product: "Handcrafted Ceramic Mug", qty: 1, total: "$32.00", fee: "$3.20", earned: "$28.80", status: "Shipped" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/vendor" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <Link href="/vendor/dashboard" className="hover:text-[#00a99d]">Dashboard</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Sales Orders</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-100">
          <ShoppingBag className="w-5 h-5 text-[#00a99d]" />
          Vendor Sales &amp; Orders
        </h1>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Commission</th>
                <th className="py-3 px-4 font-bold text-emerald-800">You Earned</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {vendorOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 font-bold text-[#00a99d]">{ord.id}</td>
                  <td className="py-3 px-4 text-gray-500">{ord.date}</td>
                  <td className="py-3 px-4 font-medium">{ord.product} (x{ord.qty})</td>
                  <td className="py-3 px-4">{ord.total}</td>
                  <td className="py-3 px-4 text-red-500">-{ord.fee}</td>
                  <td className="py-3 px-4 font-bold text-emerald-600">{ord.earned}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-xs text-[11px] font-semibold">
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button type="button" className="text-[#00a99d] font-semibold hover:underline inline-flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> View
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
