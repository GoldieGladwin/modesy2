export interface RefundMessage {
  id: string;
  sender: string;
  avatar: string;
  time: string;
  text: string;
}

export type RefundStatus = "Processing" | "Approved" | "Declined";

export interface VendorRefundRequest {
  id: string;
  orderId: string;
  productTitle: string;
  total: string;
  buyer: string;
  buyerAvatar: string;
  status: RefundStatus;
  updated: string;
  date: string;
  messages: RefundMessage[];
}
