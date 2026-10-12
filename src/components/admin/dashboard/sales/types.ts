export interface SaleItem {
  id: string; // e.g. "10042" (displayed with #10042)
  total: string; // e.g. "$225" or "₦88,983.21"
  paymentStatus: "Payment Received" | "Pending Payment" | "Awaiting Payment";
  status: "Processing" | "Completed" | "Cancelled";
  date: string; // e.g. "2026-10-12 / 19:26"
}

export interface SaleFilterState {
  paymentStatus: string;
  searchId: string;
}
