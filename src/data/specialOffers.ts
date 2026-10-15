export interface SpecialOfferProduct {
  id: number;
  title: string;
  badge: string;
  image: string;
  seller: string;
  rating: number;
  wishlist: number;
  price: string;
  originalPrice: string;
}

export interface PromoBanner {
  id: number;
  image: string;
  alt: string;
}

export const SPECIAL_OFFERS: SpecialOfferProduct[] = [
  {
    id: 39,
    title: "Animal colorful digital prints",
    badge: "-25%",
    image: "/images/products/cat-art.webp",
    seller: "Trendshop",
    rating: 5,
    wishlist: 0,
    price: "$29",
    originalPrice: "$39",
  },
  {
    id: 19,
    title: "Summer fashion top lace",
    badge: "-17%",
    image: "/images/products/summer-top-lace.webp",
    seller: "Trendshop",
    rating: 5,
    wishlist: 1,
    price: "$65",
    originalPrice: "$79",
  },
  {
    id: 31,
    title: "Women lace blouse with different colors",
    badge: "-12%",
    image: "/images/products/women-lace-blouse.webp",
    seller: "Trendshop",
    rating: 0,
    wishlist: 1,
    price: "$69",
    originalPrice: "$79",
  },
  {
    id: 38,
    title: "Floral women sundress",
    badge: "-10%",
    image: "/images/products/floral-sundress.webp",
    seller: "Admin",
    rating: 4,
    wishlist: 0,
    price: "$80",
    originalPrice: "$89",
  },
  {
    id: 10,
    title: "Gucci nylon fabric smart backpack",
    badge: "-20%",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80",
    seller: "Admin",
    rating: 0,
    wishlist: 0,
    price: "$55",
    originalPrice: "$69",
  },
  {
    id: 107,
    title: "Black sneakers with white sole",
    badge: "-22%",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    seller: "Admin",
    rating: 0,
    wishlist: 0,
    price: "$69",
    originalPrice: "$89",
  },
  {
    id: 1,
    title: "Women kipling bailey saddle handbag",
    badge: "-14%",
    image: "/images/products/kipling-bag.webp",
    seller: "Admin",
    rating: 0,
    wishlist: 0,
    price: "$59",
    originalPrice: "$69",
  },
  {
    id: 42,
    title: "Handcrafted decorative pillow for a luxurious touch",
    badge: "-14%",
    image: "/images/products/pillow.webp",
    seller: "Admin",
    rating: 0,
    wishlist: 0,
    price: "$59",
    originalPrice: "$69",
  },
];

export const PROMO_BANNERS: PromoBanner[] = [
  {
    id: 1,
    image: "/uploads/banners/block_68b02a364b90c6-71529931.webp",
    alt: "Summer promotion banner",
  },
  {
    id: 2,
    image: "/uploads/banners/block_68b02a59a1d144-08234125.webp",
    alt: "Autumn sale banner",
  },
];
