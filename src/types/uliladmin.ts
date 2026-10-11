export interface FeaturedCategoryItem {
  id: string;
  name: string;
  order: number;
}

export interface ProductByCategoryItem {
  id: string;
  name: string;
  order: number;
  showSubcategories?: boolean;
}

export interface ModesyBannerItem {
  id: number;
  imageUrl: string;
  url: string;
  language: string;
  order: number;
  width: string;
  location: string;
}

export interface ModesyHomepageSettings {
  featuredCategories: "Show" | "Hide";
  featuredProducts: "Show" | "Hide";
  latestProducts: "Show" | "Hide";
  blogSlider: "Show" | "Hide";
  productsPerRow: "5 Products" | "6 Products";
  featuredProductsCount: number;
  latestProductsCount: number;
}

export interface HomepageSection {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  order: number;
  itemCount?: number;
}

export interface HomepageBanner {
  id: number;
  title: string;
  location: string;
  url: string;
  imageUrl: string;
  order: number;
  enabled: boolean;
}

export interface HomepageSettings {
  featuredProductsCount: number;
  specialOffersCount: number;
  newArrivalsCount: number;
  blogPostsCount: number;
  showBrandSlider: boolean;
  showCategoryGrid: boolean;
  enableInfiniteScroll: boolean;
  selectedCategories: string[];
}
