"use client";

import React, { useState } from "react";
import { User as UserIcon, Monitor, Smartphone, Globe } from "lucide-react";

interface LoginActivity {
  id: number;
  userName: string;
  userEmail: string;
  ipAddress: string;
  userAgent: string;
  date: string;
}

const mockActivities: LoginActivity[] = [
  {
    id: 1,
    userName: "Admin",
    userEmail: "admin@codingest.com",
    ipAddress: "192.168.1.105",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0",
    date: "2026-10-12 04:32:10",
  },
  {
    id: 2,
    userName: "emohh asss",
    userEmail: "enghf@gmail.com",
    ipAddress: "162.159.127.146",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Safari/604.1",
    date: "2026-10-11 11:16:42",
  },
  {
    id: 3,
    userName: "goldie glad",
    userEmail: "goldiegladwin77@gmail.com",
    ipAddress: "185.220.101.5",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/119.0.0.0",
    date: "2026-10-09 15:08:21",
  },
];

export default function UserLoginActivitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDemoNotice, setShowDemoNotice] = useState(true);

  const filtered = mockActivities.filter((a) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      a.userName.toLowerCase().includes(q) ||
      a.userEmail.toLowerCase().includes(q) ||
      a.ipAddress.toLowerCase().includes(q) ||
      a.userAgent.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full space-y-4">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-normal text-[#333333]">
          User Login Activities
        </h1>

        <button
          type="button"
          onClick={() => setShowDemoNotice((prev) => !prev)}
          className="text-xs text-gray-500 hover:text-[#17a2b8] underline cursor-pointer"
        >
          {showDemoNotice ? "Show Mock Log Data" : "Show Demo View"}
        </button>
      </div>

      {/* Main Card Container */}
      <div className="bg-white border border-[#e4e6eb] rounded-sm shadow-xs p-5 space-y-4">
        {/* Filter Section: Search + Purple Filter Button */}
        <div className="max-w-xs text-xs text-[#333333]">
          <label className="block text-xs font-normal text-[#333333] mb-1">
            Search
          </label>
          <div className="flex gap-1.5">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 min-w-0 border border-[#cccccc] rounded-xs px-2.5 py-1.5 text-xs text-[#333333] focus:outline-hidden focus:border-[#17a2b8]"
            />
            <button
              type="button"
              className="px-4 py-1.5 bg-[#6f42c1] hover:bg-[#5a32a3] text-white text-xs font-normal rounded-sm transition-colors cursor-pointer shrink-0"
            >
              Filter
            </button>
          </div>
        </div>

        {/* Table Container (table-bordered, responsive) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-[#e4e6eb] border-collapse">
            <thead>
              <tr className="bg-white border-b border-[#e4e6eb] text-[#333333]">
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap min-w-[160px]">
                  User
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap min-w-[150px]">
                  Ip Address
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap min-w-[280px]">
                  User Agent
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap w-44">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {showDemoNotice ? (
                /* Exact row matching screenshot */
                <tr>
                  <td
                    colSpan={4}
                    className="px-3 py-6 text-center text-gray-500 bg-white border-b border-[#e4e6eb]"
                  >
                    This data is hidden in the demo.
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#e4e6eb] hover:bg-gray-50/50 text-[#333333]"
                  >
                    <td className="px-3 py-3 border-r border-[#e4e6eb] align-middle">
                      <div className="font-semibold text-gray-800">{item.userName}</div>
                      <div className="text-gray-500 text-[11px]">{item.userEmail}</div>
                    </td>
                    <td className="px-3 py-3 border-r border-[#e4e6eb] align-middle text-gray-600 font-mono">
                      {item.ipAddress}
                    </td>
                    <td className="px-3 py-3 border-r border-[#e4e6eb] align-middle text-gray-600 max-w-xs truncate">
                      {item.userAgent}
                    </td>
                    <td className="px-3 py-3 border-r border-[#e4e6eb] align-middle text-gray-600 whitespace-nowrap">
                      {item.date}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
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
