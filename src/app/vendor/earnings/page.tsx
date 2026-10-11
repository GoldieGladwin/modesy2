import React from "react";
import Link from "next/link";
import { DollarSign, ArrowUpRight, TrendingUp } from "lucide-react";

export default function VendorEarningsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/vendor" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <Link href="/vendor/dashboard" className="hover:text-[#00a99d]">Dashboard</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Earnings</span>
      </nav>

      {/* Earnings Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-sm p-6">
          <p className="text-xs text-gray-500 font-medium">Total Gross Sales</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">$4,820.00</p>
          <p className="text-[11px] text-gray-400 mt-1">Total revenue generated</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-sm p-6">
          <p className="text-xs text-gray-500 font-medium">Marketplace Commission (10%)</p>
          <p className="text-2xl font-bold text-red-500 mt-2">-$482.00</p>
          <p className="text-[11px] text-gray-400 mt-1">Platform service fees</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-sm p-6">
          <p className="text-xs text-gray-500 font-medium">Net Earnings Balance</p>
          <p className="text-2xl font-bold text-emerald-600 mt-2">$4,338.00</p>
          <Link href="/vendor/payouts" className="text-xs text-[#00a99d] font-semibold hover:underline inline-flex items-center gap-1 mt-1">
            Request Payout <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <h2 className="text-sm font-bold text-gray-900 pb-4 border-b border-gray-100 mb-4">
          Earnings Breakdown
        </h2>
        <div className="py-12 text-center text-gray-400 text-xs">
          <TrendingUp className="w-10 h-10 mx-auto text-gray-300 mb-2 stroke-[1.5]" />
          <p className="text-gray-600 font-medium">All commission deductions and net balances are updated automatically upon order completion.</p>
        </div>
      </div>
    </div>
  );
}
