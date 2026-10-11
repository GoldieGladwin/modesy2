'use client';

import React from 'react';

interface ReviewsHeaderProps {
  title?: string;
}

export default function ReviewsHeader({ title = 'Reviews Moderation' }: ReviewsHeaderProps) {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    </div>
  );
}
