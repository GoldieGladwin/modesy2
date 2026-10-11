'use client';

import React from 'react';
import { Category } from './types';

interface CategoriesTableProps {
  categories: Category[];
  onDelete: (id: string) => void;
}

export default function CategoriesTable({ categories, onDelete }: CategoriesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">ID</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Slug</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Created At</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50 text-sm">
                <td className="py-2 px-4 border-b text-gray-900">{category.id}</td>
                <td className="py-2 px-4 border-b font-medium text-gray-900">{category.name}</td>
                <td className="py-2 px-4 border-b text-gray-600 font-mono text-xs">{category.slug}</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`px-2 py-1 rounded text-xs text-white ${
                      category.isActive ? 'bg-green-500' : 'bg-gray-500'
                    }`}
                  >
                    {category.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-2 px-4 border-b text-gray-600">{category.createdAt}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => onDelete(category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-6 text-center text-gray-500 text-sm">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
