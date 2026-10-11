export type PayoutMethod = "PayPal" | "Bitcoin (BTC)" | "IBAN" | "SWIFT";
export type PayoutStatus = "Pending" | "Completed" | "Cancelled";

export interface PayoutUser {
  id: number;
  name: string;
  shopName?: string;
  email: string;
  avatar: string;
  balance: number;
}

export interface PayoutDetails {
  email?: string;
  btcAddress?: string;
  iban?: string;
  swiftCode?: string;
  bankName?: string;
  accountHolder?: string;
}

export interface PayoutRequestItem {
  id: number;
  userId: number;
  userName: string;
  userShop?: string;
  userAvatar: string;
  withdrawalMethod: PayoutMethod;
  withdrawalAmount: number;
  status: PayoutStatus;
  date: string;
  details?: PayoutDetails;
}

export interface MethodPayoutSetting {
  status: "Enable" | "Disable";
  minAmount: number;
}

export interface PayoutSettingsData {
  paypal: MethodPayoutSetting;
  bitcoin: MethodPayoutSetting;
  iban: MethodPayoutSetting;
  swift: MethodPayoutSetting;
}
