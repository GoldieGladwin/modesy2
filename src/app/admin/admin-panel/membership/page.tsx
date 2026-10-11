import React from "react";
import { Users, PlusCircle, Trash2, Edit, Shield } from "lucide-react";

export default function AdminMembershipPage() {
  const users = [
    { id: 1, name: "Admin", username: "admin", email: "admin@codingest.com", role: "Super Admin", status: "Active", joined: "2024-01-15" },
    { id: 2, name: "John Vendor", username: "john_seller", email: "vendor@codingest.com", role: "Vendor", status: "Active", joined: "2024-03-22" },
    { id: 3, name: "Sarah Member", username: "sarah_j", email: "buyer@codingest.com", role: "Member", status: "Active", joined: "2024-05-10" },
    { id: 4, name: "Alex Moderator", username: "alex_mod", email: "mod@codingest.com", role: "Moderator", status: "Active", joined: "2024-06-18" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#00a99d]" /> Membership
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Manage registered buyers, vendors, store owners, and staff members</p>
        </div>
        <button className="px-3.5 py-1.5 bg-[#00a99d] text-white text-xs font-bold rounded hover:bg-[#008f85] transition flex items-center gap-1.5 cursor-pointer">
          <PlusCircle className="w-3.5 h-3.5" /> Add Member
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200 uppercase">
              <tr>
                <th className="py-2.5 px-3">User</th>
                <th className="py-2.5 px-3">Username</th>
                <th className="py-2.5 px-3">Email</th>
                <th className="py-2.5 px-3">Assigned Role</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Joined Date</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/70">
                  <td className="py-3 px-3 font-semibold text-gray-900">{u.name}</td>
                  <td className="py-3 px-3 font-mono text-gray-500">@{u.username}</td>
                  <td className="py-3 px-3 text-gray-600">{u.email}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      u.role === "Super Admin" ? "bg-red-100 text-red-800" :
                      u.role === "Vendor" ? "bg-emerald-100 text-emerald-800" :
                      u.role === "Moderator" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-[10px] font-bold">
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-500">{u.joined}</td>
                  <td className="py-3 px-3 text-right space-x-2">
                    <button className="text-gray-500 hover:text-[#00a99d]"><Edit className="w-3.5 h-3.5 inline" /></button>
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
