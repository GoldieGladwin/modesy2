"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

import { Coupon } from "./types";

export interface CouponItem {
  code: string;
  shopName: string;
  discount: string;
  validTill: string;
  image?: string;
  productLink?: string;
}

interface CouponCardProps {
  coupon: CouponItem | (Coupon & { discount?: string; validTill?: string; image?: string; productLink?: string });
  onEdit?: (coupon: any) => void;
  onDelete?: (coupon: any) => void;
  onCopy?: (code: string) => void;
  isCopied?: boolean;
}

export default function CouponCard({ coupon, onCopy }: CouponCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(coupon.code).catch(() => {});
    }
    setCopied(true);
    onCopy?.(coupon.code);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const discountText =
    (coupon as any).discount ||
    ((coupon as any).discountType === "percentage"
      ? `${(coupon as any).discountValue}% OFF`
      : `$${(coupon as any).discountValue || 15} OFF`);

  const validTillText =
    (coupon as any).validTill ||
    (coupon as any).expirationDate ||
    "2026-12-31";

  const imageSrc =
    (coupon as any).image ||
    (coupon as any).imageUrl ||
    "/images/products/trendshop-coupon.jpg";

  return (
    <div className="w-full max-w-[440px] bg-white border border-dashed border-[#dcdcdc] rounded-[4px] p-5 transition-shadow">
      {/* Top Section: Left Circular Image & Right Coupon Info */}
      <div className="flex items-center">
        {/* Left: Circular Image with right dashed border */}
        <div className="pr-4 border-r border-dashed border-[#dcdcdc] flex items-center justify-center shrink-0">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden shrink-0 relative bg-[#f5d76e]">
            <Image
              src={imageSrc}
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
            {discountText}
          </div>
          <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#28a745] mt-1.5">
            <Clock className="w-3.5 h-3.5 shrink-0 stroke-[2.2]" />
            <span className="truncate">Valid till: {validTillText}</span>
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
          onClick={handleCopy}
          className="h-[38px] px-5 bg-[#00a99d] hover:bg-[#008f85] text-white text-[12px] font-bold uppercase tracking-wider rounded-r-[3px] transition-colors shrink-0 flex items-center justify-center cursor-pointer"
        >
          {copied ? "COPIED" : "COPY CODE"}
        </button>
      </div>
    </div>
  );
}
