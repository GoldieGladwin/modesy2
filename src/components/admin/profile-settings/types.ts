export interface ProfileSettingsData {
  email: string;
  slug: string;
  firstName: string;
  lastName: string;
  phone: string;
  taxRegistrationNumber: string;
  coverImageType: "full" | "boxed";
  emailOnMessage: boolean;
  showEmail: boolean;
  showPhone: boolean;
  coverImageUrl: string;
  avatarUrl?: string;
}

export interface LocationSettingsData {
  country: string;
  state: string;
  address: string;
  zipCode: string;
  showLocation: boolean;
}

export interface AddressItem {
  id: string;
  type: "shipping" | "billing";
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  email: string;
  phone: string;
}

export interface AffiliateLinkItem {
  id: string;
  productTitle: string;
  affiliateUrl: string;
  date: string;
}

export interface SocialMediaSettingsData {
  facebook: string;
  twitter: string;
  instagram: string;
  tiktok: string;
  whatsapp: string;
  youtube: string;
  discord: string;
  telegram: string;
  pinterest: string;
  linkedin: string;
  twitch: string;
  vk: string;
  personalWebsite: string;
}

export type ProfileTab =
  | "update-profile"
  | "location"
  | "shipping-address"
  | "affiliate-links"
  | "social-media"
  | "change-password"
  | "delete-account";
