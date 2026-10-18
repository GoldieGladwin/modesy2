import React from "react";
import Link from "next/link";
import { Store, CheckCircle, ArrowRight } from "lucide-react";

export default function MemberStartSellingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/member" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Start Selling</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-8 text-center">
        <div className="w-16 h-16 bg-[#00a99d]/10 text-[#00a99d] rounded-full flex items-center justify-center mx-auto mb-4">
          <Store className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Open Your Shop on Modesy</h1>
        <p className="text-gray-500 text-sm max-w-lg mx-auto mb-8">
          Sell physical and digital products, reach thousands of global customers, and manage your inventory with our powerful vendor dashboard.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-8 max-w-2xl mx-auto">
          <div className="p-4 bg-gray-50 rounded border border-gray-100">
            <CheckCircle className="w-5 h-5 text-[#00a99d] mb-2" />
            <h3 className="font-bold text-xs text-gray-800">Low Commission</h3>
            <p className="text-[11px] text-gray-500 mt-1">Keep more profit from your sales with transparent fee structure.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded border border-gray-100">
            <CheckCircle className="w-5 h-5 text-[#00a99d] mb-2" />
            <h3 className="font-bold text-xs text-gray-800">Secure Payouts</h3>
            <p className="text-[11px] text-gray-500 mt-1">Fast withdrawals directly to bank transfer or PayPal.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded border border-gray-100">
            <CheckCircle className="w-5 h-5 text-[#00a99d] mb-2" />
            <h3 className="font-bold text-xs text-gray-800">24/7 Support</h3>
            <p className="text-[11px] text-gray-500 mt-1">Dedicated marketplace support whenever you need help.</p>
          </div>
        </div>

        <Link
          href="/vendor"
          className="inline-flex items-center gap-2 bg-[#00a99d] hover:bg-[#008f85] text-white px-8 py-3 rounded font-bold text-sm shadow transition"
        >
          <span>Continue to Vendor Portal</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
