import { CouponItem } from "./types";

export const initialCoupons: CouponItem[] = [
  {
    id: 1,
    code: "P6PG5GLS",
    discountRate: "10%",
    numberOfCoupons: 500,
    usedCoupons: 0,
    expiryDate: "2027-04-16 / 15:01",
    status: "Active",
    date: "2026-08-06 / 14:01",
    selectedProductIds: [1, 2],
  },
];
