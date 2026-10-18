'use client';

import React from 'react';

interface EmailBlacklistHeaderProps {
  title?: string;
}

export default function EmailBlacklistHeader({
  title = 'Email Blacklist',
}: EmailBlacklistHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    </div>
  );
}
