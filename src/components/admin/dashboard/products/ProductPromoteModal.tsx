"use client";

import React from "react";
import { X } from "lucide-react";
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
  if (!isOpen || !product) return null;

  const handleChoosePlan = (planName: string) => {
    onPromoteSuccess(product.id, planName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-[6px] shadow-2xl max-w-xl w-full p-6 sm:p-8 relative border border-gray-100">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <h2 className="text-center text-[18px] font-bold text-gray-800 mb-8">
          Promote Your Product
        </h2>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {/* Card 1: Daily Plan */}
          <div className="border border-gray-200 rounded-[6px] p-6 text-center flex flex-col justify-between hover:border-gray-300 transition-colors shadow-2xs">
            <div>
              <h3 className="text-base font-semibold text-gray-700 mb-3">
                Daily Plan
              </h3>
              <div className="text-3xl font-bold text-[#e75b5b] mb-6">
                $0.10
                <span className="text-xs font-normal text-gray-500">/Day</span>
              </div>

              <ul className="space-y-3 text-xs text-gray-700 text-left mb-6 pl-3">
                <li className="flex items-center gap-2.5">
                  <span className="text-gray-900 font-bold">✓</span>
                  <span>Featured Badge</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-gray-900 font-bold">✓</span>
                  <span>Appear on the Homepage</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-gray-900 font-bold">✓</span>
                  <span>Show first in search lists</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => handleChoosePlan("Daily Plan (30 Days)")}
              className="w-full bg-[#e75b5b] hover:bg-[#d64a4a] text-white text-xs font-semibold py-2.5 rounded-[4px] transition cursor-pointer shadow-2xs"
            >
              Choose Plan
            </button>
          </div>

          {/* Card 2: Monthly Plan */}
          <div className="border border-gray-200 rounded-[6px] p-6 text-center flex flex-col justify-between hover:border-gray-300 transition-colors shadow-2xs">
            <div>
              <h3 className="text-base font-semibold text-gray-700 mb-3">
                Monthly Plan
              </h3>
              <div className="text-3xl font-bold text-[#e75b5b] mb-6">
                $1
                <span className="text-xs font-normal text-gray-500">/Month</span>
              </div>

              <ul className="space-y-3 text-xs text-gray-700 text-left mb-6 pl-3">
                <li className="flex items-center gap-2.5">
                  <span className="text-gray-900 font-bold">✓</span>
                  <span>Featured Badge</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-gray-900 font-bold">✓</span>
                  <span>Appear on the Homepage</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-gray-900 font-bold">✓</span>
                  <span>Show first in search lists</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => handleChoosePlan("Monthly Plan (30 Days)")}
              className="w-full bg-[#e75b5b] hover:bg-[#d64a4a] text-white text-xs font-semibold py-2.5 rounded-[4px] transition cursor-pointer shadow-2xs"
            >
              Choose Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
