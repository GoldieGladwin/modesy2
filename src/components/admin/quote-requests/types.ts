export type QuoteStatus =
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
  quantity: number;
  seller: string;
  buyer: string;
  status: QuoteStatus;
  sellersBid?: string;
  updated: string;
  date: string;
}

export interface QuoteFilterState {
  pageSize: number;
  status: string;
  search: string;
}
