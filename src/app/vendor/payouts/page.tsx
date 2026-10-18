import React from "react";
import Link from "next/link";
import { CreditCard, PlusCircle, CheckCircle } from "lucide-react";

export default function VendorPayoutsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/vendor" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <Link href="/vendor/dashboard" className="hover:text-[#00a99d]">Dashboard</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Payouts</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-sm p-6">
          <p className="text-xs text-gray-500">Withdrawable Balance</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">$1,240.50</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-sm p-6">
          <p className="text-xs text-gray-500">Minimum Payout Limit</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">$50.00</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-sm p-6">
          <p className="text-xs text-gray-500">Payout Method</p>
          <p className="text-sm font-bold text-[#00a99d] mt-2 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" /> Bank Wire Transfer
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
          <h1 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#00a99d]" />
            Payout Requests
          </h1>
          <button
            type="button"
            className="px-4 py-2 bg-[#00a99d] text-white text-xs font-bold rounded-xs hover:bg-[#008f85] transition flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            Request Payout
          </button>
        </div>

        <div className="py-12 text-center text-gray-400 text-xs">
          <p>No pending or past payout requests.</p>
        </div>
      </div>
    </div>
  );
}
