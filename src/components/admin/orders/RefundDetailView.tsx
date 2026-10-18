'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { List, Check } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { RefundRequest } from './types';
import { mockRefundRequestsList } from './mockData';
import ModesyHeader from '@/components/layout/guest/ModesyHeader';
import ModesyFooter from '@/components/layout/guest/ModesyFooter';
import { useAuth } from '@/context/AuthContext';

interface RefundDetailViewProps {
  refundId: string;
  hideHeaderFooter?: boolean;
}

interface Message {
  id: string;
  sender: string;
  avatar: string;
  time: string;
  text: string;
}

export default function RefundDetailView({ refundId, hideHeaderFooter }: RefundDetailViewProps) {
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

  const refundsLink = pathname?.startsWith('/admin')
    ? '/admin/orders?tab=refund-requests'
    : pathname?.startsWith('/vendor')
    ? '/vendor/orders?tab=refund-requests'
    : '/refund-requests';
  const matchedRefund =
    mockRefundRequestsList.find((r) => r.id === refundId || r.orderId === refundId) ||
    mockRefundRequestsList[0];

  // Mock data matching Screenshot 5 exactly: Product: #10018 - Navy polka dot dress
  const refundData = {
    id: refundId || matchedRefund.id,
    orderId: matchedRefund.orderId || '10018',
    productName: matchedRefund.productTitle || 'Navy polka dot dress',
    status: matchedRefund.status || 'Processing',
    total: `$${matchedRefund.total.toFixed(0)}`,
    seller: matchedRefund.seller || 'Trendshop',
    lastUpdate: '1 month ago',
    date: '2026-09-09 / 06:01',
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'Trendshop',
      avatar: '/assets/img/trendshop-avatar.jpg',
      time: '1 month ago',
      text: 'You',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msgObj: Message = {
      id: `msg-${Date.now()}`,
      sender: 'Trendshop',
      avatar: '/assets/img/trendshop-avatar.jpg',
      time: 'Just now',
      text: newMessage.trim(),
    };

    setMessages([...messages, msgObj]);
    setNewMessage('');
    showToast('Message sent successfully!');
  };

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

        {/* Breadcrumb matching Screenshot 5: Home / Refund Requests / Refund */}
        <nav className="text-[12px] text-gray-500 mb-4 flex items-center gap-1.5 font-normal">
          <Link href={homeLink} className="hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href={refundsLink} className="hover:text-[#00a99d] transition-colors">
            Refund Requests
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700">Refund</span>
        </nav>

        {/* Page Header: Refund on left, ≡ Refund Requests on right */}
        <div className="flex items-center justify-between pb-4 mb-4">
          <h1 className="text-2xl font-bold text-[#222222]">
            Refund
          </h1>

          <Link
            href="/refund-requests"
            className="px-4 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[3px] transition flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <List className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Refund Requests</span>
          </Link>
        </div>

        {/* Main Card Container */}
        <div className="bg-white border border-gray-200 rounded-[4px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-8">
          {/* Top Product Summary Row matching Screenshot 5 */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 mb-3">
              Product: #{refundData.orderId} - {refundData.productName}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 py-3 text-xs border-y border-gray-100">
              <div>
                <span className="text-gray-600 font-semibold block mb-1">Status</span>
                <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#6c757d] text-white">
                  {refundData.status}
                </span>
              </div>

              <div>
                <span className="text-gray-600 font-semibold block mb-1">Total</span>
                <span className="text-gray-900 font-medium">{refundData.total}</span>
              </div>

              <div>
                <span className="text-gray-600 font-semibold block mb-1">Seller</span>
                <span className="text-gray-900 font-medium">{refundData.seller}</span>
              </div>

              <div>
                <span className="text-gray-600 font-semibold block mb-1">Last Update</span>
                <span className="text-gray-600">{refundData.lastUpdate}</span>
              </div>

              <div>
                <span className="text-gray-600 font-semibold block mb-1">Date</span>
                <span className="text-gray-600">{refundData.date}</span>
              </div>
            </div>
          </div>

          {/* Discussion / Messages Section matching Screenshot 5 */}
          <div className="space-y-6 pt-2">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-4 text-xs">
                {/* Circular Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 relative border border-gray-200">
                  <Image
                    src={msg.avatar}
                    alt={msg.sender}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-xs">{msg.sender}</span>
                    <span className="text-gray-400 text-xs">{msg.time}</span>
                  </div>
                  <p className="text-gray-700 text-xs mt-1.5 leading-relaxed">
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}

            {/* Reply Form */}
            <form onSubmit={handleSendMessage} className="pt-4 border-t border-gray-100 space-y-3">
              <textarea
                rows={4}
                required
                placeholder="Write a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-[3px] p-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d] resize-y min-h-[110px]"
              />

              <div className="flex justify-end">
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
      </main>

      {/* Modesy Footer (only when not inside layout) */}
      {!shouldHideHeaderFooter && <ModesyFooter />}
    </div>
  );
}
