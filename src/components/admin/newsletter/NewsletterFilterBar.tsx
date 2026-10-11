'use client';

import React from 'react';

interface NewsletterFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export default function NewsletterFilterBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: NewsletterFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <input
        type="text"
        placeholder="Search emails..."
        className="border border-gray-300 rounded px-4 py-2 flex-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        className="border border-gray-300 rounded px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
      >
        <option value="All">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Unsubscribed">Unsubscribed</option>
      </select>
    </div>
  );
}
