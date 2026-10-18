"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { ShippingMethod } from "./types";

interface ShippingMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (method: ShippingMethod) => void;
  initialData?: ShippingMethod | null;
}

export default function ShippingMethodModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: ShippingMethodModalProps) {
  const [status, setStatus] = useState(true);
  const [nameEn, setNameEn] = useState("Free Shipping");
  const [nameAr, setNameAr] = useState("الشحن مجانا");
  const [minOrderAmount, setMinOrderAmount] = useState("200");
  const [methodType, setMethodType] = useState<"free" | "flat_rate" | "local_pickup">("free");

  useEffect(() => {
    if (initialData) {
      setStatus(initialData.status);
      setNameEn(initialData.name.en);
      setNameAr(initialData.name.ar);
      setMinOrderAmount(initialData.minOrderAmount || initialData.cost || "200");
      setMethodType(initialData.type);
    } else {
      setStatus(true);
      setNameEn("Free Shipping");
      setNameAr("الشحن مجانا");
      setMinOrderAmount("200");
      setMethodType("free");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedMethod: ShippingMethod = {
      id: initialData?.id || `m_${Date.now()}`,
      type: methodType,
      name: {
        en: nameEn.trim() || "Free Shipping",
        ar: nameAr.trim() || "الشحن مجانا",
      },
      status,
      minOrderAmount: methodType === "free" ? minOrderAmount : undefined,
      cost: methodType === "flat_rate" ? minOrderAmount : undefined,
    };
    onSave(updatedMethod);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-150">
      <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-[620px] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-[15px] font-semibold text-gray-800">
            Shipping Method
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Status Toggle */}
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#20c997]"></div>
            </label>
            <span className="text-[13px] font-medium text-gray-700 select-none">
              Status
            </span>
          </div>

          {/* Method Name */}
          <div>
            <label className="block text-[13px] text-gray-700 font-medium mb-1.5">
              Method Name
            </label>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="English"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-[3px] px-3.5 py-2 text-[13px] text-gray-800 focus:outline-none focus:border-[#20c997] transition-colors placeholder:text-gray-400"
              />
              <input
                type="text"
                placeholder="Arabic"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                dir="rtl"
                className="w-full border border-gray-300 rounded-[3px] px-3.5 py-2 text-[13px] text-gray-800 focus:outline-none focus:border-[#20c997] transition-colors placeholder:text-gray-400 text-right"
              />
            </div>
          </div>

          {/* Minimum order amount / Cost Input Group */}
          <div>
            <label className="block text-[13px] text-gray-700 font-medium mb-1.5">
              Minimum order amount
            </label>
            <div className="flex rounded-[3px] shadow-2xs overflow-hidden border border-gray-300 focus-within:border-[#20c997]">
              <span className="inline-flex items-center px-4 bg-[#f8f9fa] border-r border-gray-300 text-gray-600 text-[13px] select-none font-medium">
                USD ($)
              </span>
              <input
                type="text"
                value={minOrderAmount}
                onChange={(e) => setMinOrderAmount(e.target.value)}
                className="flex-1 px-3.5 py-2 text-[13px] text-gray-800 focus:outline-none"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 bg-[#20c997] hover:bg-[#1bb285] text-white text-[13px] font-medium rounded-[3px] transition-colors shadow-sm cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
