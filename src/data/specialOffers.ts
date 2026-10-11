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
    "id": 1,
    "title": "Animal colorful digital prints",
    "badge": "-25%",
    "image": "/uploads/products/img_w480_68b47e4f83c917-29188591.webp",
    "seller": "Trendshop",
    "rating": 5,
    "wishlist": 0,
    "price": "$29",
    "originalPrice": "$39"
  },
  {
    "id": 2,
    "title": "Summer fashion top lace",
    "badge": "-17%",
    "image": "/uploads/products/img_w480_68b4201f177942-79779282.webp",
    "seller": "Trendshop",
    "rating": 5,
    "wishlist": 1,
    "price": "$65",
    "originalPrice": "$79"
  },
  {
    "id": 3,
    "title": "Women lace blouse with different colors",
    "badge": "-12%",
    "image": "/uploads/products/img_w480_68b444b8350808-17188737.webp",
    "seller": "Trendshop",
    "rating": 0,
    "wishlist": 1,
    "price": "$69",
    "originalPrice": "$79"
  },
  {
    "id": 4,
    "title": "Floral women sundress",
    "badge": "-10%",
    "image": "/uploads/products/img_w480_68b4782b9f3272-81456431.webp",
    "seller": "Admin",
    "rating": 4,
    "wishlist": 0,
    "price": "$80",
    "originalPrice": "$89"
  },
  {
    "id": 5,
    "title": "Gucci nylon fabric smart backpack",
    "badge": "-20%",
    "image": "/uploads/products/img_w480_68b411ed6f0554-72302953.webp",
    "seller": "Admin",
    "rating": 0,
    "wishlist": 0,
    "price": "$55",
    "originalPrice": "$69"
  },
  {
    "id": 6,
    "title": "Black sneakers with white sole",
    "badge": "-22%",
    "image": "/uploads/products/img_w480_68b42a279b91f6-61790023.webp",
    "seller": "Admin",
    "rating": 0,
    "wishlist": 0,
    "price": "$69",
    "originalPrice": "$89"
  },
  {
    "id": 7,
    "title": "Women kipling bailey saddle handbag",
    "badge": "-14%",
    "image": "/uploads/products/img_w480_68b47ead253a50-47019432.webp",
    "seller": "Admin",
    "rating": 0,
    "wishlist": 0,
    "price": "$59",
    "originalPrice": "$69"
  },
  {
    "id": 8,
    "title": "Handcrafted decorative pillow for a luxurious touch",
    "badge": "-14%",
    "image": "/uploads/products/img_w480_68b483286b2598-48004230.webp",
    "seller": "Admin",
    "rating": 0,
    "wishlist": 0,
    "price": "$59",
    "originalPrice": "$69"
  }
];

export const PROMO_BANNERS: PromoBanner[] = [
  {
    "id": 1,
    "image": "/uploads/banners/block_68b02a364b90c6-71529931.webp",
    "alt": "Summer promotion banner"
  },
  {
    "id": 2,
    "image": "/uploads/banners/block_68b02a59a1d144-08234125.webp",
    "alt": "Autumn sale banner"
  }
];
