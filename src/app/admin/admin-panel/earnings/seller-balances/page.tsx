"use client";

import React, { useState } from "react";
import { ChevronDown, User as UserIcon, DollarSign, Edit } from "lucide-react";

interface SellerBalance {
  userId: number;
  userName: string;
  avatarUrl?: string;
  isNebula?: boolean;
  totalSales: number;
  balance: string;
}

const mockSellerBalances: SellerBalance[] = [
  {
    userId: 1,
    userName: "Admin",
    isNebula: true,
    totalSales: 9,
    balance: "$1,130.85",
  },
  {
    userId: 3,
    userName: "Trendshop",
    avatarUrl:
      "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=100&auto=format&fit=crop&q=60",
    totalSales: 15,
    balance: "$1,029.77",
  },
  {
    userId: 4,
    userName: "Peter Jone",
    avatarUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&auto=format&fit=crop&q=60",
    totalSales: 0,
    balance: "$9.95",
  },
  {
    userId: 2,
    userName: "Roger Novak",
    avatarUrl:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=100&auto=format&fit=crop&q=60",
    totalSales: 0,
    balance: "$0",
  },
  {
    userId: 5,
    userName: "test user",
    totalSales: 0,
    balance: "$0",
  },
  {
    userId: 6,
    userName: "Caleb Prosper",
    totalSales: 0,
    balance: "$0",
  },
];

export default function SellerBalancesPage() {
  const [balances, setBalances] = useState<SellerBalance[]>(mockSellerBalances);
  const [showCount, setShowCount] = useState("15");
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const filtered = balances.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.userName.toLowerCase().includes(q) ||
      b.userId.toString().includes(q)
    );
  });

  return (
    <div className="w-full space-y-4">
      {/* Page Title */}
      <h1 className="text-xl font-normal text-[#333333]">Seller Balances</h1>

      {/* Main Card Container */}
      <div className="bg-white border border-[#e4e6eb] rounded-sm shadow-xs p-5 space-y-4">
        {/* Filter Controls: Show & Search (Username) + Purple Filter Button */}
        <div className="flex flex-wrap items-end gap-3 text-xs text-[#333333]">
          {/* Show */}
          <div>
            <label className="block text-xs font-normal text-[#333333] mb-1">
              Show
            </label>
            <select
              value={showCount}
              onChange={(e) => setShowCount(e.target.value)}
              className="border border-[#cccccc] rounded-xs px-3 py-1.5 text-xs text-[#333333] bg-white min-w-[70px] focus:outline-hidden focus:border-[#17a2b8] cursor-pointer"
            >
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="60">60</option>
              <option value="100">100</option>
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-xs font-normal text-[#333333] mb-1">
              Search
            </label>
            <div className="flex gap-1.5">
              <input
                type="text"
                placeholder="Username"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 sm:w-56 border border-[#cccccc] rounded-xs px-2.5 py-1.5 text-xs text-[#333333] focus:outline-hidden focus:border-[#17a2b8]"
              />
              <button
                type="button"
                className="px-4 py-1.5 bg-[#6f42c1] hover:bg-[#5a32a3] text-white text-xs font-normal rounded-sm transition-colors cursor-pointer shrink-0"
              >
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Table Container (table-bordered, responsive) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-[#e4e6eb] border-collapse">
            <thead>
              <tr className="bg-white border-b border-[#e4e6eb] text-[#333333]">
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap w-20">
                  User Id
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap min-w-[200px]">
                  User
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap min-w-[160px]">
                  Number of total sales
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap min-w-[120px]">
                  Balance
                </th>
                <th className="px-3 py-3 font-bold text-center whitespace-nowrap w-36">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr
                    key={item.userId}
                    className="border-b border-[#e4e6eb] hover:bg-gray-50/50 text-[#333333]"
                  >
                    {/* User Id */}
                    <td className="px-3 py-4 border-r border-[#e4e6eb] align-middle whitespace-nowrap">
                      {item.userId}
                    </td>

                    {/* User: Avatar + Name */}
                    <td className="px-3 py-4 border-r border-[#e4e6eb] align-middle">
                      <div className="flex items-center gap-3">
                        {item.isNebula ? (
                          <div className="w-10 h-10 rounded-sm overflow-hidden shrink-0 relative bg-slate-900 border border-gray-200">
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-700 via-pink-500 to-cyan-400 opacity-95" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.4),transparent_60%)]" />
                          </div>
                        ) : item.avatarUrl ? (
                          <img
                            src={item.avatarUrl}
                            alt={item.userName}
                            className="w-10 h-10 rounded-sm object-cover shrink-0 border border-gray-200"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-sm bg-[#e9ecef] flex items-center justify-center shrink-0 border border-gray-200">
                            <UserIcon className="w-5 h-5 text-gray-400" />
                          </div>
                        )}

                        <span className="font-normal text-[#333333] hover:text-[#007bff] hover:underline cursor-pointer">
                          {item.userName}
                        </span>
                      </div>
                    </td>

                    {/* Number of total sales */}
                    <td className="px-3 py-4 border-r border-[#e4e6eb] align-middle whitespace-nowrap font-normal">
                      {item.totalSales}
                    </td>

                    {/* Balance */}
                    <td className="px-3 py-4 border-r border-[#e4e6eb] align-middle whitespace-nowrap font-normal">
                      {item.balance}
                    </td>

                    {/* Options: Purple Button */}
                    <td className="px-3 py-4 text-center align-middle relative">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenDropdownId(
                              openDropdownId === item.userId ? null : item.userId
                            )
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#6f42c1] hover:bg-[#5a32a3] text-white text-xs font-normal rounded-sm transition-colors cursor-pointer"
                        >
                          <span>Select an option</span>
                          <ChevronDown className="w-3 h-3" />
                        </button>

                        {/* Dropdown Menu */}
                        {openDropdownId === item.userId && (
                          <div className="absolute right-0 mt-1 w-44 bg-white border border-[#e4e6eb] rounded-sm shadow-md z-20 py-1 text-left text-xs">
                            <button
                              onClick={() => {
                                alert(`Edit balance for ${item.userName}`);
                                setOpenDropdownId(null);
                              }}
                              className="w-full px-3 py-1.5 text-left text-[#333333] hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5 text-blue-600" />
                              <span>Edit Balance</span>
                            </button>
                            <button
                              onClick={() => {
                                alert(`Adjust payout for ${item.userName}`);
                                setOpenDropdownId(null);
                              }}
                              className="w-full px-3 py-1.5 text-left text-[#333333] hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                            >
                              <DollarSign className="w-3.5 h-3.5 text-green-600" />
                              <span>Add Payout</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-3 py-6 text-center text-gray-500 bg-white border-b border-[#e4e6eb]"
                  >
                    No records found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
