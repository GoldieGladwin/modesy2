export type PreferencesTab =
  | "system"
  | "general"
  | "products"
  | "shop"
  | "wallet"
  | "file_upload";

export interface SystemPreferences {
  physicalProducts: boolean;
  digitalProducts: boolean;
  marketplace: boolean;
  classifiedAds: boolean;
  biddingSystem: boolean;
  sellingLicenseKeys: boolean;
  multiVendorSystem: boolean;
  timezone: string;
}

export interface ProductsPreferences {
  approvalNewProducts: boolean;
  approvalEditedProducts: "do_not_hide" | "hide_until_approved" | "disable";
  featuredProducts: boolean;
  vendorBulkUpload: boolean;
  showSoldProducts: boolean;
  linkStructure: "slug_id" | "id_slug";
  reviews: boolean;
  productComments: boolean;
  blogComments: boolean;
  commentApproval: boolean;
}

export interface WalletPreferences {
  wallet: boolean;
  walletDeposit: boolean;
  payWithWallet: boolean;
  minDepositAmount: string;
}

export interface FileUploadPreferences {
  imageFormat: "jpg" | "png" | "webp" | "keep_original";
  productImageUpload: "required" | "optional";
  productImageUploadLimit: string;
  maxFileSizeImage: string;
  maxFileSizeVideo: string;
  maxFileSizeAudio: string;
}

export interface ShopPreferences {
  refundSystem: boolean;
  showSalesOnProfile: boolean;
  allowChangeShopName: boolean;
  enableWhatsApp: boolean;
  showCustomerEmail: boolean;
  showCustomerPhone: boolean;
  autoApproveOrders: boolean;
  requestDocuments: boolean;
  inputExplanation: string;
}

export interface GeneralPreferences {
  multilingual: boolean;
  maintenanceMode: boolean;
  rssFeeds: boolean;
  darkMode: boolean;
  emailVerification: boolean;
}

export type AiProvider = "google" | "openai";

export interface AiContentGeneratorSettings {
  statusEnabled: boolean;
  activeProvider: AiProvider;
  apiKey: string;
  model: string;
}

export type StorageProvider =
  | "local"
  | "aws_s3"
  | "cloudflare_r2"
  | "backblaze_b2";

export interface StorageSettings {
  activeStorage: StorageProvider;
  currentSettingsTab: StorageProvider;
  awsAccessKey?: string;
  awsSecretKey?: string;
  awsBucket?: string;
  awsRegion?: string;
  cloudflareAccountId?: string;
  cloudflareAccessKey?: string;
  cloudflareSecretKey?: string;
  cloudflareBucket?: string;
  backblazeKeyId?: string;
  backblazeAppKey?: string;
  backblazeBucket?: string;
  backblazeRegion?: string;
}
