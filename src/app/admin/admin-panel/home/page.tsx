import React from "react";
import Link from "next/link";
import {
  ShoppingBag,
  DollarSign,
  Package,
  Users,
  CreditCard,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function AdminPanelHomePage() {
  const stats = [
    { title: "Total Orders", value: "328", sub: "12 pending today", icon: ShoppingBag, color: "bg-blue-600", link: "/admin/admin-panel/orders" },
    { title: "Total Sales", value: "$48,920.00", sub: "+14% from last month", icon: DollarSign, color: "bg-emerald-600", link: "/admin/admin-panel/earnings" },
    { title: "Total Products", value: "1,420", sub: "28 pending review", icon: Package, color: "bg-amber-600", link: "/admin/admin-panel/products" },
    { title: "Registered Users", value: "852", sub: "64 active vendors", icon: Users, color: "bg-purple-600", link: "/admin/admin-panel/membership" },
  ];

  const latestOrders = [
    { id: "#10042", user: "John Doe", total: "$149.00", payment: "Stripe", status: "Completed", date: "10 mins ago" },
    { id: "#10041", user: "Sarah Miller", total: "$75.50", payment: "PayPal", status: "Processing", date: "25 mins ago" },
    { id: "#10040", user: "David Lee", total: "$320.00", payment: "Bank Wire", status: "Pending", date: "1 hour ago" },
    { id: "#10039", user: "Emma Watson", total: "$84.00", payment: "Credit Card", status: "Completed", date: "3 hours ago" },
  ];

  return (
    <div className="space-y-6">
      {/* Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-xs text-gray-500 mt-0.5">Welcome to Modesy Central Administration &amp; Control</p>
        </div>
        <div className="text-xs text-gray-500 flex items-center gap-1.5">
          <Link href="/admin/admin-panel/home" className="text-[#00a99d] hover:underline">Admin Panel</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Home</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-white border border-gray-200 rounded-sm shadow-xs overflow-hidden">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500">{s.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{s.sub}</p>
                </div>
                <div className={`w-12 h-12 rounded-sm ${s.color} text-white flex items-center justify-center shadow-xs`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <Link
                href={s.link}
                className="block bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 px-4 py-2 text-xs font-semibold border-t border-gray-100 transition text-right"
              >
                More info →
              </Link>
            </div>
          );
        })}
      </div>

      {/* Latest Orders & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders Table */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-sm p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#00a99d]" />
              Latest Marketplace Orders
            </h2>
            <Link href="/admin/admin-panel/orders" className="text-xs text-[#00a99d] hover:underline font-semibold">
              View All Orders
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                <tr>
                  <th className="py-2.5 px-3">Order</th>
                  <th className="py-2.5 px-3">Buyer</th>
                  <th className="py-2.5 px-3">Total</th>
                  <th className="py-2.5 px-3">Method</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {latestOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50 transition">
                    <td className="py-2.5 px-3 font-bold text-[#00a99d]">{ord.id}</td>
                    <td className="py-2.5 px-3 font-medium text-gray-900">{ord.user}</td>
                    <td className="py-2.5 px-3 font-bold">{ord.total}</td>
                    <td className="py-2.5 px-3 text-gray-500">{ord.payment}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-xs text-[10px] font-bold ${
                        ord.status === "Completed" ? "bg-emerald-100 text-emerald-800" :
                        ord.status === "Processing" ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right text-gray-400">{ord.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick System Status */}
        <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-gray-900 pb-3 border-b border-gray-100">
            System &amp; Marketplace Health
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded">
              <span className="text-gray-600">Cache Status</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-semibold rounded text-[11px]">Enabled</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded">
              <span className="text-gray-600">Pending Products</span>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-semibold rounded text-[11px]">28 items</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded">
              <span className="text-gray-600">Refund Requests</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-semibold rounded text-[11px]">2 requests</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded">
              <span className="text-gray-600">Version</span>
              <span className="font-bold text-gray-800">Modesy v2.4.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
