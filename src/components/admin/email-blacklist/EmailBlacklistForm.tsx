'use client';

import React from 'react';

interface EmailBlacklistFormProps {
  email: string;
  onEmailChange: (value: string) => void;
  reason: string;
  onReasonChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function EmailBlacklistForm({
  email,
  onEmailChange,
  reason,
  onReasonChange,
  onSubmit,
}: EmailBlacklistFormProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-8 border border-gray-200">
      <h3 className="font-semibold mb-3 text-gray-800 text-sm">Add to Blacklist</h3>
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          placeholder="Email Address"
          className="border border-gray-300 rounded px-4 py-2 flex-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Reason (Optional)"
          className="border border-gray-300 rounded px-4 py-2 flex-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
          value={reason}
          onChange={(e) => onReasonChange(e.target.value)}
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-2 rounded text-sm font-medium hover:bg-red-700 transition"
        >
          Block Email
        </button>
      </form>
    </div>
  );
}
