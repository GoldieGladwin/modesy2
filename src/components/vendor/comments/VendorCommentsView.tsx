"use client";

import React, { useState } from "react";
import Link from "next/link";

interface CommentItem {
  id: number;
  username: string;
  comment: string;
  product: string;
  productUrl: string;
  date: string;
}

const mockComments: CommentItem[] = [
  {
    id: 1,
    username: "Peter Jones",
    comment: "good",
    product: "Women lace blouse with different colors",
    productUrl: "/product/women-lace-blouse",
    date: "2026-09-13 / 14:16",
  },
];

export default function VendorCommentsView() {
  const [comments] = useState<CommentItem[]>(mockComments);

  return (
    <div className="w-full">
      {/* Main Card */}
      <div className="bg-white rounded border border-[#e4e7ea] p-6 shadow-sm">
        {/* Title */}
        <h1 className="text-[17px] font-semibold text-gray-800 mb-6">
          Comments
        </h1>

        {/* Table Container */}
        <div className="overflow-x-auto min-h-[160px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-t border-b border-[#dee2e6] text-[#495057] text-[13px] font-semibold">
                <th className="py-3 px-3 w-16">Id</th>
                <th className="py-3 px-3 min-w-[150px]">Username</th>
                <th className="py-3 px-3 min-w-[280px]">Comment</th>
                <th className="py-3 px-3 min-w-[340px]">Product</th>
                <th className="py-3 px-3 min-w-[160px]">Date</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-700 divide-y divide-[#dee2e6]/70">
              {comments.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-gray-400 text-[13px]"
                  >
                    No comments found!
                  </td>
                </tr>
              ) : (
                comments.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-[#f8f9fa] transition-colors"
                  >
                    <td className="py-4 px-3 text-gray-600 font-normal">
                      {item.id}
                    </td>
                    <td className="py-4 px-3 text-gray-700 font-normal">
                      {item.username}
                    </td>
                    <td className="py-4 px-3 text-gray-700 font-normal">
                      {item.comment}
                    </td>
                    <td className="py-4 px-3">
                      <Link
                        href={item.productUrl}
                        className="text-gray-800 hover:text-[#00a99d] transition-colors font-normal"
                      >
                        {item.product}
                      </Link>
                    </td>
                    <td className="py-4 px-3 text-gray-600 whitespace-nowrap">
                      {item.date}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info: Number of Entries */}
        <div className="mt-5 text-[12.5px] text-gray-600 font-normal">
          Number of Entries: {comments.length}
        </div>
      </div>
    </div>
  );
}
