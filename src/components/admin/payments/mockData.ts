import { Payment } from './types';

export const mockPayments: Payment[] = [
  { id: 'PAY-001', orderId: 'ORD-001', customerName: 'John Doe', amount: 150.00, paymentMethod: 'Credit Card', status: 'Success', transactionDate: '2023-10-01T10:30:00Z' },
  { id: 'PAY-002', orderId: 'ORD-002', customerName: 'Jane Smith', amount: 89.50, paymentMethod: 'PayPal', status: 'Pending', transactionDate: '2023-10-02T14:15:00Z' },
];
