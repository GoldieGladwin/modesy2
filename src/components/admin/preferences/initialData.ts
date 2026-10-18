import {
  SystemPreferences,
  ProductsPreferences,
  WalletPreferences,
  FileUploadPreferences,
  ShopPreferences,
  GeneralPreferences,
  AiContentGeneratorSettings,
  StorageSettings,
} from "./types";

export const DEFAULT_SYSTEM_PREFERENCES: SystemPreferences = {
  physicalProducts: true,
  digitalProducts: true,
  marketplace: true,
  classifiedAds: true,
  biddingSystem: true,
  sellingLicenseKeys: true,
  multiVendorSystem: true,
  timezone: "Europe/Amsterdam",
};

export const DEFAULT_PRODUCTS_PREFERENCES: ProductsPreferences = {
  approvalNewProducts: true,
  approvalEditedProducts: "disable",
  featuredProducts: true,
  vendorBulkUpload: true,
  showSoldProducts: true,
  linkStructure: "slug_id",
  reviews: true,
  productComments: true,
  blogComments: true,
  commentApproval: true,
};

export const DEFAULT_WALLET_PREFERENCES: WalletPreferences = {
  wallet: true,
  walletDeposit: true,
  payWithWallet: true,
  minDepositAmount: "10",
};

export const DEFAULT_FILE_UPLOAD_PREFERENCES: FileUploadPreferences = {
  imageFormat: "webp",
  productImageUpload: "required",
  productImageUploadLimit: "20",
  maxFileSizeImage: "10",
  maxFileSizeVideo: "30",
  maxFileSizeAudio: "10",
};

export const DEFAULT_SHOP_PREFERENCES: ShopPreferences = {
  refundSystem: true,
  showSalesOnProfile: true,
  allowChangeShopName: true,
  enableWhatsApp: true,
  showCustomerEmail: true,
  showCustomerPhone: true,
  autoApproveOrders: false,
  requestDocuments: true,
  inputExplanation: "ID Card",
};

export const DEFAULT_GENERAL_PREFERENCES: GeneralPreferences = {
  multilingual: true,
  maintenanceMode: false,
  rssFeeds: true,
  darkMode: false,
  emailVerification: true,
};

export const TIMEZONE_OPTIONS: string[] = [
  "Europe/Amsterdam",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "America/New_York",
  "America/Chicago",
  "America/Los_Angeles",
  "Asia/Jakarta",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Asia/Dubai",
  "UTC",
];

export const DEFAULT_AI_SETTINGS: AiContentGeneratorSettings = {
  statusEnabled: true,
  activeProvider: "google",
  apiKey: "***********************************",
  model: "Gemini 1.5 Flash Lite (Lowest Cost)",
};

export const AI_MODELS_GOOGLE: string[] = [
  "Gemini 1.5 Flash Lite (Lowest Cost)",
  "Gemini 1.5 Flash",
  "Gemini 1.5 Pro",
  "Gemini 2.0 Flash",
];

export const AI_MODELS_OPENAI: string[] = [
  "gpt-4o-mini",
  "gpt-4o",
  "gpt-4-turbo",
  "gpt-3.5-turbo",
];

export const DEFAULT_STORAGE_SETTINGS: StorageSettings = {
  activeStorage: "local",
  currentSettingsTab: "local",
  awsAccessKey: "",
  awsSecretKey: "",
  awsBucket: "",
  awsRegion: "us-east-1",
  cloudflareAccountId: "",
  cloudflareAccessKey: "",
  cloudflareSecretKey: "",
  cloudflareBucket: "",
  backblazeKeyId: "",
  backblazeAppKey: "",
  backblazeBucket: "",
  backblazeRegion: "us-west-004",
};
