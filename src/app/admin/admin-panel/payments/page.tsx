import React from "react";
import { CreditCard, CheckCircle, Clock } from "lucide-react";

export default function AdminPaymentsPage() {
  const payments = [
    { id: "PAY-9912", gateway: "Stripe", transactionId: "ch_3N8e192kLw9", amount: "$180.00", currency: "USD", user: "Michael Scott", status: "Success", date: "2026-10-09 14:22" },
    { id: "PAY-9911", gateway: "PayPal", transactionId: "PAYID-MO99281A", amount: "$45.00", currency: "USD", user: "Pam Beesly", status: "Success", date: "2026-10-09 11:05" },
    { id: "PAY-9910", gateway: "Bank Transfer", transactionId: "BT-REF-00192", amount: "$1,250.00", currency: "USD", user: "Dwight Schrute", status: "Pending", date: "2026-10-08 18:40" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#00a99d]" /> Payments
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Payment gateway logs, transaction hashes, and customer checkout records</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200 uppercase">
              <tr>
                <th className="py-2.5 px-3">Payment ID</th>
                <th className="py-2.5 px-3">Gateway</th>
                <th className="py-2.5 px-3">Gateway Txn ID</th>
                <th className="py-2.5 px-3">Payer</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/70">
                  <td className="py-3 px-3 font-bold text-gray-900">{p.id}</td>
                  <td className="py-3 px-3 font-semibold text-gray-800">{p.gateway}</td>
                  <td className="py-3 px-3 font-mono text-gray-500">{p.transactionId}</td>
                  <td className="py-3 px-3 text-gray-700">{p.user}</td>
                  <td className="py-3 px-3 font-bold text-gray-900">{p.amount} {p.currency}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.status === "Success" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-500">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
