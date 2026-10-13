"use client";

import React, { useState, useEffect } from "react";
import { X, Tag, AlertCircle } from "lucide-react";
import { Coupon, CouponFormData, CouponStatus, DiscountType } from "./types";

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CouponFormData) => void;
  initialData?: Coupon | null;
}

export default function CouponModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: CouponModalProps) {
  const [formData, setFormData] = useState<CouponFormData>({
    code: "",
    name: "",
    discountType: "percentage",
    discountValue: 10,
    minPurchase: 0,
    startDate: new Date().toISOString().split("T")[0],
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    usageLimit: 100,
    status: "Active",
    shopName: "MODESY",
    category: "All Categories",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code,
        name: initialData.name,
        discountType: initialData.discountType,
        discountValue: initialData.discountValue,
        minPurchase: initialData.minPurchase,
        startDate: initialData.startDate,
        expirationDate: initialData.expirationDate,
        usageLimit: initialData.usageLimit,
        status: initialData.status,
        shopName: initialData.shopName || "MODESY",
        category: initialData.category || "All Categories",
      });
    } else {
      setFormData({
        code: "",
        name: "",
        discountType: "percentage",
        discountValue: 15,
        minPurchase: 20,
        startDate: new Date().toISOString().split("T")[0],
        expirationDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        usageLimit: 100,
        status: "Active",
        shopName: "MODESY",
        category: "All Categories",
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.code.trim()) {
      newErrors.code = "Coupon code is required.";
    } else if (formData.code.trim().length < 3) {
      newErrors.code = "Coupon code must be at least 3 characters.";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Coupon title/name is required.";
    }

    if (formData.discountValue <= 0) {
      newErrors.discountValue = "Discount value must be greater than 0.";
    } else if (
      formData.discountType === "percentage" &&
      formData.discountValue > 100
    ) {
      newErrors.discountValue = "Percentage discount cannot exceed 100%.";
    }

    if (formData.minPurchase < 0) {
      newErrors.minPurchase = "Minimum purchase cannot be negative.";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required.";
    }

    if (!formData.expirationDate) {
      newErrors.expirationDate = "Expiration date is required.";
    } else if (
      formData.startDate &&
      formData.expirationDate < formData.startDate
    ) {
      newErrors.expirationDate =
        "Expiration date cannot be earlier than start date.";
    }

    if (formData.usageLimit <= 0) {
      newErrors.usageLimit = "Usage limit must be at least 1.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        code: formData.code.trim().toUpperCase(),
        name: formData.name.trim(),
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-md shadow-xl border border-gray-200 w-full max-w-xl overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-teal-50 text-[#00a99d] flex items-center justify-center">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                {initialData ? "Edit Coupon" : "Add New Coupon"}
              </h2>
              <p className="text-xs text-gray-500">
                {initialData
                  ? `Update details for coupon: ${initialData.code}`
                  : "Fill in the details to publish a new promotional coupon code."}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Row 1: Code and Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Coupon Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. SUMMER20"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value.toUpperCase() })
                }
                className={`w-full px-3 py-2 text-xs border rounded uppercase font-mono font-bold focus:outline-none ${
                  errors.code
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-[#00a99d]"
                }`}
              />
              {errors.code && (
                <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.code}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Coupon Name / Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Summer Special Sale"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`w-full px-3 py-2 text-xs border rounded focus:outline-none ${
                  errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-[#00a99d]"
                }`}
              />
              {errors.name && (
                <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Discount Type and Discount Value */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Discount Type
              </label>
              <select
                value={formData.discountType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discountType: e.target.value as DiscountType,
                  })
                }
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:border-[#00a99d]"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed_amount">Fixed Amount ($)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Discount Value <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max={formData.discountType === "percentage" ? 100 : 10000}
                  value={formData.discountValue}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      discountValue: Number(e.target.value),
                    })
                  }
                  className={`w-full px-3 py-2 text-xs border rounded focus:outline-none ${
                    errors.discountValue
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-[#00a99d]"
                  }`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                  {formData.discountType === "percentage" ? "%" : "$"}
                </span>
              </div>
              {errors.discountValue && (
                <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.discountValue}
                </p>
              )}
            </div>
          </div>

          {/* Row 3: Minimum Purchase and Usage Limit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Minimum Purchase ($)
              </label>
              <input
                type="number"
                min="0"
                placeholder="0 for no minimum"
                value={formData.minPurchase}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minPurchase: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#00a99d]"
              />
              <p className="text-[10px] text-gray-400 mt-0.5">
                Set to 0 if there is no minimum order requirement.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Usage Limit <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={formData.usageLimit}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    usageLimit: Number(e.target.value),
                  })
                }
                className={`w-full px-3 py-2 text-xs border rounded focus:outline-none ${
                  errors.usageLimit
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-[#00a99d]"
                }`}
              />
              {errors.usageLimit && (
                <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.usageLimit}
                </p>
              )}
            </div>
          </div>

          {/* Row 4: Start Date and Expiration Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#00a99d]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Expiration Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.expirationDate}
                onChange={(e) =>
                  setFormData({ ...formData, expirationDate: e.target.value })
                }
                className={`w-full px-3 py-2 text-xs border rounded focus:outline-none ${
                  errors.expirationDate
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-[#00a99d]"
                }`}
              />
              {errors.expirationDate && (
                <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.expirationDate}
                </p>
              )}
            </div>
          </div>

          {/* Row 5: Status and Shop Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as CouponStatus,
                  })
                }
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded bg-white text-gray-700 focus:outline-none focus:border-[#00a99d]"
              >
                <option value="Active">Active</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Expired">Expired</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Shop / Brand Label
              </label>
              <input
                type="text"
                placeholder="e.g. TRENDSHOP or MODESY"
                value={formData.shopName}
                onChange={(e) =>
                  setFormData({ ...formData, shopName: e.target.value })
                }
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#00a99d]"
              />
            </div>
          </div>

          {/* Modal Footer Buttons */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-xs font-semibold hover:bg-gray-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white rounded text-xs font-semibold transition cursor-pointer shadow-xs"
            >
              {initialData ? "Save Changes" : "Create Coupon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
