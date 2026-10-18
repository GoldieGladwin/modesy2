export interface ProductItem {
  id: number;
  uuid?: string;
  title: string;
  sku?: string;
  image?: string;
  productType: "Physical" | "Digital";
  category: string;
  subcategory?: string;
  parentCategory?: string;
  listingType?: string;
  purchasedPlan?: string; // e.g. "Monthly Plan (240 Days)" or undefined
  price: string;
  stock: string; // e.g. "In Stock (500)", "Active", "In Stock"
  pageViews: number;
  date: string; // e.g. "2026-07-31 / 19:40"
  editedAgo?: string; // e.g. "Edited: 2 months ago"
  isFeatured?: boolean;
  discount?: string; // e.g. "-16%", "-11%"
}

export interface ProductFilterState {
  listingType: string;
  productType: string;
  category: string;
  subcategory: string;
  stock: string;
  search: string;
}
