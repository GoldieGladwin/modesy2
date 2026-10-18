'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FileText,
  List,
  XCircle,
  Landmark,
  Send,
  X,
  Check,
  Upload,
  AlertCircle,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Order } from './types';
import { mockOrdersList } from './mockData';
import ModesyHeader from '@/components/layout/guest/ModesyHeader';
import ModesyFooter from '@/components/layout/guest/ModesyFooter';
import { useAuth } from '@/context/AuthContext';

interface OrderDetailViewProps {
  orderId: string;
  hideHeaderFooter?: boolean;
}

export default function OrderDetailView({ orderId, hideHeaderFooter }: OrderDetailViewProps) {
  const { user } = useAuth();
  const pathname = usePathname();

  const shouldHideHeaderFooter =
    hideHeaderFooter ||
    pathname?.startsWith('/admin') ||
    pathname?.startsWith('/moderator') ||
    pathname?.startsWith('/member');

  const homeLink = pathname?.startsWith('/admin')
    ? '/admin'
    : pathname?.startsWith('/vendor')
    ? '/vendor'
    : pathname?.startsWith('/moderator')
    ? '/moderator'
    : pathname?.startsWith('/member')
    ? '/member'
    : '/';

  const ordersLink = pathname?.startsWith('/admin')
    ? '/admin/orders'
    : pathname?.startsWith('/vendor')
    ? '/vendor/orders'
    : pathname?.startsWith('/moderator')
    ? '/moderator/orders'
    : pathname?.startsWith('/member')
    ? '/member/orders'
    : '/orders';
  const initialOrder =
    mockOrdersList.find((o) => o.id === orderId) ||
    mockOrdersList.find((o) => o.id === '10042') ||
    mockOrdersList[0];
  const [order, setOrder] = useState<Order>(initialOrder);

  // Modal states
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states for Report Bank Transfer
  const [transferNotes, setTransferNotes] = useState('');
  const [receiptFile, setReceiptFile] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCancelOrder = () => {
    setOrder((prev) => ({
      ...prev,
      status: 'Cancelled',
    }));
    setShowCancelModal(false);
    showToast(`Order #${order.id} has been cancelled.`);
  };

  const handleReportTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReportModal(false);
    showToast('Bank transfer payment report submitted successfully!');
    setTransferNotes('');
    setReceiptFile(null);
  };

  const shipping = order.shippingAddress || {
    firstName: 'Daniel',
    lastName: 'Jones',
    email: 'test@gmail.com',
    phone: '+49 123 45 67 89',
    address: 'Schutzenstrasse 12 Landstuhl',
    country: 'Germany',
    state: 'Berlin',
    city: 'Landstuhl',
    zipCode: '353434',
  };

  const billing = order.billingAddress || shipping;

  return (
    <div className={`${shouldHideHeaderFooter ? "w-full" : "min-h-screen"} bg-white flex flex-col font-sans text-gray-800 antialiased`}>
      {/* Modesy Header (only when not inside layout) */}
      {!shouldHideHeaderFooter && (
        <ModesyHeader
          currentUser={user || undefined}
          cartCount={3}
        />
      )}

      <main className="flex-1 w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-6 text-gray-800">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 p-4 bg-emerald-600 text-white text-xs font-medium rounded shadow-lg flex items-center gap-2 animate-in slide-in-from-top-3 duration-200">
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Breadcrumb matching Screenshot 1: Home / Orders / Order */}
        <nav className="text-[12px] text-gray-500 mb-4 flex items-center gap-1.5 font-normal">
          <Link href={homeLink} className="hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href={ordersLink} className="hover:text-[#00a99d] transition-colors">
            Orders
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700">Order</span>
        </nav>

        {/* Page Header: Order: #10042 and action buttons on right */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 gap-4">
          <h1 className="text-2xl font-bold text-[#222222]">
            Order: #{order.id}
          </h1>

          <div className="flex items-center gap-2">
            {/* Cancel Order Button (only if Pending Payment) */}
            {order.status === 'Pending Payment' && (
              <button
                type="button"
                onClick={() => setShowCancelModal(true)}
                className="px-3.5 py-1.5 bg-[#e9ecef] hover:bg-[#dee2e6] text-gray-700 text-xs font-semibold rounded-[3px] transition flex items-center gap-1.5 cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5 text-gray-500 stroke-[2]" />
                <span>Cancel Order</span>
              </button>
            )}

            {/* View Invoice Button (Neutral Gray matching screenshot) */}
            <Link
              href={`/invoice/${order.id}?type=seller`}
              className="px-3.5 py-1.5 bg-[#e9ecef] hover:bg-[#dee2e6] text-[#495057] text-xs font-semibold rounded-[3px] transition flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#495057] stroke-[2]" />
              <span>View Invoice</span>
            </Link>

            {/* Orders Button (Teal matching screenshot) */}
            <Link
              href="/orders"
              className="px-4 py-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[3px] transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <List className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Orders</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Info Box */}
        <div className="bg-white border border-gray-200 rounded-[4px] p-6 mb-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <div className="space-y-3.5 text-xs">
            {/* Status */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="w-48 text-gray-700 font-semibold">Status</span>
              <div>
                {order.status === 'Processing' && (
                  <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#d9edf7] text-[#31708f] border border-[#bce8f1]">
                    Processing
                  </span>
                )}
                {order.status === 'Pending Payment' && (
                  <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#fcf8e3] text-[#8a6d3b] border border-[#faebcc]">
                    Pending Payment
                  </span>
                )}
                {order.status === 'Completed' && (
                  <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#dff0d8] text-[#3c763d] border border-[#d6e9c6]">
                    Completed
                  </span>
                )}
                {order.status === 'Cancelled' && (
                  <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#f2dede] text-[#a94442] border border-[#ebccd1]">
                    Cancelled
                  </span>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="w-48 text-gray-700 font-semibold">Payment Method</span>
              <span className="text-gray-800">{order.paymentMethod || 'Wallet Balance'}</span>
            </div>

            {/* Payment Status */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="w-48 text-gray-700 font-semibold">Payment Status</span>
              <span className="text-gray-800">{order.paymentStatus || 'Payment Received'}</span>
            </div>

            {/* Transaction Number (if Bank Transfer) */}
            {order.paymentMethod === 'Bank Transfer' && (
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="w-48 text-gray-700 font-semibold">Transaction Number</span>
                <span className="text-gray-800 font-mono">BTR-HMQP7LUEA6-1CY8TUIZ</span>
              </div>
            )}

            {/* Date */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="w-48 text-gray-700 font-semibold">Date</span>
              <span className="text-gray-800">{order.date}</span>
            </div>

            {/* Updated */}
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="w-48 text-gray-700 font-semibold">Updated</span>
              <span className="text-gray-800">{order.updatedAgo || '5 days ago'}</span>
            </div>
          </div>

          {/* Action Buttons for Bank Transfer */}
          {order.paymentMethod === 'Bank Transfer' && (
            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setShowBankModal(true)}
                className="px-4 py-2 bg-[#e9ecef] hover:bg-[#dee2e6] text-[#495057] text-xs font-semibold rounded-[3px] transition flex items-center gap-2 cursor-pointer"
              >
                <Landmark className="w-4 h-4 text-[#495057]" />
                <span>Bank Accounts</span>
              </button>

              <button
                type="button"
                onClick={() => setShowReportModal(true)}
                className="px-4 py-2 bg-[#e9ecef] hover:bg-[#dee2e6] text-[#495057] text-xs font-semibold rounded-[3px] transition flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#495057]" />
                <span>Report Bank Transfer</span>
              </button>
            </div>
          )}
        </div>

        {/* Two Column Addresses Section matching Screenshot 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Shipping Address */}
          <div className="bg-[#fcfcfc] border border-gray-200 rounded-[4px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <h2 className="text-sm font-bold text-[#222222] mb-4">
              Shipping Address
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex">
                <span className="w-36 text-gray-600 font-normal">First Name</span>
                <span className="text-gray-800">{shipping.firstName}</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-600 font-normal">Last Name</span>
                <span className="text-gray-800">{shipping.lastName}</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-600 font-normal">Email</span>
                <span className="text-gray-800">{shipping.email}</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-600 font-normal">Phone Number</span>
                <span className="text-gray-800">{shipping.phone}</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-600 font-normal">Address</span>
                <span className="text-gray-800">{shipping.address}</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-600 font-normal">Country</span>
                <span className="text-gray-800">{shipping.country}</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-600 font-normal">State</span>
                <span className="text-gray-800">{shipping.state}</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-600 font-normal">City</span>
                <span className="text-gray-800">{shipping.city}</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-600 font-normal">Zip Code</span>
                <span className="text-gray-800">{shipping.zipCode}</span>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="bg-[#fcfcfc] border border-gray-200 rounded-[4px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <h2 className="text-sm font-bold text-[#222222] mb-4">
              Billing Address
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex">
                <span className="w-36 text-gray-600 font-normal">First Name</span>
                <span className="text-gray-800">{billing.firstName}</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-600 font-normal">Last Name</span>
                <span className="text-gray-800">{billing.lastName}</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-600 font-normal">Email</span>
                <span className="text-gray-800">{billing.email}</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-600 font-normal">Phone Number</span>
                <span className="text-gray-800">{billing.phone}</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-600 font-normal">Address</span>
                <span className="text-gray-800">{billing.address}</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-600 font-normal">Country</span>
                <span className="text-gray-800">{billing.country}</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-600 font-normal">State</span>
                <span className="text-gray-800">{billing.state}</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-600 font-normal">City</span>
                <span className="text-gray-800">{billing.city}</span>
              </div>
              <div className="flex">
                <span className="w-36 text-gray-600 font-normal">Zip Code</span>
                <span className="text-gray-800">{billing.zipCode}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section matching Screenshot 1 exactly */}
        <div className="bg-white border border-gray-200 rounded-[4px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          <h2 className="text-sm font-bold text-[#222222] mb-4">
            Products
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-[#f8f9fa] border-y border-gray-200 text-gray-700 font-semibold">
                <tr>
                  <th className="py-3 px-4 w-[50%]">Product</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Updated</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50">
                      <td className="py-4 px-4">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-20 relative rounded border border-gray-200 overflow-hidden shrink-0 bg-gray-50">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="space-y-1">
                            <div>
                              <span className="inline-block px-2 py-0.5 bg-[#d9edf7] text-[#31708f] text-[11px] font-medium rounded-[3px]">
                                Seller: {item.seller}
                              </span>
                            </div>
                            <div className="font-semibold text-gray-900 text-sm hover:text-[#00a99d] transition cursor-pointer">
                              {item.name}
                            </div>
                            {(item.color || item.size) && (
                              <div className="text-gray-500 text-xs">
                                Color: {item.color || 'Red'} Size: {item.size || 'L'}
                              </div>
                            )}
                            {item.sku && (
                              <div className="text-gray-500 text-xs">
                                SKU: <span className="font-mono text-gray-700">{item.sku}</span>
                              </div>
                            )}
                            <div className="text-gray-500 text-xs">
                              Quantity: {item.quantity}
                            </div>
                            <div className="text-gray-500 text-xs">
                              Price: ${item.price.toFixed(0)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-bold text-gray-900 text-sm align-top pt-4">
                        ${(item.price * item.quantity).toFixed(0)}
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-xs align-top pt-4">
                        {item.updatedAgo || order.updatedAgo || '5 days ago'}
                      </td>
                      <td className="py-4 px-4 text-gray-900 font-medium text-xs align-top pt-4">
                        {item.status || order.paymentStatus || 'Payment Received'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 px-4 text-center text-gray-400">
                      No items in this order.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Bank Accounts */}
        {showBankModal && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-[4px] shadow-2xl max-w-md w-full p-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-[#00a99d]" />
                  Bank Accounts
                </h3>
                <button
                  type="button"
                  onClick={() => setShowBankModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4 text-xs">
                <div className="bg-gray-50 border border-gray-200 p-4 rounded space-y-1.5">
                  <p className="font-bold text-gray-900 text-sm">Chase Bank USA</p>
                  <p className="text-gray-600"><span className="text-gray-400">Account Name:</span> Modesy Marketplace Inc.</p>
                  <p className="text-gray-600"><span className="text-gray-400">Account Number:</span> 9821-4352-7819</p>
                  <p className="text-gray-600"><span className="text-gray-400">Branch:</span> New York Central Branch</p>
                  <p className="text-gray-600"><span className="text-gray-400">Routing / Swift:</span> CHASUS33XXX</p>
                </div>
                <p className="text-[11px] text-gray-500">
                  Please make sure to include your Order number <strong>#{order.id}</strong> in the transfer description.
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowBankModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Report Bank Transfer */}
        {showReportModal && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-[4px] shadow-2xl max-w-md w-full p-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Send className="w-4 h-4 text-[#00a99d]" />
                  Report Bank Transfer
                </h3>
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleReportTransfer} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Order Number
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={`#${order.id}`}
                    className="w-full bg-gray-100 border border-gray-200 rounded px-3 py-2 text-gray-600 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Payment Notes / Reference Number
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Enter transfer reference number, bank used, sender name..."
                    value={transferNotes}
                    onChange={(e) => setTransferNotes(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:border-[#00a99d]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Upload Payment Receipt (Optional)
                  </label>
                  <div className="border border-dashed border-gray-300 rounded p-4 text-center cursor-pointer hover:bg-gray-50">
                    <Upload className="w-5 h-5 mx-auto text-gray-400 mb-1" />
                    <span className="text-[11px] text-gray-500">
                      {receiptFile ? receiptFile : 'Click to select transfer proof image or PDF'}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      id="receipt-file-input"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setReceiptFile(e.target.files[0].name);
                        }
                      }}
                    />
                    <label
                      htmlFor="receipt-file-input"
                      className="block mt-1 text-[11px] text-[#00a99d] font-semibold cursor-pointer"
                    >
                      Browse file
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReportModal(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded cursor-pointer"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Cancel Order */}
        {showCancelModal && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-[4px] shadow-2xl max-w-sm w-full p-6 text-center animate-in fade-in duration-150">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-base font-bold text-gray-900">
                Cancel Order #{order.id}?
              </h3>
              <p className="text-xs text-gray-500 mt-2 mb-6">
                Are you sure you want to cancel this order? This action will mark your order as cancelled.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowCancelModal(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded cursor-pointer"
                >
                  Keep Order
                </button>
                <button
                  type="button"
                  onClick={handleCancelOrder}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded cursor-pointer"
                >
                  Yes, Cancel Order
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modesy Footer (only when not inside layout) */}
      {!shouldHideHeaderFooter && <ModesyFooter />}
    </div>
  );
}
