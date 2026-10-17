"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { CouponItem } from "./types";

interface AddCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (couponData: {
    id?: number;
    code: string;
    discountRate: string;
    numberOfCoupons: number;
    expiryDate: string;
    status: "Active" | "Inactive";
  }) => void;
  initialData?: CouponItem | null;
}

export default function AddCouponModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: AddCouponModalProps) {
  const [code, setCode] = useState("");
  const [discountRate, setDiscountRate] = useState("10%");
  const [numberOfCoupons, setNumberOfCoupons] = useState(500);
  const [expiryDate, setExpiryDate] = useState("2027-04-16");
  const [expiryTime, setExpiryTime] = useState("15:01");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  useEffect(() => {
    if (initialData) {
      setCode(initialData.code);
      setDiscountRate(initialData.discountRate);
      setNumberOfCoupons(initialData.numberOfCoupons);
      const parts = initialData.expiryDate.split("/");
      if (parts.length === 2) {
        setExpiryDate(parts[0].trim());
        setExpiryTime(parts[1].trim());
      }
      setStatus(initialData.status);
    } else {
      setCode(generateRandomCode());
      setDiscountRate("10%");
      setNumberOfCoupons(500);
      setExpiryDate("2027-04-16");
      setExpiryTime("15:01");
      setStatus("Active");
    }
  }, [initialData, isOpen]);

  function generateRandomCode(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0198765432";
    let res = "";
    for (let i = 0; i < 8; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return res;
  }

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const formattedRate = discountRate.endsWith("%")
      ? discountRate
      : `${discountRate}%`;
    const formattedExpiry = `${expiryDate} / ${expiryTime}`;

    onSave({
      id: initialData?.id,
      code: code.trim().toUpperCase(),
      discountRate: formattedRate,
      numberOfCoupons: Number(numberOfCoupons) || 1,
      expiryDate: formattedExpiry,
      status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-[6px] max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-[#2d3748]">
            {initialData ? "Edit Coupon" : "Add Coupon"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Coupon Code */}
          <div>
            <label className="block text-[13px] font-semibold text-[#333e48] mb-1.5">
              Coupon Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. P6PG5GLS"
                className="flex-1 h-[38px] px-3.5 bg-white border border-[#d2d6de] rounded-[4px] text-xs text-[#495057] focus:outline-hidden focus:border-[#00a99d] transition uppercase font-mono"
              />
              <button
                type="button"
                onClick={() => setCode(generateRandomCode())}
                className="h-[38px] px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-[4px] inline-flex items-center gap-1 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#00a99d]" />
                <span>Generate</span>
              </button>
            </div>
          </div>

          {/* Discount Rate */}
          <div>
            <label className="block text-[13px] font-semibold text-[#333e48] mb-1.5">
              Discount Rate (%)
            </label>
            <input
              type="text"
              required
              value={discountRate}
              onChange={(e) => setDiscountRate(e.target.value)}
              placeholder="e.g. 10%"
              className="w-full h-[38px] px-3.5 bg-white border border-[#d2d6de] rounded-[4px] text-xs text-[#495057] focus:outline-hidden focus:border-[#00a99d] transition"
            />
          </div>

          {/* Number of Coupons */}
          <div>
            <label className="block text-[13px] font-semibold text-[#333e48] mb-1.5">
              Number of Coupons
            </label>
            <input
              type="number"
              min={1}
              required
              value={numberOfCoupons}
              onChange={(e) => setNumberOfCoupons(Number(e.target.value))}
              placeholder="e.g. 500"
              className="w-full h-[38px] px-3.5 bg-white border border-[#d2d6de] rounded-[4px] text-xs text-[#495057] focus:outline-hidden focus:border-[#00a99d] transition"
            />
          </div>

          {/* Expiry Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-semibold text-[#333e48] mb-1.5">
                Expiry Date
              </label>
              <input
                type="date"
                required
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full h-[38px] px-3 bg-white border border-[#d2d6de] rounded-[4px] text-xs text-[#495057] focus:outline-hidden focus:border-[#00a99d] transition"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-[#333e48] mb-1.5">
                Expiry Time
              </label>
              <input
                type="time"
                required
                value={expiryTime}
                onChange={(e) => setExpiryTime(e.target.value)}
                className="w-full h-[38px] px-3 bg-white border border-[#d2d6de] rounded-[4px] text-xs text-[#495057] focus:outline-hidden focus:border-[#00a99d] transition"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-[13px] font-semibold text-[#333e48] mb-1.5">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "Active" | "Inactive")}
              className="w-full h-[38px] px-3.5 bg-white border border-[#d2d6de] rounded-[4px] text-xs text-[#495057] focus:outline-hidden focus:border-[#00a99d] transition cursor-pointer"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-[4px] transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#00a65a] hover:bg-[#008d4c] text-white text-xs font-semibold rounded-[4px] transition cursor-pointer shadow-2xs"
            >
              {initialData ? "Save Changes" : "Create Coupon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
