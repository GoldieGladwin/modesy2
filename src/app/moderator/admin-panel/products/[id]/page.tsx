"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, ShoppingBasket, CheckCircle2 } from "lucide-react";

export default function ModeratorProductDetailPage() {
  const params = useParams();
  const id = params?.id;

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Link
            href="/moderator/admin-panel"
            className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <ShoppingBasket className="w-5 h-5 text-[#00a99d]" /> Product #{id}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Product details and moderation controls
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Published
          </span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-[3px] p-6 space-y-4">
        <h2 className="text-base font-semibold text-gray-800 pb-2 border-b border-gray-100">
          Product Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-700">
          <div>
            <span className="text-gray-400 block mb-1">Product ID</span>
            <span className="font-semibold text-gray-900">#{id}</span>
          </div>
          <div>
            <span className="text-gray-400 block mb-1">Moderation Status</span>
            <span className="text-emerald-600 font-semibold">Approved</span>
          </div>
          <div>
            <span className="text-gray-400 block mb-1">Moderator Action</span>
            <span>Reviewed &amp; verified by Roger Novak</span>
          </div>
        </div>
      </div>
    </div>
  );
}
