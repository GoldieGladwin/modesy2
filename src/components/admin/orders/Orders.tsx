'use client';

import React, { useState } from 'react';
import type { Order, OrderStatus } from './types';
import { mockOrders } from './mockData';
import OrdersHeader from './OrdersHeader';
import OrdersFilterBar from './OrdersFilterBar';
import OrdersTable from './OrdersTable';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
  };

  const filteredOrders = orders.filter((order) => {
    const matchStatus = statusFilter === 'All' || order.status === statusFilter;
    const matchSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <OrdersHeader />
      <OrdersFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      <OrdersTable orders={filteredOrders} onStatusChange={handleStatusChange} />
    </div>
  );
}
