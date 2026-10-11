import React from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Package,
  CreditCard,
  PlusCircle,
  TrendingUp,
  Store,
  ExternalLink,
} from "lucide-react";

export default function VendorDashboardPage() {
  const stats = [
    { title: "Total Sales", value: "$4,820.00", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Available Balance", value: "$1,240.50", icon: CreditCard, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Total Orders", value: "86", icon: ShoppingBag, color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Active Products", value: "24", icon: Package, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  const recentOrders = [
    { id: "#ORD-9901", product: "Vintage Leather Jacket", customer: "John Doe", amount: "$149.00", status: "Completed" },
    { id: "#ORD-9884", product: "Minimalist Gold Ring", customer: "Sarah Miller", amount: "$75.00", status: "Processing" },
    { id: "#ORD-9872", product: "Handcrafted Ceramic Mug", customer: "David Lee", amount: "$32.00", status: "Shipped" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white border border-gray-200 rounded-sm p-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">TrendShop Dashboard</h1>
            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-xs">
              Verified Vendor
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Welcome back! Here is a summary of your shop performance on Modesy.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/vendor/shop"
            className="px-4 py-2 border border-gray-300 text-gray-700 hover:border-[#00a99d] hover:text-[#00a99d] text-xs font-semibold rounded-xs inline-flex items-center gap-1.5 transition"
          >
            <Store className="w-4 h-4" />
            <span>View Public Shop</span>
          </Link>
          <Link
            href="/vendor/products/add"
            className="px-4 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-bold rounded-xs inline-flex items-center gap-1.5 transition shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white border border-gray-200 rounded-sm p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">{item.title}</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{item.value}</p>
              </div>
              <div className={`w-11 h-11 rounded-sm ${item.bg} ${item.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
          <h2 className="text-sm font-bold text-gray-900">Recent Sales &amp; Orders</h2>
          <Link href="/vendor/orders" className="text-xs text-[#00a99d] font-semibold hover:underline">
            View All Orders →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                <th className="py-2.5 px-4">Order ID</th>
                <th className="py-2.5 px-4">Product</th>
                <th className="py-2.5 px-4">Customer</th>
                <th className="py-2.5 px-4">Amount</th>
                <th className="py-2.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-50 transition">
                  <td className="py-2.5 px-4 font-bold text-[#00a99d]">{ord.id}</td>
                  <td className="py-2.5 px-4 font-medium text-gray-900">{ord.product}</td>
                  <td className="py-2.5 px-4 text-gray-500">{ord.customer}</td>
                  <td className="py-2.5 px-4 font-bold">{ord.amount}</td>
                  <td className="py-2.5 px-4">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-xs text-[11px] font-semibold">
                      {ord.status}
                    </span>
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
