'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Clock, X, Check, AlertCircle } from 'lucide-react';
import { QuoteRequest } from './types';

interface QuoteRequestsTabProps {
  quoteRequests: QuoteRequest[];
  onDeleteQuote?: (id: string) => void;
}

export default function QuoteRequestsTab({
  quoteRequests: initialQuotes,
  onDeleteQuote,
}: QuoteRequestsTabProps) {
  const [quotes, setQuotes] = useState<QuoteRequest[]>(initialQuotes);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setQuotes((prev) => prev.filter((q) => q.id !== id));
    setConfirmDeleteId(null);
    onDeleteQuote?.(id);
    setFeedbackMsg(`Quote request #${id} has been deleted.`);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const formatPrice = (val: number) => {
    return `$${val.toLocaleString('en-US', {
      minimumFractionDigits: val % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="flex-1 min-w-0 font-sans">
      {/* Toast Alert */}
      {feedbackMsg && (
        <div className="fixed top-6 right-6 z-50 p-4 bg-emerald-600 text-white text-xs font-medium rounded shadow-lg flex items-center gap-2 animate-in slide-in-from-top-3 duration-200">
          <Check className="w-4 h-4" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Quote Requests List matching Screenshot 2 */}
      <div className="space-y-4">
        {quotes.map((quote) => (
          <div
            key={quote.id}
            className="bg-white border border-gray-200 rounded-[4px] p-5 transition-all hover:border-gray-300 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Product Thumbnail & Details */}
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="w-[84px] h-[84px] sm:w-[92px] sm:h-[92px] shrink-0 rounded-[3px] border border-gray-100 overflow-hidden relative bg-gray-50">
                  <Image
                    src={quote.productImage}
                    alt={quote.productTitle}
                    fill
                    sizes="92px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 space-y-1">
                  <div className="font-bold text-gray-900 text-xs sm:text-[13px] leading-tight">
                    Quote: #{quote.id}
                  </div>
                  <div className="text-gray-700 text-xs font-normal truncate hover:text-[#00a99d] cursor-pointer">
                    {quote.productTitle}
                  </div>
                  {quote.color && (
                    <div className="text-gray-500 text-xs">
                      Color: {quote.color}
                    </div>
                  )}
                  <div className="text-gray-500 text-xs">
                    Quantity: {quote.quantity}
                  </div>
                </div>
              </div>

              {/* Status Badge & Info */}
              <div className="shrink-0 min-w-[130px] flex flex-col justify-center space-y-1.5">
                <div>
                  {quote.status === 'New Quote Request' ? (
                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#e8f4fd] text-[#1890ff] border border-[#bce8f1]">
                      New Quote Request
                    </span>
                  ) : quote.status === 'Completed' ? (
                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#dff0d8] text-[#3c763d] border border-[#d6e9c6]">
                      Completed
                    </span>
                  ) : (
                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#fffbe6] text-[#faad14] border border-[#ffe58f]">
                      Pending Quote
                    </span>
                  )}
                </div>
                {quote.status === 'New Quote Request' && (
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <Clock className="w-3.5 h-3.5 stroke-[1.8] text-gray-400" />
                    <span>{quote.timeAgo}</span>
                  </div>
                )}
              </div>

              {/* Seller's Bid & Date (for bids) */}
              <div className="shrink-0 min-w-[140px] flex flex-col justify-center space-y-1">
                {quote.sellerBid !== undefined && (
                  <div className="text-xs sm:text-[13px] font-bold text-gray-900">
                    Seller&apos;s Bid: {formatPrice(quote.sellerBid)}
                  </div>
                )}
                {quote.status !== 'New Quote Request' && (
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <Clock className="w-3.5 h-3.5 stroke-[1.8] text-gray-400" />
                    <span>{quote.timeAgo}</span>
                  </div>
                )}
              </div>

              {/* Action Button: Delete Quote matching Screenshot 2 */}
              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => setConfirmDeleteId(quote.id)}
                  className="w-full sm:w-[130px] md:w-[140px] px-3.5 py-1.5 bg-[#e9ecef] hover:bg-[#dee2e6] hover:text-red-600 text-[#495057] text-xs font-semibold rounded-[3px] transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <X className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>Delete Quote</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {quotes.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-[4px] p-12 text-center text-gray-500">
            <p className="text-sm">No quote requests found.</p>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Delete */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-[4px] shadow-xl max-w-sm w-full p-6 text-center animate-in fade-in duration-150">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6 stroke-[2]" />
            </div>
            <h3 className="text-base font-bold text-gray-900">Delete Quote Request?</h3>
            <p className="text-xs text-gray-500 mt-2 mb-6">
              Are you sure you want to delete quote request #{confirmDeleteId}? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(confirmDeleteId)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
