import React from "react";
import { MessageCircle, Trash2, CheckCircle } from "lucide-react";

export default function AdminCommentsPage() {
  const comments = [
    { id: 1, author: "Alex Parker", onPost: "10 Timeless Summer Fashion Trends", comment: "Really loved the tip regarding linen fabric care!", date: "2026-10-08", status: "Approved" },
    { id: 2, author: "Nadia Gomez", onPost: "How to Support Independent Artisan Sellers", comment: "Is there an artisan fair directory in the app?", date: "2026-10-06", status: "Approved" },
    { id: 3, author: "Unknown User", onPost: "Top 5 Interior Decor Hacks", comment: "Check out this promotional link http://spam.xyz", date: "2026-10-05", status: "Flagged" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#00a99d]" /> Comments
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Moderate reader comments left on blog posts and editorial content</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200 uppercase">
              <tr>
                <th className="py-2.5 px-3">Author</th>
                <th className="py-2.5 px-3">Article / Blog Post</th>
                <th className="py-2.5 px-3">Comment Text</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {comments.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/70">
                  <td className="py-3 px-3 font-semibold text-gray-900">{c.author}</td>
                  <td className="py-3 px-3 text-[#00a99d] font-medium">{c.onPost}</td>
                  <td className="py-3 px-3 text-gray-600 max-w-xs truncate">{c.comment}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.status === "Approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-400">{c.date}</td>
                  <td className="py-3 px-3 text-right space-x-2">
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
