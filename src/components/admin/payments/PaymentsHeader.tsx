'use client';

import React from 'react';

interface PaymentsHeaderProps {
  title?: string;
}

export default function PaymentsHeader({ title = 'Payments Management' }: PaymentsHeaderProps) {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    </div>
  );
}
