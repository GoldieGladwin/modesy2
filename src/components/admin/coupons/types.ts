export interface CouponItem {
  id: number;
  code: string;
  discountRate: string;
  numberOfCoupons: number;
  usedCoupons: number;
  expiryDate: string;
  status: "Active" | "Inactive";
  date: string;
  selectedProductIds?: number[];
}
