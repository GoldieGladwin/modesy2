import { Order } from './types';

export const mockOrders: Order[] = [
  { id: 'ORD-001', customerName: 'John Doe', orderDate: '2023-10-01', totalAmount: 150.00, paymentMethod: 'Credit Card', status: 'Delivered' },
  { id: 'ORD-002', customerName: 'Jane Smith', orderDate: '2023-10-02', totalAmount: 89.50, paymentMethod: 'PayPal', status: 'Processing' },
];
