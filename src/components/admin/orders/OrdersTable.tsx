'use client';

import React from 'react';
import { Order, OrderStatus } from './types';

interface OrdersTableProps {
  orders: Order[];
  onStatusChange?: (orderId: string, newStatus: OrderStatus) => void;
  onViewDetails?: (order: Order) => void;
}

export default function OrdersTable({ orders, onStatusChange, onViewDetails }: OrdersTableProps) {
  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500';
      case 'Cancelled':
        return 'bg-red-500';
      case 'Shipped':
        return 'bg-blue-500';
      case 'Processing':
        return 'bg-sky-500';
      case 'Pending Payment':
      default:
        return 'bg-amber-500';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2.5 px-4 border-b text-left text-xs font-semibold text-gray-700">Order ID</th>
            <th className="py-2.5 px-4 border-b text-left text-xs font-semibold text-gray-700">Date</th>
            <th className="py-2.5 px-4 border-b text-left text-xs font-semibold text-gray-700">Total</th>
            <th className="py-2.5 px-4 border-b text-left text-xs font-semibold text-gray-700">Payment</th>
            <th className="py-2.5 px-4 border-b text-left text-xs font-semibold text-gray-700">Status</th>
            <th className="py-2.5 px-4 border-b text-center text-xs font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 text-xs">
                <td className="py-3 px-4 border-b font-medium text-gray-900">#{order.id}</td>
                <td className="py-3 px-4 border-b text-gray-600">{order.date}</td>
                <td className="py-3 px-4 border-b font-bold text-gray-900">${order.total.toFixed(2)}</td>
                <td className="py-3 px-4 border-b text-gray-600">{order.paymentMethod || 'Bank Transfer'}</td>
                <td className="py-3 px-4 border-b">
                  <span className={`px-2 py-0.5 rounded text-[11px] text-white font-medium ${getStatusBadgeClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 border-b text-center">
                  <button
                    type="button"
                    onClick={() => onViewDetails?.(order)}
                    className="px-2.5 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100 text-gray-700 cursor-pointer"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-6 text-center text-gray-500 text-xs">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
