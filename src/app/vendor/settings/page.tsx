import React from "react";
import Link from "next/link";
import { Settings, Store, Shield, Truck } from "lucide-react";

export default function VendorSettingsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/vendor" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <Link href="/vendor/dashboard" className="hover:text-[#00a99d]">Dashboard</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Shop Settings</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-6 sm:p-8">
        <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-100 mb-6">
          <Settings className="w-5 h-5 text-[#00a99d]" />
          Vendor Shop Settings
        </h1>

        <form className="max-w-xl space-y-4 text-xs text-gray-700">
          <div>
            <label className="block font-bold text-gray-800 mb-1">Shop Name *</label>
            <input
              type="text"
              defaultValue="TrendShop"
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none focus:border-[#00a99d]"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-800 mb-1">Shop Description</label>
            <textarea
              rows={3}
              defaultValue="Welcome to TrendShop! We offer premium quality fashion accessories and handcrafted items."
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none focus:border-[#00a99d]"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-800 mb-1">Phone Number</label>
            <input
              type="text"
              defaultValue="+1 (555) 234-5678"
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none focus:border-[#00a99d]"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-800 mb-1">Shipping &amp; Return Policy</label>
            <textarea
              rows={3}
              defaultValue="Standard shipping within 3-5 business days. 14-day hassle-free returns on unworn items."
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs outline-none focus:border-[#00a99d]"
            />
          </div>
          <button
            type="button"
            className="px-6 py-2.5 bg-[#00a99d] hover:bg-[#008f85] text-white font-bold rounded text-xs transition"
          >
            Save Shop Settings
          </button>
        </form>
      </div>
    </div>
  );
}
