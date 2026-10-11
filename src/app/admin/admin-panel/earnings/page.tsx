import React from "react";
import { DollarSign, TrendingUp, ArrowDownRight, Users } from "lucide-react";

export default function AdminEarningsPage() {
  const earnings = [
    { id: "ERN-401", order: "#10042", vendor: "PixelCraft", saleAmount: "$125.00", commissionRate: "10%", adminEarning: "$12.50", vendorEarning: "$112.50", date: "2026-10-09" },
    { id: "ERN-400", order: "#10041", vendor: "SoundBeat", saleAmount: "$84.50", commissionRate: "10%", adminEarning: "$8.45", vendorEarning: "$76.05", date: "2026-10-09" },
    { id: "ERN-399", order: "#10039", vendor: "ModaCraft", saleAmount: "$45.00", commissionRate: "10%", adminEarning: "$4.50", vendorEarning: "$40.50", date: "2026-10-08" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#00a99d]" /> Earnings
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Platform commissions, marketplace revenue split, and vendor share</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 p-4 rounded-sm shadow-xs">
          <span className="text-xs text-gray-400 font-semibold uppercase">Total Platform Net Profit</span>
          <div className="text-2xl font-bold text-[#00a99d] mt-1">$14,892.40</div>
          <span className="text-[11px] text-emerald-600 font-medium">↑ +14.2% from last month</span>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-sm shadow-xs">
          <span className="text-xs text-gray-400 font-semibold uppercase">Total Vendor Payouts</span>
          <div className="text-2xl font-bold text-gray-800 mt-1">$98,420.00</div>
          <span className="text-[11px] text-gray-500">Paid out to marketplace vendors</span>
        </div>
        <div className="bg-white border border-gray-200 p-4 rounded-sm shadow-xs">
          <span className="text-xs text-gray-400 font-semibold uppercase">Platform Commission Fee</span>
          <div className="text-2xl font-bold text-gray-800 mt-1">10.0%</div>
          <span className="text-[11px] text-gray-500">Standard commission rate</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200 uppercase">
              <tr>
                <th className="py-2.5 px-3">Earning ID</th>
                <th className="py-2.5 px-3">Order</th>
                <th className="py-2.5 px-3">Vendor</th>
                <th className="py-2.5 px-3">Gross Sale</th>
                <th className="py-2.5 px-3">Commission</th>
                <th className="py-2.5 px-3">Admin Profit</th>
                <th className="py-2.5 px-3">Vendor Share</th>
                <th className="py-2.5 px-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {earnings.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50/70">
                  <td className="py-3 px-3 font-bold text-gray-900">{e.id}</td>
                  <td className="py-3 px-3 font-mono text-gray-600">{e.order}</td>
                  <td className="py-3 px-3 font-semibold text-gray-800">{e.vendor}</td>
                  <td className="py-3 px-3 font-bold text-gray-900">{e.saleAmount}</td>
                  <td className="py-3 px-3 text-gray-500">{e.commissionRate}</td>
                  <td className="py-3 px-3 font-bold text-[#00a99d]">{e.adminEarning}</td>
                  <td className="py-3 px-3 font-medium text-gray-700">{e.vendorEarning}</td>
                  <td className="py-3 px-3 text-gray-500">{e.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
