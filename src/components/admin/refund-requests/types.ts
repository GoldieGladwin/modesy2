export type RefundStatus = "Processing" | "Refund Approved" | "Declined";

export interface RefundRequestItem {
  id: number;
  orderNumber: string;
  productTitle: string;
  total: string;
  buyer: string;
  status: RefundStatus;
  updated: string;
  date: string;
  commissionRate?: string;
  earnedAmount?: string;
  seller?: string;
  reason?: string;
}
