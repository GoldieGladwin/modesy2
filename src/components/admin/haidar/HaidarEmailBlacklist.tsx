/**
 * Fitur: Email Blacklist Management
 *
 * INTEGRATION GUIDE:
 * 1. Komponen ini menampilkan dan mengelola email blacklist.
 * 2. Digunakan secara internal oleh HaidarAdmin.
 * 3. Jika ingin digunakan terpisah, import dari folder haidar.
 *
 * TODO: Integrasi dengan API Email Blacklist sebenarnya.
 */
'use client';

import React, { useState } from 'react';
import type { EmailBlacklist } from '@/types/admin/haidar-admin';
import { mockEmailBlacklist } from '@/data/admin/haidar-admin-data';

export default function HaidarEmailBlacklist() {
  const [blacklist, setBlacklist] = useState<EmailBlacklist[]>(mockEmailBlacklist);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newEmail, setNewEmail] = useState('');
  const [newReason, setNewReason] = useState('');

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this email from the blacklist?')) {
      setBlacklist(blacklist.filter(b => b.id !== id));
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      alert("Invalid email format");
      return;
    }

    const newItem: EmailBlacklist = {
      id: `BLK-${Date.now()}`,
      email: newEmail,
      reason: newReason,
      addedAt: new Date().toISOString().split('T')[0]
    };
    
    setBlacklist([newItem, ...blacklist]);
    setNewEmail('');
    setNewReason('');
  };

  const filteredList = blacklist.filter(item => 
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Email Blacklist</h2>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-8 border border-gray-200">
        <h3 className="font-semibold mb-3">Add to Blacklist</h3>
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-4">
          <input 
            type="email" 
            placeholder="Email Address" 
            className="border border-gray-300 rounded px-4 py-2 flex-1"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
          <input 
            type="text" 
            placeholder="Reason (Optional)" 
            className="border border-gray-300 rounded px-4 py-2 flex-1"
            value={newReason}
            onChange={(e) => setNewReason(e.target.value)}
          />
          <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
            Block Email
          </button>
        </form>
      </div>

      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Search blocked emails..." 
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Reason</th>
              <th className="py-2 px-4 border-b text-left">Date Added</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.length > 0 ? filteredList.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b font-medium">{item.email}</td>
                <td className="py-2 px-4 border-b text-gray-600">{item.reason || '-'}</td>
                <td className="py-2 px-4 border-b">{item.addedAt}</td>
                <td className="py-2 px-4 border-b">
                  <button 
                    className="text-red-600 hover:underline" 
                    onClick={() => handleDelete(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">No blacklisted emails found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
