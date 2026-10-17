"use client";

import React from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { ProductItem } from "./types";

interface ProductDeleteModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ProductDeleteModal({
  product,
  isOpen,
  onClose,
  onConfirm,
}: ProductDeleteModalProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[4px] shadow-2xl border border-gray-200 w-full max-w-md overflow-hidden p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3.5">
          {/* Warning Icon Badge */}
          <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <Trash2 className="w-5 h-5 stroke-[2]" />
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-900">Delete Product</h3>
            <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
              Are you sure you want to delete{" "}
              <strong className="text-gray-900 font-semibold">
                &ldquo;{product.title}&rdquo;
              </strong>
              {product.sku ? ` (SKU: ${product.sku})` : ""}?
            </p>
            <p className="text-[11px] text-red-500 font-medium mt-1">
              This action cannot be undone.
            </p>
          </div>

          {/* Close X */}
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition cursor-pointer p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-[3px] text-xs font-semibold hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-[#e74c3c] hover:bg-[#c0392b] text-white rounded-[3px] text-xs font-semibold transition cursor-pointer shadow-xs inline-flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Product</span>
          </button>
        </div>
      </div>
    </div>
  );
}
