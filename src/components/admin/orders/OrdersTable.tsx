'use client';

import React from 'react';
import { Order, OrderStatus } from './types';

interface OrdersTableProps {
  orders: Order[];
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

export default function OrdersTable({ orders, onStatusChange }: OrdersTableProps) {
  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500';
      case 'Cancelled':
        return 'bg-red-500';
      case 'Shipped':
        return 'bg-blue-500';
      case 'Processing':
      case 'Pending':
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Order ID</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Customer</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Date</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Total</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Payment</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 text-sm">
                <td className="py-2 px-4 border-b font-medium text-gray-900">{order.id}</td>
                <td className="py-2 px-4 border-b text-gray-800">{order.customerName}</td>
                <td className="py-2 px-4 border-b text-gray-600">{order.orderDate}</td>
                <td className="py-2 px-4 border-b font-medium text-gray-900">${order.totalAmount.toFixed(2)}</td>
                <td className="py-2 px-4 border-b text-gray-600">{order.paymentMethod}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded text-xs text-white ${getStatusBadgeClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <select
                    className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
                    value={order.status}
                    onChange={(e) => onStatusChange(order.id, e.target.value as OrderStatus)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="py-6 text-center text-gray-500 text-sm">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
