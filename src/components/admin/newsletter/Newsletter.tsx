'use client';

import React, { useState } from 'react';
import type { Newsletter as NewsletterType, NewsletterStatus } from './types';
import { mockNewsletter } from './mockData';
import NewsletterHeader from './NewsletterHeader';
import NewsletterFilterBar from './NewsletterFilterBar';
import NewsletterTable from './NewsletterTable';

export default function Newsletter() {
  const [subscribers, setSubscribers] = useState<NewsletterType[]>(mockNewsletter);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this subscriber?')) {
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleStatusChange = (id: string, newStatus: NewsletterStatus) => {
    setSubscribers((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: newStatus } : sub))
    );
  };

  const filteredSubscribers = subscribers.filter((sub) => {
    const matchStatus = statusFilter === 'All' || sub.status === statusFilter;
    const matchSearch = sub.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <NewsletterHeader />
      <NewsletterFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      <NewsletterTable
        subscribers={filteredSubscribers}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
}
