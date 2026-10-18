'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { OrderTab, Order } from './types';
import {
  mockOrdersList,
  mockQuoteRequestsList,
  mockDownloadsList,
  mockRefundRequestsList,
} from './mockData';
import OrdersSidebar from './OrdersSidebar';
import OrdersTab from './OrdersTab';
import QuoteRequestsTab from './QuoteRequestsTab';
import DownloadsTab from './DownloadsTab';
import RefundRequestsTab from './RefundRequestsTab';
import OrderDetailsModal from './OrderDetailsModal';
import ModesyHeader from '@/components/layout/guest/ModesyHeader';
import ModesyFooter from '@/components/layout/guest/ModesyFooter';
import { useAuth } from '@/context/AuthContext';

interface OrdersProps {
  initialTab?: OrderTab;
  hideHeaderFooter?: boolean;
}

function OrdersContent({ initialTab = 'orders', hideHeaderFooter }: OrdersProps) {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
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

  const tabParam = searchParams.get('tab') as OrderTab | null;

  const determineTab = (): OrderTab => {
    if (pathname.includes('quote-requests') || pathname.includes('quote_requests')) {
      return 'quote-requests';
    }
    if (pathname.includes('downloads')) {
      return 'downloads';
    }
    if (pathname.includes('refund-requests') || pathname.includes('refund_requests')) {
      return 'refund-requests';
    }
    if (tabParam && ['orders', 'quote-requests', 'downloads', 'refund-requests'].includes(tabParam)) {
      return tabParam;
    }
    return initialTab;
  };

  const [activeTab, setActiveTab] = useState<OrderTab>(determineTab);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    setActiveTab(determineTab());
  }, [pathname, tabParam, initialTab]);

  const handleTabChange = (newTab: OrderTab) => {
    setActiveTab(newTab);
    const targetPath =
      newTab === 'orders'
        ? '/orders'
        : newTab === 'quote-requests'
        ? '/quote-requests'
        : newTab === 'downloads'
        ? '/downloads'
        : '/refund-requests';
    router.push(targetPath, { scroll: false });
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'quote-requests':
        return 'Quote Requests';
      case 'downloads':
        return 'Downloads';
      case 'refund-requests':
        return 'Refund Requests';
      case 'orders':
      default:
        return 'Orders';
    }
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
        {/* Breadcrumb matching Screenshot */}
        <nav className="text-[12px] text-gray-500 mb-3 flex items-center gap-1.5 font-normal">
          <Link href={homeLink} className="text-gray-500 hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{getTabTitle()}</span>
        </nav>

        {/* Page Title matching Screenshot */}
        <div className="mb-6">
          <h1 className="text-[22px] font-bold text-[#222222] tracking-tight">
            {getTabTitle()}
          </h1>
        </div>

        {/* 2-Column Layout */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Left Navigation Sidebar */}
          <OrdersSidebar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            ordersCount={mockOrdersList.length}
            quotesCount={mockQuoteRequestsList.length}
            downloadsCount={mockDownloadsList.length}
            refundsCount={mockRefundRequestsList.length}
          />

          {/* Right Content Area */}
          <div className="flex-1 w-full min-w-0">
            {activeTab === 'orders' && (
              <OrdersTab
                orders={mockOrdersList}
                onViewDetails={(order) => setSelectedOrder(order)}
              />
            )}

            {activeTab === 'quote-requests' && (
              <QuoteRequestsTab quoteRequests={mockQuoteRequestsList} />
            )}

            {activeTab === 'downloads' && (
              <DownloadsTab downloads={mockDownloadsList} />
            )}

            {activeTab === 'refund-requests' && (
              <RefundRequestsTab refundRequests={mockRefundRequestsList} />
            )}
          </div>
        </div>

        {/* Order Details Modal */}
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      </main>

      {/* Modesy Footer (only when not inside layout) */}
      {!shouldHideHeaderFooter && <ModesyFooter />}
    </div>
  );
}

export default function Orders(props: OrdersProps) {
  return (
    <Suspense
      fallback={
        <div className="max-w-[1240px] mx-auto px-4 py-12 text-center text-gray-400 text-sm">
          Loading...
        </div>
      }
    >
      <OrdersContent {...props} />
    </Suspense>
  );
}
