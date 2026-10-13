export type WalletTabType = "earnings" | "deposits" | "expenses" | "payouts" | "payout-account";

export type PayoutMethodType = "paypal" | "bitcoin" | "iban" | "swift";

export interface CommissionDiscounts {
  commission: string;
  commissionRate: string;
  referrerCommission: string;
  referrerCommissionRate: string;
  referralDiscount: string;
  referralDiscountRate: string;
  discountCoupon: string;
}

export interface EarningsRecord {
  id: string;
  orderNumber: string;
  total: string;
  currency: string;
  vat: string;
  commissions: CommissionDiscounts;
  shippingCost: string;
  earnedAmount: string;
  date: string;
}

export interface DepositRecord {
  id: string;
  paymentId: string;
  paymentMethod: string;
  amount: number;
  currency: string;
  status: "Completed" | "Pending Payment";
  date: string;
  invoiceUrl?: string;
}

export interface ExpenseRecord {
  id: string;
  paymentId: string;
  expenseTitle: string;
  orderNumber: string;
  amount: number;
  currency: string;
  date: string;
}

export interface PayoutRequestRecord {
  id: string;
  withdrawalMethod: string;
  withdrawalAmount: number;
  currency: string;
  status: "Pending" | "Approved" | "Completed" | "Rejected";
  date: string;
}

export interface PayoutAccountSettings {
  paypalEmail: string;
  btcAddress: string;
  iban: {
    fullName: string;
    country: string;
    bankName: string;
    ibanNumber: string;
  };
  swift: {
    fullName: string;
    country: string;
    bankName: string;
    branchName: string;
    accountNumber: string;
    swiftCode: string;
  };
}
