'use client';

import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface RoleItem {
  id: number;
  name: string;
  isDefault?: boolean;
  defaultPosition?: 'below' | 'beside';
  permissions: string[];
  canDelete?: boolean;
}

const initialRolesData: RoleItem[] = [
  {
    id: 1,
    name: 'Super Admin',
    isDefault: true,
    defaultPosition: 'below',
    permissions: ['All Permissions'],
    canDelete: false,
  },
  {
    id: 2,
    name: 'Vendor',
    isDefault: true,
    defaultPosition: 'beside',
    permissions: ['AI Writer', 'Vendor'],
    canDelete: false,
  },
  {
    id: 3,
    name: 'Member',
    isDefault: true,
    defaultPosition: 'below',
    permissions: [],
    canDelete: false,
  },
  {
    id: 4,
    name: 'Moderator',
    isDefault: false,
    permissions: [
      'Admin Panel',
      'Slider',
      'Homepage Manager',
      'Products',
      'Quote Requests',
      'Categories',
      'Custom Fields',
      'Contact Messages',
      'Reviews',
      'Comments',
      'Abuse Reports',
      'Tags',
      'AI Writer',
    ],
    canDelete: true,
  },
];

export default function RolesPermissionsPage() {
  const [roles, setRoles] = useState<RoleItem[]>(initialRolesData);

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete the role "${name}"?`)) {
      setRoles((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="w-full">
      {/* Container Card */}
      <div className="bg-white rounded-md shadow-xs border border-gray-200/80 p-5 md:p-6">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-5 border-b border-gray-100">
          <h1 className="text-xl font-medium text-gray-800">
            Roles & Permissions
          </h1>

          <button
            type="button"
            onClick={() => alert('Add New Role form')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00a65a] hover:bg-[#008d4c] text-white text-sm font-semibold rounded shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Role</span>
          </button>
        </div>

        {/* Table Area */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-sm font-semibold text-gray-700">
                <th className="py-3 px-4 w-52">Role Name</th>
                <th className="py-3 px-4">Permissions</th>
                <th className="py-3 px-4 w-36 text-center">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {roles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50/60 transition-colors">
                  {/* Role Name */}
                  <td className="py-4 px-4 align-top">
                    {role.defaultPosition === 'beside' ? (
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800">
                          {role.name}
                        </span>
                        {role.isDefault && (
                          <span className="bg-[#d2d6de] text-[#444] text-[11px] font-medium px-2 py-0.5 rounded">
                            Default
                          </span>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div className="font-semibold text-gray-800">
                          {role.name}
                        </div>
                        {role.isDefault && (
                          <span className="inline-block mt-1 bg-[#d2d6de] text-[#444] text-[11px] font-medium px-2 py-0.5 rounded">
                            Default
                          </span>
                        )}
                      </div>
                    )}
                  </td>

                  {/* Permissions */}
                  <td className="py-4 px-4 align-top">
                    <div className="flex flex-wrap gap-1.5">
                      {role.permissions.map((perm, idx) => (
                        <span
                          key={idx}
                          className="bg-[#00a65a] text-white text-xs font-semibold px-2.5 py-1 rounded inline-block"
                        >
                          {perm}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Options */}
                  <td className="py-4 px-4 align-top text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => alert(`Edit ${role.name}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f4f4f4] hover:bg-gray-200 border border-[#ddd] rounded text-xs text-gray-700 font-medium transition-colors cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5 text-gray-600" />
                        <span>Edit</span>
                      </button>

                      {role.canDelete && (
                        <button
                          type="button"
                          onClick={() => handleDelete(role.id, role.name)}
                          className="p-1.5 bg-[#f4f4f4] hover:bg-red-50 hover:text-red-600 hover:border-red-300 border border-[#ddd] rounded text-gray-700 transition-colors cursor-pointer"
                          title="Delete Role"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
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
