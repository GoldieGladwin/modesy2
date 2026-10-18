"use client";

import React, { useState } from "react";
import { ChevronDown, Trash2, CheckCircle, XCircle } from "lucide-react";

interface DeletionRequest {
  id: number;
  userName: string;
  email: string;
  status: string;
  lastSeen: string;
  date: string;
  time: string;
}

export default function AccountDeletionRequestsPage() {
  // Empty by default to display exact "No records found!" state as in the screenshot
  const [requests, setRequests] = useState<DeletionRequest[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const handleApprove = (id: number) => {
    if (confirm("Are you sure you want to approve this account deletion?")) {
      setRequests((prev) => prev.filter((r) => r.id !== id));
      setOpenDropdownId(null);
    }
  };

  const handleDecline = (id: number) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    setOpenDropdownId(null);
  };

  return (
    <div className="w-full">
      {/* Main Card Container */}
      <div className="bg-white border border-[#e4e6eb] rounded-sm shadow-xs p-5">
        {/* Card Header Title */}
        <h1 className="text-base font-semibold text-[#333333] mb-4">
          Account Deletion Requests
        </h1>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-[#e4e6eb] border-collapse">
            <thead>
              <tr className="bg-white border-b border-[#e4e6eb] text-[#333333]">
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap w-14">
                  Id
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap min-w-[160px]">
                  User
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap min-w-[200px]">
                  Email
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap min-w-[120px]">
                  Status
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap min-w-[140px]">
                  Last seen
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap min-w-[140px]">
                  Date
                </th>
                <th className="px-3 py-3 font-bold text-center whitespace-nowrap w-36">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#e4e6eb] hover:bg-gray-50/50 text-[#333333]"
                  >
                    <td className="px-3 py-3.5 border-r border-[#e4e6eb] align-middle whitespace-nowrap">
                      {item.id}
                    </td>
                    <td className="px-3 py-3.5 border-r border-[#e4e6eb] align-middle font-normal text-[#007bff] hover:underline cursor-pointer">
                      {item.userName}
                    </td>
                    <td className="px-3 py-3.5 border-r border-[#e4e6eb] align-middle text-gray-600">
                      {item.email}
                    </td>
                    <td className="px-3 py-3.5 border-r border-[#e4e6eb] align-middle">
                      <span className="inline-block px-2.5 py-0.5 bg-[#28a745] text-white text-[11px] font-semibold rounded-xs">
                        {item.status}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 border-r border-[#e4e6eb] align-middle text-gray-600 whitespace-nowrap">
                      {item.lastSeen}
                    </td>
                    <td className="px-3 py-3.5 border-r border-[#e4e6eb] align-middle text-gray-600 whitespace-nowrap">
                      <div>{item.date} /</div>
                      <div>{item.time}</div>
                    </td>
                    <td className="px-3 py-3.5 text-center align-middle relative">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenDropdownId(
                              openDropdownId === item.id ? null : item.id
                            )
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#6f42c1] hover:bg-[#5a32a3] text-white text-xs font-normal rounded-sm transition-colors cursor-pointer"
                        >
                          <span>Select an option</span>
                          <ChevronDown className="w-3 h-3" />
                        </button>

                        {openDropdownId === item.id && (
                          <div className="absolute right-0 mt-1 w-44 bg-white border border-[#e4e6eb] rounded-sm shadow-md z-20 py-1 text-left text-xs">
                            <button
                              onClick={() => handleApprove(item.id)}
                              className="w-full px-3 py-1.5 text-left text-red-600 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                              <span>Approve Deletion</span>
                            </button>
                            <button
                              onClick={() => handleDecline(item.id)}
                              className="w-full px-3 py-1.5 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                            >
                              <XCircle className="w-3.5 h-3.5 text-gray-500" />
                              <span>Decline Request</span>
                            </button>
                            <button
                              onClick={() => {
                                setRequests((prev) =>
                                  prev.filter((r) => r.id !== item.id)
                                );
                                setOpenDropdownId(null);
                              }}
                              className="w-full px-3 py-1.5 text-left text-red-600 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                /* Exact row matching the screenshot */
                <tr>
                  <td
                    colSpan={7}
                    className="px-3 py-8 text-center text-gray-500 bg-white border-b border-[#e4e6eb]"
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
