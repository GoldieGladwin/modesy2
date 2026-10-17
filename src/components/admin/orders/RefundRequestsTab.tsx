'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Info, X, Plus, Check } from 'lucide-react';
import { RefundRequest } from './types';
import { mockOrdersList } from './mockData';

interface RefundRequestsTabProps {
  refundRequests: RefundRequest[];
}

export default function RefundRequestsTab({
  refundRequests: initialRefunds,
}: RefundRequestsTabProps) {
  const [refunds, setRefunds] = useState<RefundRequest[]>(initialRefunds);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [selectedProductKey, setSelectedProductKey] = useState('');
  const [refundReason, setRefundReason] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Compile eligible products from orders for the select dropdown
  const eligibleProducts = mockOrdersList.flatMap((order) =>
    (order.items || []).map((item) => ({
      key: `${order.id}-${item.id}`,
      orderId: order.id,
      name: item.name,
      price: item.price * item.quantity,
      image: item.image,
      seller: item.seller,
      label: `Order #${order.id} - ${item.name} ($${(item.price * item.quantity).toFixed(2)})`,
    }))
  );

  const handleSubmitRefund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductKey) {
      setFormError('Please select a product.');
      return;
    }
    if (!refundReason.trim()) {
      setFormError('Please explain why you want a refund.');
      return;
    }

    const matchedProduct = eligibleProducts.find((p) => p.key === selectedProductKey);
    if (!matchedProduct) return;

    const newRefund: RefundRequest = {
      id: `rf-${Date.now().toString().slice(-4)}`,
      orderId: matchedProduct.orderId,
      productTitle: matchedProduct.name,
      productImage: matchedProduct.image,
      total: matchedProduct.price,
      status: 'Processing',
      date: 'Just now',
      reason: refundReason.trim(),
      adminNote: 'Your request has been received and is currently under review.',
    };

    setRefunds([newRefund, ...refunds]);
    setShowSubmitModal(false);
    setSelectedProductKey('');
    setRefundReason('');
    setFormError(null);
    showToast('Your refund request has been submitted successfully!');
  };

  const getStatusBadge = (status: RefundRequest['status']) => {
    switch (status) {
      case 'Processing':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#f0f2f5] text-[#495057] border border-gray-200">
            Processing
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#fffbe6] text-[#faad14] border border-[#ffe58f]">
            Pending
          </span>
        );
      case 'Approved':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#dff0d8] text-[#3c763d] border border-[#d6e9c6]">
            Approved
          </span>
        );
      case 'Declined':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#f2dede] text-[#a94442] border border-[#ebccd1]">
            Declined
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

  return (
    <div className="flex-1 min-w-0 font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 p-4 bg-emerald-600 text-white text-xs font-medium rounded shadow-lg flex items-center gap-2 animate-in slide-in-from-top-3 duration-200">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Action Row: Submit a Refund Request Button matching Screenshot 4 */}
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={() => {
            setShowSubmitModal(true);
            setFormError(null);
          }}
          className="px-4 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[3px] transition flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Submit a Refund Request</span>
        </button>
      </div>

      {/* Refund Requests List */}
      <div className="space-y-4">
        {refunds.map((refund) => (
          <div
            key={refund.id}
            className="bg-white border border-gray-200 rounded-[4px] p-5 transition-all hover:border-gray-300 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Product Info & Thumbnail */}
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="w-[84px] h-[84px] sm:w-[92px] sm:h-[92px] shrink-0 rounded-[3px] border border-gray-100 overflow-hidden relative bg-gray-50">
                  <Image
                    src={refund.productImage}
                    alt={refund.productTitle}
                    fill
                    sizes="92px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-gray-900 text-xs sm:text-[13px] leading-tight">
                    Order: #{refund.orderId}
                  </div>
                  <div className="text-gray-700 text-xs font-normal truncate mt-1">
                    {refund.productTitle}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="shrink-0 min-w-[110px] flex items-center">
                {getStatusBadge(refund.status)}
              </div>

              {/* Date matching Screenshot 4 */}
              <div className="shrink-0 min-w-[130px] flex items-center gap-1.5 text-gray-500 text-xs">
                <Clock className="w-3.5 h-3.5 stroke-[1.8] text-gray-400" />
                <span>{refund.date}</span>
              </div>

              {/* Details Action Button matching Screenshot 4 */}
              <div className="shrink-0">
                <Link
                  href={`/refund-requests/${refund.id}`}
                  className="px-3.5 py-1.5 bg-[#e9ecef] hover:bg-[#dee2e6] text-[#495057] text-xs font-semibold rounded-[3px] transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Info className="w-3.5 h-3.5 text-gray-500 stroke-[2]" />
                  <span>Details</span>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {refunds.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-[4px] p-12 text-center text-gray-500">
            <p className="text-sm">No refund requests found.</p>
          </div>
        )}
      </div>

      {/* Modal: Submit a Refund Request matching Screenshot */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-[4px] shadow-2xl max-w-[540px] w-full p-8 relative animate-in fade-in zoom-in-95 duration-150">
            {/* Close X Button top right */}
            <button
              type="button"
              onClick={() => {
                setShowSubmitModal(false);
                setFormError(null);
              }}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2]" />
            </button>

            {/* Modal Title centered */}
            <h3 className="text-base font-bold text-gray-900 text-center mb-6">
              Submit a Refund Request
            </h3>

            {formError && (
              <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmitRefund} className="space-y-4 text-xs">
              {/* Product Select Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1.5">
                  Product
                </label>
                <div className="relative">
                  <select
                    value={selectedProductKey}
                    onChange={(e) => {
                      setSelectedProductKey(e.target.value);
                      setFormError(null);
                    }}
                    className="w-full bg-white border border-gray-300 rounded-[3px] px-3.5 py-2.5 text-xs text-gray-700 appearance-none focus:outline-none focus:border-[#00a99d] cursor-pointer"
                  >
                    <option value="">Select</option>
                    {eligibleProducts.map((p) => (
                      <option key={p.key} value={p.key}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5L9 1" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Reason Textarea Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1.5">
                  Why do you want a refund? Explain in detail.
                </label>
                <textarea
                  rows={5}
                  value={refundReason}
                  onChange={(e) => {
                    setRefundReason(e.target.value);
                    setFormError(null);
                  }}
                  className="w-full border border-gray-300 rounded-[3px] p-3 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d] resize-y min-h-[140px]"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[3px] transition cursor-pointer shadow-xs"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
