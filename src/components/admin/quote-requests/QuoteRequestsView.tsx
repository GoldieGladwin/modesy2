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
    pageSize: 15,
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

  const filteredQuotes = quotes.filter((q) => {
    if (filter.status !== "All" && q.status !== filter.status) return false;
    if (filter.search.trim()) {
      const query = filter.search.toLowerCase();
      const match =
        q.quoteNumber.toLowerCase().includes(query) ||
        q.productTitle.toLowerCase().includes(query) ||
        q.seller.toLowerCase().includes(query) ||
        q.buyer.toLowerCase().includes(query);
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
    <div className="space-y-4 font-sans">
      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
        Quote Requests
      </h1>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-[#d4edda] border border-[#c3e6cb] text-[#155724] px-4 py-2.5 rounded-[3px] text-xs font-medium flex items-center justify-between shadow-xs">
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
        onApplyFilter={() => {}}
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
