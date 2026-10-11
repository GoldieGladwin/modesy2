import React from "react";
import Link from "next/link";
import { Settings, User, Lock, MapPin } from "lucide-react";

export default function MemberSettingsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/member" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Settings</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-6 sm:p-8">
        <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-100 mb-6">
          <Settings className="w-5 h-5 text-[#00a99d]" />
          Account Settings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Side Tabs */}
          <div className="space-y-1">
            <button type="button" className="w-full text-left px-4 py-2.5 bg-gray-50 text-[#00a99d] font-semibold text-xs rounded flex items-center gap-2">
              <User className="w-4 h-4" /> Edit Profile
            </button>
            <button type="button" className="w-full text-left px-4 py-2.5 text-gray-600 hover:bg-gray-50 text-xs rounded flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Shipping Address
            </button>
            <button type="button" className="w-full text-left px-4 py-2.5 text-gray-600 hover:bg-gray-50 text-xs rounded flex items-center gap-2">
              <Lock className="w-4 h-4" /> Change Password
            </button>
          </div>

          {/* Form */}
          <div className="md:col-span-3 space-y-4 max-w-xl text-xs">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Username</label>
              <input
                type="text"
                defaultValue="member"
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:border-[#00a99d] outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email Address</label>
              <input
                type="email"
                defaultValue="member@codingest.com"
                disabled
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-xs text-gray-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">About Me / Bio</label>
              <textarea
                rows={3}
                placeholder="Write something about yourself..."
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:border-[#00a99d] outline-none"
              />
            </div>
            <button
              type="button"
              className="bg-[#00a99d] text-white px-5 py-2.5 font-bold rounded hover:bg-[#008f85] transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
