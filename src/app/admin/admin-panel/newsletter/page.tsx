import React from "react";
import { Send, Mail, Trash2, Download } from "lucide-react";

export default function AdminNewsletterPage() {
  const subscribers = [
    { id: 1, email: "jessica.m@consumer.com", status: "Subscribed", date: "2026-10-09" },
    { id: 2, email: "clark.kent@dailyplanet.org", status: "Subscribed", date: "2026-10-07" },
    { id: 3, email: "bruce.wayne@enterprise.com", status: "Subscribed", date: "2026-10-05" },
    { id: 4, email: "barry.allen@centralcity.io", status: "Subscribed", date: "2026-10-02" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Send className="w-5 h-5 text-[#00a99d]" /> Newsletter
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Send promotional email campaigns and manage newsletter subscriber lists</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3.5 py-1.5 bg-[#00a99d] text-white text-xs font-bold rounded hover:bg-[#008f85] transition flex items-center gap-1.5 cursor-pointer">
            <Send className="w-3.5 h-3.5" /> Compose Email
          </button>
          <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 text-xs font-semibold rounded hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer">
            <Download className="w-3.5 h-3.5" /> Export Emails
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-xs">
        <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
          Subscribed Email Addresses ({subscribers.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200 uppercase">
              <tr>
                <th className="py-2.5 px-3">Subscriber Email</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Subscribed Date</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscribers.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/70">
                  <td className="py-3 px-3 font-medium text-gray-900">{s.email}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-[10px] font-bold">
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-400">{s.date}</td>
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
