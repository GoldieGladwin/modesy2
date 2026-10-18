export interface MarketplaceSettings {
  sku: boolean;
  productOptions: boolean;
  shipping: boolean;
  location: boolean;
}

export interface ClassifiedAdsSettings {
  priceEnabled: boolean;
  priceRequired: boolean;
  externalLink: boolean;
  location: boolean;
}

export interface PhysicalProductsSettings {
  demoUrl: boolean;
  videoPreview: boolean;
  audioPreview: boolean;
}

export interface DigitalProductsSettings {
  demoUrl: boolean;
  videoPreview: boolean;
  audioPreview: boolean;
  externalDownloadLink: boolean;
  allowedExtensions: string[];
}

export interface ProductSearchListingSettings {
  showFeaturedFirst: boolean;
  paginationCount: number;
}
