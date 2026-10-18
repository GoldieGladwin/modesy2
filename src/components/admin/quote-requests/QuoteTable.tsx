"use client";

import React, { useState, useEffect, useRef } from "react";
import { Eye, CheckCircle2, XCircle, Trash2 } from "lucide-react";
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
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse border border-[#e9ecef] text-xs">
        <thead>
          <tr className="bg-white text-[#333e48] font-bold">
            <th className="py-3 px-3 font-bold border border-[#e9ecef] w-14">
              Quote
            </th>
            <th className="py-3 px-3 font-bold border border-[#e9ecef] min-w-[280px]">
              Product
            </th>
            <th className="py-3 px-3 font-bold border border-[#e9ecef] w-28">
              Buyer
            </th>
            <th className="py-3 px-3 font-bold border border-[#e9ecef] w-36">
              Status
            </th>
            <th className="py-3 px-3 font-bold border border-[#e9ecef] w-28">
              Seller&apos;s Bid
            </th>
            <th className="py-3 px-3 font-bold border border-[#e9ecef] w-28">
              Updated
            </th>
            <th className="py-3 px-3 font-bold border border-[#e9ecef] w-36">
              Date
            </th>
            <th className="py-3 px-3 font-bold border border-[#e9ecef] w-36">
              Options
            </th>
          </tr>
        </thead>

        <tbody>
          {quotes.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="py-12 text-center text-sm text-gray-500 font-medium border border-[#e9ecef]"
              >
                No records found!
              </td>
            </tr>
          ) : (
            quotes.map((quote) => (
              <tr
                key={quote.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                {/* Quote Number */}
                <td className="py-3 px-3 align-top border border-[#e9ecef] text-[#333e48] font-medium text-xs">
                  {quote.quoteNumber}
                </td>

                {/* Product */}
                <td className="py-3 px-3 align-top border border-[#e9ecef]">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-[60px] h-[60px] bg-[#f8f9fa] border border-[#e2e8f0] rounded-[3px] overflow-hidden">
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
                      <span className="text-[12px] text-[#333e48] mt-2 whitespace-nowrap">
                        Quantity: {quote.quantity}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <a
                        href="#"
                        className="text-[13px] text-[#337ab7] hover:underline leading-snug font-normal"
                      >
                        {quote.productTitle}
                      </a>
                      {quote.color && (
                        <span className="text-[12px] text-[#333e48] mt-1">
                          <strong className="font-semibold text-[#333e48]">
                            Color:
                          </strong>{" "}
                          {quote.color}
                        </span>
                      )}
                      {quote.sku && (
                        <span className="text-[12px] text-[#333e48] mt-0.5">
                          <strong className="font-semibold text-[#333e48]">
                            SKU:
                          </strong>{" "}
                          {quote.sku}
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Buyer */}
                <td className="py-3 px-3 align-top border border-[#e9ecef] text-[#333e48] text-xs">
                  <div className="leading-snug">
                    <div>{quote.buyer.split(" ")[0]}</div>
                    <div>{quote.buyer.split(" ").slice(1).join(" ")}</div>
                  </div>
                </td>

                {/* Status */}
                <td className="py-3 px-3 align-top border border-[#e9ecef]">
                  {quote.status === "Pending Quote" ? (
                    <span className="inline-block bg-[#f39c12] text-white text-[11px] font-bold px-2.5 py-1 rounded-[4px] whitespace-nowrap">
                      Pending Quote
                    </span>
                  ) : quote.status === "Pending Payment" ? (
                    <span className="inline-block bg-[#17a2b8] text-white text-[11px] font-bold px-2.5 py-1 rounded-[4px] whitespace-nowrap">
                      Pending Payment
                    </span>
                  ) : (
                    <span className="inline-block bg-gray-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-[4px] whitespace-nowrap">
                      {quote.status}
                    </span>
                  )}
                </td>

                {/* Seller's Bid */}
                <td className="py-3 px-3 align-top border border-[#e9ecef]">
                  {quote.sellersBid ? (
                    <span className="inline-block bg-[#00a65a] text-white text-[11px] font-bold px-2 py-0.5 rounded-[4px] whitespace-nowrap">
                      {quote.sellersBid}
                    </span>
                  ) : null}
                </td>

                {/* Updated */}
                <td className="py-3 px-3 align-top border border-[#e9ecef] text-[#333e48] text-xs whitespace-nowrap">
                  {quote.updated}
                </td>

                {/* Date */}
                <td className="py-3 px-3 align-top border border-[#e9ecef] text-[#333e48] text-xs whitespace-nowrap">
                  <div className="leading-snug">
                    <div>{quote.date.split("/")[0]?.trim()} /</div>
                    <div>{quote.date.split("/")[1]?.trim()}</div>
                  </div>
                </td>

                {/* Options */}
                <td className="py-3 px-3 align-top border border-[#e9ecef] relative">
                  <div
                    ref={activeDropdownId === quote.id ? dropdownRef : null}
                    className="relative inline-block text-left"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdownId(
                          activeDropdownId === quote.id ? null : quote.id
                        )
                      }
                      className="inline-flex items-center gap-1.5 bg-[#5c57a3] hover:bg-[#4d4895] text-white text-xs font-semibold px-3 py-1.5 rounded-[4px] transition cursor-pointer whitespace-nowrap shadow-2xs"
                    >
                      <span>Select an option</span>
                      <span className="text-[9px]">▼</span>
                    </button>

                    {activeDropdownId === quote.id && (
                      <div className="absolute left-0 mt-1 w-40 bg-white border border-gray-200 rounded-[4px] shadow-lg z-30 py-1 text-left">
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
  );
}
