import React from "react";
import { Ban, PlusCircle, Trash2 } from "lucide-react";

export default function AdminEmailBlacklistPage() {
  const blacklisted = [
    { id: 1, email: "*@mailinator.com", reason: "Disposable / Temporary email domain", date: "2026-09-12" },
    { id: 2, email: "spammer_fraud@fakeinbox.com", reason: "Chargeback and fraudulent buyer", date: "2026-09-20" },
    { id: 3, email: "*@10minutemail.com", reason: "Temporary email provider", date: "2026-10-01" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Ban className="w-5 h-5 text-[#00a99d]" /> Email Blacklist
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Prevent disposable emails, known spammers, and banned domains from registering</p>
        </div>
        <button className="px-3.5 py-1.5 bg-[#00a99d] text-white text-xs font-bold rounded hover:bg-[#008f85] transition flex items-center gap-1.5 cursor-pointer">
          <PlusCircle className="w-3.5 h-3.5" /> Add Banned Email
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200 uppercase">
              <tr>
                <th className="py-2.5 px-3">Blocked Pattern / Email</th>
                <th className="py-2.5 px-3">Reason For Blacklisting</th>
                <th className="py-2.5 px-3">Blocked Date</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {blacklisted.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50/70">
                  <td className="py-3 px-3 font-mono font-semibold text-red-600">{b.email}</td>
                  <td className="py-3 px-3 text-gray-600">{b.reason}</td>
                  <td className="py-3 px-3 text-gray-400">{b.date}</td>
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
