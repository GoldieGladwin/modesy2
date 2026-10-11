import React from "react";
import Link from "next/link";
import { MessageSquare, CheckCircle, Trash2 } from "lucide-react";

export default function ModeratorCommentsPage() {
  const comments = [
    { id: 1, user: "Alex99", product: "Vintage Leather Jacket", comment: "Does this jacket have inner pockets? Looks awesome!", date: "1 hour ago", status: "Approved" },
    { id: 2, user: "SpamBot22", product: "Gold Chain Necklace", comment: "Cheap discounts available at external-site.xyz click here", date: "3 hours ago", status: "Flagged" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/moderator" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <Link href="/moderator/dashboard" className="hover:text-[#00a99d]">Dashboard</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Comments</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-100 mb-4">
          <MessageSquare className="w-5 h-5 text-amber-600" />
          Comment Moderation Queue
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Comment</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {comments.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 font-semibold text-gray-900">{c.user}</td>
                  <td className="py-3 px-4 text-[#00a99d] font-medium">{c.product}</td>
                  <td className="py-3 px-4 text-gray-600 max-w-xs">{c.comment}</td>
                  <td className="py-3 px-4 text-gray-400">{c.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-xs text-[11px] font-semibold ${
                      c.status === "Approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button type="button" className="text-emerald-600 hover:underline font-semibold">
                      Approve
                    </button>
                    <button type="button" className="text-red-600 hover:underline font-semibold">
                      Delete
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
