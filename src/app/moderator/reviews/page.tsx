import React from "react";
import Link from "next/link";
import { Star, Trash2, CheckCircle } from "lucide-react";

export default function ModeratorReviewsPage() {
  const reviews = [
    { id: 1, user: "Sarah M.", rating: 5, product: "Minimalist Gold Ring", review: "Absolutely stunning piece, fast delivery and beautiful gift packaging!", date: "1 day ago", status: "Approved" },
    { id: 2, user: "John D.", rating: 1, product: "Vintage Leather Jacket", review: "Scam company, arrived damaged and seller won't reply! (Flagged for investigation)", date: "2 days ago", status: "Reported" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/moderator" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <Link href="/moderator/dashboard" className="hover:text-[#00a99d]">Dashboard</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Reviews</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-100 mb-4">
          <Star className="w-5 h-5 text-amber-600" />
          Review &amp; Rating Moderation
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Review Text</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reviews.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 font-semibold text-gray-900">{r.user}</td>
                  <td className="py-3 px-4 text-amber-500 font-bold">★ {r.rating}/5</td>
                  <td className="py-3 px-4 text-[#00a99d] font-medium">{r.product}</td>
                  <td className="py-3 px-4 text-gray-600 max-w-xs">{r.review}</td>
                  <td className="py-3 px-4 text-gray-400">{r.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-xs text-[11px] font-semibold ${
                      r.status === "Approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button type="button" className="text-emerald-600 hover:underline font-semibold">
                      Approve
                    </button>
                    <button type="button" className="text-red-600 hover:underline font-semibold">
                      Remove
                    </button>
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
