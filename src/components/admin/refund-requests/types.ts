export type RefundStatus = "Processing" | "Refund Approved" | "Declined";

export interface RefundRequestItem {
  id: number;
  orderNumber: string;
  productTitle: string;
  total: string;
  commissionRate: string;
  earnedAmount: string;
  buyer: string;
  seller: string;
  status: RefundStatus;
  updated: string;
  date: string;
  reason?: string;
}
