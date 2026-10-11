export interface Order {
  id: string;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  paymentMethod: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Payment {
  id: string;
  orderId: string;
  customerName?: string;
  amount: number;
  paymentMethod: string;
  status: 'Success' | 'Pending' | 'Failed' | 'Refunded';
  transactionDate: string;
}

export interface EmailBlacklist {
  id: string;
  email: string;
  reason?: string;
  addedAt: string;
}

export interface Review {
  id: string;
  customerName?: string;
  productName: string;
  rating: number; // 1 to 5
  content: string;
  reviewDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface Newsletter {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'Active' | 'Unsubscribed';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  isActive: boolean;
  createdAt: string;
}
