import React from "react";
import Link from "next/link";
import { Settings, ShieldCheck, Lock } from "lucide-react";

export default function ModeratorSettingsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/moderator" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <Link href="/moderator/dashboard" className="hover:text-[#00a99d]">Dashboard</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Settings</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-6 sm:p-8">
        <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-100 mb-6">
          <Settings className="w-5 h-5 text-amber-600" />
          Moderator Account Settings
        </h1>

        <form className="max-w-xl space-y-4 text-xs text-gray-700">
          <div>
            <label className="block font-bold text-gray-800 mb-1">Moderator Username</label>
            <input
              type="text"
              defaultValue="moderator"
              disabled
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-xs text-gray-500"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-800 mb-1">Email Address</label>
            <input
              type="email"
              defaultValue="moderator@codingest.com"
              disabled
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded text-xs text-gray-500"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-800 mb-1">Moderation Permissions</label>
            <div className="p-3 bg-amber-50/60 border border-amber-200 rounded text-amber-900 text-xs">
              <p className="font-semibold">Granted Roles:</p>
              <ul className="list-disc pl-4 mt-1 space-y-0.5 text-[11px]">
                <li>Approve &amp; Reject Product Submissions</li>
                <li>Comment Moderation &amp; Removal</li>
                <li>Review &amp; Rating Moderation</li>
                <li>User Flags &amp; Violation Inquiries</li>
              </ul>
            </div>
          </div>
          <button
            type="button"
            className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded text-xs transition"
          >
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
}
