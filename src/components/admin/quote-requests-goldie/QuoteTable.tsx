"use client";

import React, { useState } from "react";
import { ChevronDown, Eye, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import { QuoteRequestItem } from "./types";

interface QuoteTableProps {
  quotes: QuoteRequestItem[];
  onDelete?: (id: number) => void;
  onView?: (quote: QuoteRequestItem) => void;
  onAcceptBid?: (quote: QuoteRequestItem) => void;
  onRejectBid?: (quote: QuoteRequestItem) => void;
}

export default function QuoteTable({
  quotes,
  onDelete,
  onView,
  onAcceptBid,
  onRejectBid,
}: QuoteTableProps) {
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);

  return (
    <div className="bg-white border border-gray-200 rounded-[3px] shadow-2xs overflow-hidden">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-200 bg-white text-[#333333] font-semibold">
              <th className="py-3 px-3 w-16">Quote</th>
              <th className="py-3 px-3 min-w-[280px]">Product</th>
              <th className="py-3 px-3 w-28">Seller</th>
              <th className="py-3 px-3 w-32">Buyer</th>
              <th className="py-3 px-3 w-36">Status</th>
              <th className="py-3 px-3 w-28">Seller's Bid</th>
              <th className="py-3 px-3 w-28">Updated</th>
              <th className="py-3 px-3 w-36">Date</th>
              <th className="py-3 px-3 w-36 text-right">Options</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-gray-700">
            {quotes.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="py-12 text-center text-sm text-gray-500 font-medium"
                >
                  No records found!
                </td>
              </tr>
            ) : (
              quotes.map((quote) => (
                <tr
                  key={quote.id}
                  className="hover:bg-gray-50/70 transition-colors"
                >
                  {/* Quote Number */}
                  <td className="py-3 px-3 text-gray-800 font-semibold">
                    {quote.quoteNumber}
                  </td>

                  {/* Product */}
                  <td className="py-3 px-3">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-[3px] border border-gray-200 overflow-hidden shrink-0 relative">
                        <img
                          src={quote.productImage}
                          alt={quote.productTitle}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://placehold.co/100x100?text=Product";
                          }}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 leading-snug">
                          {quote.productTitle}
                        </p>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          Quantity: {quote.quantity}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Seller */}
                  <td className="py-3 px-3 text-gray-700 font-medium">
                    {quote.seller}
                  </td>

                  {/* Buyer */}
                  <td className="py-3 px-3 text-gray-700 font-medium">
                    {quote.buyer}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3 text-gray-700 font-medium">
                    {quote.status}
                  </td>

                  {/* Seller's Bid */}
                  <td className="py-3 px-3 font-bold text-gray-800">
                    {quote.sellersBid || ""}
                  </td>

                  {/* Updated */}
                  <td className="py-3 px-3 text-gray-500 whitespace-nowrap">
                    {quote.updated}
                  </td>

                  {/* Date */}
                  <td className="py-3 px-3 text-gray-500 font-mono text-[11px] whitespace-nowrap">
                    {quote.date}
                  </td>

                  {/* Options */}
                  <td className="py-3 px-3 text-right relative">
                    <div className="inline-block text-left">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveDropdownId(
                            activeDropdownId === quote.id ? null : quote.id
                          )
                        }
                        className="inline-flex items-center gap-1.5 bg-[#605ca8] hover:bg-[#504c94] text-white text-xs font-semibold px-3 py-1 rounded-[3px] shadow-xs transition cursor-pointer whitespace-nowrap"
                      >
                        <span>Select an option</span>
                        <ChevronDown className="w-3 h-3" />
                      </button>

                      {activeDropdownId === quote.id && (
                        <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-[3px] shadow-lg z-30 py-1 text-left">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveDropdownId(null);
                              onView?.(quote);
                            }}
                            className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-blue-600" />
                            <span>View Details</span>
                          </button>
                          {quote.sellersBid && (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveDropdownId(null);
                                  onAcceptBid?.(quote);
                                }}
                                className="w-full px-3 py-1.5 text-xs text-emerald-600 hover:bg-emerald-50 flex items-center gap-2 cursor-pointer"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Accept Bid</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveDropdownId(null);
                                  onRejectBid?.(quote);
                                }}
                                className="w-full px-3 py-1.5 text-xs text-amber-600 hover:bg-amber-50 flex items-center gap-2 cursor-pointer"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Reject Bid</span>
                              </button>
                            </>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveDropdownId(null);
                              onDelete?.(quote.id);
                            }}
                            className="w-full px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer border-t border-gray-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
