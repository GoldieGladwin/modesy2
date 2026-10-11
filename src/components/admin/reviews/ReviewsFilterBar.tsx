'use client';

import React from 'react';

interface ReviewsFilterBarProps {
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  ratingFilter: string;
  onRatingFilterChange: (value: string) => void;
}

export default function ReviewsFilterBar({
  statusFilter,
  onStatusFilterChange,
  ratingFilter,
  onRatingFilterChange,
}: ReviewsFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <select
        className="border border-gray-300 rounded px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
      >
        <option value="All">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>

      <select
        className="border border-gray-300 rounded px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={ratingFilter}
        onChange={(e) => onRatingFilterChange(e.target.value)}
      >
        <option value="All">All Ratings</option>
        <option value="5">5 Stars</option>
        <option value="4">4 Stars</option>
        <option value="3">3 Stars</option>
        <option value="2">2 Stars</option>
        <option value="1">1 Star</option>
      </select>
    </div>
  );
}
