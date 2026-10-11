import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  PackageCheck,
  Package,
  MessageSquare,
  Star,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

export default function ModeratorDashboardPage() {
  const stats = [
    { title: "Pending Products", value: "12", icon: PackageCheck, color: "text-amber-600", bg: "bg-amber-50", link: "/moderator/products/pending" },
    { title: "Reported Comments", value: "5", icon: MessageSquare, color: "text-red-600", bg: "bg-red-50", link: "/moderator/comments" },
    { title: "Reported Reviews", value: "3", icon: Star, color: "text-purple-600", bg: "bg-purple-50", link: "/moderator/reviews" },
    { title: "Reported Users", value: "2", icon: Users, color: "text-blue-600", bg: "bg-blue-50", link: "/moderator/users" },
  ];

  const pendingQueue = [
    { id: "PRD-501", title: "Handmade Ceramic Coffee Mug Set", vendor: "CeramicStudio", date: "10 mins ago", price: "$28.00" },
    { id: "PRD-498", title: "Vintage Bohemian Silver Earrings", vendor: "TrendShop", date: "45 mins ago", price: "$42.00" },
    { id: "PRD-492", title: "Custom Leather Card Wallet", vendor: "UrbanCrafts", date: "2 hours ago", price: "$19.50" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Banner */}
      <div className="bg-white border border-gray-200 rounded-sm p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-amber-600" />
              Moderator Panel
            </h1>
            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-semibold rounded-xs">
              Staff Access
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Review listings, moderate community reviews, and maintain marketplace quality guidelines.
          </p>
        </div>
        <Link
          href="/moderator/products/pending"
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xs transition flex items-center gap-1.5 shadow-xs"
        >
          <PackageCheck className="w-4 h-4" />
          <span>Review Pending Products (12)</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={idx}
              href={item.link}
              className="bg-white border border-gray-200 rounded-sm p-5 flex items-center justify-between hover:border-[#00a99d] transition block"
            >
              <div>
                <p className="text-xs font-medium text-gray-500">{item.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{item.value}</p>
              </div>
              <div className={`w-11 h-11 rounded-sm ${item.bg} ${item.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pending Approval Table */}
      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Products Awaiting Verification
          </h2>
          <Link href="/moderator/products/pending" className="text-xs text-[#00a99d] font-semibold hover:underline">
            View All Pending →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                <th className="py-2.5 px-4">Item ID</th>
                <th className="py-2.5 px-4">Product Title</th>
                <th className="py-2.5 px-4">Vendor</th>
                <th className="py-2.5 px-4">Price</th>
                <th className="py-2.5 px-4">Submitted</th>
                <th className="py-2.5 px-4 text-right">Moderation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pendingQueue.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 font-bold text-amber-700">{item.id}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900">{item.title}</td>
                  <td className="py-3 px-4 text-gray-500">{item.vendor}</td>
                  <td className="py-3 px-4 font-bold">{item.price}</td>
                  <td className="py-3 px-4 text-gray-400">{item.date}</td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      type="button"
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xs text-[11px] font-semibold transition"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-xs text-[11px] font-semibold transition"
                    >
                      Reject
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
