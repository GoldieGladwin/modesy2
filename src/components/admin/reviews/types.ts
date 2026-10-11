export type ReviewStatus = 'Pending' | 'Approved' | 'Rejected';

export interface Review {
  id: string;
  customerName?: string;
  productName: string;
  rating: number; // 1 to 5
  content: string;
  reviewDate: string;
  status: ReviewStatus;
}
