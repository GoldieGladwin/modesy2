'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, Info } from 'lucide-react';
import { Order, OrderStatus } from './types';

interface OrdersTabProps {
  orders: Order[];
  onViewDetails?: (order: Order) => void;
}

export default function OrdersTab({ orders, onViewDetails }: OrdersTabProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 15;

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pending Payment':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#fcf8e3] text-[#8a6d3b] border border-[#faebcc]">
            Pending Payment
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#d9edf7] text-[#31708f] border border-[#bce8f1]">
            Processing
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#dff0d8] text-[#3c763d] border border-[#d6e9c6]">
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#f2dede] text-[#a94442] border border-[#ebccd1]">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-700">
            {status}
          </span>
        );
    }
  };

  const formatPrice = (val: number, currency: string = '$') => {
    return `${currency}${val.toLocaleString('en-US', {
      minimumFractionDigits: val % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="flex-1 min-w-0">
      {/* Orders List Cards */}
      <div className="space-y-3">
        {currentOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-gray-200 rounded-[4px] px-5 py-4 transition-all hover:border-gray-300 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-[13px]">
              {/* Order Number */}
              <div className="min-w-[120px]">
                <span className="text-gray-600 font-normal">Order: </span>
                <span className="font-bold text-gray-900">#{order.id}</span>
              </div>

              {/* Total */}
              <div className="min-w-[120px]">
                <span className="text-gray-600 font-normal">Total: </span>
                <span className="font-bold text-gray-900">
                  {formatPrice(order.total, order.currency)}
                </span>
              </div>

              {/* Status Badge */}
              <div className="min-w-[130px] flex items-center">
                {getStatusBadge(order.status)}
              </div>

              {/* Date & Time */}
              <div className="min-w-[160px] flex items-center gap-1.5 text-gray-500 text-xs">
                <Clock className="w-3.5 h-3.5 shrink-0 stroke-[1.8] text-gray-400" />
                <span>{order.date}</span>
              </div>

              {/* Action Button */}
              <div className="shrink-0">
                <Link
                  href={`/orders/${order.id}`}
                  className="px-3.5 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 text-xs font-medium rounded-[3px] transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Info className="w-3.5 h-3.5 text-gray-500 stroke-[2]" />
                  <span>Details</span>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {currentOrders.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-md p-12 text-center text-gray-500">
            <p className="text-sm">No orders found.</p>
          </div>
        )}
      </div>

      {/* Pagination matching Screenshot 3 */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-1.5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => {
                setCurrentPage(pageNum);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`min-w-[32px] h-[32px] px-2.5 flex items-center justify-center text-xs font-semibold rounded-[3px] transition cursor-pointer ${
                currentPage === pageNum
                  ? 'bg-[#00a99d] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {pageNum}
            </button>
          ))}

          {currentPage < totalPages && (
            <button
              type="button"
              onClick={() => {
                setCurrentPage((p) => p + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="min-w-[32px] h-[32px] px-2.5 flex items-center justify-center text-xs font-semibold rounded-[3px] bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 transition cursor-pointer"
            >
              &gt;
            </button>
          )}
        </div>
      )}
    </div>
  );
}
