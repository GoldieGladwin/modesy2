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

interface OrdersProps {
  initialTab?: OrderTab;
}

function OrdersContent({ initialTab = 'orders' }: OrdersProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tabParam = searchParams.get('tab') as OrderTab | null;
  const [activeTab, setActiveTab] = useState<OrderTab>(tabParam || initialTab);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (
      tabParam &&
      ['orders', 'quote-requests', 'downloads', 'refund-requests'].includes(tabParam)
    ) {
      setActiveTab(tabParam);
    } else if (!tabParam && initialTab) {
      setActiveTab(initialTab);
    }
  }, [tabParam, initialTab]);

  const handleTabChange = (newTab: OrderTab) => {
    setActiveTab(newTab);
    const params = new URLSearchParams(searchParams.toString());
    if (newTab === 'orders' && initialTab === 'orders') {
      params.delete('tab');
    } else {
      params.set('tab', newTab);
    }
    const query = params.toString() ? `?${params.toString()}` : '';
    router.push(`${pathname}${query}`, { scroll: false });
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
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6 text-gray-800">
      {/* Breadcrumb matching Screenshot */}
      <nav className="text-xs text-gray-500 mb-5 flex items-center gap-1.5 font-normal">
        <Link href="/admin" className="hover:text-[#00a99d] transition-colors">
          Home
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-700">{getTabTitle()}</span>
      </nav>

      {/* Page Title matching Screenshot */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#222222] tracking-tight">
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
    </div>
  );
}

export default function Orders({ initialTab = 'orders' }: OrdersProps) {
  return (
    <Suspense
      fallback={
        <div className="max-w-[1240px] mx-auto px-4 py-12 text-center text-gray-400 text-sm">
          Loading...
        </div>
      }
    >
      <OrdersContent initialTab={initialTab} />
    </Suspense>
  );
}
