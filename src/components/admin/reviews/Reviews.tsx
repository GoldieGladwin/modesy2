'use client';

import React, { useState } from 'react';
import type { Review, ReviewStatus } from './types';
import { mockReviews } from './mockData';
import ReviewsHeader from './ReviewsHeader';
import ReviewsFilterBar from './ReviewsFilterBar';
import ReviewCard from './ReviewCard';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [ratingFilter, setRatingFilter] = useState<string>('All');

  const handleStatusChange = (id: string, newStatus: ReviewStatus) => {
    setReviews((prev) =>
      prev.map((review) => (review.id === id ? { ...review, status: newStatus } : review))
    );
  };

  const filteredReviews = reviews.filter((review) => {
    const matchStatus = statusFilter === 'All' || review.status === statusFilter;
    const matchRating = ratingFilter === 'All' || review.rating.toString() === ratingFilter;
    return matchStatus && matchRating;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <ReviewsHeader />
      <ReviewsFilterBar
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        ratingFilter={ratingFilter}
        onRatingFilterChange={setRatingFilter}
      />

      <div className="grid gap-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onStatusChange={handleStatusChange}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 border border-gray-200 rounded-lg text-sm">
            No reviews found matching criteria.
          </div>
        )}
      </div>
    </div>
  );
}
