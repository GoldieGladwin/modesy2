"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Edit2, Eye, Star, Zap, Trash2 } from "lucide-react";
import { ProductItem } from "./types";

interface ProductOptionsDropdownProps {
  product: ProductItem;
  onEdit?: (product: ProductItem) => void;
  onDelete?: (id: number) => void;
  onToggleFeatured?: (product: ProductItem) => void;
  onToggleSpecialOffer?: (product: ProductItem) => void;
}

export default function ProductOptionsDropdown({
  product,
  onEdit,
  onDelete,
  onToggleFeatured,
  onToggleSpecialOffer,
}: ProductOptionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-1.5 bg-[#605ca8] hover:bg-[#504c94] text-white text-xs font-semibold px-3 py-1 rounded-[3px] shadow-xs transition cursor-pointer whitespace-nowrap"
      >
        <span>Select an option</span>
        <ChevronDown className="w-3 h-3" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-[3px] shadow-lg z-30 py-1 text-left divide-y divide-gray-100">
          <div className="py-1">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onEdit?.(product);
              }}
              className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Edit</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                window.open(`/products/${product.id}`, "_blank");
              }}
              className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-gray-600" />
              <span>View Product</span>
            </button>
          </div>

          <div className="py-1">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onToggleFeatured?.(product);
              }}
              className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
            >
              <Star className="w-3.5 h-3.5 text-amber-500" />
              <span>
                {product.isFeatured ? "Remove from Featured" : "Add to Featured"}
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onToggleSpecialOffer?.(product);
              }}
              className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-[#00a99d]" />
              <span>
                {product.isSpecialOffer
                  ? "Remove from Special Offers"
                  : "Add to Special Offers"}
              </span>
            </button>
          </div>

          <div className="py-1">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onDelete?.(product.id);
              }}
              className="w-full px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
