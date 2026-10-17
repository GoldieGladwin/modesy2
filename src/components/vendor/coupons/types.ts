export interface VendorCoupon {
  id: string;
  code: string;
  discountRate: number;
  numberOfCoupons: number;
  usedCount: number;
  minOrderAmount: number;
  usageType: "single" | "multiple";
  isPublic: boolean;
  expiryDate: string;
  status: "active" | "inactive";
  createdAt: string;
  selectedProductIds: number[];
  selectedCategories: string[];
}

export interface CouponProduct {
  id: number;
  title: string;
  category: string;
  subcategory?: string;
}

export interface CouponCategory {
  name: string;
}
