"use client";

import React, { useState } from "react";
import { X, Search, Check } from "lucide-react";
import { CouponItem } from "./types";

interface SelectProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupon: CouponItem | null;
  onSave: (couponId: number, productIds: number[]) => void;
}

const mockSelectableProducts = [
  {
    id: 1,
    title: "Cobalt man t-shirt all colors",
    sku: "H1K1LP22272-Teal",
    price: "$20.00",
    image: "/images/products/cobalt-man-tshirt.webp",
  },
  {
    id: 2,
    title: "Black gold fashion backpack",
    sku: "BG-2026-FASHION",
    price: "$45.00",
    image: "/images/products/black-backpack.webp",
  },
  {
    id: 3,
    title: "Brown ankle boots genuine leather",
    sku: "BOOT-BR-992",
    price: "$89.00",
    image: "/images/products/brown-bootie.webp",
  },
];

export default function SelectProductsModal({
  isOpen,
  onClose,
  coupon,
  onSave,
}: SelectProductsModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>(
    coupon?.selectedProductIds || [1, 2]
  );

  if (!isOpen || !coupon) return null;

  const filteredProducts = mockSelectableProducts.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    onSave(coupon.id, selectedIds);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-[6px] max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-[#2d3748]">
              Select Products
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Coupon Code: <span className="font-mono font-bold text-gray-800">{coupon.code}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Search bar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-[38px] pl-9 pr-3.5 bg-white border border-[#d2d6de] rounded-[4px] text-xs text-[#495057] placeholder:text-gray-400 focus:outline-hidden focus:border-[#00a99d] transition"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Products List */}
          <div className="max-h-60 overflow-y-auto space-y-2 divide-y divide-gray-100">
            {filteredProducts.map((p) => {
              const isSelected = selectedIds.includes(p.id);
              return (
                <div
                  key={p.id}
                  onClick={() => toggleSelect(p.id)}
                  className={`pt-2 flex items-center justify-between p-2 rounded-[4px] cursor-pointer transition ${
                    isSelected ? "bg-teal-50/60" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded border border-gray-200 overflow-hidden shrink-0 bg-gray-50">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800 leading-snug">
                        {p.title}
                      </p>
                      <p className="text-[11px] text-gray-500">{p.sku}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-700">{p.price}</span>
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center border transition ${
                        isSelected
                          ? "bg-[#00a99d] border-[#00a99d] text-white"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <span className="text-xs text-gray-500">
            {selectedIds.length} product(s) selected
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-[4px] transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 bg-[#007bff] hover:bg-[#0069d9] text-white text-xs font-semibold rounded-[4px] transition cursor-pointer shadow-2xs"
            >
              Save Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
