export interface MembershipPaymentItem {
  id: number;
  paymentId: string;
  paymentMethod: string;
  membershipPlan: string;
  paymentAmount: string;
  currency: string;
  paymentStatus: string;
  date: string;
  invoiceNumber: string;
  subtotal: string;
  tax: string;
  taxRate: string;
  total: string;
  clientName: string;
  clientUsername: string;
  clientCity: string;
  clientCountry: string;
  clientPhone: string;
}

export interface PromotionPaymentItem {
  id: number;
  paymentId: string;
  paymentMethod: string;
  productId: number | string;
  paymentAmount: string;
  currency: string;
  paymentStatus: string;
  purchasedPlan: string;
  date: string;
  invoiceNumber: string;
  subtotal: string;
  tax: string;
  taxRate: string;
  total: string;
  clientName: string;
  clientUsername: string;
  clientCity: string;
  clientCountry: string;
  clientPhone: string;
}
