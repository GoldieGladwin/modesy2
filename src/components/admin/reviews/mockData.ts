import { Review } from './types';

export const mockReviews: Review[] = [
  { id: 'REV-001', customerName: 'Alice', productName: 'Running Shoes X', rating: 5, content: 'Great shoes, very comfortable!', reviewDate: '2023-10-05', status: 'Approved' },
  { id: 'REV-002', customerName: 'Bob', productName: 'T-Shirt Y', rating: 2, content: 'Size is too small.', reviewDate: '2023-10-06', status: 'Pending' },
];
