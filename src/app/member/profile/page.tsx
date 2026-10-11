import React from "react";
import Link from "next/link";
import { User, Mail, Calendar, MapPin, Edit3 } from "lucide-react";

export default function MemberProfilePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/member" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Profile</span>
      </nav>

      {/* Profile Card */}
      <div className="bg-white border border-gray-200 rounded-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-[#00a99d]/10 text-[#00a99d] flex items-center justify-center font-bold text-2xl border-2 border-[#00a99d]/20">
              M
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">member</h1>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> member@codingest.com
              </p>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Member since: 2024</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> United States</span>
              </div>
            </div>
          </div>
          <Link
            href="/member/settings"
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-[#00a99d] text-gray-700 hover:text-[#00a99d] text-xs font-semibold rounded-xs transition"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Profile
          </Link>
        </div>

        {/* Member Tabs */}
        <div className="mt-6">
          <div className="flex border-b border-gray-200 text-sm font-medium">
            <button type="button" className="pb-3 px-4 border-b-2 border-[#00a99d] text-[#00a99d] font-semibold">
              Activity &amp; Reviews
            </button>
            <Link href="/member/orders" className="pb-3 px-4 text-gray-500 hover:text-gray-800">
              Orders
            </Link>
            <Link href="/member/downloads" className="pb-3 px-4 text-gray-500 hover:text-gray-800">
              Downloads
            </Link>
          </div>
          <div className="py-12 text-center text-gray-400 text-sm">
            <p>No public activity or reviews yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
