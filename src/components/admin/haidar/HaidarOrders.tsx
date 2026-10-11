/**
 * Fitur: Orders Management
 *
 * INTEGRATION GUIDE:
 * 1. Komponen ini menampilkan dan mengelola pesanan.
 * 2. Digunakan secara internal oleh HaidarAdmin.
 * 3. Jika ingin digunakan terpisah, import dari folder haidar.
 *
 * TODO: Integrasi dengan API Orders sebenarnya.
 */
'use client';

import React, { useState } from 'react';
import type { Order } from '@/types/admin/haidar-admin';
import { mockOrders } from '@/data/admin/haidar-admin-data';

export default function HaidarOrders() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleStatusChange = (orderId: string, newStatus: any) => {
    setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
  };

  const filteredOrders = orders.filter(order => {
    const matchStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Orders Management</h2>
      
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
        <input 
          type="text" 
          placeholder="Search by Order ID or Customer..." 
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
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-left">Order ID</th>
              <th className="py-2 px-4 border-b text-left">Customer</th>
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Total</th>
              <th className="py-2 px-4 border-b text-left">Payment</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? filteredOrders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{order.id}</td>
                <td className="py-2 px-4 border-b">{order.customerName}</td>
                <td className="py-2 px-4 border-b">{order.orderDate}</td>
                <td className="py-2 px-4 border-b">${order.totalAmount.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{order.paymentMethod}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded text-xs text-white ${
                    order.status === 'Delivered' ? 'bg-green-500' :
                    order.status === 'Cancelled' ? 'bg-red-500' :
                    order.status === 'Shipped' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <select 
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} className="py-4 text-center text-gray-500">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
