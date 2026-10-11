import type {
  Order,
  Brand,
  Payment,
  EmailBlacklist,
  Review,
  Newsletter,
  Category
} from '@/types/admin/haidar-admin';

export const mockOrders: Order[] = [
  { id: 'ORD-001', customerName: 'John Doe', orderDate: '2023-10-01', totalAmount: 150.00, paymentMethod: 'Credit Card', status: 'Delivered' },
  { id: 'ORD-002', customerName: 'Jane Smith', orderDate: '2023-10-02', totalAmount: 89.50, paymentMethod: 'PayPal', status: 'Processing' },
];

export const mockBrands: Brand[] = [
  { id: 'BRD-001', name: 'Nike', slug: 'nike', description: 'Sportswear brand', isActive: true, createdAt: '2023-01-15' },
  { id: 'BRD-002', name: 'Adidas', slug: 'adidas', description: 'Sportswear and apparel', isActive: true, createdAt: '2023-02-20' },
];

export const mockPayments: Payment[] = [
  { id: 'PAY-001', orderId: 'ORD-001', customerName: 'John Doe', amount: 150.00, paymentMethod: 'Credit Card', status: 'Success', transactionDate: '2023-10-01T10:30:00Z' },
  { id: 'PAY-002', orderId: 'ORD-002', customerName: 'Jane Smith', amount: 89.50, paymentMethod: 'PayPal', status: 'Pending', transactionDate: '2023-10-02T14:15:00Z' },
];

export const mockEmailBlacklist: EmailBlacklist[] = [
  { id: 'BLK-001', email: 'spammer@example.com', reason: 'Spamming reviews', addedAt: '2023-09-10' },
  { id: 'BLK-002', email: 'fakeuser@test.com', reason: 'Fraudulent activity', addedAt: '2023-09-15' },
];

export const mockReviews: Review[] = [
  { id: 'REV-001', customerName: 'Alice', productName: 'Running Shoes X', rating: 5, content: 'Great shoes, very comfortable!', reviewDate: '2023-10-05', status: 'Approved' },
  { id: 'REV-002', customerName: 'Bob', productName: 'T-Shirt Y', rating: 2, content: 'Size is too small.', reviewDate: '2023-10-06', status: 'Pending' },
];

export const mockNewsletter: Newsletter[] = [
  { id: 'NSL-001', email: 'newsletter1@example.com', subscribedAt: '2023-01-01', status: 'Active' },
  { id: 'NSL-002', email: 'newsletter2@example.com', subscribedAt: '2023-05-12', status: 'Unsubscribed' },
];

export const mockCategories: Category[] = [
  { id: 'CAT-001', name: 'Electronics', slug: 'electronics', description: 'Gadgets and devices', isActive: true, createdAt: '2022-11-01' },
  { id: 'CAT-002', name: 'Clothing', slug: 'clothing', description: 'Apparel and accessories', isActive: true, createdAt: '2022-11-05' },
];
