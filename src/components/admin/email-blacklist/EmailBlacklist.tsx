'use client';

import React, { useState } from 'react';
import type { EmailBlacklist as EmailBlacklistType } from './types';
import { mockEmailBlacklist } from './mockData';
import EmailBlacklistHeader from './EmailBlacklistHeader';
import EmailBlacklistForm from './EmailBlacklistForm';
import EmailBlacklistTable from './EmailBlacklistTable';

export default function EmailBlacklist() {
  const [blacklist, setBlacklist] = useState<EmailBlacklistType[]>(mockEmailBlacklist);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newEmail, setNewEmail] = useState('');
  const [newReason, setNewReason] = useState('');

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this email from the blacklist?')) {
      setBlacklist((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      alert('Invalid email format');
      return;
    }

    const newItem: EmailBlacklistType = {
      id: `BLK-${Date.now()}`,
      email: newEmail,
      reason: newReason,
      addedAt: new Date().toISOString().split('T')[0],
    };

    setBlacklist([newItem, ...blacklist]);
    setNewEmail('');
    setNewReason('');
  };

  const filteredList = blacklist.filter((item) =>
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <EmailBlacklistHeader />

      <EmailBlacklistForm
        email={newEmail}
        onEmailChange={setNewEmail}
        reason={newReason}
        onReasonChange={setNewReason}
        onSubmit={handleAdd}
      />

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search blocked emails..."
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <EmailBlacklistTable items={filteredList} onDelete={handleDelete} />
    </div>
  );
}
