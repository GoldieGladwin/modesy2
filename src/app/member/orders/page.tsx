import React from "react";
import Link from "next/link";
import { ShoppingBag, Eye, ExternalLink } from "lucide-react";

export default function MemberOrdersPage() {
  const sampleOrders = [
    {
      id: "#10042",
      date: "Oct 08, 2026",
      items: "Diamond Pendant Necklace x 1",
      total: "$120.00",
      paymentStatus: "Paid",
      orderStatus: "Completed",
    },
    {
      id: "#10038",
      date: "Sep 29, 2026",
      items: "Vintage Leather Handbag x 1",
      total: "$85.00",
      paymentStatus: "Paid",
      orderStatus: "Shipped",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/member" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Orders</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#00a99d]" />
            My Orders
          </h1>
          <span className="text-xs text-gray-500">Showing {sampleOrders.length} orders</span>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sampleOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/80 transition">
                  <td className="py-3 px-4 font-bold text-[#00a99d]">{order.id}</td>
                  <td className="py-3 px-4 text-gray-500">{order.date}</td>
                  <td className="py-3 px-4 font-medium">{order.items}</td>
                  <td className="py-3 px-4 font-bold text-gray-900">{order.total}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-xs text-[11px] font-semibold">
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-xs text-[11px] font-semibold">
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button type="button" className="inline-flex items-center gap-1 text-[#00a99d] hover:underline font-semibold">
                      <Eye className="w-3.5 h-3.5" /> Details
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
