'use client';

import React from 'react';

interface PaymentsFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export default function PaymentsFilterBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: PaymentsFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
      <input
        type="text"
        placeholder="Search by Payment ID, Order ID..."
        className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        className="border border-gray-300 rounded px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
      >
        <option value="All">All Statuses</option>
        <option value="Success">Success</option>
        <option value="Pending">Pending</option>
        <option value="Failed">Failed</option>
        <option value="Refunded">Refunded</option>
      </select>
    </div>
  );
}
