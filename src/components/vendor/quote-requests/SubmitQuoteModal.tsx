"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { VendorQuoteRequest } from "./types";

interface SubmitQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: VendorQuoteRequest | null;
  onSubmit: (quoteId: number, sellersBid: string) => void;
}

export default function SubmitQuoteModal({
  isOpen,
  onClose,
  quote,
  onSubmit,
}: SubmitQuoteModalProps) {
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (isOpen) {
      setPrice("");
    }
  }, [isOpen, quote]);

  if (!isOpen || !quote) return null;

  const numPrice = parseFloat(price) || 0;
  const quantity = quote.quantity > 0 ? quote.quantity : 1;
  const unitPrice = numPrice > 0 ? (numPrice / quantity).toFixed(2) : "0.00";
  const commissionRate = 0.05;
  const earnings =
    numPrice > 0 ? (numPrice * (1 - commissionRate)).toFixed(2) : "0";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (numPrice <= 0) return;

    const formattedBid = `$${numPrice.toLocaleString("en-US")}`;
    onSubmit(quote.id, formattedBid);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[1px] transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-md shadow-2xl w-full max-w-[520px] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-[16px] font-semibold text-gray-800">
            Submit a Quote
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-[13.5px] font-medium text-gray-700 mb-2">
                Price
              </label>
              <div className="flex rounded-[3px] border border-gray-300 focus-within:border-[#00a99d] transition-colors">
                <span className="inline-flex items-center justify-center px-4 bg-gray-50 text-gray-600 text-sm font-medium border-r border-gray-300 select-none">
                  $
                </span>
                <input
                  type="number"
                  step="any"
                  min="0"
                  autoFocus
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="flex-1 w-full px-3 py-2 text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none bg-white rounded-r-[3px]"
                />
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-2 text-[13.5px] text-gray-800 font-medium space-y-1.5">
              <p>Unit Price ($): {unitPrice}</p>
              <p>Commission Rate: 5%</p>
              <p>You Will Earn ($): {earnings} + Shipping Cost</p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2.5 px-6 py-4 bg-white border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-[13px] font-medium rounded transition-colors cursor-pointer shadow-sm"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={numPrice <= 0}
              className="px-6 py-2 bg-[#20c997] hover:bg-[#1bb285] disabled:opacity-60 text-white text-[13px] font-medium rounded transition-colors cursor-pointer shadow-sm"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
