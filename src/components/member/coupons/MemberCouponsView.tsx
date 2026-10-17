"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, CheckCircle2, Ticket } from "lucide-react";

interface MemberCouponItem {
  id: string;
  code: string;
  shopName: string;
  discount: string;
  validTill: string;
  image: string;
  productLink: string;
}

export default function MemberCouponsView() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const coupons: MemberCouponItem[] = [
    {
      id: "coup-1",
      code: "P6PG5GLS",
      shopName: "ADMIN",
      discount: "10% Coupon",
      validTill: "16 April 2027",
      image: "/assets/img/admin-avatar.jpg",
      productLink: "/guest/category/clothing",
    },
    {
      id: "coup-2",
      code: "41GNOLDX",
      shopName: "TRENDSHOP",
      discount: "15% Coupon",
      validTill: "31 March 2027",
      image: "/images/products/trendshop-coupon.jpg",
      productLink: "/guest/category/clothing",
    },
  ];

  const handleCopy = (code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopiedCode(code);
    setToastMessage(`Coupon code "${code}" copied to clipboard!`);
    setTimeout(() => {
      setCopiedCode(null);
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-[calc(100vh-280px)] py-8 font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#00a99d] text-white px-4 py-3 rounded-[3px] shadow-lg flex items-center gap-2.5 text-xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1320px] mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-[13px] text-gray-500 mb-4 flex items-center gap-1.5 font-normal">
          <Link href="/member" className="hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700">My Coupons</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-[24px] sm:text-[26px] font-bold text-[#222] tracking-tight mb-8">
          My Coupons
        </h1>

        {/* Coupons Grid matching the screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[960px]">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="bg-white border border-dashed border-gray-300 rounded-[3px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] relative flex flex-col justify-between"
            >
              {/* Top Row: Circular Avatar & Coupon Info */}
              <div className="flex items-center gap-4">
                {/* Circular image */}
                <div className="w-[82px] h-[82px] sm:w-[88px] sm:h-[88px] rounded-full overflow-hidden shrink-0 border border-gray-100 shadow-xs">
                  <img
                    src={coupon.image}
                    alt={coupon.shopName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-bold text-gray-800 uppercase tracking-wide">
                    {coupon.shopName}
                  </div>
                  <div className="text-[20px] sm:text-[22px] font-bold text-gray-900 leading-tight mt-0.5">
                    {coupon.discount}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-normal mt-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Valid till: {coupon.validTill}</span>
                  </div>
                  <div className="mt-2">
                    <Link
                      href={coupon.productLink}
                      className="text-xs text-gray-500 hover:text-[#00a99d] transition-colors inline-flex items-center gap-1 font-normal"
                    >
                      <span>See Products</span>
                      <span className="text-[13px] leading-none">→</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Dashed Box: Coupon Code & Copy Button */}
              <div className="mt-5 border border-dashed border-gray-300 rounded-[2px] flex items-center justify-between overflow-hidden bg-white">
                <span className="px-4 text-xs font-mono font-medium text-gray-700 tracking-wider select-all">
                  {coupon.code}
                </span>

                <button
                  type="button"
                  onClick={() => handleCopy(coupon.code)}
                  className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition cursor-pointer border-0 shrink-0 ${
                    copiedCode === coupon.code
                      ? "bg-emerald-600 text-white"
                      : "bg-[#00a99d] hover:bg-[#008f85] text-white"
                  }`}
                >
                  {copiedCode === coupon.code ? "COPIED" : "COPY CODE"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
