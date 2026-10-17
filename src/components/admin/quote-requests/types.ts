export type QuoteStatus =
  | "All"
  | "New Quote Request"
  | "Closed"
  | "Pending Payment"
  | "Pending Quote"
  | "Completed"
  | "Rejected";

export interface QuoteRequestItem {
  id: number;
  quoteNumber: string;
  productTitle: string;
  productImage: string;
  color?: string;
  sku?: string;
  quantity: number;
  buyer: string;
  status: QuoteStatus;
  sellersBid?: string;
  updated: string;
  date: string;
}

export interface QuoteFilterState {
  status: string;
  search: string;
}
