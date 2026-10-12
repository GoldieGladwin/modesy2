export type BulkAction = "" | "add_new" | "update_existing";

export type BulkListingType =
  | ""
  | "sell_on_site"
  | "ordinary_listing"
  | "quote_request"
  | "license_keys";

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
