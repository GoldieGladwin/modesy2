import React from "react";
import { Star, Trash2, CheckCircle } from "lucide-react";

export default function AdminReviewsPage() {
  const reviews = [
    { id: 1, user: "Sarah Jenkins", product: "Modern Ergonomic Office Chair", rating: 5, comment: "Incredible lumbar support! Very happy with fast shipping.", date: "2026-10-08", status: "Approved" },
    { id: 2, user: "Michael Brown", product: "Wireless Noise Cancelling Headphones", rating: 4, comment: "Great sound fidelity, ear cushions are super soft.", date: "2026-10-06", status: "Approved" },
    { id: 3, user: "Elena Rostova", product: "Ceramic Minimalist Mug", rating: 5, comment: "Artisan quality is apparent right out of the box.", date: "2026-10-04", status: "Approved" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Star className="w-5 h-5 text-[#00a99d]" /> Reviews
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Moderate customer product ratings, testimonials, and verified buyer reviews</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200 uppercase">
              <tr>
                <th className="py-2.5 px-3">Reviewer</th>
                <th className="py-2.5 px-3">Target Product</th>
                <th className="py-2.5 px-3">Rating</th>
                <th className="py-2.5 px-3">Review Content</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reviews.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50/70">
                  <td className="py-3 px-3 font-semibold text-gray-900">{r.user}</td>
                  <td className="py-3 px-3 text-[#00a99d] font-medium">{r.product}</td>
                  <td className="py-3 px-3 font-bold text-amber-500">
                    {"★".repeat(r.rating)} <span className="text-gray-400 font-normal text-[11px]">({r.rating}/5)</span>
                  </td>
                  <td className="py-3 px-3 text-gray-600 max-w-xs truncate">{r.comment}</td>
                  <td className="py-3 px-3 text-gray-400">{r.date}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-[10px] font-bold">
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button className="text-gray-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5 inline" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
