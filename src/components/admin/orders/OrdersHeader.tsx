'use client';

import React from 'react';

interface OrdersHeaderProps {
  title?: string;
}

export default function OrdersHeader({ title = 'Orders Management' }: OrdersHeaderProps) {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    </div>
  );
}
