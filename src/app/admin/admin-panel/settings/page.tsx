import React from "react";
import { Settings, Save, Globe, Mail, Shield } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#00a99d]" /> General Settings
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Global website identity, contact info, default currency, and email notifications</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-xs max-w-4xl">
        <form className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Application Name</label>
              <input
                type="text"
                defaultValue="Modesy"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Support Email</label>
              <input
                type="email"
                defaultValue="support@codingest.com"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Default Currency</label>
              <select defaultValue="USD" className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-none bg-white">
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="IDR">IDR (Rp)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Default Language</label>
              <select defaultValue="English" className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-none bg-white">
                <option value="English">English</option>
                <option value="Arabic">Arabic</option>
                <option value="Indonesian">Indonesian</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Timezone</label>
              <select defaultValue="UTC" className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-none bg-white">
                <option value="UTC">UTC (00:00)</option>
                <option value="Asia/Jakarta">Asia/Jakarta (UTC+07:00)</option>
                <option value="America/New_York">America/New York (EST)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#00a99d] text-white text-xs font-bold rounded hover:bg-[#008f85] transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5" /> Save General Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
