'use client';

import React from 'react';
import { EmailBlacklist } from './types';

interface EmailBlacklistTableProps {
  items: EmailBlacklist[];
  onDelete: (id: string) => void;
}

export default function EmailBlacklistTable({ items, onDelete }: EmailBlacklistTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Reason</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Date Added</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 text-sm">
                <td className="py-2 px-4 border-b font-medium text-gray-900">{item.email}</td>
                <td className="py-2 px-4 border-b text-gray-600">{item.reason || '-'}</td>
                <td className="py-2 px-4 border-b text-gray-600">{item.addedAt}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => onDelete(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-6 text-center text-gray-500 text-sm">
                No blacklisted emails found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
