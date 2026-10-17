"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlignJustify, Calendar, Check, CheckCircle2 } from "lucide-react";
import { getCouponById, updateCoupon } from "./couponStore";

interface EditCouponViewProps {
  couponId: string;
}

export default function EditCouponView({ couponId }: EditCouponViewProps) {
  const router = useRouter();

  const [couponCode, setCouponCode] = useState("4IGNOLDX");
  const [discountRate, setDiscountRate] = useState("15");
  const [numberOfCoupons, setNumberOfCoupons] = useState("100000");
  const [minOrderAmount, setMinOrderAmount] = useState("75");
  const [usageType, setUsageType] = useState<"single" | "multiple">("multiple");
  const [isPublic, setIsPublic] = useState(true);
  const [expiryDate, setExpiryDate] = useState("2027-03-31 13:57:24");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const existing = getCouponById(couponId);
    if (existing) {
      setCouponCode(existing.code);
      setDiscountRate(String(existing.discountRate));
      setNumberOfCoupons(String(existing.numberOfCoupons));
      setMinOrderAmount(String(existing.minOrderAmount));
      setUsageType(existing.usageType);
      setIsPublic(existing.isPublic);
      setExpiryDate(existing.expiryDate);
    }
  }, [couponId]);

  const handleGenerateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCouponCode(code);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    updateCoupon(couponId, {
      code: couponCode.trim(),
      discountRate: Number(discountRate) || 15,
      numberOfCoupons: Number(numberOfCoupons) || 100000,
      minOrderAmount: Number(minOrderAmount) || 0,
      usageType,
      isPublic,
      expiryDate: expiryDate.trim(),
    });

    showToast("Coupon updated successfully!");
  };

  return (
    <div className="w-full">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white text-xs font-medium px-4 py-3 rounded shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="bg-white rounded border border-[#e4e7ea] p-6 shadow-sm">
        {/* Card Header */}
        <div className="flex items-center justify-between pb-5 border-b border-gray-100 mb-6">
          <h1 className="text-[16px] font-semibold text-gray-800">
            Edit Coupon
          </h1>
          <Link
            href="/dashboard/coupons"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#20c997] hover:bg-[#1bb285] text-white text-[12.5px] font-medium rounded-[3px] transition-colors shadow-xs"
          >
            <AlignJustify className="w-3.5 h-3.5" />
            <span>Coupons</span>
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Coupon Code */}
          <div>
            <label className="block text-[13px] text-gray-700 font-medium mb-1.5">
              Coupon Code{" "}
              <span className="text-gray-400 font-normal">
                (Do not use special characters E.g: #, *, % ..)
              </span>
            </label>
            <div className="flex rounded-[3px] overflow-hidden border border-gray-300 focus-within:border-[#20c997]">
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                required
                className="flex-1 px-3.5 py-2 text-[13px] text-gray-800 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleGenerateCode}
                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border-l border-gray-300 text-gray-700 text-[12.5px] font-medium transition-colors cursor-pointer"
              >
                Generate
              </button>
            </div>
          </div>

          {/* Discount Rate */}
          <div>
            <label className="block text-[13px] text-gray-700 font-medium mb-1.5">
              Discount Rate
            </label>
            <div className="flex rounded-[3px] overflow-hidden border border-gray-300 focus-within:border-[#20c997]">
              <span className="inline-flex items-center px-4 bg-[#f8f9fa] border-r border-gray-300 text-gray-600 text-[13px] select-none font-medium">
                %
              </span>
              <input
                type="number"
                placeholder="E.g: 5"
                value={discountRate}
                onChange={(e) => setDiscountRate(e.target.value)}
                required
                className="flex-1 px-3.5 py-2 text-[13px] text-gray-800 focus:outline-none"
              />
            </div>
          </div>

          {/* Number of Coupons */}
          <div>
            <label className="block text-[13px] text-gray-700 font-medium mb-1.5">
              Number of Coupons{" "}
              <span className="text-gray-400 font-normal">
                (How many times a coupon can be used by all customers before being invalid)
              </span>
            </label>
            <input
              type="number"
              value={numberOfCoupons}
              onChange={(e) => setNumberOfCoupons(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-[3px] px-3.5 py-2 text-[13px] text-gray-800 focus:outline-none focus:border-[#20c997]"
            />
          </div>

          {/* Minimum order amount */}
          <div>
            <label className="block text-[13px] text-gray-700 font-medium mb-1.5">
              Minimum order amount{" "}
              <span className="text-gray-400 font-normal">
                (Minimum cart total needed to use the coupon)
              </span>
            </label>
            <div className="flex rounded-[3px] overflow-hidden border border-gray-300 focus-within:border-[#20c997]">
              <span className="inline-flex items-center px-4 bg-[#f8f9fa] border-r border-gray-300 text-gray-600 text-[13px] select-none font-medium">
                USD ($)
              </span>
              <input
                type="number"
                value={minOrderAmount}
                onChange={(e) => setMinOrderAmount(e.target.value)}
                required
                className="flex-1 px-3.5 py-2 text-[13px] text-gray-800 focus:outline-none"
              />
            </div>
          </div>

          {/* Coupon Usage Type */}
          <div>
            <label className="block text-[13px] text-gray-700 font-medium mb-2.5">
              Coupon Usage Type
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-gray-700 group">
                <input
                  type="radio"
                  name="usageType"
                  value="single"
                  checked={usageType === "single"}
                  onChange={() => setUsageType("single")}
                  className="sr-only"
                />
                <div
                  className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-all ${
                    usageType === "single"
                      ? "bg-[#20c997] border border-[#20c997]"
                      : "border border-[#c2c5c9] bg-white group-hover:border-gray-400"
                  }`}
                >
                  {usageType === "single" && (
                    <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                  )}
                </div>
                <span>Each user can use it for only one order</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-gray-700 group">
                <input
                  type="radio"
                  name="usageType"
                  value="multiple"
                  checked={usageType === "multiple"}
                  onChange={() => setUsageType("multiple")}
                  className="sr-only"
                />
                <div
                  className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-all ${
                    usageType === "multiple"
                      ? "bg-[#20c997] border border-[#20c997]"
                      : "border border-[#c2c5c9] bg-white group-hover:border-gray-400"
                  }`}
                >
                  {usageType === "multiple" && (
                    <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                  )}
                </div>
                <span>
                  Each user can use it for multiple orders (Guests can use)
                </span>
              </label>
            </div>
          </div>

          {/* Public Coupon */}
          <div>
            <label className="block text-[13px] text-gray-700 font-medium mb-2.5">
              Public Coupon{" "}
              <span className="text-gray-400 font-normal">
                (Public coupons are visible to all users)
              </span>
            </label>
            <div className="flex items-center gap-10">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-gray-700 group">
                <input
                  type="radio"
                  name="publicCoupon"
                  checked={isPublic === true}
                  onChange={() => setIsPublic(true)}
                  className="sr-only"
                />
                <div
                  className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-all ${
                    isPublic === true
                      ? "bg-[#20c997] border border-[#20c997]"
                      : "border border-[#c2c5c9] bg-white group-hover:border-gray-400"
                  }`}
                >
                  {isPublic === true && (
                    <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                  )}
                </div>
                <span>Yes</span>
              </label>

              <label className="inline-flex items-center gap-2 cursor-pointer select-none text-[13px] text-gray-700 group">
                <input
                  type="radio"
                  name="publicCoupon"
                  checked={isPublic === false}
                  onChange={() => setIsPublic(false)}
                  className="sr-only"
                />
                <div
                  className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-all ${
                    isPublic === false
                      ? "bg-[#20c997] border border-[#20c997]"
                      : "border border-[#c2c5c9] bg-white group-hover:border-gray-400"
                  }`}
                >
                  {isPublic === false && (
                    <Check className="w-2.5 h-2.5 text-white stroke-[3.5]" />
                  )}
                </div>
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-[13px] text-gray-700 font-medium mb-1.5">
              Expiry Date
            </label>
            <div className="flex max-w-sm rounded-[3px] overflow-hidden border border-gray-300 focus-within:border-[#20c997]">
              <input
                type="text"
                placeholder="Expiry Date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
                className="flex-1 px-3.5 py-2 text-[13px] text-gray-800 focus:outline-none"
              />
              <div className="px-3.5 py-2 bg-gray-50 border-l border-gray-300 text-gray-500 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="px-6 py-2 bg-[#20c997] hover:bg-[#1bb285] text-white text-[13px] font-medium rounded-[3px] transition-colors shadow-sm cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
