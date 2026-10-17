export type BulkAction = "" | "add" | "edit";

export type BulkListingType =
  | ""
  | "sell"
  | "ordinary"
  | "quote";

export type BulkCurrency =
  | ""
  | "USD"
  | "EUR"
  | "GBP"
  | "IDR"
  | "TRY"
  | "CAD"
  | "AUD";

export interface BulkUploadFormData {
  action: BulkAction;
  listingType: BulkListingType;
  currency: BulkCurrency;
  file: File | null;
}
