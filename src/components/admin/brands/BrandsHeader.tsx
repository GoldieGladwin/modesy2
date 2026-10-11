'use client';

import React from 'react';

interface BrandsHeaderProps {
  title?: string;
  onAddBrand?: () => void;
}

export default function BrandsHeader({
  title = 'Brands Management',
  onAddBrand,
}: BrandsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <button
        onClick={onAddBrand}
        className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition"
      >
        + Add Brand
      </button>
    </div>
  );
}
