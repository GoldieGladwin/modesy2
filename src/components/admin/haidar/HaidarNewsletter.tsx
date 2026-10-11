/**
 * Fitur: Newsletter Management
 *
 * INTEGRATION GUIDE:
 * 1. Komponen ini menampilkan dan mengelola pelanggan newsletter.
 * 2. Digunakan secara internal oleh HaidarAdmin.
 * 3. Jika ingin digunakan terpisah, import dari folder haidar.
 *
 * TODO: Integrasi dengan API Newsletter sebenarnya.
 */
'use client';

import React, { useState } from 'react';
import type { Newsletter } from '@/types/admin/haidar-admin';
import { mockNewsletter } from '@/data/admin/haidar-admin-data';

export default function HaidarNewsletter() {
  const [subscribers, setSubscribers] = useState<Newsletter[]>(mockNewsletter);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this subscriber?')) {
      setSubscribers(subscribers.filter(s => s.id !== id));
    }
  };

  const handleStatusChange = (id: string, newStatus: any) => {
    setSubscribers(subscribers.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub));
  };

  const filteredSubscribers = subscribers.filter(sub => {
    const matchStatus = statusFilter === 'All' || sub.status === statusFilter;
    const matchSearch = sub.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Newsletter Subscribers</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
          Export CSV
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input 
          type="text" 
          placeholder="Search emails..." 
          className="border border-gray-300 rounded px-4 py-2 flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="border border-gray-300 rounded px-4 py-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Unsubscribed">Unsubscribed</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Subscribed At</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscribers.length > 0 ? filteredSubscribers.map(sub => (
              <tr key={sub.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b font-medium">{sub.email}</td>
                <td className="py-2 px-4 border-b">{sub.subscribedAt}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded text-xs text-white ${
                    sub.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'
                  }`}>
                    {sub.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b space-x-2">
                  {sub.status === 'Active' ? (
                    <button 
                      className="text-yellow-600 hover:underline text-sm"
                      onClick={() => handleStatusChange(sub.id, 'Unsubscribed')}
                    >
                      Unsubscribe
                    </button>
                  ) : (
                    <button 
                      className="text-green-600 hover:underline text-sm"
                      onClick={() => handleStatusChange(sub.id, 'Active')}
                    >
                      Resubscribe
                    </button>
                  )}
                  <span className="text-gray-300">|</span>
                  <button 
                    className="text-red-600 hover:underline text-sm"
                    onClick={() => handleDelete(sub.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">No subscribers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
