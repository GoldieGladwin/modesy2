'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Check } from 'lucide-react';
import ModesyHeader from '@/components/layout/guest/ModesyHeader';
import ModesyFooter from '@/components/layout/guest/ModesyFooter';

export interface CouponItem {
  code: string;
  shopName: string;
  discount: string;
  validTill: string;
  image: string;
  productLink?: string;
}

const INITIAL_COUPONS: CouponItem[] = [
  {
    code: 'P6PG5GLS',
    shopName: 'ADMIN',
    discount: '10% Coupon',
    validTill: '16 April 2027',
    image: '/assets/img/admin-avatar.jpg',
    productLink: '/products',
  },
];

export default function MyCouponsView({ isVendor = true }: { isVendor?: boolean }) {
  const [coupons, setCoupons] = useState<CouponItem[]>(INITIAL_COUPONS);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopiedCode(code);
    setToastMessage(`Coupon code "${code}" copied to clipboard!`);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-800 antialiased">
      {/* 1. Header (Trendshop profile) */}
      <ModesyHeader
        currentUser={{
          name: 'Trendshop',
          email: 'trendshop@gmail.com',
          avatar: '/assets/img/trendshop-avatar.jpg',
          role: 'vendor',
        }}
        cartCount={3}
      />

      {/* 2. Main Content */}
      <main className="flex-1 w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-6 text-gray-800">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 p-4 bg-emerald-600 text-white text-xs font-medium rounded shadow-lg flex items-center gap-2 animate-in slide-in-from-top-3 duration-200">
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Breadcrumb matching Screenshot: Home / My Coupons */}
        <nav className="text-[12px] text-gray-500 mb-3 flex items-center gap-1.5 font-normal">
          <Link href="/" className="text-gray-500 hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">My Coupons</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-[22px] font-bold text-[#222222] mb-8">
          My Coupons
        </h1>

        {/* Coupon Cards Section matching Screenshot */}
        <div className="flex flex-col gap-6 items-start pb-16">
          {coupons.map((coupon) => (
            <div
              key={coupon.code}
              className="w-full max-w-[390px] bg-white border border-dashed border-[#dcdcdc] rounded-[4px] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-xs"
            >
              {/* Top Section: Circular Image & Coupon Details */}
              <div className="flex items-center gap-4">
                {/* Left: Circular Avatar with dandelion image */}
                <div className="w-[88px] h-[88px] rounded-full overflow-hidden shrink-0 relative border border-gray-100 bg-[#f8f9fa]">
                  <Image
                    src={coupon.image}
                    alt={coupon.shopName}
                    fill
                    sizes="88px"
                    className="object-cover"
                  />
                </div>

                {/* Right: Coupon Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="text-[13px] font-bold text-[#444444] uppercase tracking-wider">
                    {coupon.shopName}
                  </div>
                  <div className="text-[22px] font-bold text-[#111111] leading-tight">
                    {coupon.discount}
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#28a745] pt-0.5">
                    <Clock className="w-3.5 h-3.5 shrink-0 stroke-[2.2]" />
                    <span>Valid till: {coupon.validTill}</span>
                  </div>
                  <div className="pt-1">
                    <Link
                      href={coupon.productLink || '/products'}
                      className="text-[12px] text-[#666666] hover:text-[#00a99d] transition-colors inline-flex items-center gap-1 font-normal"
                    >
                      <span>See Products</span>
                      <span className="text-[13px] leading-none">→</span>
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
                  className="flex-1 min-w-0 h-[38px] px-3.5 text-[13px] text-[#555555] font-semibold bg-white border border-dashed border-[#dcdcdc] border-r-0 rounded-l-[3px] focus:outline-none select-all tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => handleCopy(coupon.code)}
                  className="h-[38px] px-5 bg-[#00a99d] hover:bg-[#008f85] text-white text-[12px] font-bold uppercase tracking-wider rounded-r-[3px] transition-colors shrink-0 flex items-center justify-center cursor-pointer shadow-2xs"
                >
                  {copiedCode === coupon.code ? 'COPIED' : 'COPY CODE'}
                </button>
              </div>
            </div>
          ))}

          {coupons.length === 0 && (
            <div className="w-full max-w-[400px] bg-white border border-gray-200 rounded-[4px] p-12 text-center text-gray-500">
              <p className="text-sm">No coupons available at the moment.</p>
            </div>
          )}
        </div>
      </main>

      {/* 3. Footer */}
      <ModesyFooter />
    </div>
  );
}
