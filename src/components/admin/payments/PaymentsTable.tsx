'use client';

import React from 'react';
import { Payment, PaymentStatus } from './types';

interface PaymentsTableProps {
  payments: Payment[];
  onViewDetails?: (payment: Payment) => void;
}

export default function PaymentsTable({ payments, onViewDetails }: PaymentsTableProps) {
  const getStatusBadgeClass = (status: PaymentStatus) => {
    switch (status) {
      case 'Success':
        return 'bg-green-500';
      case 'Failed':
        return 'bg-red-500';
      case 'Refunded':
        return 'bg-gray-500';
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
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Payment ID</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Order ID</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Customer</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Amount</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Method</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Date</th>
            <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {payments.length > 0 ? (
            payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50 text-sm">
                <td className="py-2 px-4 border-b font-medium text-gray-900">{payment.id}</td>
                <td className="py-2 px-4 border-b text-gray-800">{payment.orderId}</td>
                <td className="py-2 px-4 border-b text-gray-600">{payment.customerName || '-'}</td>
                <td className="py-2 px-4 border-b font-medium text-gray-900">${payment.amount.toFixed(2)}</td>
                <td className="py-2 px-4 border-b text-gray-600">{payment.paymentMethod}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded text-xs text-white ${getStatusBadgeClass(payment.status)}`}>
                    {payment.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b text-gray-600">
                  {new Date(payment.transactionDate).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => onViewDetails?.(payment)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="py-6 text-center text-gray-500 text-sm">
                No payments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
