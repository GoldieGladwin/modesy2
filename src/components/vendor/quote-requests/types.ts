export type QuoteStatus =
  | "New Quote Request"
  | "Pending Quote"
  | "Pending Payment"
  | "Rejected Quote"
  | "Closed"
  | "Completed";

export interface VendorQuoteRequest {
  id: number;
  quoteNumber: string;
  productTitle: string;
  sku: string;
  quantity: number;
  productImage: string;
  buyer: string;
  status: QuoteStatus;
  sellersBid: string;
  updated: string;
  date: string;
  unitPrice?: number;
}
