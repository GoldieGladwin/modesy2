"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { DeliveryTime } from "./types";

interface AddDeliveryTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (deliveryTime: { en: string; ar: string }) => void;
  initialData?: DeliveryTime | null;
}

export default function AddDeliveryTimeModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: AddDeliveryTimeModalProps) {
  const [englishText, setEnglishText] = useState("");
  const [arabicText, setArabicText] = useState("");

  useEffect(() => {
    if (initialData) {
      setEnglishText(initialData.option.en);
      setArabicText(initialData.option.ar);
    } else {
      setEnglishText("");
      setArabicText("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!englishText.trim()) return;
    onSave({
      en: englishText.trim(),
      ar: arabicText.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in duration-150">
      <div className="bg-white rounded-[4px] shadow-2xl w-full max-w-[580px] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-[15px] font-semibold text-gray-800">
            {initialData ? "Edit Delivery Time" : "Add Delivery Time"}
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[13px] text-gray-700 font-medium mb-1.5">
              Option
            </label>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="English"
                value={englishText}
                onChange={(e) => setEnglishText(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-[3px] px-3.5 py-2 text-[13px] text-gray-800 focus:outline-none focus:border-[#20c997] transition-colors placeholder:text-gray-400"
              />
              <input
                type="text"
                placeholder="Arabic"
                value={arabicText}
                onChange={(e) => setArabicText(e.target.value)}
                dir="rtl"
                className="w-full border border-gray-300 rounded-[3px] px-3.5 py-2 text-[13px] text-gray-800 focus:outline-none focus:border-[#20c997] transition-colors placeholder:text-gray-400 text-right"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="px-6 py-2 bg-[#20c997] hover:bg-[#1bb285] text-white text-[13px] font-medium rounded-[3px] transition-colors shadow-sm cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
