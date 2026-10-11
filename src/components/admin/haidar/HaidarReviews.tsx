/**
 * Fitur: Reviews Moderation
 *
 * INTEGRATION GUIDE:
 * 1. Komponen ini menampilkan ulasan dan melakukan moderasi.
 * 2. Digunakan secara internal oleh HaidarAdmin.
 * 3. Jika ingin digunakan terpisah, import dari folder haidar.
 *
 * TODO: Integrasi dengan API Reviews sebenarnya.
 */
'use client';

import React, { useState } from 'react';
import type { Review } from '@/types/admin/haidar-admin';
import { mockReviews } from '@/data/admin/haidar-admin-data';

export default function HaidarReviews() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [ratingFilter, setRatingFilter] = useState<string>('All');

  const handleStatusChange = (id: string, newStatus: any) => {
    setReviews(reviews.map(review => review.id === id ? { ...review, status: newStatus } : review));
  };

  const filteredReviews = reviews.filter(review => {
    const matchStatus = statusFilter === 'All' || review.status === statusFilter;
    const matchRating = ratingFilter === 'All' || review.rating.toString() === ratingFilter;
    return matchStatus && matchRating;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Reviews Moderation</h2>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select 
          className="border border-gray-300 rounded px-4 py-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        
        <select 
          className="border border-gray-300 rounded px-4 py-2"
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
        >
          <option value="All">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredReviews.length > 0 ? filteredReviews.map(review => (
          <div key={review.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold">{review.productName}</h4>
                <div className="text-sm text-gray-600">
                  By {review.customerName || 'Anonymous'} on {review.reviewDate}
                </div>
              </div>
              <div className="flex space-x-1 text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
                ))}
              </div>
            </div>
            
            <p className="text-gray-800 mb-4">{review.content}</p>
            
            <div className="flex justify-between items-center border-t pt-3 border-gray-200">
              <span className={`px-2 py-1 rounded text-xs text-white ${
                review.status === 'Approved' ? 'bg-green-500' :
                review.status === 'Rejected' ? 'bg-red-500' : 'bg-yellow-500'
              }`}>
                {review.status}
              </span>
              
              <div className="space-x-2">
                {review.status !== 'Approved' && (
                  <button 
                    onClick={() => handleStatusChange(review.id, 'Approved')}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm hover:bg-green-200"
                  >
                    Approve
                  </button>
                )}
                {review.status !== 'Rejected' && (
                  <button 
                    onClick={() => handleStatusChange(review.id, 'Rejected')}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200"
                  >
                    Reject
                  </button>
                )}
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-8 text-gray-500 border border-gray-200 rounded-lg">
            No reviews found matching criteria.
          </div>
        )}
      </div>
    </div>
  );
}
