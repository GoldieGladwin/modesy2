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
  const [activeRefund, setActiveRefund] = useState<RefundRequest | null>(null);
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
      status: 'Pending',
      date: 'Just now',
      reason: refundReason.trim(),
      adminNote: 'Your request has been received and is currently under review by our support team.',
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
      case 'Pending':
        return (
          <span className="inline-block px-3 py-1 rounded-[3px] text-xs font-semibold bg-[#fffbe6] text-[#faad14]">
            Pending
          </span>
        );
      case 'Approved':
        return (
          <span className="inline-block px-3 py-1 rounded-[3px] text-xs font-semibold bg-[#dff0d8] text-[#3c763d]">
            Approved
          </span>
        );
      case 'Declined':
        return (
          <span className="inline-block px-3 py-1 rounded-[3px] text-xs font-semibold bg-[#f2dede] text-[#a94442]">
            Declined
          </span>
        );
      default:
        return null;
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

      {/* Top Action Row: Submit a Refund Request Button matching Screenshot */}
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
                  <div className="text-gray-500 text-xs mt-1">
                    Refund Amount: <span className="font-bold text-gray-900">${refund.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="shrink-0 min-w-[130px] flex items-center">
                {getStatusBadge(refund.status)}
              </div>

              {/* Date matching screenshot */}
              <div className="shrink-0 min-w-[140px] flex items-center gap-1.5 text-gray-500 text-xs">
                <Clock className="w-3.5 h-3.5 stroke-[1.8] text-gray-400" />
                <span>{refund.date}</span>
              </div>

              {/* Details Action Button */}
              <div className="shrink-0">
                <Link
                  href={`/refund-requests/${refund.id}`}
                  className="px-3.5 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 text-xs font-medium rounded-[3px] transition flex items-center gap-1.5 cursor-pointer shadow-xs"
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

      {/* Modal: Submit a Refund Request matching Screenshot exactly */}
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

            {/* Modal Title centered matching screenshot */}
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

              {/* Submit Button right-aligned matching screenshot */}
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

      {/* Modal: View Details */}
      {activeRefund && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-[4px] shadow-2xl max-w-md w-full p-6 text-gray-800 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#00a99d]" />
                Refund Request #{activeRefund.id} Details
              </h3>
              <button
                type="button"
                onClick={() => setActiveRefund(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 relative rounded border overflow-hidden shrink-0 bg-gray-50">
                  <Image
                    src={activeRefund.productImage}
                    alt={activeRefund.productTitle}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{activeRefund.productTitle}</h4>
                  <p className="text-gray-500">Order: #{activeRefund.orderId}</p>
                  <p className="text-gray-900 font-bold mt-0.5">Amount: ${activeRefund.total.toFixed(2)}</p>
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Reason for Refund:</label>
                <p className="bg-gray-50 p-3 rounded text-gray-700 border border-gray-100 leading-relaxed">
                  {activeRefund.reason}
                </p>
              </div>

              {activeRefund.adminNote && (
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Response / Note:</label>
                  <p className="bg-emerald-50 p-3 rounded text-emerald-800 border border-emerald-100 leading-relaxed">
                    {activeRefund.adminNote}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveRefund(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
