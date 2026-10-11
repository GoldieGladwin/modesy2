import React from "react";
import { Search, Save, Globe } from "lucide-react";

export default function AdminSeoToolsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-[#00a99d]" /> SEO Tools
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Configure meta tags, OpenGraph attributes, XML sitemaps, and search index robots</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-xs max-w-4xl">
        <form className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Site Title (Meta Title)</label>
            <input
              type="text"
              defaultValue="Modesy - Multi-Vendor Marketplace & Artisan Store"
              className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Site Description (Meta Description)</label>
            <textarea
              rows={3}
              defaultValue="Modesy is a premier modern multi-vendor marketplace platform where independent creators, artisans, and sellers showcase handcrafted and digital products."
              className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Meta Keywords</label>
            <input
              type="text"
              defaultValue="marketplace, multi-vendor, ecommerce, shopping, handmade, artisan, digital products"
              className="w-full text-xs px-3 py-2 border border-gray-300 rounded focus:border-[#00a99d] focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <button
              type="button"
              className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" /> Generate sitemap.xml
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#00a99d] text-white text-xs font-bold rounded hover:bg-[#008f85] transition flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" /> Save SEO Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
