import React from "react";
import Link from "next/link";
import { Wallet, ArrowDownRight, ArrowUpRight, DollarSign, Clock, ShieldAlert } from "lucide-react";

export default function AdminWalletPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/admin" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Wallet</span>
      </nav>

      {/* Wallet Balance Hero */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#00a99d] to-[#008f85] text-white p-6 rounded-sm shadow-sm md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-100 flex items-center gap-2">
                <Wallet className="w-4 h-4" /> Available Balance
              </span>
              <span className="bg-white/20 text-white text-[11px] px-2 py-0.5 rounded font-medium">
                Admin Master
              </span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">$12,450.00</div>
            <p className="text-xs text-teal-100 mt-2">Ready for withdrawal or store payout transfers.</p>
          </div>
          <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-teal-500/30">
            <button className="px-4 py-2 bg-white text-[#00a99d] font-bold text-xs rounded shadow hover:bg-teal-50 transition cursor-pointer">
              + Deposit Funds
            </button>
            <button className="px-4 py-2 bg-[#007068] text-white font-bold text-xs rounded hover:bg-[#005a54] transition cursor-pointer">
              Withdraw Payout
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-2">
              Pending Clearances
            </span>
            <div className="text-2xl font-bold text-gray-800">$1,280.50</div>
            <p className="text-xs text-gray-500 mt-2">
              Escrow funds waiting for buyer order completion.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" /> Auto-clears within 3 business days
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
            Transaction History
          </h2>
          <span className="text-xs text-gray-500">Showing last 4 transactions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 px-4 font-mono font-medium text-gray-900">#TXN-88219</td>
                <td className="py-3 px-4 flex items-center gap-1.5 text-emerald-600 font-medium">
                  <ArrowDownRight className="w-3.5 h-3.5" /> Order Commission
                </td>
                <td className="py-3 px-4 font-bold text-gray-900">+$145.00</td>
                <td className="py-3 px-4 text-gray-500">Oct 09, 2026</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 font-semibold rounded text-[11px]">
                    Completed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-medium text-gray-900">#TXN-88102</td>
                <td className="py-3 px-4 flex items-center gap-1.5 text-blue-600 font-medium">
                  <ArrowDownRight className="w-3.5 h-3.5" /> Direct Deposit
                </td>
                <td className="py-3 px-4 font-bold text-gray-900">+$2,000.00</td>
                <td className="py-3 px-4 text-gray-500">Oct 05, 2026</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 font-semibold rounded text-[11px]">
                    Completed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-medium text-gray-900">#TXN-87941</td>
                <td className="py-3 px-4 flex items-center gap-1.5 text-red-600 font-medium">
                  <ArrowUpRight className="w-3.5 h-3.5" /> Vendor Payout
                </td>
                <td className="py-3 px-4 font-bold text-gray-900">-$450.00</td>
                <td className="py-3 px-4 text-gray-500">Oct 01, 2026</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 font-semibold rounded text-[11px]">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
