export interface DbProfile {
  id: string;
  email: string;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  role: "admin" | "vendor" | "member" | "moderator";
  avatar_url: string | null;
  cover_url: string | null;
  wallet_balance: number;
  is_vendor: boolean;
  is_active: boolean;
  about_me: string | null;
  created_at: string;
}

export interface DbCategory {
  id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  order_index: number;
  is_featured: boolean;
  show_on_homepage: boolean;
  show_products_on_index: boolean;
  created_at?: string;
}

export interface DbProductImage {
  id?: string;
  product_id?: string;
  image_url: string;
  is_primary: boolean;
  order_index: number;
}

export interface DbProduct {
  id: string;
  vendor_id: string;
  category_id: string | null;
  brand_id: string | null;
  title: string;
  slug: string;
  sku: string | null;
  short_description: string | null;
  description: string | null;
  product_type: "physical" | "digital" | "service";
  listing_type: "sell_on_site" | "ordinary_listing" | "bidding";
  price: number;
  discount_rate: number;
  stock: number;
  is_featured: boolean;
  is_promoted: boolean;
  is_special_offer: boolean;
  views_count: number;
  rating_avg: number;
  review_count: number;
  external_link: string | null;
  status: "active" | "pending_approval" | "draft" | "hidden" | "sold" | "deleted";
  created_at: string;
  updated_at: string;
  // Joined fields
  product_images?: DbProductImage[];
  categories?: { name: string; slug: string } | null;
  profiles?: { username: string; first_name: string; last_name: string; email: string } | null;
}

export interface DbSlider {
  id: string;
  title: string | null;
  link_url: string | null;
  image_url: string;
  order_index: number;
  is_active: boolean;
  created_at?: string;
}

export interface DbCoupon {
  id: string;
  code: string;
  vendor_id: string | null;
  discount_type: "percentage" | "fixed_amount";
  discount_value: number;
  min_spend: number;
  usage_limit: number | null;
  used_count: number;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
  created_at?: string;
}
