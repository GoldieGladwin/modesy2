'use client';

import React from 'react';
import { Brand } from './types';

interface BrandsTableProps {
  brands: Brand[];
  onDelete: (id: string) => void;
}

export default function BrandsTable({ brands, onDelete }: BrandsTableProps) {
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
          {brands.length > 0 ? (
            brands.map((brand) => (
              <tr key={brand.id} className="hover:bg-gray-50 text-sm">
                <td className="py-2 px-4 border-b text-gray-900">{brand.id}</td>
                <td className="py-2 px-4 border-b font-medium text-gray-900">{brand.name}</td>
                <td className="py-2 px-4 border-b text-gray-600 font-mono text-xs">{brand.slug}</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`px-2 py-1 rounded text-xs text-white ${
                      brand.isActive ? 'bg-green-500' : 'bg-gray-500'
                    }`}
                  >
                    {brand.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-2 px-4 border-b text-gray-600">{brand.createdAt}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => onDelete(brand.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-6 text-center text-gray-500 text-sm">
                No brands found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
