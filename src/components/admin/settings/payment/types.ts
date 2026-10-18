export type PaymentGatewayKey =
  | "paypal"
  | "stripe"
  | "paystack"
  | "razorpay"
  | "flutterwave"
  | "iyzico"
  | "midtrans"
  | "mercadopago"
  | "bank_transfer"
  | "cash_on_delivery";

export interface GatewayConfig {
  key: PaymentGatewayKey;
  name: string;
  status: boolean;
  mode: "production" | "sandbox";
  clientId: string;
  secretKey: string;
  appId?: string;
  publicKey?: string;
}

export interface CommissionTaxSettings {
  commissionEnabled: boolean;
  commissionRate: number;
  vatEnabled: boolean;
  taxDestination: "buyer" | "vendor";
}

export interface PayoutLimitSettings {
  minPayout: number;
  maxPayout: number;
  payoutRequestEnabled: boolean;
}

export interface TaxRateItem {
  id: number;
  name: string;
  rate: number;
  status: boolean;
}
