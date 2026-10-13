"use client";

import React, { useState } from "react";
import {
  Plus,
  ChevronDown,
  User as UserIcon,
  Edit,
  Trash2,
  Shield,
  Ban,
  CheckCircle,
} from "lucide-react";

interface UserItem {
  id: number;
  name: string;
  username: string;
  role: "Member" | "Vendor" | "Admin";
  email: string;
  isConfirmed: boolean;
  membershipPlan: string;
  status: "Active" | "Banned";
  lastSeen: string;
  date: string;
  time: string;
}

const mockUsersData: UserItem[] = [
  {
    id: 16,
    name: "emohh asss",
    username: "emohh asss",
    role: "Member",
    email: "enghf@gmail.com",
    isConfirmed: true,
    membershipPlan: "",
    status: "Active",
    lastSeen: "13 hours ago",
    date: "2026-10-11",
    time: "11:16",
  },
  {
    id: 15,
    name: "goldie glad",
    username: "goldie glad",
    role: "Member",
    email: "goldiegladwin77@gmail.com",
    isConfirmed: true,
    membershipPlan: "",
    status: "Active",
    lastSeen: "2 days ago",
    date: "2026-10-09",
    time: "15:08",
  },
  {
    id: 14,
    name: "Atukunda Didan",
    username: "Atukunda Didan",
    role: "Member",
    email: "kankyatax@gmail.com",
    isConfirmed: true,
    membershipPlan: "",
    status: "Active",
    lastSeen: "8 days ago",
    date: "2026-10-03",
    time: "13:55",
  },
  {
    id: 13,
    name: "ismail elvan",
    username: "ismail elvan",
    role: "Member",
    email: "post@ismailcuma.com",
    isConfirmed: true,
    membershipPlan: "",
    status: "Active",
    lastSeen: "5 days ago",
    date: "2026-09-29",
    time: "16:40",
  },
  {
    id: 12,
    name: "Caleb Dreeper",
    username: "Caleb Dreeper",
    role: "Member",
    email: "merchant@gmail.com",
    isConfirmed: true,
    membershipPlan: "",
    status: "Active",
    lastSeen: "6 hours ago",
    date: "2026-09-25",
    time: "10:20",
  },
];

export default function UsersMembershipPage() {
  const [users, setUsers] = useState<UserItem[]>(mockUsersData);
  const [showCount, setShowCount] = useState("15");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedEmailStatus, setSelectedEmailStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  // Filter logic
  const filteredUsers = users.filter((u) => {
    // Role filter
    if (selectedRole !== "All" && u.role !== selectedRole) return false;

    // Status filter
    if (selectedStatus !== "All" && u.status !== selectedStatus) return false;

    // Email status filter
    if (selectedEmailStatus === "Confirmed" && !u.isConfirmed) return false;
    if (selectedEmailStatus === "Unconfirmed" && u.isConfirmed) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = u.name.toLowerCase().includes(q);
      const matchUsername = u.username.toLowerCase().includes(q);
      const matchEmail = u.email.toLowerCase().includes(q);
      if (!matchName && !matchUsername && !matchEmail) return false;
    }

    return true;
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setOpenDropdownId(null);
    }
  };

  const handleToggleStatus = (id: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Banned" : "Active" }
          : u
      )
    );
    setOpenDropdownId(null);
  };

  return (
    <div className="w-full space-y-4">
      {/* Header Halaman: Judul "Users" di kiri, tombol "+ Add User" di kanan */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-normal text-[#333333]">Users</h1>

        <button
          type="button"
          onClick={() => alert("Add User modal / form")}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white text-xs font-semibold rounded-sm transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add User</span>
        </button>
      </div>

      {/* Card Utama: Latar putih, border tipis abu-abu, rounded-sm */}
      <div className="bg-white border border-[#e4e6eb] rounded-sm shadow-xs p-5 space-y-5">
        {/* Baris Filter: 5 kolom sejajar ("Show", "Role", "Status", "Email Status", "Search" + tombol "Filter") */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5 items-end text-xs text-[#333333]">
          {/* 1. Show */}
          <div>
            <label className="block text-xs font-normal text-[#333333] mb-1">
              Show
            </label>
            <select
              value={showCount}
              onChange={(e) => setShowCount(e.target.value)}
              className="w-full border border-[#cccccc] rounded-xs px-2.5 py-1.5 text-xs text-[#333333] bg-white focus:outline-hidden focus:border-[#17a2b8] cursor-pointer"
            >
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="60">60</option>
              <option value="100">100</option>
            </select>
          </div>

          {/* 2. Role */}
          <div>
            <label className="block text-xs font-normal text-[#333333] mb-1">
              Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border border-[#cccccc] rounded-xs px-2.5 py-1.5 text-xs text-[#333333] bg-white focus:outline-hidden focus:border-[#17a2b8] cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Admin">Admin</option>
              <option value="Vendor">Vendor</option>
              <option value="Member">Member</option>
            </select>
          </div>

          {/* 3. Status */}
          <div>
            <label className="block text-xs font-normal text-[#333333] mb-1">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border border-[#cccccc] rounded-xs px-2.5 py-1.5 text-xs text-[#333333] bg-white focus:outline-hidden focus:border-[#17a2b8] cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Banned">Banned</option>
            </select>
          </div>

          {/* 4. Email Status */}
          <div>
            <label className="block text-xs font-normal text-[#333333] mb-1">
              Email Status
            </label>
            <select
              value={selectedEmailStatus}
              onChange={(e) => setSelectedEmailStatus(e.target.value)}
              className="w-full border border-[#cccccc] rounded-xs px-2.5 py-1.5 text-xs text-[#333333] bg-white focus:outline-hidden focus:border-[#17a2b8] cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Unconfirmed">Unconfirmed</option>
            </select>
          </div>

          {/* 5. Search + Tombol Filter Ungu */}
          <div>
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
        </div>

        {/* Tabel (table-bordered, responsive) */}
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
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap min-w-[180px]">
                  Email
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap min-w-[120px]">
                  Membership Plan
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap w-24">
                  Status
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap w-28">
                  Last seen
                </th>
                <th className="px-3 py-3 font-bold border-r border-[#e4e6eb] whitespace-nowrap w-28">
                  Date
                </th>
                <th className="px-3 py-3 font-bold text-center whitespace-nowrap w-36">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#e4e6eb] hover:bg-gray-50/50 text-[#333333]"
                  >
                    {/* Id */}
                    <td className="px-3 py-3 border-r border-[#e4e6eb] align-middle whitespace-nowrap">
                      {item.id}
                    </td>

                    {/* User: Avatar, Nama biru, Badge Member */}
                    <td className="px-3 py-3 border-r border-[#e4e6eb] align-middle">
                      <div className="flex items-center gap-2.5">
                        {/* Avatar placeholder abu-abu */}
                        <div className="w-10 h-10 rounded-sm bg-[#e9ecef] flex items-center justify-center shrink-0 border border-gray-200">
                          <UserIcon className="w-5 h-5 text-gray-400" />
                        </div>

                        {/* Nama & Badge */}
                        <div className="flex flex-col items-start gap-1">
                          <span className="text-[#007bff] hover:underline cursor-pointer font-normal">
                            {item.name} ({item.username})
                          </span>
                          <span className="inline-block px-2 py-0.5 bg-[#6c757d] text-white text-[10px] rounded-xs font-normal">
                            {item.role}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Email dengan tulisan (Confirmed) hijau */}
                    <td className="px-3 py-3 border-r border-[#e4e6eb] align-middle">
                      <div className="text-gray-700">
                        <span>{item.email}</span>{" "}
                        {item.isConfirmed && (
                          <span className="text-[#28a745] font-normal">
                            (Confirmed)
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Membership Plan */}
                    <td className="px-3 py-3 border-r border-[#e4e6eb] align-middle text-gray-500">
                      {item.membershipPlan || ""}
                    </td>

                    {/* Status: Badge "Active" hijau */}
                    <td className="px-3 py-3 border-r border-[#e4e6eb] align-middle">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-white text-xs font-semibold rounded-xs ${
                          item.status === "Active"
                            ? "bg-[#28a745]"
                            : "bg-[#dc3545]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Last seen */}
                    <td className="px-3 py-3 border-r border-[#e4e6eb] align-middle text-gray-600 whitespace-nowrap leading-tight">
                      {item.lastSeen}
                    </td>

                    {/* Date */}
                    <td className="px-3 py-3 border-r border-[#e4e6eb] align-middle text-gray-600 whitespace-nowrap leading-tight">
                      <div>{item.date} /</div>
                      <div>{item.time}</div>
                    </td>

                    {/* Options: Tombol ungu "Select an option" */}
                    <td className="px-3 py-3 text-center align-middle relative">
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
                          <div className="absolute right-0 mt-1 w-40 bg-white border border-[#e4e6eb] rounded-sm shadow-md z-20 py-1 text-left text-xs">
                            <button
                              onClick={() => {
                                alert(`Edit user #${item.id}`);
                                setOpenDropdownId(null);
                              }}
                              className="w-full px-3 py-1.5 text-left text-[#333333] hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5 text-blue-600" />
                              <span>Edit User</span>
                            </button>
                            <button
                              onClick={() => handleToggleStatus(item.id)}
                              className="w-full px-3 py-1.5 text-left text-[#333333] hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                            >
                              <Ban className="w-3.5 h-3.5 text-amber-600" />
                              <span>
                                {item.status === "Active"
                                  ? "Ban User"
                                  : "Activate"}
                              </span>
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
                    colSpan={8}
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
