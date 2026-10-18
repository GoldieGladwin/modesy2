export type PaymentStatus = 'Success' | 'Pending' | 'Failed' | 'Refunded';

export interface Payment {
  id: string;
  orderId: string;
  customerName?: string;
  amount: number;
  paymentMethod: string;
  status: PaymentStatus;
  transactionDate: string;
}
