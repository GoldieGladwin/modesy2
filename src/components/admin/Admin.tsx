'use client';

import React, { useState } from 'react';
import Orders from './orders/Orders';
import Brands from './brands/Brands';
import Payments from './payments/Payments';
import EmailBlacklist from './email-blacklist/EmailBlacklist';
import Reviews from './reviews/Reviews';
import Newsletter from './newsletter/Newsletter';
import Categories from './categories/Categories';

type TabType =
  | 'orders'
  | 'brands'
  | 'payments'
  | 'blacklist'
  | 'reviews'
  | 'newsletter'
  | 'categories';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<TabType>('orders');

  const tabs: { id: TabType; label: string }[] = [
    { id: 'orders', label: 'Orders' },
    { id: 'brands', label: 'Brands' },
    { id: 'categories', label: 'Categories' },
    { id: 'payments', label: 'Payments' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'newsletter', label: 'Newsletter' },
    { id: 'blacklist', label: 'Email Blacklist' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <Orders />;
      case 'brands':
        return <Brands />;
      case 'payments':
        return <Payments />;
      case 'blacklist':
        return <EmailBlacklist />;
      case 'reviews':
        return <Reviews />;
      case 'newsletter':
        return <Newsletter />;
      case 'categories':
        return <Categories />;
      default:
        return <Orders />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-white border-r border-gray-200 shrink-0">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Management Modules</p>
        </div>
        <nav className="p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </div>
    </div>
  );
}
