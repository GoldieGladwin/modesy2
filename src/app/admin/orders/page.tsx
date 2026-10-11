import React from "react";
import Link from "next/link";
import { ShoppingBag, Eye, Package, CheckCircle, Clock } from "lucide-react";

export default function AdminOrdersStorePage() {
  const mockOrders = [
    {
      id: "10024",
      date: "Oct 08, 2026",
      items: "Leather Casual Shoes (x1), Smart Watch V2 (x1)",
      total: "$189.00",
      paymentStatus: "Payment Received",
      status: "Processing",
    },
    {
      id: "10018",
      date: "Oct 02, 2026",
      items: "Modern Ceramic Lamp (x2)",
      total: "$78.50",
      paymentStatus: "Payment Received",
      status: "Completed",
    },
    {
      id: "10009",
      date: "Sep 28, 2026",
      items: "Minimalist Wooden Desk (x1)",
      total: "$340.00",
      paymentStatus: "Payment Received",
      status: "Completed",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/admin" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Orders</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 mb-6 gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#00a99d]" />
              My Orders
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              List of all purchases made using your admin storefront account.
            </p>
          </div>
          <Link
            href="/admin/admin-panel/orders"
            className="text-xs bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 font-semibold px-3 py-1.5 rounded transition inline-flex items-center gap-1.5 w-fit"
          >
            <span>Manage All Marketplace Orders &rarr;</span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Order Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-bold text-gray-900">#{order.id}</td>
                  <td className="py-3 px-4 text-gray-500">{order.date}</td>
                  <td className="py-3 px-4 max-w-xs truncate font-medium text-gray-800">
                    {order.items}
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-900">{order.total}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-semibold rounded text-[10px]">
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-medium inline-flex items-center gap-1 transition">
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
