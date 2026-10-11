export interface ProductCacheSettings {
  status: boolean;
  refreshOnDbChange: boolean;
  refreshTimeMinutes: number;
}

export interface StaticCacheSettings {
  staticContentCache: boolean;
  categoryCache: boolean;
}
