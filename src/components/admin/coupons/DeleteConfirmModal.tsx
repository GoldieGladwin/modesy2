"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { Coupon } from "./types";

interface DeleteConfirmModalProps {
  coupon: Coupon | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  coupon,
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!isOpen || !coupon) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xs animate-in fade-in duration-150">
      <div className="bg-white rounded-md shadow-xl border border-gray-200 w-full max-w-md overflow-hidden p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-900">Delete Coupon</h3>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              Are you sure you want to delete coupon{" "}
              <strong className="font-mono text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                {coupon.code}
              </strong>{" "}
              ({coupon.name})? This action cannot be undone.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 border border-gray-300 text-gray-700 rounded text-xs font-semibold hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold transition cursor-pointer"
          >
            Delete Coupon
          </button>
        </div>
      </div>
    </div>
  );
}
