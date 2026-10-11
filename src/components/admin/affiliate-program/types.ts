export interface HowItWorksItem {
  id: number;
  title: string;
  content: string;
  isOpen: boolean;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}

export interface AffiliateSettings {
  statusEnabled: boolean;
  programType: "site" | "seller";
  referrerCommission: string;
  buyerDiscount: string;
}

export interface AffiliateDescription {
  title: string;
  description: string;
}

export interface AffiliateContent {
  title: string;
  body: string;
}
