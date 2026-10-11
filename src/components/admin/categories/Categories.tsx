'use client';

import React, { useState } from 'react';
import type { Category } from './types';
import { mockCategories } from './mockData';
import CategoriesHeader from './CategoriesHeader';
import CategoriesTable from './CategoriesTable';

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this category? Make sure no products are using it.')) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <CategoriesHeader />

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search categories..."
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <CategoriesTable categories={filteredCategories} onDelete={handleDelete} />
    </div>
  );
}
