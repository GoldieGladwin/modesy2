"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { ShippingMethod } from "./types";

interface AddShippingMethodSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (methodType: "free" | "flat_rate" | "local_pickup") => void;
}

export default function AddShippingMethodSelectModal({
  isOpen,
  onClose,
  onApply,
}: AddShippingMethodSelectModalProps) {
  const [selectedType, setSelectedType] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || selectedType === "select") return;
    onApply(selectedType as "free" | "flat_rate" | "local_pickup");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-150">
      <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-[500px] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-[15px] font-semibold text-gray-800">
            Shipping Methods
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
          <div>
            <label className="block text-[13px] text-gray-700 font-medium mb-1.5">
              Shipping Method
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-[3px] px-3.5 py-2 text-[13px] text-gray-800 bg-white focus:outline-none focus:border-[#20c997] transition-colors"
            >
              <option value="">Select</option>
              <option value="flat_rate">Flat Rate</option>
              <option value="local_pickup">Local Pickup</option>
              <option value="free">Free Shipping</option>
            </select>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={!selectedType}
              className={`px-6 py-2 text-white text-[13px] font-medium rounded-[3px] transition-colors shadow-sm cursor-pointer ${
                selectedType
                  ? "bg-[#20c997] hover:bg-[#1bb285]"
                  : "bg-[#20c997]/60 cursor-not-allowed"
              }`}
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
