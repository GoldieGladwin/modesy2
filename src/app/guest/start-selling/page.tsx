"use client";

import React from "react";
import Link from "next/link";
import { Store, CheckCircle, ArrowRight, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function GuestStartSellingPage() {
  const { openLoginModal } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/guest" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Sell on Modesy</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-8 sm:p-12 text-center shadow-xs">
        <div className="w-16 h-16 bg-[#00a99d]/10 text-[#00a99d] rounded-full flex items-center justify-center mx-auto mb-4">
          <Store className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Open Your Shop on Modesy
        </h1>
        <p className="text-gray-600 text-sm max-w-lg mx-auto mb-8">
          Join thousands of successful vendors. Sell physical and digital products, reach global customers, and manage your inventory with our comprehensive dashboard.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-8 max-w-2xl mx-auto">
          <div className="p-4 bg-gray-50 rounded border border-gray-100">
            <CheckCircle className="w-5 h-5 text-[#00a99d] mb-2" />
            <h3 className="font-bold text-xs text-gray-800">Low Commission</h3>
            <p className="text-[11px] text-gray-500 mt-1">Keep more profit from your sales with transparent fee structures.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded border border-gray-100">
            <ShieldCheck className="w-5 h-5 text-[#00a99d] mb-2" />
            <h3 className="font-bold text-xs text-gray-800">Secure Payouts</h3>
            <p className="text-[11px] text-gray-500 mt-1">Fast withdrawals directly to bank transfer or PayPal.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded border border-gray-100">
            <Users className="w-5 h-5 text-[#00a99d] mb-2" />
            <h3 className="font-bold text-xs text-gray-800">Global Audience</h3>
            <p className="text-[11px] text-gray-500 mt-1">Showcase your products to verified buyers across the globe.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={openLoginModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#00a99d] hover:bg-[#008f85] text-white px-8 py-3 rounded font-bold text-sm shadow-xs transition cursor-pointer"
          >
            <span>Start Selling Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <Link
            href="/guest/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded font-semibold text-sm transition"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
