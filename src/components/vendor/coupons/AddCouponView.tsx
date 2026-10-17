"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlignJustify, Calendar, Check } from "lucide-react";
import { addCoupon } from "./couponStore";

export default function AddCouponView() {
  const router = useRouter();

  const [couponCode, setCouponCode] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [numberOfCoupons, setNumberOfCoupons] = useState("");
  const [minOrderAmount, setMinOrderAmount] = useState("0");
  const [usageType, setUsageType] = useState<"single" | "multiple">("single");
  const [isPublic, setIsPublic] = useState(true);
  const [expiryDate, setExpiryDate] = useState("");

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

    addCoupon({
      code: couponCode.trim(),
      discountRate: Number(discountRate) || 10,
      numberOfCoupons: Number(numberOfCoupons) || 100,
      minOrderAmount: Number(minOrderAmount) || 0,
      usageType,
      isPublic,
      expiryDate: expiryDate.trim() || "2027-12-31 23:59:00",
      status: "active",
      selectedProductIds: [],
      selectedCategories: [],
    });

    router.push("/dashboard/coupons");
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded border border-[#e4e7ea] p-6 shadow-sm">
        {/* Card Header */}
        <div className="flex items-center justify-between pb-5 border-b border-gray-100 mb-6">
          <h1 className="text-[16px] font-semibold text-gray-800">
            Add Coupon
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
              placeholder="E.g: 100"
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
                className="flex-1 px-3.5 py-2 text-[13px] text-gray-800 focus:outline-none placeholder:text-gray-400"
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
              Add Coupon
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
