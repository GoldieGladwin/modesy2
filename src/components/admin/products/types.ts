export type ProductType = "Physical" | "Digital";

export interface ProductItem {
  id: number;
  title: string;
  sku: string;
  image: string;
  productType: ProductType;
  category: string;
  subcategory?: string;
  user: string;
  price: string;
  stock: string;
  pageViews: number;
  updated: string;
  date: string;
  isFeatured?: boolean;
  isSpecialOffer?: boolean;
  discountRate?: number;
  purchasedPlan?: string;
  remainingDays?: number;
  status?: "Pending" | "Active" | "Hidden" | "Expired";
}

export interface ProductFilterState {
  pageSize: number;
  listingType: string;
  productType: string;
  category: string;
  subcategory: string;
  stock: string;
  search: string;
}

export type ProductPageViewType =
  | "featured"
  | "special-offers"
  | "pending"
  | "hidden"
  | "expired"
  | "sold"
  | "drafts"
  | "deleted"
  | "all";
