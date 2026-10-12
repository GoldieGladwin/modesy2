"use client";

import React, { useState } from "react";
import {
  FileText,
  ChevronDown,
  User as UserIcon,
  CheckCircle,
  XCircle,
  Trash2,
  ExternalLink,
} from "lucide-react";

interface ShopOpeningRequest {
  id: number;
  userName: string;
  avatarUrl?: string;
  requiredFile: string;
  status: "Active" | "Pending" | "Declined";
}

const initialRequests: ShopOpeningRequest[] = [
  {
    id: 13,
    userName: "ismail elvan",
    requiredFile: "daire.png",
    status: "Active",
  },
  {
    id: 4,
    userName: "Peter Jone",
    avatarUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&auto=format&fit=crop&q=60",
    requiredFile: "1_25200G_01_01.jpg",
    status: "Active",
  },
];

export default function ShopOpeningRequestsPage() {
  const [requests, setRequests] = useState<ShopOpeningRequest[]>(initialRequests);
  const [showCount, setShowCount] = useState("15");
  const [statusFilter, setStatusFilter] = useState("Select");
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const filteredRequests = requests.filter((r) => {
    if (statusFilter !== "Select" && r.status !== statusFilter) return false;
    return true;
  });

  const handleApprove = (id: number) => {
    alert(`Approved request #${id}`);
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Active" } : r))
    );
    setOpenDropdownId(null);
  };

  const handleDecline = (id: number) => {
    alert(`Declined request #${id}`);
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Declined" } : r))
    );
    setOpenDropdownId(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this request?")) {
      setRequests((prev) => prev.filter((r) => r.id !== id));
      setOpenDropdownId(null);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Page Title */}
      <h1 className="text-xl font-normal text-[#333333]">Shop Opening Requests</h1>

      {/* Main Card Container */}
      <div className="bg-white border border-[#e4e6eb] rounded-sm shadow-xs p-5 space-y-4">
        {/* Filter Controls: Show & Status + Filter Button */}
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

          {/* Status */}
          <div>
            <label className="block text-xs font-normal text-[#333333] mb-1">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-[#cccccc] rounded-xs px-3 py-1.5 text-xs text-[#333333] bg-white min-w-[120px] focus:outline-hidden focus:border-[#17a2b8] cursor-pointer"
            >
              <option value="Select">Select</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Declined">Declined</option>
            </select>
          </div>

          {/* Filter Button (Purple) */}
          <button
            type="button"
            className="px-4 py-1.5 bg-[#6f42c1] hover:bg-[#5a32a3] text-white text-xs font-normal rounded-sm transition-colors cursor-pointer"
          >
            Filter
          </button>
        </div>

        {/* Table Container (table-bordered, responsive) */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-[#e4e6eb] border-collapse">
            <thead>
              <tr className="bg-white border-b border-[#e4e6eb] text-[#333333]">
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap w-12">
                  Id
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap min-w-[200px]">
                  User
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap min-w-[220px]">
                  Required Files
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap w-28">
                  Status
                </th>
                <th className="px-3 py-3 font-bold text-center whitespace-nowrap w-36">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#e4e6eb] hover:bg-gray-50/50 text-[#333333]"
                  >
                    {/* Id */}
                    <td className="px-3 py-4 border-r border-[#e4e6eb] align-middle whitespace-nowrap">
                      {item.id}
                    </td>

                    {/* User: Avatar + Name + "See Details" Button */}
                    <td className="px-3 py-4 border-r border-[#e4e6eb] align-middle">
                      <div className="flex items-center gap-3">
                        {item.avatarUrl ? (
                          <img
                            src={item.avatarUrl}
                            alt={item.userName}
                            className="w-11 h-11 rounded-sm object-cover shrink-0 border border-gray-200"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-sm bg-[#e9ecef] flex items-center justify-center shrink-0 border border-gray-200">
                            <UserIcon className="w-6 h-6 text-gray-400" />
                          </div>
                        )}

                        <div className="flex flex-col items-start gap-1">
                          <span className="font-normal text-[#333333] text-xs">
                            {item.userName}
                          </span>
                          <button
                            type="button"
                            onClick={() => alert(`Details for ${item.userName}`)}
                            className="px-2.5 py-1 bg-[#17a2b8] hover:bg-[#138496] text-white text-[11px] font-normal rounded-xs transition-colors cursor-pointer"
                          >
                            See Details
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Required Files: File icon + Link */}
                    <td className="px-3 py-4 border-r border-[#e4e6eb] align-middle">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Viewing file: ${item.requiredFile}`);
                        }}
                        className="inline-flex items-center gap-1.5 text-[#333333] hover:text-[#007bff] hover:underline font-medium"
                      >
                        <FileText className="w-4 h-4 text-[#17a2b8] shrink-0" />
                        <span>{item.requiredFile}</span>
                      </a>
                    </td>

                    {/* Status Badge */}
                    <td className="px-3 py-4 border-r border-[#e4e6eb] align-middle">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-white text-[11px] font-semibold rounded-xs ${
                          item.status === "Active"
                            ? "bg-[#28a745]"
                            : item.status === "Declined"
                            ? "bg-[#dc3545]"
                            : "bg-[#ffc107] text-gray-900"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Options: Purple Dropdown */}
                    <td className="px-3 py-4 text-center align-middle relative">
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

                        {/* Dropdown Menu */}
                        {openDropdownId === item.id && (
                          <div className="absolute right-0 mt-1 w-44 bg-white border border-[#e4e6eb] rounded-sm shadow-md z-20 py-1 text-left text-xs">
                            <button
                              onClick={() => handleApprove(item.id)}
                              className="w-full px-3 py-1.5 text-left text-[#333333] hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                              <span>Approve Request</span>
                            </button>
                            <button
                              onClick={() => handleDecline(item.id)}
                              className="w-full px-3 py-1.5 text-left text-amber-600 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Decline Request</span>
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
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
