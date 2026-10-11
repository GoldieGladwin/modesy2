/**
 * Fitur: Brands Management
 *
 * INTEGRATION GUIDE:
 * 1. Komponen ini menampilkan dan mengelola merek.
 * 2. Digunakan secara internal oleh HaidarAdmin.
 * 3. Jika ingin digunakan terpisah, import dari folder haidar.
 *
 * TODO: Integrasi dengan API Brands sebenarnya.
 */
'use client';

import React, { useState } from 'react';
import type { Brand } from '@/types/admin/haidar-admin';
import { mockBrands } from '@/data/admin/haidar-admin-data';

export default function HaidarBrands() {
  const [brands, setBrands] = useState<Brand[]>(mockBrands);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this brand?')) {
      setBrands(brands.filter(b => b.id !== id));
    }
  };

  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Brands Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Add Brand
        </button>
      </div>
      
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Search brands..." 
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Slug</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Created At</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBrands.length > 0 ? filteredBrands.map(brand => (
              <tr key={brand.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{brand.id}</td>
                <td className="py-2 px-4 border-b font-medium">{brand.name}</td>
                <td className="py-2 px-4 border-b">{brand.slug}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded text-xs text-white ${brand.isActive ? 'bg-green-500' : 'bg-gray-500'}`}>
                    {brand.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">{brand.createdAt}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline" onClick={() => handleDelete(brand.id)}>Delete</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-500">No brands found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
