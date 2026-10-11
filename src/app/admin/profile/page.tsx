import React from "react";
import Link from "next/link";
import { User, ShieldAlert, Mail, MapPin, Calendar, Edit3, ShoppingBag, Heart, Star } from "lucide-react";

export default function AdminProfilePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/admin" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Profile</span>
      </nav>

      {/* Profile Card Header */}
      <div className="bg-white border border-gray-200 rounded-sm p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-red-100 border-2 border-red-200 text-red-600 flex items-center justify-center font-bold text-3xl shadow-sm">
              <ShieldAlert className="w-10 h-10" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">admin</h1>
                <span className="px-2 py-0.5 bg-red-600 text-white text-[11px] font-bold rounded">
                  Admin
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> admin@codingest.com
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" /> New York, United States
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" /> Member since Jan 2024
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/profile-settings"
              className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold rounded-xs transition inline-flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </Link>
            <Link
              href="/admin/admin-panel"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xs transition inline-flex items-center gap-1.5"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </Link>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          <div className="text-center p-3 bg-gray-50 rounded border border-gray-100">
            <div className="text-xl font-bold text-gray-900">24</div>
            <div className="text-xs text-gray-500 mt-0.5">Total Orders</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded border border-gray-100">
            <div className="text-xl font-bold text-gray-900">12</div>
            <div className="text-xs text-gray-500 mt-0.5">Wishlist Items</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded border border-gray-100">
            <div className="text-xl font-bold text-gray-900">5</div>
            <div className="text-xs text-gray-500 mt-0.5">Reviews Given</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded border border-gray-100">
            <div className="text-xl font-bold text-[#00a99d]">5.0 ★</div>
            <div className="text-xs text-gray-500 mt-0.5">Rating</div>
          </div>
        </div>
      </div>

      {/* Activity Tabs */}
      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 border-b border-gray-100 pb-3">
          About Account
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Master Super Administrator profile with full permission to manage store catalog, marketplace sellers, member accounts, financial earnings, and system preferences in Modesy.
        </p>
      </div>
    </div>
  );
}
