import React from "react";
import Link from "next/link";
import { Users, AlertTriangle, ShieldAlert } from "lucide-react";

export default function ModeratorUsersPage() {
  const reportedUsers = [
    { id: 1, username: "SpamBot22", email: "spambot@fake.com", reports: 8, reason: "Phishing links in comments", status: "Suspended" },
    { id: 2, username: "FakeSeller99", email: "fakeseller@temp.com", reports: 3, reason: "Counterfeit product pictures", status: "Pending Review" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/moderator" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <Link href="/moderator/dashboard" className="hover:text-[#00a99d]">Dashboard</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Reported Users</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-100 mb-4">
          <Users className="w-5 h-5 text-amber-600" />
          Reported Users &amp; Policy Violations
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Flags</th>
                <th className="py-3 px-4">Report Reason</th>
                <th className="py-3 px-4">Account Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reportedUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 font-bold text-gray-900">{u.username}</td>
                  <td className="py-3 px-4 text-gray-500">{u.email}</td>
                  <td className="py-3 px-4 text-red-600 font-bold">{u.reports} flags</td>
                  <td className="py-3 px-4 text-gray-600">{u.reason}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-xs text-[11px] font-semibold ${
                      u.status === "Suspended" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800"
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button type="button" className="text-red-600 hover:underline font-semibold">
                      Ban User
                    </button>
                    <button type="button" className="text-gray-500 hover:underline font-semibold">
                      Dismiss
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
