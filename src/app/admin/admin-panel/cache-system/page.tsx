import React from "react";
import { Database, RefreshCw, Trash2, CheckCircle } from "lucide-react";

export default function AdminCacheSystemPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Database className="w-5 h-5 text-[#00a99d]" /> Cache System
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Purge application database query cache, static pages cache, and CDN assets</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-2">Reset Database Cache</h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              Clears cached queries for marketplace product listings, category trees, and taxonomy filters. Recommended when updating major category hierarchies.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">Current Cache Size: <strong>14.2 MB</strong></span>
            <button
              type="button"
              className="px-4 py-2 bg-[#00a99d] text-white text-xs font-bold rounded hover:bg-[#008f85] transition flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Clear DB Cache
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-2">Reset Static Assets & Thumbnails Cache</h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              Regenerates cached image sizes, resized catalog product photos, and compiled theme assets across the storefront.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">Current Media Cache: <strong>128.4 MB</strong></span>
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded hover:bg-red-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Purge Asset Cache
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
