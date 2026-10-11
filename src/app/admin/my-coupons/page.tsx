import React from "react";
import Link from "next/link";
import { Ticket, Copy, Check, Clock, Sparkles } from "lucide-react";

export default function AdminMyCouponsPage() {
  const coupons = [
    {
      code: "WELCOME20",
      discount: "20% OFF",
      minPurchase: "Min purchase $50",
      expires: "Valid until Dec 31, 2026",
      status: "Active",
      category: "All Categories",
    },
    {
      code: "ADMINSPECIAL",
      discount: "50% OFF",
      minPurchase: "No minimum purchase",
      expires: "Unlimited",
      status: "Active",
      category: "Internal Test",
    },
    {
      code: "FREESHIP100",
      discount: "Free Shipping",
      minPurchase: "Min purchase $100",
      expires: "Valid until Nov 15, 2026",
      status: "Active",
      category: "Physical Goods",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/admin" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">My Coupons</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 mb-6 gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Ticket className="w-5 h-5 text-[#00a99d]" />
              My Coupons
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Exclusive discount vouchers and promotional coupons associated with your admin account.
            </p>
          </div>
          <div className="text-xs font-semibold px-3 py-1.5 bg-teal-50 text-[#00a99d] rounded border border-teal-100 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> 3 Coupons Available
          </div>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {coupons.map((coupon) => (
            <div
              key={coupon.code}
              className="border border-dashed border-[#00a99d] bg-teal-50/20 rounded-md p-5 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute -right-6 -top-6 w-16 h-16 bg-[#00a99d]/10 rounded-full" />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#00a99d] bg-white px-2 py-0.5 rounded border border-teal-100">
                  {coupon.category}
                </span>
                <div className="text-2xl font-black text-gray-900 mt-3">{coupon.discount}</div>
                <p className="text-xs text-gray-600 mt-1">{coupon.minPurchase}</p>
                <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {coupon.expires}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-teal-100 flex items-center justify-between">
                <span className="font-mono font-bold text-gray-800 bg-white px-2.5 py-1 rounded border border-gray-200 text-xs">
                  {coupon.code}
                </span>
                <button
                  type="button"
                  className="px-3 py-1 bg-[#00a99d] text-white rounded text-xs font-semibold hover:bg-[#008f85] transition flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" /> Copy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
