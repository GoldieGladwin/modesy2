export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  paymentMethod: string;
  status: OrderStatus;
}
