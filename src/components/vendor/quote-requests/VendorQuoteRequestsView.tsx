"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { VendorQuoteRequest, QuoteStatus } from "./types";
import { initialVendorQuoteRequests } from "./mockData";
import SubmitQuoteModal from "./SubmitQuoteModal";

export default function VendorQuoteRequestsView() {
  const [quotes, setQuotes] = useState<VendorQuoteRequest[]>(initialVendorQuoteRequests);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedStatus, setAppliedStatus] = useState("All");
  const [appliedSearch, setAppliedSearch] = useState("");

  // Dropdown options state (quoteId -> boolean)
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [activeQuote, setActiveQuote] = useState<VendorQuoteRequest | null>(null);

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilter = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedStatus(statusFilter);
    setAppliedSearch(searchQuery);
  };

  const filteredQuotes = quotes.filter((q) => {
    if (appliedStatus !== "All" && q.status !== appliedStatus) {
      return false;
    }
    if (appliedSearch.trim() !== "") {
      const qLower = appliedSearch.toLowerCase();
      const matchNumber = q.quoteNumber.toLowerCase().includes(qLower);
      const matchTitle = q.productTitle.toLowerCase().includes(qLower);
      const matchSku = q.sku.toLowerCase().includes(qLower);
      const matchBuyer = q.buyer.toLowerCase().includes(qLower);
      if (!matchNumber && !matchTitle && !matchSku && !matchBuyer) {
        return false;
      }
    }
    return true;
  });

  const handleOpenSubmitQuote = (quote: VendorQuoteRequest) => {
    setActiveQuote(quote);
    setOpenDropdownId(null);
    setModalOpen(true);
  };

  const handleSubmitQuote = (quoteId: number, sellersBid: string) => {
    setQuotes((prev) =>
      prev.map((q) => {
        if (q.id === quoteId) {
          return {
            ...q,
            status: "Pending Quote" as QuoteStatus,
            sellersBid,
            updated: "Just now",
          };
        }
        return q;
      })
    );
    setToastMessage(`Quote submitted successfully for quote #${quoteId}!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleDeleteQuote = (quoteId: number) => {
    setQuotes((prev) => prev.filter((q) => q.id !== quoteId));
    setOpenDropdownId(null);
    setToastMessage(`Quote request #${quoteId} deleted.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getStatusBadge = (status: QuoteStatus) => {
    switch (status) {
      case "New Quote Request":
        return (
          <span className="bg-[#1abc9c] text-white text-[11px] font-semibold px-2.5 py-1 rounded-[4px] inline-block whitespace-nowrap">
            New Quote Request
          </span>
        );
      case "Closed":
        return (
          <span className="bg-[#7f8c8d] text-white text-[11px] font-semibold px-2.5 py-1 rounded-[4px] inline-block whitespace-nowrap">
            Closed
          </span>
        );
      case "Pending Quote":
        return (
          <span className="bg-[#f39c12] text-white text-[11px] font-semibold px-2.5 py-1 rounded-[4px] inline-block whitespace-nowrap">
            Pending Quote
          </span>
        );
      case "Pending Payment":
        return (
          <span className="bg-[#3498db] text-white text-[11px] font-semibold px-2.5 py-1 rounded-[4px] inline-block whitespace-nowrap">
            Pending Payment
          </span>
        );
      case "Rejected Quote":
        return (
          <span className="bg-[#e74c3c] text-white text-[11px] font-semibold px-2.5 py-1 rounded-[4px] inline-block whitespace-nowrap">
            Rejected Quote
          </span>
        );
      case "Completed":
        return (
          <span className="bg-[#27ae60] text-white text-[11px] font-semibold px-2.5 py-1 rounded-[4px] inline-block whitespace-nowrap">
            Completed
          </span>
        );
      default:
        return (
          <span className="bg-gray-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-[4px] inline-block">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white text-sm font-medium px-4 py-3 rounded shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white rounded border border-[#e4e7ea] p-6 shadow-sm">
        {/* Title */}
        <h1 className="text-[17px] font-semibold text-gray-800 mb-6">
          Quote Requests
        </h1>

        {/* Filter Section */}
        <form onSubmit={handleFilter} className="flex flex-wrap items-end gap-3 mb-6">
          {/* Status Dropdown */}
          <div className="w-44 sm:w-48">
            <label className="block text-[13px] text-gray-700 mb-1.5 font-medium">
              Status
            </label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-[36px] px-3 pr-8 text-[13px] bg-white border border-[#ced4da] rounded-[3px] text-gray-700 appearance-none focus:outline-none focus:border-[#5b69bc] cursor-pointer"
              >
                <option value="All">All</option>
                <option value="New Quote Request">New Quote Request</option>
                <option value="Pending Quote">Pending Quote</option>
                <option value="Pending Payment">Pending Payment</option>
                <option value="Rejected Quote">Rejected Quote</option>
                <option value="Closed">Closed</option>
                <option value="Completed">Completed</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Search Input */}
          <div className="w-48 sm:w-56">
            <label className="block text-[13px] text-gray-700 mb-1.5 font-medium">
              Search
            </label>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[36px] px-3 text-[13px] bg-white border border-[#ced4da] rounded-[3px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#5b69bc]"
            />
          </div>

          {/* Filter Button */}
          <button
            type="submit"
            className="h-[36px] px-5 bg-[#5b69bc] hover:bg-[#4d5aa6] text-white text-[13px] font-medium rounded-[3px] transition-colors cursor-pointer shadow-sm"
          >
            Filter
          </button>
        </form>

        {/* Table Container */}
        <div className="overflow-x-auto min-h-[300px]" ref={dropdownRef}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-t border-b border-[#dee2e6] text-[#495057] text-[13px] font-semibold">
                <th className="py-3 px-3 w-16">Quote</th>
                <th className="py-3 px-3 min-w-[280px]">Product</th>
                <th className="py-3 px-3 min-w-[120px]">Buyer</th>
                <th className="py-3 px-3 min-w-[150px]">Status</th>
                <th className="py-3 px-3 min-w-[120px]">Seller&#39;s Bid</th>
                <th className="py-3 px-3 min-w-[120px]">Updated</th>
                <th className="py-3 px-3 min-w-[160px]">Date</th>
                <th className="py-3 px-3 min-w-[140px]">Options</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-700 divide-y divide-[#dee2e6]/70">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-400">
                    No quote requests found.
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((quote) => {
                  const isDropdownOpen = openDropdownId === quote.id;

                  return (
                    <tr
                      key={quote.id}
                      className="hover:bg-[#f8f9fa] transition-colors"
                    >
                      {/* Quote Number */}
                      <td className="py-4 px-3 text-gray-600 font-medium">
                        {quote.quoteNumber}
                      </td>

                      {/* Product Thumbnail & Details */}
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded border border-gray-200 overflow-hidden shrink-0 bg-gray-50">
                            <Image
                              src={quote.productImage}
                              alt={quote.productTitle}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col text-left">
                            <Link
                              href="#"
                              className="text-[13px] font-medium text-gray-800 hover:text-[#00a99d] transition-colors line-clamp-1"
                            >
                              {quote.productTitle}
                            </Link>
                            <span className="text-[12px] text-gray-500 mt-0.5">
                              SKU: {quote.sku}
                            </span>
                            <span className="text-[12px] text-gray-500">
                              Quantity: {quote.quantity}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Buyer */}
                      <td className="py-4 px-3 text-gray-600 font-normal">
                        {quote.buyer}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-3">
                        {getStatusBadge(quote.status)}
                      </td>

                      {/* Seller's Bid */}
                      <td className="py-4 px-3">
                        {quote.sellersBid ? (
                          <span className="bg-[#20c997] text-white text-[11px] font-bold px-2 py-0.5 rounded-[3px] inline-block">
                            {quote.sellersBid}
                          </span>
                        ) : null}
                      </td>

                      {/* Updated */}
                      <td className="py-4 px-3 text-gray-600 whitespace-nowrap">
                        {quote.updated}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-3 text-gray-600 whitespace-nowrap">
                        {quote.date}
                      </td>

                      {/* Options */}
                      <td className="py-4 px-3 relative">
                        <div className="relative inline-block text-left">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(
                                isDropdownOpen ? null : quote.id
                              );
                            }}
                            className="bg-[#5b69bc] hover:bg-[#4d5aa6] text-white text-[12px] font-medium px-3.5 py-1.5 rounded-[3px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm select-none"
                          >
                            <span>Select an option</span>
                            <ChevronDown className="w-3 h-3 ml-0.5" />
                          </button>

                          {/* Options Dropdown Menu */}
                          {isDropdownOpen && (
                            <div className="absolute left-0 mt-1 w-44 bg-white rounded-[3px] shadow-lg border border-[#dee2e6] py-1 z-30 animate-in fade-in duration-100">
                              <button
                                type="button"
                                onClick={() => handleOpenSubmitQuote(quote)}
                                className="w-full text-left px-3.5 py-2 text-[12.5px] text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5 text-gray-500" />
                                <span>Submit a Quote</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteQuote(quote.id)}
                                className="w-full text-left px-3.5 py-2 text-[12.5px] text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-gray-500" />
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info: Number of Entries */}
        <div className="mt-5 text-[12.5px] text-gray-600 font-normal">
          Number of Entries: {filteredQuotes.length}
        </div>
      </div>

      {/* Submit Quote Modal */}
      <SubmitQuoteModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setActiveQuote(null);
        }}
        quote={activeQuote}
        onSubmit={handleSubmitQuote}
      />
    </div>
  );
}
