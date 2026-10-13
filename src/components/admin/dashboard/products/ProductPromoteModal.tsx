"use client";

import React, { useState } from "react";
import { X, Sparkles, Check } from "lucide-react";
import { ProductItem } from "./types";

interface ProductPromoteModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  onPromoteSuccess: (productId: number, planName: string) => void;
}

export default function ProductPromoteModal({
  product,
  isOpen,
  onClose,
  onPromoteSuccess,
}: ProductPromoteModalProps) {
  const [selectedPlan, setSelectedPlan] = useState("30");

  if (!isOpen || !product) return null;

  const plans = [
    { days: "7", price: "$10", label: "Weekly Plan (7 Days)" },
    { days: "30", price: "$30", label: "Monthly Plan (30 Days)" },
    { days: "90", price: "$75", label: "Quarterly Plan (90 Days)" },
    { days: "240", price: "$180", label: "Extended Plan (240 Days)" },
  ];

  const handlePromote = () => {
    const chosen = plans.find((p) => p.days === selectedPlan);
    if (chosen) {
      onPromoteSuccess(product.id, chosen.label);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-[4px] shadow-xl max-w-md w-full overflow-hidden border border-[#ebebeb]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#ebebeb] flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-teal-50 text-[#00a99d] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-gray-800">
                Promote Product
              </h3>
              <p className="text-xs text-gray-500">
                Boost visibility on marketplace search & home page
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-[3px] p-3 text-xs text-gray-700">
            Product: <strong className="text-gray-900">{product.title}</strong>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700">
              Select Promotion Plan:
            </label>
            <div className="space-y-2">
              {plans.map((p) => (
                <label
                  key={p.days}
                  onClick={() => setSelectedPlan(p.days)}
                  className={`flex items-center justify-between p-3 border rounded-[3px] cursor-pointer text-xs transition-colors ${
                    selectedPlan === p.days
                      ? "border-[#00a99d] bg-teal-50/20"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="plan"
                      checked={selectedPlan === p.days}
                      onChange={() => setSelectedPlan(p.days)}
                      className="text-[#00a99d]"
                    />
                    <span className="font-medium text-gray-800">{p.label}</span>
                  </div>
                  <span className="font-bold text-[#00a99d]">{p.price}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#ebebeb] bg-gray-50/40 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-[3px] transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePromote}
            className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-bold rounded-[3px] inline-flex items-center gap-1.5 transition cursor-pointer shadow-xs"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Confirm & Promote</span>
          </button>
        </div>
      </div>
    </div>
  );
}
