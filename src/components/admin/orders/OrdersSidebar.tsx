'use client';

import React from 'react';
import { ShoppingBasket, Tag, DownloadCloud, RotateCcw } from 'lucide-react';
import { OrderTab } from './types';

interface OrdersSidebarProps {
  activeTab: OrderTab;
  onTabChange: (tab: OrderTab) => void;
  ordersCount?: number;
  quotesCount?: number;
  downloadsCount?: number;
  refundsCount?: number;
}

export default function OrdersSidebar({
  activeTab,
  onTabChange,
}: OrdersSidebarProps) {
  const navItems = [
    {
      id: 'orders' as OrderTab,
      label: 'Orders',
      icon: ShoppingBasket,
    },
    {
      id: 'quote-requests' as OrderTab,
      label: 'Quote Requests',
      icon: Tag,
    },
    {
      id: 'downloads' as OrderTab,
      label: 'Downloads',
      icon: DownloadCloud,
    },
    {
      id: 'refund-requests' as OrderTab,
      label: 'Refund Requests',
      icon: RotateCcw,
    },
  ];

  return (
    <div className="w-full md:w-56 lg:w-60 shrink-0">
      <div className="bg-white border border-gray-200 rounded-md p-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <nav className="flex flex-col space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs sm:text-[13px] font-medium rounded transition-colors text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#ebedf0] text-gray-900 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 stroke-[2] ${
                    isActive ? 'text-gray-900' : 'text-gray-500'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
