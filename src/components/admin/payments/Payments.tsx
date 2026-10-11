'use client';

import React, { useState } from 'react';
import type { Payment } from './types';
import { mockPayments } from './mockData';
import PaymentsHeader from './PaymentsHeader';
import PaymentsFilterBar from './PaymentsFilterBar';
import PaymentsTable from './PaymentsTable';

export default function Payments() {
  const [payments] = useState<Payment[]>(mockPayments);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredPayments = payments.filter((payment) => {
    const matchStatus = statusFilter === 'All' || payment.status === statusFilter;
    const matchSearch =
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.customerName &&
        payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchStatus && matchSearch;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <PaymentsHeader />
      <PaymentsFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      <PaymentsTable payments={filteredPayments} />
    </div>
  );
}
