import React from "react";
import Link from "next/link";
import { ShoppingBag, Eye, Filter, Download, CheckCircle, Clock } from "lucide-react";

export default function AdminPanelOrdersPage() {
  const orders = [
    { id: "10042", buyer: "Sarah Jenkins", total: "$125.00", paymentStatus: "Paid", orderStatus: "Completed", date: "2026-10-09" },
    { id: "10041", buyer: "Michael Brown", total: "$84.50", paymentStatus: "Paid", orderStatus: "Processing", date: "2026-10-09" },
    { id: "10040", buyer: "David Miller", total: "$320.00", paymentStatus: "Awaiting Payment", orderStatus: "Pending", date: "2026-10-08" },
    { id: "10039", buyer: "Jessica Alba", total: "$45.00", paymentStatus: "Paid", orderStatus: "Shipped", date: "2026-10-08" },
    { id: "10038", buyer: "Robert Fox", total: "$210.00", paymentStatus: "Paid", orderStatus: "Completed", date: "2026-10-07" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#00a99d]" /> Orders
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage all customer purchases across the marketplace</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-xs font-semibold rounded hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer">
            <Filter className="w-3.5 h-3.5" /> Filter
          </button>
          <button className="px-3 py-1.5 bg-[#00a99d] text-white text-xs font-semibold rounded hover:bg-[#008f85] flex items-center gap-1.5 cursor-pointer">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200 uppercase">
              <tr>
                <th className="py-2.5 px-3">Order ID</th>
                <th className="py-2.5 px-3">Buyer</th>
                <th className="py-2.5 px-3">Total Amount</th>
                <th className="py-2.5 px-3">Payment</th>
                <th className="py-2.5 px-3">Order Status</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50/70">
                  <td className="py-3 px-3 font-bold text-gray-900">#{o.id}</td>
                  <td className="py-3 px-3 font-medium text-gray-800">{o.buyer}</td>
                  <td className="py-3 px-3 font-bold text-gray-900">{o.total}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      o.paymentStatus === "Paid" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {o.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      o.orderStatus === "Completed" ? "bg-green-100 text-green-800" :
                      o.orderStatus === "Shipped" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {o.orderStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-500">{o.date}</td>
                  <td className="py-3 px-3 text-right">
                    <button className="px-2.5 py-1 bg-gray-100 hover:bg-[#00a99d] hover:text-white rounded text-[11px] font-medium transition cursor-pointer">
                      Details
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
