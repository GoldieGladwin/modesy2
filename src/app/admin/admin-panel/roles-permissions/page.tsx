import React from "react";
import { Shield, PlusCircle, Trash2, Edit, Check } from "lucide-react";

export default function AdminRolesPermissionsPage() {
  const roles = [
    { id: 1, name: "Admin", usersCount: 1, description: "Full access to all system settings, finances, and catalog", isSystem: true },
    { id: 2, name: "Vendor", usersCount: 12, description: "Manage own products, orders, coupons, and wallet payouts", isSystem: true },
    { id: 3, name: "Moderator", usersCount: 3, description: "Review products, moderate comments, and support tickets", isSystem: false },
    { id: 4, name: "Member", usersCount: 420, description: "Browse catalog, purchase products, leave reviews, and message sellers", isSystem: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#00a99d]" /> Roles & Permissions
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Control access-control matrix (ACL) and authorization boundaries</p>
        </div>
        <button className="px-3.5 py-1.5 bg-[#00a99d] text-white text-xs font-bold rounded hover:bg-[#008f85] transition flex items-center gap-1.5 cursor-pointer">
          <PlusCircle className="w-3.5 h-3.5" /> Add Role
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200 uppercase">
              <tr>
                <th className="py-2.5 px-3">Role Name</th>
                <th className="py-2.5 px-3">Active Users</th>
                <th className="py-2.5 px-3">Scope Description</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {roles.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50/70">
                  <td className="py-3 px-3 font-semibold text-gray-900">{r.name}</td>
                  <td className="py-3 px-3 font-bold text-[#00a99d]">{r.usersCount} users</td>
                  <td className="py-3 px-3 text-gray-600">{r.description}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-medium">
                      {r.isSystem ? "Built-in System Role" : "Custom Role"}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right space-x-2">
                    <button className="text-gray-500 hover:text-[#00a99d]"><Edit className="w-3.5 h-3.5 inline" /></button>
                    {!r.isSystem && (
                      <button className="text-gray-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5 inline" /></button>
                    )}
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
