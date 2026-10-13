"use client";

import React, { useState } from "react";
import { CommentItem } from "./types";
import { initialComments } from "./mockData";

export default function CommentsTable() {
  const [comments] = useState<CommentItem[]>(initialComments);

  return (
    <div className="bg-white border border-[#ebebeb] rounded-[4px] p-6 shadow-xs font-sans">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-[18px] font-bold text-[#2d3748]">Comments</h1>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#e9ecef] text-[#333e48] font-bold">
              <th className="py-3 px-3 font-bold w-16">Id</th>
              <th className="py-3 px-3 font-bold w-36">Username</th>
              <th className="py-3 px-3 font-bold">Comment</th>
              <th className="py-3 px-3 font-bold w-52">Product</th>
              <th className="py-3 px-3 font-bold w-40">Date</th>
            </tr>
          </thead>
          <tbody>
            {comments.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-[#555] text-xs font-normal"
                >
                  No records found!
                </td>
              </tr>
            ) : (
              comments.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#f1f3f5] hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-3 px-3 text-[#333e48]">{item.id}</td>
                  <td className="py-3 px-3 text-[#333e48] font-medium">
                    {item.username}
                  </td>
                  <td className="py-3 px-3 text-[#555]">{item.comment}</td>
                  <td className="py-3 px-3 text-[#333e48]">{item.product}</td>
                  <td className="py-3 px-3 text-[#333e48]">{item.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
