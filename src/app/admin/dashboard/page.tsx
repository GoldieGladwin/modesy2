import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ShieldAlert,
  Wallet,
  ShoppingBag,
  ExternalLink,
  Users,
} from "lucide-react";

export default function AdminStoreDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/admin" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Dashboard</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-2xl">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900">Admin Account</h1>
                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded">Super Admin</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">admin@codingest.com</p>
            </div>
          </div>
          <Link
            href="/admin/admin-panel"
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xs transition inline-flex items-center gap-2 shadow"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Go to Admin Panel (35 Modules)</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/admin/wallet" className="p-4 bg-gray-50 hover:bg-gray-100/80 rounded border border-gray-100 transition block">
            <Wallet className="w-5 h-5 text-[#00a99d] mb-1" />
            <h3 className="font-bold text-xs text-gray-800">My Wallet</h3>
            <p className="text-sm font-bold text-gray-900 mt-1">$12,450.00</p>
          </Link>
          <Link href="/admin/orders" className="p-4 bg-gray-50 hover:bg-gray-100/80 rounded border border-gray-100 transition block">
            <ShoppingBag className="w-5 h-5 text-blue-600 mb-1" />
            <h3 className="font-bold text-xs text-gray-800">My Orders</h3>
            <p className="text-sm font-bold text-gray-900 mt-1">14 orders placed</p>
          </Link>
          <Link href="/admin/my-coupons" className="p-4 bg-gray-50 hover:bg-gray-100/80 rounded border border-gray-100 transition block">
            <LayoutDashboard className="w-5 h-5 text-purple-600 mb-1" />
            <h3 className="font-bold text-xs text-gray-800">Available Coupons</h3>
            <p className="text-sm font-bold text-gray-900 mt-1">4 active promos</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
