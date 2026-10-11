'use client';

import React, { useState } from 'react';
import type { Brand } from './types';
import { mockBrands } from './mockData';
import BrandsHeader from './BrandsHeader';
import BrandsTable from './BrandsTable';

export default function Brands() {
  const [brands, setBrands] = useState<Brand[]>(mockBrands);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this brand?')) {
      setBrands((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <BrandsHeader />

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search brands..."
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <BrandsTable brands={filteredBrands} onDelete={handleDelete} />
    </div>
  );
}
