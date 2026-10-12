export interface ProductItem {
  id: number;
  title: string;
  sku?: string;
  image?: string;
  productType: "Physical" | "Digital";
  category: string;
  subcategory?: string;
  listingType?: string;
  purchasedPlan?: string; // e.g. "Monthly Plan (240 Days)" or undefined
  price: string;
  stock: string; // e.g. "In Stock (500)", "Active", "In Stock (1)"
  pageViews: number;
  date: string; // e.g. "2026-07-31 / 19:33"
  editedAgo?: string; // e.g. "Edited: 2 months ago"
  isFeatured?: boolean;
}

export interface ProductFilterState {
  listingType: string;
  productType: string;
  category: string;
  subcategory: string;
  stock: string;
  search: string;
}
