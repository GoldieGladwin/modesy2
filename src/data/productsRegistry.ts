export interface ProductReview {
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
}

export interface ProductComment {
  name: string;
  date: string;
  text: string;
}

export interface DetailedProduct {
  id: number;
  slug: string;
  title: string;
  seller: string;
  sellerSlug?: string;
  image: string;
  secondaryImage?: string;
  images: string[];
  price: string;
  originalPrice?: string;
  discountPercent?: string;
  isQuote?: boolean;
  status: string;
  sku: string;
  baseSku: string;
  category: string;
  subCategory: string;
  rootCategory: string;
  breadcrumb: { label: string; href: string }[];
  brand?: string;
  fabric?: string;
  material?: string;
  format?: string;
  rating: number;
  reviewsCount: number;
  viewsCount: number;
  commentsCount: number;
  favoritesCount: number;
  readyToShip: string;
  location: string;
  mapQuery: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  description: string;
  reviews: ProductReview[];
  comments: ProductComment[];
}

export const DETAILED_PRODUCTS: Record<number, DetailedProduct> = {
  // 1. Black midi skirt with white flowers (ID: 41)
  41: {
    id: 41,
    slug: "black-midi-skirt-with-white-flowers-41",
    title: "Black midi skirt with white flowers",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    image: "/images/products/midi-skirt.webp",
    images: ["/images/products/midi-skirt.webp"],
    price: "$48",
    originalPrice: "$55",
    discountPercent: "-11%",
    status: "In Stock",
    baseSku: "B1M2S3W4F5L6",
    sku: "B1M2S3W4F5L6-S",
    category: "Skirts",
    subCategory: "Women's Clothing",
    rootCategory: "Clothing",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Clothing", href: "/vendor/profile?p_cat=1" },
      { label: "Women's Clothing", href: "/vendor/profile?p_cat=9" },
      { label: "Skirts", href: "/vendor/profile?p_cat=43" },
      { label: "Black midi skirt with white flowers", href: "#" },
    ],
    brand: "Burberry",
    fabric: "Bamboo, Cotton",
    rating: 4,
    reviewsCount: 1,
    viewsCount: 327,
    commentsCount: 0,
    favoritesCount: 0,
    readyToShip: "Ready to ship in 2-3 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    sizes: ["S", "M", "L", "XL"],
    description:
      "Featuring a soft black fabric adorned with delicate white floral patterns, this skirt brings a touch of romance to any outfit. Its flattering midi length falls gracefully below the knee, making it perfect for both casual and semi-formal occasions. With a comfortable waistband and a flowy silhouette, it’s easy to pair with everything from a simple tee to a tailored blouse. Embrace effortless style with this versatile floral midi skirt that adds a hint of charm to every look.",
    reviews: [
      {
        author: "Admin",
        avatar: "/images/avatars/admin-avatar.jpg",
        rating: 4,
        date: "2 months ago",
        text: "This skirt is beautiful and the floral pattern is very charming. The material feels nice and it drapes well. I gave it 4 stars because the sizing runs a little small, but overall it’s a lovely addition to my wardrobe.",
      },
    ],
    comments: [],
  },

  // 2. Colorful women scarves (ID: 47)
  47: {
    id: 47,
    slug: "colorful-women-scarves-47",
    title: "Colorful women scarves",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    image: "/images/products/scarves.webp",
    secondaryImage: "/images/products/scarves-hover.webp",
    images: ["/images/products/scarves.webp", "/images/products/scarves-hover.webp"],
    price: "$40",
    originalPrice: "$45",
    discountPercent: "-11%",
    status: "In Stock",
    baseSku: "C1W2S3C4V5R6",
    sku: "C1W2S3C4V5R6",
    category: "Scarfs",
    subCategory: "Necklaces & Accessories",
    rootCategory: "Jewelry & Accessories",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Jewelry & Accessories", href: "/vendor/profile?p_cat=4" },
      { label: "Necklaces & Accessories", href: "/vendor/profile?p_cat=20" },
      { label: "Scarfs", href: "/vendor/profile?p_cat=87" },
      { label: "Colorful women scarves", href: "#" },
    ],
    brand: "U.S. Polo Assn",
    fabric: "Soft Cotton, Cashmere Blend",
    rating: 0,
    reviewsCount: 0,
    viewsCount: 184,
    commentsCount: 0,
    favoritesCount: 0,
    readyToShip: "Ready to ship in 2-3 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    description:
      "Made from soft, lightweight fabrics, these scarves are perfect for year-round wear, providing warmth in the cooler months and adding a fashionable layer in milder seasons. The rich mix of colors allows you to effortlessly accessorize and express your personal style.",
    reviews: [],
    comments: [],
  },

  // 3. Navy polka dot dress (ID: 45)
  45: {
    id: 45,
    slug: "navy-polka-dot-dress-45",
    title: "Navy polka dot dress",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    image: "/images/products/polka-dress.webp",
    secondaryImage: "/images/products/polka-dress-hover.webp",
    images: ["/images/products/polka-dress.webp", "/images/products/polka-dress-hover.webp"],
    price: "$130",
    originalPrice: "$150",
    discountPercent: "-13%",
    status: "In Stock",
    baseSku: "N1P2D3D4R5S6",
    sku: "N1P2D3D4R5S6-Black-S",
    category: "Dresses",
    subCategory: "Women's Clothing",
    rootCategory: "Clothing",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Clothing", href: "/vendor/profile?p_cat=1" },
      { label: "Women's Clothing", href: "/vendor/profile?p_cat=9" },
      { label: "Dresses", href: "/vendor/profile?p_cat=42" },
      { label: "Navy polka dot dress", href: "#" },
    ],
    brand: "Tommy Hilfiger",
    fabric: "100% Breathable Cotton",
    rating: 0,
    reviewsCount: 0,
    viewsCount: 215,
    commentsCount: 0,
    favoritesCount: 1,
    readyToShip: "Ready to ship in 2-3 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    colors: [
      { name: "Black", hex: "#111827" },
      { name: "White", hex: "#f8fafc" },
    ],
    sizes: ["S", "M", "L", "XL"],
    description:
      "Crafted from lightweight, breathable fabric, this dress features a classic navy backdrop adorned with playful white polka dots that add a fun, feminine flair. The tailored bodice flatters your silhouette while the gently flared skirt offers ease of movement and a touch of vintage charm.",
    reviews: [],
    comments: [],
  },

  // 4. Black fashion women backpack (ID: 43)
  43: {
    id: 43,
    slug: "black-fashion-women-backpack-43",
    title: "Black fashion women backpack",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    image: "/images/products/black-backpack.webp",
    secondaryImage: "/images/products/black-backpack-hover.webp",
    images: ["/images/products/black-backpack.webp", "/images/products/black-backpack-hover.webp"],
    price: "Request a Quote",
    isQuote: true,
    status: "In Stock",
    baseSku: "B1F2W3B4P5K6",
    sku: "B1F2W3B4P5K6",
    category: "Backpacks",
    subCategory: "Bags & Purses",
    rootCategory: "Jewelry & Accessories",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Jewelry & Accessories", href: "/vendor/profile?p_cat=4" },
      { label: "Bags & Purses", href: "/vendor/profile?p_cat=19" },
      { label: "Backpacks", href: "/vendor/profile?p_cat=67" },
      { label: "Black fashion women backpack", href: "#" },
    ],
    brand: "Mango",
    material: "Premium PU Leather",
    rating: 0,
    reviewsCount: 0,
    viewsCount: 156,
    commentsCount: 0,
    favoritesCount: 0,
    readyToShip: "Ready to ship in 2-3 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    description:
      "Crafted from high-quality materials, this sleek black backpack features a minimalist design with clean lines and elegant detailing, making it the perfect accessory for work, school, or travel. The spacious main compartment has plenty of room for all your daily essentials.",
    reviews: [],
    comments: [],
  },

  // 5. Animal colorful digital prints (ID: 39)
  39: {
    id: 39,
    slug: "animal-colorful-digital-prints-39",
    title: "Animal colorful digital prints",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    image: "/images/products/cat-art.webp",
    secondaryImage: "/images/products/cat-art-hover.webp",
    images: ["/images/products/cat-art.webp", "/images/products/cat-art-hover.webp"],
    price: "$29",
    originalPrice: "$39",
    discountPercent: "-25%",
    status: "In Stock",
    baseSku: "A1C2D3P4R5N6",
    sku: "A1C2D3P4R5N6",
    category: "Vectors",
    subCategory: "Graphics",
    rootCategory: "Graphics & Photos",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Graphics & Photos", href: "/vendor/profile?p_cat=6" },
      { label: "Graphics", href: "/vendor/profile?p_cat=28" },
      { label: "Vectors", href: "/vendor/profile?p_cat=89" },
      { label: "Animal colorful digital prints", href: "#" },
    ],
    brand: "Digital Prints",
    format: "Vector AI, EPS, SVG, High-Res PNG",
    rating: 5,
    reviewsCount: 2,
    viewsCount: 390,
    commentsCount: 0,
    favoritesCount: 0,
    readyToShip: "Instant Digital Download",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    description:
      "Each print captures the spirit and personality of animals, blending realistic details with imaginative hues for a unique and modern aesthetic. Perfect for decorating bedrooms, living rooms, nurseries, or creative workspaces, these artworks bring a vibrant pop of color and personality to any interior.",
    reviews: [
      {
        author: "Admin",
        avatar: "/images/avatars/admin-avatar.jpg",
        rating: 5,
        date: "12 days ago",
        text: "dfg",
      },
      {
        author: "Peter Jone",
        avatar: "/images/peter-jone-avatar.jpg",
        rating: 5,
        date: "1 month ago",
        text: "Test 1",
      },
    ],
    comments: [],
  },

  // 6. Seychelles women's brown ankle bootie (ID: 37)
  37: {
    id: 37,
    slug: "seychelles-womens-brown-ankle-bootie-37",
    title: "Seychelles women's brown ankle bootie",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    image: "/images/products/brown-bootie.webp",
    secondaryImage: "/images/products/brown-bootie-hover.webp",
    images: ["/images/products/brown-bootie.webp", "/images/products/brown-bootie-hover.webp"],
    price: "$79",
    status: "In Stock",
    baseSku: "S1W2B3A4B5T6",
    sku: "S1W2B3A4B5T6",
    category: "Boots",
    subCategory: "Women's Shoes",
    rootCategory: "Shoes",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Shoes", href: "/vendor/profile?p_cat=2" },
      { label: "Women's Shoes", href: "/vendor/profile?p_cat=12" },
      { label: "Boots", href: "/vendor/profile?p_cat=52" },
      { label: "Seychelles women's brown ankle bootie", href: "#" },
    ],
    brand: "Diesel",
    material: "Genuine Suede & Leather",
    rating: 0,
    reviewsCount: 0,
    viewsCount: 142,
    commentsCount: 0,
    favoritesCount: 0,
    readyToShip: "Ready to ship in 2-3 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    sizes: ["36", "37", "38", "39", "40"],
    description:
      "With a comfortable, cushioned insole and a durable sole, it’s designed for all-day wear without sacrificing elegance. The rich brown hue complements a wide range of colors, making it an ideal choice for fall and winter fashion. Pair it with skinny jeans, skirts, or cozy sweaters for an effortlessly stylish ensemble.",
    reviews: [],
    comments: [],
  },

  // 7. Men outerwear navy color (ID: 35)
  35: {
    id: 35,
    slug: "men-outerwear-navy-color-35",
    title: "Men outerwear navy color",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    image: "/images/products/men-outerwear.webp",
    images: ["/images/products/men-outerwear.webp"],
    price: "$89",
    originalPrice: "$99",
    discountPercent: "-10%",
    status: "In Stock",
    baseSku: "M1O2N3C4L5R6",
    sku: "M1O2N3C4L5R6-M",
    category: "Jackets & Coats",
    subCategory: "Men's Clothing",
    rootCategory: "Clothing",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Clothing", href: "/vendor/profile?p_cat=1" },
      { label: "Men's Clothing", href: "/vendor/profile?p_cat=10" },
      { label: "Jackets & Coats", href: "/vendor/profile?p_cat=46" },
      { label: "Men outerwear navy color", href: "#" },
    ],
    brand: "Armani",
    material: "Durable Weatherproof Nylon & Fleece",
    rating: 0,
    reviewsCount: 0,
    viewsCount: 198,
    commentsCount: 0,
    favoritesCount: 0,
    readyToShip: "Ready to ship in 2-3 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    sizes: ["S", "M", "L", "XL"],
    description:
      "The deep navy hue adds a classic touch, making it easy to pair with both casual and formal attire. Featuring a sleek front zipper, adjustable cuffs, and functional pockets, it offers both convenience and a snug fit. Designed to withstand chilly winds and light moisture, this outerwear keeps you warm without adding bulk.",
    reviews: [],
    comments: [],
  },

  // 8. Light blue women shirt (ID: 15)
  15: {
    id: 15,
    slug: "light-blue-women-shirt-15",
    title: "Light blue women shirt",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    image: "/images/products/light-blue-shirt.webp",
    secondaryImage: "/images/products/light-blue-shirt-hover.webp",
    images: ["/images/products/light-blue-shirt.webp", "/images/products/light-blue-shirt-hover.webp"],
    price: "$49",
    originalPrice: "$80",
    discountPercent: "-39%",
    status: "In Stock",
    baseSku: "L1B2W3S4H5R6",
    sku: "L1B2W3S4H5R6-S",
    category: "Sweaters",
    subCategory: "Women's Clothing",
    rootCategory: "Clothing",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Clothing", href: "/vendor/profile?p_cat=1" },
      { label: "Women's Clothing", href: "/vendor/profile?p_cat=9" },
      { label: "Sweaters", href: "/vendor/profile?p_cat=45" },
      { label: "Light blue women shirt", href: "#" },
    ],
    brand: "Gucci",
    fabric: "Cotton & Silk Blend",
    rating: 5,
    reviewsCount: 1,
    viewsCount: 245,
    commentsCount: 0,
    favoritesCount: 0,
    readyToShip: "Ready to ship in 2-3 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    sizes: ["S", "M", "L"],
    description:
      "Tailored from light, breathable fabric, this shirt features a delicate light blue tone that effortlessly complements any wardrobe.",
    reviews: [],
    comments: [],
  },

  // 9. Summer fashion top lace (ID: 13)
  13: {
    id: 13,
    slug: "summer-fashion-top-lace-13",
    title: "Summer fashion top lace",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    image: "/images/products/summer-top-lace.webp",
    secondaryImage: "/images/products/summer-top-lace-hover.webp",
    images: ["/images/products/summer-top-lace.webp", "/images/products/summer-top-lace-hover.webp"],
    price: "$65",
    originalPrice: "$70",
    discountPercent: "-7%",
    status: "In Stock",
    baseSku: "S1F2T3L4C5E6",
    sku: "S1F2T3L4C5E6-S",
    category: "Dresses",
    subCategory: "Women's Clothing",
    rootCategory: "Clothing",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Clothing", href: "/vendor/profile?p_cat=1" },
      { label: "Women's Clothing", href: "/vendor/profile?p_cat=9" },
      { label: "Dresses", href: "/vendor/profile?p_cat=42" },
      { label: "Summer fashion top lace", href: "#" },
    ],
    brand: "Zara",
    fabric: "Lace, Chiffon",
    rating: 5,
    reviewsCount: 1,
    viewsCount: 189,
    commentsCount: 0,
    favoritesCount: 1,
    readyToShip: "Ready to ship in 2-3 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    sizes: ["S", "M", "L"],
    description:
      "Delicate summer lace top featuring romantic floral crochet embroidery and breathable silhouette.",
    reviews: [],
    comments: [],
  },

  // 10. Women lace blouse with different colors (ID: 25)
  25: {
    id: 25,
    slug: "women-lace-blouse-with-different-colors-25",
    title: "Women lace blouse with different colors",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    image: "/images/products/women-lace-blouse.webp",
    secondaryImage: "/images/products/women-lace-blouse-hover.webp",
    images: ["/images/products/women-lace-blouse.webp", "/images/products/women-lace-blouse-hover.webp"],
    price: "$59",
    originalPrice: "$70",
    discountPercent: "-16%",
    status: "In Stock",
    baseSku: "W1L2B3C4O5L6",
    sku: "W1L2B3C4O5L6-M",
    category: "Dresses",
    subCategory: "Women's Clothing",
    rootCategory: "Clothing",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Clothing", href: "/vendor/profile?p_cat=1" },
      { label: "Women's Clothing", href: "/vendor/profile?p_cat=9" },
      { label: "Dresses", href: "/vendor/profile?p_cat=42" },
      { label: "Women lace blouse with different colors", href: "#" },
    ],
    brand: "H&M",
    fabric: "Lace, Cotton",
    rating: 0,
    reviewsCount: 0,
    viewsCount: 120,
    commentsCount: 0,
    favoritesCount: 1,
    readyToShip: "Ready to ship in 2-3 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    sizes: ["S", "M", "L"],
    description:
      "Chic and versatile lace blouse designed for both smart office wear and evening outings.",
    reviews: [],
    comments: [],
  },

  // 11. Sneaker shoes men (ID: 30)
  30: {
    id: 30,
    slug: "sneaker-shoes-men-30",
    title: "Sneaker shoes men",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    image: "/images/products/shoes-streetwear.jpg",
    images: ["/images/products/shoes-streetwear.jpg"],
    price: "$89",
    originalPrice: "$100",
    discountPercent: "-11%",
    status: "In Stock",
    baseSku: "S1N2K3M4E5N6",
    sku: "S1N2K3M4E5N6-42",
    category: "Sneakers",
    subCategory: "Men's Shoes",
    rootCategory: "Shoes",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Shoes", href: "/vendor/profile?p_cat=2" },
      { label: "Men's Shoes", href: "/vendor/profile?p_cat=13" },
      { label: "Sneakers", href: "/vendor/profile?p_cat=54" },
      { label: "Sneaker shoes men", href: "#" },
    ],
    brand: "Nike",
    material: "Breathable Mesh, Rubber Sole",
    rating: 0,
    reviewsCount: 0,
    viewsCount: 210,
    commentsCount: 0,
    favoritesCount: 0,
    readyToShip: "Ready to ship in 2-3 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    sizes: ["40", "41", "42", "43", "44"],
    description:
      "High-performance urban men sneakers offering ergonomic cushioning and superior traction.",
    reviews: [],
    comments: [],
  },

  // 12. Sun hat for women protection cap (ID: 17)
  17: {
    id: 17,
    slug: "sun-hat-for-women-protection-cap-17",
    title: "Sun hat for women protection cap",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    image: "/images/products/black-cap.jpg",
    images: ["/images/products/black-cap.jpg"],
    price: "$29",
    status: "In Stock",
    baseSku: "S1H2F3W4P5C6",
    sku: "S1H2F3W4P5C6",
    category: "Sun Hats",
    subCategory: "Necklaces & Accessories",
    rootCategory: "Jewelry & Accessories",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Jewelry & Accessories", href: "/vendor/profile?p_cat=4" },
      { label: "Necklaces & Accessories", href: "/vendor/profile?p_cat=20" },
      { label: "Sun Hats", href: "/vendor/profile?p_cat=70" },
      { label: "Sun hat for women protection cap", href: "#" },
    ],
    brand: "H&M",
    material: "Straw, UPF 50+ UV Fabric",
    rating: 0,
    reviewsCount: 0,
    viewsCount: 98,
    commentsCount: 0,
    favoritesCount: 0,
    readyToShip: "Ready to ship in 2-3 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    description:
      "Wide brim UV protective sun hat with stylish ribbon band.",
    reviews: [],
    comments: [],
  },

  // 13. Blanket comfort couch pillow (ID: 11)
  11: {
    id: 11,
    slug: "blanket-comfort-couch-pillow-11",
    title: "Blanket comfort couch pillow",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    image: "/images/products/pillow.webp",
    secondaryImage: "/images/products/pillow-hover.webp",
    images: ["/images/products/pillow.webp", "/images/products/pillow-hover.webp"],
    price: "$28",
    originalPrice: "$35",
    discountPercent: "-20%",
    status: "In Stock",
    baseSku: "B1K2C3P4L5W6",
    sku: "B1K2C3P4L5W6",
    category: "Decorative Pillows",
    subCategory: "Home Decor",
    rootCategory: "Home & Living",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Home & Living", href: "/vendor/profile?p_cat=3" },
      { label: "Home Decor", href: "/vendor/profile?p_cat=15" },
      { label: "Decorative Pillows", href: "/vendor/profile?p_cat=61" },
      { label: "Blanket comfort couch pillow", href: "#" },
    ],
    brand: "IKEA",
    material: "Plush Velvet, Hypoallergenic Microfiber",
    rating: 0,
    reviewsCount: 0,
    viewsCount: 112,
    commentsCount: 0,
    favoritesCount: 0,
    readyToShip: "Ready to ship in 2-3 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    description:
      "Ultra-soft decorative couch pillow with removable washable velvet cover.",
    reviews: [],
    comments: [],
  },
};

export function getProductByIdOrSlug(idOrSlug: string | number): DetailedProduct {
  if (typeof idOrSlug === "number") {
    return DETAILED_PRODUCTS[idOrSlug] || DETAILED_PRODUCTS[41];
  }

  const numericId = parseInt(idOrSlug, 10);
  if (!isNaN(numericId) && DETAILED_PRODUCTS[numericId]) {
    return DETAILED_PRODUCTS[numericId];
  }

  // Try extracting ID from end of slug (e.g. "colorful-women-scarves-47" -> 47)
  const match = idOrSlug.match(/-(\d+)$/);
  if (match) {
    const extractedId = parseInt(match[1], 10);
    if (DETAILED_PRODUCTS[extractedId]) {
      return DETAILED_PRODUCTS[extractedId];
    }
  }

  // Search by exact slug
  const found = Object.values(DETAILED_PRODUCTS).find(
    (p) => p.slug.toLowerCase() === idOrSlug.toLowerCase()
  );
  if (found) return found;

  return DETAILED_PRODUCTS[41];
}
