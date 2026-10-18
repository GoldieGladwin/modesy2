export interface MembershipPaymentItem {
  id: number;
  paymentId: string;
  paymentMethod: string;
  membershipPlan: string;
  paymentAmount: string;
  paymentStatus: string;
  date: string;
}

export interface PromotionPaymentItem {
  id: number;
  paymentId: string;
  paymentMethod: string;
  productId: number;
  paymentAmount: string;
  paymentStatus: string;
  purchasedPlan: string;
  date: string;
}
