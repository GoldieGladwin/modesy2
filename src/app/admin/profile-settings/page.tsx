import React from "react";
import Link from "next/link";
import { Settings, Save, Lock, User, ShieldAlert, Mail } from "lucide-react";

export default function AdminProfileSettingsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/admin" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Profile Settings</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-6 sm:p-8">
        <div className="pb-4 border-b border-gray-100 mb-6">
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#00a99d]" />
            Profile Settings
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Update your administrator profile personal details and credentials.
          </p>
        </div>

        <form className="max-w-2xl space-y-5">
          <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xl border border-red-200">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <button
                type="button"
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-semibold cursor-pointer transition"
              >
                Change Avatar
              </button>
              <p className="text-[11px] text-gray-400 mt-1">Allowed JPG, PNG or WEBP (Max 2MB)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Username</label>
              <input
                type="text"
                defaultValue="admin"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                defaultValue="admin@codingest.com"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">First Name</label>
              <input
                type="text"
                defaultValue="Super"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Last Name</label>
              <input
                type="text"
                defaultValue="Admin"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">About Me</label>
            <textarea
              rows={3}
              defaultValue="Master Administrator of Modesy marketplace platform."
              className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#00a99d] hover:bg-[#008f85] text-white font-bold text-xs rounded transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
