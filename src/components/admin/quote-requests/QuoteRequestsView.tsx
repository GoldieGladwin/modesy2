"use client";

import React, { useState } from "react";
import QuoteFilterBar from "./QuoteFilterBar";
import QuoteTable from "./QuoteTable";
import { QuoteFilterState, QuoteRequestItem } from "./types";
import { initialQuoteRequests } from "./mockData";

export default function QuoteRequestsView() {
  const [quotes, setQuotes] = useState<QuoteRequestItem[]>(initialQuoteRequests);
  const [notification, setNotification] = useState<string | null>(null);
  const [filter, setFilter] = useState<QuoteFilterState>({
    status: "All",
    search: "",
  });
  const [appliedFilter, setAppliedFilter] = useState<QuoteFilterState>({
    status: "All",
    search: "",
  });

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleFilterChange = (newFilter: Partial<QuoteFilterState>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  const handleApplyFilter = () => {
    setAppliedFilter(filter);
  };

  const filteredQuotes = quotes.filter((q) => {
    if (appliedFilter.status !== "All" && q.status !== appliedFilter.status)
      return false;
    if (appliedFilter.search.trim()) {
      const query = appliedFilter.search.toLowerCase();
      const match =
        q.quoteNumber.toLowerCase().includes(query) ||
        q.productTitle.toLowerCase().includes(query) ||
        q.buyer.toLowerCase().includes(query) ||
        (q.sku && q.sku.toLowerCase().includes(query));
      if (!match) return false;
    }
    return true;
  });

  const handleDelete = (id: number) => {
    const target = quotes.find((q) => q.id === id);
    if (confirm(`Are you sure you want to delete quote "${target?.quoteNumber}"?`)) {
      setQuotes((prev) => prev.filter((q) => q.id !== id));
      showNotification(`Quote "${target?.quoteNumber}" deleted successfully.`);
    }
  };

  const handleAcceptBid = (quote: QuoteRequestItem) => {
    setQuotes((prev) =>
      prev.map((q) =>
        q.id === quote.id ? { ...q, status: "Closed" } : q
      )
    );
    showNotification(`Bid accepted for quote "${quote.quoteNumber}".`);
  };

  const handleRejectBid = (quote: QuoteRequestItem) => {
    setQuotes((prev) =>
      prev.map((q) =>
        q.id === quote.id ? { ...q, status: "Closed" } : q
      )
    );
    showNotification(`Bid rejected for quote "${quote.quoteNumber}".`);
  };

  return (
    <div className="bg-white border border-[#ebebeb] rounded-[4px] p-6 sm:p-7 shadow-xs font-sans">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-[18px] font-bold text-[#2d3748]">
          Quote Requests
        </h1>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="mb-4 bg-[#d4edda] border border-[#c3e6cb] text-[#155724] px-4 py-2.5 rounded-[3px] text-xs font-medium flex items-center justify-between shadow-2xs">
          <span>{notification}</span>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-[#155724] font-bold text-sm cursor-pointer ml-4"
          >
            ×
          </button>
        </div>
      )}

      {/* Filter Bar */}
      <QuoteFilterBar
        filter={filter}
        onFilterChange={handleFilterChange}
        onApplyFilter={handleApplyFilter}
      />

      {/* Table */}
      <QuoteTable
        quotes={filteredQuotes}
        onDelete={handleDelete}
        onView={(q) => alert(`View Quote ${q.quoteNumber} Details`)}
        onAcceptBid={handleAcceptBid}
        onRejectBid={handleRejectBid}
      />
    </div>
  );
}
