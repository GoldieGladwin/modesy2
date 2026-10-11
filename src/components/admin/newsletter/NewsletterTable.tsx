'use client';

import React from 'react';
import { Newsletter, NewsletterStatus } from './types';

interface NewsletterTableProps {
  subscribers: Newsletter[];
  onStatusChange: (id: string, newStatus: NewsletterStatus) => void;
  onDelete: (id: string) => void;
}

export default function NewsletterTable({
  subscribers,
  onStatusChange,
  onDelete,
}: NewsletterTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Subscribed At</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {subscribers.length > 0 ? (
            subscribers.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50 text-sm">
                <td className="py-2 px-4 border-b font-medium text-gray-900">{sub.email}</td>
                <td className="py-2 px-4 border-b text-gray-600">{sub.subscribedAt}</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`px-2 py-1 rounded text-xs text-white ${
                      sub.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'
                    }`}
                  >
                    {sub.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b space-x-2">
                  {sub.status === 'Active' ? (
                    <button
                      className="text-yellow-600 hover:underline text-sm"
                      onClick={() => onStatusChange(sub.id, 'Unsubscribed')}
                    >
                      Unsubscribe
                    </button>
                  ) : (
                    <button
                      className="text-green-600 hover:underline text-sm"
                      onClick={() => onStatusChange(sub.id, 'Active')}
                    >
                      Resubscribe
                    </button>
                  )}
                  <span className="text-gray-300">|</span>
                  <button
                    className="text-red-600 hover:underline text-sm"
                    onClick={() => onDelete(sub.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-6 text-center text-gray-500 text-sm">
                No subscribers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
