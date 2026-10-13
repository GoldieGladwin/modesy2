export type CouponStatus = 'Active' | 'Expired' | 'Scheduled';

export type DiscountType = 'percentage' | 'fixed_amount';

export interface Coupon {
  id: string;
  code: string;
  name: string;
  discountType: DiscountType;
  discountValue: number;
  minPurchase: number;
  startDate: string;
  expirationDate: string;
  usageCount: number;
  usageLimit: number;
  status: CouponStatus;
  shopName: string;
  category: string;
  imageUrl?: string;
}

export interface CouponFormData {
  code: string;
  name: string;
  discountType: DiscountType;
  discountValue: number;
  minPurchase: number;
  startDate: string;
  expirationDate: string;
  usageLimit: number;
  status: CouponStatus;
  shopName: string;
  category: string;
}
