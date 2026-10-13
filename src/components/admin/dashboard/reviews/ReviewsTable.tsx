"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { ReviewItem } from "./types";
import { initialReviews } from "./mockData";

export default function ReviewsTable() {
  const [reviews] = useState<ReviewItem[]>(initialReviews);

  return (
    <div className="bg-white border border-[#ebebeb] rounded-[4px] p-6 shadow-xs font-sans">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-[18px] font-bold text-[#2d3748]">Reviews</h1>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#e9ecef] text-[#333e48] font-bold">
              <th className="py-3 px-3 font-bold w-16">Id</th>
              <th className="py-3 px-3 font-bold w-36">User</th>
              <th className="py-3 px-3 font-bold">Review</th>
              <th className="py-3 px-3 font-bold w-56">Product</th>
              <th className="py-3 px-3 font-bold w-44">Date</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-[#555] text-xs font-normal"
                >
                  No records found!
                </td>
              </tr>
            ) : (
              reviews.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#f1f3f5] hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4 px-3 text-[#333e48] align-top">{item.id}</td>
                  <td className="py-4 px-3 text-[#333e48] align-top">
                    {item.user}
                  </td>
                  <td className="py-4 px-3 align-top max-w-2xl">
                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mb-1.5">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#f39c12] text-[#f39c12]"
                        />
                      ))}
                    </div>
                    {/* Review Content */}
                    <p className="text-xs text-[#555] leading-relaxed">
                      {item.review}
                    </p>
                  </td>
                  <td className="py-4 px-3 text-[#333e48] align-top">
                    {item.product}
                  </td>
                  <td className="py-4 px-3 text-[#333e48] align-top whitespace-nowrap">
                    {item.date}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer: Number of Entries */}
      {reviews.length > 0 && (
        <div className="mt-6 text-xs text-[#555]">
          Number of Entries:{" "}
          <strong className="font-bold text-[#333e48]">{reviews.length}</strong>
        </div>
      )}
    </div>
  );
}
