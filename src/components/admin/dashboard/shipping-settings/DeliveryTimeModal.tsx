"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { DeliveryTimeItem } from "./types";

interface DeliveryTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  deliveryTime: DeliveryTimeItem | null;
  onSave: (item: DeliveryTimeItem) => void;
}

export default function DeliveryTimeModal({
  isOpen,
  onClose,
  deliveryTime,
  onSave,
}: DeliveryTimeModalProps) {
  const [option, setOption] = useState("");

  useEffect(() => {
    if (deliveryTime) {
      setOption(deliveryTime.option);
    } else {
      setOption("");
    }
  }, [deliveryTime, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!option.trim()) return;

    onSave({
      id: deliveryTime ? deliveryTime.id : Date.now(),
      option: option.trim(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-[4px] max-w-md w-full shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 font-sans">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-[#2d3748]">
            {deliveryTime ? "Edit Delivery Time" : "Add Delivery Time"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block text-xs font-semibold text-[#333e48] mb-1.5">
              Option
            </label>
            <input
              type="text"
              required
              value={option}
              onChange={(e) => setOption(e.target.value)}
              placeholder="e.g. Ready to ship in 1 Business Day"
              className="w-full px-3 py-2 text-xs border border-[#d1d5db] rounded-[4px] focus:outline-none focus:border-[#00a99d] text-[#333e48]"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 border border-gray-300 rounded-[3px] text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white font-semibold rounded-[3px] shadow-xs transition cursor-pointer"
            >
              {deliveryTime ? "Save Changes" : "Add Delivery Time"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
