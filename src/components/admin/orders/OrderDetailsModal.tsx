'use client';

import React from 'react';
import Image from 'next/image';
import { X, Printer, Package, Clock, MapPin, CreditCard } from 'lucide-react';
import { Order } from './types';

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
}

export default function OrderDetailsModal({
  order,
  onClose,
}: OrderDetailsModalProps) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/70">
          <div>
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-[#00a99d]" />
              Order #{order.id} Details
            </h2>
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Placed on {order.date}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs sm:text-[13px]">
          {/* Status Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-gray-50 rounded-md border border-gray-100">
            <div>
              <span className="text-gray-500 text-[11px] block">Order Status</span>
              <span className="font-semibold text-gray-900">{order.status}</span>
            </div>
            <div>
              <span className="text-gray-500 text-[11px] block">Payment Status</span>
              <span className="font-semibold text-emerald-700">
                {order.paymentStatus || 'Paid'}
              </span>
            </div>
            <div>
              <span className="text-gray-500 text-[11px] block">Payment Method</span>
              <span className="font-semibold text-gray-900">
                {order.paymentMethod || 'Credit Card'}
              </span>
            </div>
            <div>
              <span className="text-gray-500 text-[11px] block">Order Total</span>
              <span className="font-bold text-[#00a99d] text-sm">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-xs uppercase tracking-wider text-gray-500">
              Ordered Items
            </h3>
            <div className="border border-gray-200 rounded-md divide-y divide-gray-100">
              {order.items && order.items.length > 0 ? (
                order.items.map((item) => (
                  <div key={item.id} className="p-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 relative rounded border border-gray-200 overflow-hidden shrink-0 bg-gray-50">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-gray-500">
                          Seller: {item.seller} &bull; Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        ${item.price.toFixed(2)} each
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  Item details not available.
                </div>
              )}
            </div>
          </div>

          {/* Shipping Address & Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {order.shippingAddress && (
              <div className="p-4 border border-gray-200 rounded-md bg-white">
                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#00a99d]" />
                  Shipping Address
                </h4>
                <div className="space-y-0.5 text-gray-600 text-xs">
                  <p className="font-semibold text-gray-800">
                    {order.shippingAddress.name}
                  </p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.country}
                  </p>
                  <p className="mt-1 text-gray-500">Phone: {order.shippingAddress.phone}</p>
                </div>
              </div>
            )}

            <div className="p-4 border border-gray-200 rounded-md bg-white">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#00a99d]" />
                Summary
              </h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span>$0.00 (Free)</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax:</span>
                  <span>$0.00</span>
                </div>
                <div className="pt-2 border-t border-gray-100 flex justify-between font-bold text-sm text-gray-900">
                  <span>Total:</span>
                  <span className="text-[#00a99d]">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-medium rounded flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-medium rounded cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
