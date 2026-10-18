"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight, CheckCircle2, Check } from "lucide-react";

interface Coupon {
  id: string;
  seller: string;
  discount: string;
  validTill: string;
  code: string;
  avatar: string;
  productLink: string;
}

export default function ModeratorMyCouponsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const coupons: Coupon[] = [
    {
      id: "cpn-1",
      seller: "ADMIN",
      discount: "10% Coupon",
      validTill: "16 April 2027",
      code: "P6PG5GLS",
      avatar: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=240&q=80",
      productLink: "/moderator/products",
    },
    {
      id: "cpn-2",
      seller: "TRENDSHOP",
      discount: "15% Coupon",
      validTill: "31 March 2027",
      code: "41GNOLDX",
      avatar: "https://images.unsplash.com/photo-1507290439931-a861b5a38200?w=240&q=80",
      productLink: "/moderator/products",
    },
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setToastMessage(`Coupon code ${code} copied to clipboard!`);
    setTimeout(() => {
      setCopiedCode(null);
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div className="bg-white min-h-[600px] w-full font-sans text-gray-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#00a99d] text-white px-4 py-3 rounded-[3px] shadow-lg flex items-center gap-2.5 text-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1320px] mx-auto px-4 py-6">
        {/* Breadcrumb matching Screenshot */}
        <nav className="text-[13px] text-[#777777] mb-6 flex items-center gap-1.5">
          <Link
            href="/moderator"
            className="text-[#666666] hover:text-[#00a99d] transition-colors"
          >
            Home
          </Link>
          <span className="text-[#999999]">/</span>
          <span className="text-[#333333] font-normal">My Coupons</span>
        </nav>

        {/* Page Title matching Screenshot */}
        <h1 className="text-[26px] font-bold text-[#222222] mb-8 tracking-tight">
          My Coupons
        </h1>

        {/* Coupons Grid (2 Columns matching Screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="bg-white border border-dashed border-[#dcdcdc] rounded-[4px] p-6 shadow-2xs relative"
            >
              {/* Top Row: Avatar | Dotted Separator | Info */}
              <div className="flex items-center gap-5">
                {/* Left: Circular Avatar Image */}
                <div className="w-[78px] h-[78px] rounded-full overflow-hidden shrink-0 border border-gray-100 shadow-2xs bg-gray-50 flex items-center justify-center">
                  <img
                    src={coupon.avatar}
                    alt={coupon.seller}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Vertical Dotted Divider matching Screenshot */}
                <div className="w-[1px] h-[78px] border-r border-dotted border-[#cfd4d9] shrink-0" />

                {/* Right: Coupon Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="text-[13px] font-bold text-[#333333] uppercase tracking-wide">
                    {coupon.seller}
                  </div>
                  <div className="text-[20px] font-bold text-[#222222] leading-tight">
                    {coupon.discount}
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#28a745]">
                    <Clock className="w-3.5 h-3.5 text-[#28a745]" />
                    <span>Valid till: {coupon.validTill}</span>
                  </div>
                  <div className="pt-0.5">
                    <Link
                      href={coupon.productLink}
                      className="inline-flex items-center gap-1 text-[13px] text-[#333333] hover:text-[#00a99d] transition-colors font-normal"
                    >
                      <span>See Products</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Code Box + COPY CODE Button matching Screenshot */}
              <div className="mt-6 flex items-stretch border border-[#e5e5e5] rounded-[3px] overflow-hidden">
                <div className="flex-1 px-4 py-2.5 bg-white text-[13px] font-mono font-medium text-[#555555] flex items-center select-all">
                  {coupon.code}
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyCode(coupon.code)}
                  className="bg-[#00a99d] hover:bg-[#008f85] text-white text-[12px] font-bold tracking-wider uppercase px-5 py-2.5 transition cursor-pointer active:scale-95 flex items-center gap-1.5 select-none"
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <span>COPY CODE</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
