"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";

interface CouponItem {
  code: string;
  shopName: string;
  discount: string;
  validTill: string;
  image: string;
  productLink?: string;
}

export default function AdminMyCouponsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const coupons: CouponItem[] = [
    {
      code: "41GN0LDX",
      shopName: "TRENDSHOP",
      discount: "15% Coupon",
      validTill: "31 March 2027",
      image: "/images/products/trendshop-coupon.jpg",
      productLink: "/admin/products",
    },
  ];

  const handleCopy = (code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
    <div className="w-full bg-white flex-1 min-h-[calc(100vh-280px)] py-6 sm:py-8">
      <div className="max-w-[1330px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-[13px] text-[#777777] mb-3 flex items-center gap-1.5 font-normal">
          <Link href="/admin" className="hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <span className="text-[#999999]">/</span>
          <span className="text-[#555555]">My Coupons</span>
        </nav>

        {/* Title */}
        <h1 className="text-[28px] font-normal text-[#222222] tracking-tight mb-8">
          My Coupons
        </h1>

        {/* Coupon Cards - Horizontal cards placed on the left with spacious whitespace */}
        <div className="flex flex-col gap-6 items-start">
          {coupons.map((coupon) => (
            <div
              key={coupon.code}
              className="w-full max-w-[440px] bg-white border border-dashed border-[#dcdcdc] rounded-[4px] p-5 transition-shadow"
            >
              {/* Top Section: Left Circular Image & Right Coupon Info */}
              <div className="flex items-center">
                {/* Left: Circular Image with right dashed border */}
                <div className="pr-4 border-r border-dashed border-[#dcdcdc] flex items-center justify-center shrink-0">
                  <div className="w-[100px] h-[100px] rounded-full overflow-hidden shrink-0 relative bg-[#f5d76e]">
                    <Image
                      src={coupon.image}
                      alt={coupon.shopName}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Right: Coupon Details */}
                <div className="pl-4 flex-1 min-w-0">
                  <div className="text-[14px] font-bold text-[#222222] uppercase tracking-wide truncate">
                    {coupon.shopName}
                  </div>
                  <div className="text-[24px] font-bold text-[#111111] leading-tight mt-1">
                    {coupon.discount}
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#28a745] mt-1.5">
                    <Clock className="w-3.5 h-3.5 shrink-0 stroke-[2.2]" />
                    <span className="truncate">Valid till: {coupon.validTill}</span>
                  </div>
                  <div className="mt-2.5">
                    <Link
                      href={coupon.productLink || "/admin/products"}
                      className="text-[13px] text-[#555555] hover:text-[#00a99d] transition-colors inline-flex items-center gap-1 font-normal"
                    >
                      <span>See Products</span>
                      <span className="text-[14px] leading-none">→</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Section: Code Input + COPY CODE Button */}
              <div className="mt-5 flex items-stretch">
                <input
                  type="text"
                  readOnly
                  value={coupon.code}
                  className="flex-1 min-w-0 h-[38px] px-3.5 text-[13px] text-[#555555] font-medium bg-white border border-[#dcdcdc] border-r-0 rounded-l-[3px] focus:outline-none select-all font-mono tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => handleCopy(coupon.code)}
                  className="h-[38px] px-5 bg-[#00a99d] hover:bg-[#008f85] text-white text-[12px] font-bold uppercase tracking-wider rounded-r-[3px] transition-colors shrink-0 flex items-center justify-center cursor-pointer"
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
