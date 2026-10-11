'use client';

import React from 'react';
import { Review, ReviewStatus } from './types';

interface ReviewCardProps {
  review: Review;
  onStatusChange: (id: string, newStatus: ReviewStatus) => void;
}

export default function ReviewCard({ review, onStatusChange }: ReviewCardProps) {
  const getStatusBadgeClass = (status: ReviewStatus) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-500';
      case 'Rejected':
        return 'bg-red-500';
      case 'Pending':
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-gray-900">{review.productName}</h4>
          <div className="text-sm text-gray-600">
            By {review.customerName || 'Anonymous'} on {review.reviewDate}
          </div>
        </div>
        <div className="flex space-x-1 text-yellow-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}>
              ★
            </span>
          ))}
        </div>
      </div>

      <p className="text-gray-800 mb-4 text-sm">{review.content}</p>

      <div className="flex justify-between items-center border-t pt-3 border-gray-200">
        <span className={`px-2 py-1 rounded text-xs text-white ${getStatusBadgeClass(review.status)}`}>
          {review.status}
        </span>

        <div className="space-x-2">
          {review.status !== 'Approved' && (
            <button
              onClick={() => onStatusChange(review.id, 'Approved')}
              className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm hover:bg-green-200 transition"
            >
              Approve
            </button>
          )}
          {review.status !== 'Rejected' && (
            <button
              onClick={() => onStatusChange(review.id, 'Rejected')}
              className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200 transition"
            >
              Reject
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
