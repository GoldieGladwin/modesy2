export interface AdBannerSlot {
  width: number;
  height: number;
  adCode: string;
  adUrl: string;
  imageName?: string;
  imageUrl?: string;
}

export interface AdSpaceConfig {
  id: string;
  name: string;
  desktop: AdBannerSlot;
  mobile: AdBannerSlot;
}

export interface GoogleAdsenseConfig {
  code: string;
}
