/**
 * Fitur: Payments Management
 *
 * INTEGRATION GUIDE:
 * 1. Komponen ini menampilkan daftar transaksi pembayaran.
 * 2. Digunakan secara internal oleh HaidarAdmin.
 * 3. Jika ingin digunakan terpisah, import dari folder haidar.
 *
 * TODO: Integrasi dengan API Payments sebenarnya.
 */
'use client';

import React, { useState } from 'react';
import type { Payment } from '@/types/admin/haidar-admin';
import { mockPayments } from '@/data/admin/haidar-admin-data';

export default function HaidarPayments() {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredPayments = payments.filter(payment => {
    const matchStatus = statusFilter === 'All' || payment.status === statusFilter;
    const matchSearch = payment.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (payment.customerName && payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchStatus && matchSearch;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Payments Management</h2>
      
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
        <input 
          type="text" 
          placeholder="Search by Payment ID, Order ID..." 
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="border border-gray-300 rounded px-4 py-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Success">Success</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
          <option value="Refunded">Refunded</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-left">Payment ID</th>
              <th className="py-2 px-4 border-b text-left">Order ID</th>
              <th className="py-2 px-4 border-b text-left">Customer</th>
              <th className="py-2 px-4 border-b text-left">Amount</th>
              <th className="py-2 px-4 border-b text-left">Method</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? filteredPayments.map(payment => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{payment.id}</td>
                <td className="py-2 px-4 border-b">{payment.orderId}</td>
                <td className="py-2 px-4 border-b">{payment.customerName || '-'}</td>
                <td className="py-2 px-4 border-b">${payment.amount.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{payment.paymentMethod}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded text-xs text-white ${
                    payment.status === 'Success' ? 'bg-green-500' :
                    payment.status === 'Failed' ? 'bg-red-500' :
                    payment.status === 'Refunded' ? 'bg-gray-500' : 'bg-yellow-500'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">{new Date(payment.transactionDate).toLocaleString()}</td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-600 hover:underline">View</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={8} className="py-4 text-center text-gray-500">No payments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
