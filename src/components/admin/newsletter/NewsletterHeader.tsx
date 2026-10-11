'use client';

import React from 'react';

interface NewsletterHeaderProps {
  title?: string;
  onExportCsv?: () => void;
}

export default function NewsletterHeader({
  title = 'Newsletter Subscribers',
  onExportCsv,
}: NewsletterHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <button
        onClick={onExportCsv}
        className="bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-700 transition"
      >
        Export CSV
      </button>
    </div>
  );
}
