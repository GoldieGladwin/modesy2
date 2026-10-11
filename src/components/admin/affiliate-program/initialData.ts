import { HowItWorksItem, FaqItem, AffiliateSettings, AffiliateDescription } from "./types";

export const DEFAULT_AFFILIATE_SETTINGS: AffiliateSettings = {
  statusEnabled: false,
  programType: "seller",
  referrerCommission: "",
  buyerDiscount: "",
};

export const DEFAULT_AFFILIATE_DESCRIPTION: AffiliateDescription = {
  title: "Boost Your Earnings with the Modesy Affiliate Program",
  description:
    "Are you a content creator, blogger, influencer, or simply someone with a strong online presence? If so, Modesy has an exciting opportunity for you to turn your online influence into real earnings.",
};

export const INITIAL_HOW_IT_WORKS_ITEMS: HowItWorksItem[] = [
  {
    id: 1,
    title: "Sign up for the program",
    content:
      "Join our affiliate program by submitting a simple registration form. Once approved, you gain immediate access to your dashboard.",
    isOpen: false,
  },
  {
    id: 2,
    title: "Create and share your referral URL",
    content:
      "Generate custom affiliate links for any product or category and share them across your social channels, blog, or community.",
    isOpen: false,
  },
  {
    id: 3,
    title: "Earn commission",
    content:
      "Receive competitive commissions every time a visitor uses your referral link to complete an eligible purchase.",
    isOpen: false,
  },
];

export const INITIAL_FAQ_ITEMS: FaqItem[] = [
  {
    id: 1,
    question: "How do I join the Affiliate program?",
    answer:
      "You can join by navigating to the affiliate registration section and completing the application with your social or website profile.",
    isOpen: false,
  },
  {
    id: 2,
    question: "Who can participate in the Affiliate Program?",
    answer:
      "Content creators, influencers, bloggers, and customers with active audiences are all eligible to participate.",
    isOpen: false,
  },
  {
    id: 3,
    question: "Where can I generate my Affiliate links?",
    answer:
      "From your dedicated affiliate panel, you can use the URL generator tool to create links for specific items.",
    isOpen: false,
  },
  {
    id: 4,
    question: "What products can I promote?",
    answer:
      "Depending on the program mode, you can promote all marketplace items or specific seller-authorized listings.",
    isOpen: false,
  },
  {
    id: 5,
    question: "How long is the validity of an Affiliate link?",
    answer:
      "Standard referral cookies remain active for 30 days following the user's initial click.",
    isOpen: false,
  },
  {
    id: 6,
    question: "How much can I earn?",
    answer:
      "There is no earning cap. Your payout is directly proportionate to the total order value of verified sales.",
    isOpen: false,
  },
  {
    id: 7,
    question: "How do I track my Affiliate earnings?",
    answer:
      "Your affiliate dashboard features real-time analytics for link clicks, conversion rates, and accrued balances.",
    isOpen: false,
  },
  {
    id: 8,
    question: "How do I get my Affiliate earnings?",
    answer:
      "Disbursements are processed via Bank Wire Transfer, PayPal, or Stripe upon reaching the minimum threshold.",
    isOpen: false,
  },
];
