"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";

export interface ReviewItem {
  id: number;
  user: string;
  rating: number;
  review: string;
  product: string;
  productUrl: string;
  date: string;
}

export const mockReviews: ReviewItem[] = [
  {
    id: 8,
    user: "Admin",
    rating: 5,
    review: "dfg",
    product: "Animal colorful digital prints",
    productUrl: "#",
    date: "2026-10-05 / 11:43",
  },
  {
    id: 4,
    user: "Peter Jones",
    rating: 4,
    review: "test 1",
    product: "Animal colorful digital prints",
    productUrl: "#",
    date: "2026-09-03 / 22:40",
  },
  {
    id: 7,
    user: "Admin",
    rating: 5,
    review:
      "The summer fashion lace top is absolutely beautiful! The lace detailing gives it a very elegant and feminine look, while the fabric is light and breathable perfect for warm weather. It fits nicely and pairs well with both jeans and skirts. Stylish, comfortable, and versatile highly recommend!",
    product: "Summer fashion top lace",
    productUrl: "#",
    date: "2026-08-05 / 14:04",
  },
  {
    id: 2,
    user: "Admin",
    rating: 5,
    review:
      "The visuals are vibrant, and it really captures the essence of each vacation spot. It's both informative and entertaining, making me want to visit every location featured. Highly recommended for travel enthusiasts!",
    product: "Animation of popular vacation spots",
    productUrl: "#",
    date: "2026-08-04 / 15:02",
  },
  {
    id: 1,
    user: "Admin",
    rating: 5,
    review:
      "The light blue color is soft and flattering, and the fabric feels high-quality and breathable. It fits perfectly and looks great both casually and at work. Definitely a wardrobe favorite!",
    product: "Light blue women shirt",
    productUrl: "#",
    date: "2026-08-04 / 15:01",
  },
  {
    id: 3,
    user: "Admin",
    rating: 4,
    review:
      "This skirt is beautiful and the floral pattern is very charming. The material feels nice and it drapes well. I gave it 4 stars because the sizing runs a little small, but overall it's a lovely addition to my wardrobe.",
    product: "Black midi skirt with white flowers",
    productUrl: "#",
    date: "2026-08-04 / 15:01",
  },
];

export default function VendorReviewsView() {
  const [reviews] = useState<ReviewItem[]>(mockReviews);

  return (
    <div className="w-full">
      {/* Main Card */}
      <div className="bg-white rounded border border-[#e4e7ea] p-6 shadow-sm">
        {/* Title */}
        <h1 className="text-[17px] font-semibold text-gray-800 mb-6">
          Reviews
        </h1>

        {/* Table Content */}
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-t border-b border-[#dee2e6] text-[#495057] text-[13px] font-semibold">
                <th className="py-3 px-3 w-16">Id</th>
                <th className="py-3 px-3 min-w-[120px]">User</th>
                <th className="py-3 px-3 min-w-[340px]">Review</th>
                <th className="py-3 px-3 min-w-[240px]">Product</th>
                <th className="py-3 px-3 min-w-[150px]">Date</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-700 divide-y divide-[#dee2e6]/70">
              {reviews.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#f8f9fa] transition-colors"
                >
                  {/* Id */}
                  <td className="py-4 px-3 text-gray-600 font-normal align-top">
                    {item.id}
                  </td>

                  {/* User */}
                  <td className="py-4 px-3 text-gray-700 font-normal align-top">
                    {item.user}
                  </td>

                  {/* Review (Stars + Text) */}
                  <td className="py-4 px-3 align-top">
                    {/* Stars */}
                    <div className="flex items-center gap-0.5 text-[#ffc107]">
                      {[1, 2, 3, 4, 5].map((starIndex) => (
                        <Star
                          key={starIndex}
                          className={`w-3.5 h-3.5 ${
                            starIndex <= item.rating
                              ? "fill-[#ffc107] text-[#ffc107]"
                              : "fill-[#dee2e6] text-[#dee2e6]"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="text-gray-700 text-[12.5px] leading-relaxed mt-1 max-w-[500px]">
                      {item.review}
                    </p>
                  </td>

                  {/* Product */}
                  <td className="py-4 px-3 align-top font-normal">
                    <Link
                      href={item.productUrl}
                      className="text-gray-700 hover:text-[#00a99d] transition-colors"
                    >
                      {item.product}
                    </Link>
                  </td>

                  {/* Date */}
                  <td className="py-4 px-3 text-gray-600 whitespace-nowrap font-normal align-top">
                    {item.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info: Number of Entries */}
        <div className="mt-5 text-[12.5px] text-gray-600 font-normal">
          Number of Entries: {reviews.length}
        </div>
      </div>
    </div>
  );
}
