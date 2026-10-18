import { SPECIAL_OFFERS } from "./specialOffers";
import { NEW_ARRIVALS_PRODUCTS } from "@/components/home/NewArrivals";
import { CLOTHING_PRODUCTS } from "@/components/home/ClothingSection";
import { allProductsData, jewelryProductsData } from "./products";
import { CATEGORY_PRODUCTS } from "./categoryProducts";

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

  // 10. Light blue women shirt (ID: 25 - Clothing)
  25: {
    id: 25,
    slug: "light-blue-women-shirt-25",
    title: "Light blue women shirt",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    image: "/images/products/light-blue-shirt.webp",
    secondaryImage: "/images/products/light-blue-shirt-hover.webp",
    images: [
      "/images/products/light-blue-shirt.webp",
      "/images/products/light-blue-shirt-hover.webp",
    ],
    price: "$49",
    originalPrice: "$69",
    discountPercent: "-29%",
    status: "In Stock",
    baseSku: "SH-LB-025",
    sku: "SH-LB-025-M",
    category: "Shirts",
    subCategory: "Women's Clothing",
    rootCategory: "Clothing",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Clothing", href: "/category/clothing" },
      { label: "Women's Clothing", href: "/category/womens-clothing" },
      { label: "Shirts", href: "/category/womens-clothing" },
      { label: "Light blue women shirt", href: "#" },
    ],
    brand: "Mango",
    fabric: "100% Breathable Oxford Cotton",
    rating: 5,
    reviewsCount: 4,
    viewsCount: 215,
    commentsCount: 1,
    favoritesCount: 9,
    readyToShip: "Ready to ship in 2-3 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Light Blue", hex: "#7dd3fc" },
      { name: "Crisp White", hex: "#ffffff" },
    ],
    description:
      "Crisp light blue button-down shirt with a relaxed tailored silhouette. Easy to iron and supremely soft against the skin, ideal for both workday attire and casual weekend looks.",
    reviews: [
      {
        author: "Admin",
        avatar: "/images/avatars/admin-avatar.jpg",
        rating: 5,
        date: "3 weeks ago",
        text: "Beautiful shade of light blue, comfortable fit and great fabric quality.",
      },
    ],
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

  // 14. Handcrafted decorative pillow (ID: 42)
  42: {
    id: 42,
    slug: "handcrafted-decorative-pillow-42",
    title: "Handcrafted decorative pillow for a luxurious touch",
    seller: "Admin",
    sellerSlug: "admin",
    image: "/images/products/pillow.webp",
    secondaryImage: "/images/products/pillow-hover.webp",
    images: ["/images/products/pillow.webp", "/images/products/pillow-hover.webp"],
    price: "$59",
    originalPrice: "$69",
    discountPercent: "-14%",
    status: "In Stock",
    baseSku: "HDP-42-LUX",
    sku: "HDP-42-LUX-STD",
    category: "Decorative Pillows",
    subCategory: "Home Decor",
    rootCategory: "Home & Living",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Home & Living", href: "/category/home-living" },
      { label: "Decorative Pillows", href: "/category/decorative-pillows" },
      { label: "Handcrafted decorative pillow for a luxurious touch", href: "#" },
    ],
    brand: "IKEA",
    material: "Plush Velvet, Hypoallergenic Filling",
    rating: 5,
    reviewsCount: 8,
    viewsCount: 280,
    commentsCount: 2,
    favoritesCount: 8,
    readyToShip: "Ready to ship in 1-2 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    description:
      "Enhance your living space with this plush, artistically embroidered cushion designed for living room couches and master bedrooms. Made with soft premium textured fabrics.",
    reviews: [
      {
        author: "Trendshop",
        avatar: "/assets/img/trendshop-avatar.jpg",
        rating: 5,
        date: "1 month ago",
        text: "Very comfortable pillow with luxurious texture. Matches my sofa perfectly!",
      },
    ],
    comments: [],
  },

  // 15. Floral women sundress (ID: 38)
  38: {
    id: 38,
    slug: "floral-women-sundress-38",
    title: "Floral women sundress",
    seller: "Admin",
    sellerSlug: "admin",
    image: "/images/products/floral-sundress.webp",
    secondaryImage: "/images/products/floral-sundress-hover.webp",
    images: ["/images/products/floral-sundress.webp", "/images/products/floral-sundress-hover.webp"],
    price: "$80",
    originalPrice: "$89",
    discountPercent: "-10%",
    status: "In Stock",
    baseSku: "FWS-38-FLR",
    sku: "FWS-38-FLR-M",
    category: "Dresses",
    subCategory: "Women's Clothing",
    rootCategory: "Clothing",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Clothing", href: "/category/clothing" },
      { label: "Women's Clothing", href: "/category/womens-clothing" },
      { label: "Dresses", href: "/category/dresses" },
      { label: "Floral women sundress", href: "#" },
    ],
    brand: "Zara",
    fabric: "100% Breathable Rayon",
    rating: 4,
    reviewsCount: 3,
    viewsCount: 412,
    commentsCount: 1,
    favoritesCount: 15,
    readyToShip: "Ready to ship in 2-3 Business Days",
    location: "Paris, France",
    mapQuery: "Paris, France",
    sizes: ["S", "M", "L"],
    description:
      "Delight in sunny days with this effortless floral sundress made of breathable soft rayon. Perfect for seaside vacations, garden parties, or everyday summer strolls.",
    reviews: [],
    comments: [],
  },

  // 16. Women kipling bailey saddle handbag (ID: 1)
  1: {
    id: 1,
    slug: "women-kipling-bailey-saddle-handbag-1",
    title: "Women kipling bailey saddle handbag",
    seller: "Admin",
    sellerSlug: "admin",
    image: "/images/products/kipling-bag.webp",
    secondaryImage: "/images/products/kipling-bag-hover.webp",
    images: ["/images/products/kipling-bag.webp", "/images/products/kipling-bag-hover.webp"],
    price: "$59",
    originalPrice: "$69",
    discountPercent: "-14%",
    status: "In Stock",
    baseSku: "WT4283SHADB-Black",
    sku: "WT4283SHADB-Black",
    category: "Handbags",
    subCategory: "Bags & Purses",
    rootCategory: "Jewelry & Accessories",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Jewelry & Accessories", href: "/category/jewelry-accessories" },
      { label: "Bags & Purses", href: "/category/bags-purses" },
      { label: "Handbags", href: "/category/handbags" },
      { label: "Women kipling bailey saddle handbag", href: "#" },
    ],
    brand: "Gucci",
    material: "Lightweight Water-Resistant Nylon",
    rating: 4,
    reviewsCount: 2,
    viewsCount: 520,
    commentsCount: 3,
    favoritesCount: 22,
    readyToShip: "Ready to ship in 1-3 Business Days",
    location: "New York, United States",
    mapQuery: "New York, United States",
    description:
      "The Kipling Bailey Saddle Handbag for women combines chic style with functional design, perfect for daily use or casual outings. Crafted with lightweight durable fabric and multi-pocket convenience.",
    reviews: [],
    comments: [],
  },

  // 17. Cobalt man t-shirt all colors (ID: 70)
  70: {
    id: 70,
    slug: "cobalt-man-t-shirt-all-colors-70",
    title: "Cobalt man t-shirt all colors",
    seller: "Admin",
    sellerSlug: "admin",
    image: "/images/products/cobalt-man-tshirt.webp",
    secondaryImage: "/images/products/cobalt-man-tshirt-hover.webp",
    images: ["/images/products/cobalt-man-tshirt.webp", "/images/products/cobalt-man-tshirt-hover.webp"],
    price: "Request a Quote",
    isQuote: true,
    status: "In Stock",
    baseSku: "CMT-70-ALL",
    sku: "CMT-70-ALL-L",
    category: "T-Shirts",
    subCategory: "Men's Clothing",
    rootCategory: "Clothing",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Clothing", href: "/category/clothing" },
      { label: "Men's Clothing", href: "/category/mens-clothing" },
      { label: "T-Shirts", href: "/category/t-shirts" },
      { label: "Cobalt man t-shirt all colors", href: "#" },
    ],
    brand: "Nike",
    fabric: "100% Combed Cotton",
    rating: 4,
    reviewsCount: 1,
    viewsCount: 310,
    commentsCount: 0,
    favoritesCount: 5,
    readyToShip: "Ready to ship in 2-4 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Classic everyday regular-fit cobalt blue crewneck cotton t-shirt for men. Available for quotation and bulk custom printing with ultra-durable stitching.",
    reviews: [],
    comments: [],
  },

  // 18. Ship illustration royalty free image (ID: 36 - New Arrivals)
  36: {
    id: 36,
    slug: "ship-illustration-royalty-free-image-36",
    title: "Ship illustration royalty free image",
    seller: "Admin",
    sellerSlug: "admin",
    image: "/images/products/ship-art.webp",
    secondaryImage: "/images/products/cat-art.webp",
    images: ["/images/products/ship-art.webp", "/images/products/cat-art.webp"],
    price: "$15",
    originalPrice: "$20",
    discountPercent: "-25%",
    status: "In Stock",
    baseSku: "SSA-36-PST",
    sku: "SSA-36-PST",
    category: "Illustrations",
    subCategory: "Graphics",
    rootCategory: "Graphics & Photos",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Graphics & Photos", href: "/category/graphics-photos" },
      { label: "Illustrations", href: "/category/illustrations" },
      { label: "Ship illustration royalty free image", href: "#" },
    ],
    format: "JPG, PNG, PDF 300DPI",
    rating: 4,
    reviewsCount: 0,
    viewsCount: 145,
    commentsCount: 0,
    favoritesCount: 7,
    readyToShip: "Instant Digital Download",
    location: "London, United Kingdom",
    mapQuery: "London, United Kingdom",
    description:
      "High-resolution vintage digital illustration print of majestic sailing vessels navigating stormy seas. Suitable for physical framing or digital background use.",
    reviews: [],
    comments: [],
  },

  // 19. Modern grey couch and pillows (ID: 44 - New Arrivals)
  44: {
    id: 44,
    slug: "modern-grey-couch-and-pillows-44",
    title: "Modern grey couch and pillows",
    seller: "Admin",
    sellerSlug: "admin",
    image: "/images/products/grey-couch.webp",
    secondaryImage: "/images/products/pillow.webp",
    images: ["/images/products/grey-couch.webp", "/images/products/pillow.webp"],
    price: "$299",
    status: "In Stock",
    baseSku: "FN-GC-044",
    sku: "FN-GC-044",
    category: "Sofas & Couches",
    subCategory: "Living Room",
    rootCategory: "Home & Living",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Home & Living", href: "/category/home-living" },
      { label: "Living Room", href: "/category/living-room" },
      { label: "Modern grey couch and pillows", href: "#" },
    ],
    brand: "Ikea",
    material: "Textured Linen & Solid Wood Frame",
    rating: 5,
    reviewsCount: 4,
    viewsCount: 620,
    commentsCount: 1,
    favoritesCount: 11,
    readyToShip: "Ready to ship in 3-5 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    colors: [
      { name: "Slate Grey", hex: "#64748b" },
      { name: "Charcoal", hex: "#334155" },
    ],
    description:
      "Modern minimalist living room couch upholstered in high resilience stain-resistant linen with soft accent throw pillows.",
    reviews: [],
    comments: [],
  },

  // 20. Summer fashion top lace blouse (ID: 19)
  19: {
    id: 19,
    slug: "summer-fashion-top-lace-blouse-19",
    title: "Summer fashion top lace blouse",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    image: "/images/products/summer-top-lace.webp",
    secondaryImage: "/images/products/summer-top-lace-hover.webp",
    images: ["/images/products/summer-top-lace.webp", "/images/products/summer-top-lace-hover.webp"],
    price: "$65",
    originalPrice: "$79",
    discountPercent: "-17%",
    status: "In Stock",
    baseSku: "SFT-19-LCE",
    sku: "SFT-19-LCE-M",
    category: "Tops & Blouses",
    subCategory: "Women's Clothing",
    rootCategory: "Clothing",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Clothing", href: "/category/clothing" },
      { label: "Women's Clothing", href: "/category/womens-clothing" },
      { label: "Summer fashion top lace blouse", href: "#" },
    ],
    brand: "Zara",
    fabric: "Floral Lace & Silk Blend",
    rating: 5,
    reviewsCount: 6,
    viewsCount: 390,
    commentsCount: 0,
    favoritesCount: 18,
    readyToShip: "Ready to ship in 2-3 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    sizes: ["S", "M", "L"],
    description:
      "Delicate lace sleeveless summer blouse designed with intricate patterns and lightweight lining for comfort and style. Ideal for warm weather gatherings.",
    reviews: [],
    comments: [],
  },

  // 21. Black sneakers with white sole (ID: 107 - Special Offers Sepatu)
  107: {
    id: 107,
    slug: "black-sneakers-with-white-sole-107",
    title: "Black sneakers with white sole",
    seller: "Admin",
    sellerSlug: "admin",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80",
    ],
    price: "$69",
    originalPrice: "$89",
    discountPercent: "-22%",
    status: "In Stock",
    baseSku: "SN-BK-107",
    sku: "SN-BK-107-42",
    category: "Sneakers",
    subCategory: "Men's Shoes",
    rootCategory: "Shoes",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Shoes", href: "/products/shoes" },
      { label: "Men's Shoes", href: "/products/shoes" },
      { label: "Sneakers", href: "/products/shoes" },
      { label: "Black sneakers with white sole", href: "#" },
    ],
    brand: "Nike",
    material: "Breathable Mesh, Responsive Air Sole, Durable Rubber Tread",
    rating: 5,
    reviewsCount: 5,
    viewsCount: 310,
    commentsCount: 1,
    favoritesCount: 12,
    readyToShip: "Ready to ship in 1-2 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: [{ name: "Black / White", hex: "#18181b" }],
    description:
      "Lightweight lifestyle running sneakers engineered with responsive air cushioning, flexible breathable mesh uppers, and high-traction rubber outsoles. Designed for all-day comfort whether training or navigating city streets.",
    reviews: [
      {
        author: "Admin",
        avatar: "/images/avatars/admin-avatar.jpg",
        rating: 5,
        date: "3 weeks ago",
        text: "Extremely comfortable sneakers! The cushioning feels amazing and they fit true to size. High quality materials.",
      },
      {
        author: "Alex Miller",
        avatar: "/assets/img/trendshop-avatar.jpg",
        rating: 5,
        date: "1 month ago",
        text: "Sleek look and very lightweight. Perfect for everyday walking and casual wear.",
      },
    ],
    comments: [
      {
        name: "Marcus",
        date: "2 weeks ago",
        text: "Are these true to size or should I size up?",
      },
    ],
  },

  // 22. Gucci nylon fabric smart backpack (ID: 10 - Special Offers Tas Ransel)
  10: {
    id: 10,
    slug: "gucci-nylon-fabric-smart-backpack-10",
    title: "Gucci nylon fabric smart backpack",
    seller: "Admin",
    sellerSlug: "admin",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80",
    ],
    price: "$55",
    originalPrice: "$69",
    discountPercent: "-20%",
    status: "In Stock",
    baseSku: "GC-BP-010",
    sku: "GC-BP-010",
    category: "Backpacks",
    subCategory: "Bags & Purses",
    rootCategory: "Bags & Purses",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Bags & Purses", href: "/products/bags-purses" },
      { label: "Backpacks", href: "/products/bags-purses" },
      { label: "Gucci nylon fabric smart backpack", href: "#" },
    ],
    brand: "Gucci",
    material: "High-grade Technical Nylon, Leather Accents, Silver Hardware",
    rating: 5,
    reviewsCount: 3,
    viewsCount: 155,
    commentsCount: 0,
    favoritesCount: 8,
    readyToShip: "Ready to ship in 1-2 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    description:
      "Crafted from premium water-resistant technical nylon, this smart backpack blends contemporary Italian luxury with practical day-to-day functionality. Features padded laptop sleeves, multiple organizer compartments, and ergonomic breathable shoulder straps.",
    reviews: [
      {
        author: "Sophie Dupont",
        avatar: "/images/avatars/admin-avatar.jpg",
        rating: 5,
        date: "1 month ago",
        text: "Outstanding backpack. Lots of room for my 15-inch laptop and accessories while remaining sleek and stylish.",
      },
    ],
    comments: [],
  },

  // 23. Women lace blouse with different colors (ID: 31 - Special Offers Blouse)
  31: {
    id: 31,
    slug: "women-lace-blouse-with-different-colors-31",
    title: "Women lace blouse with different colors",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    image: "/images/products/women-lace-blouse.webp",
    secondaryImage: "/images/products/women-lace-blouse-hover.webp",
    images: [
      "/images/products/women-lace-blouse.webp",
      "/images/products/women-lace-blouse-hover.webp",
    ],
    price: "$69",
    originalPrice: "$79",
    discountPercent: "-12%",
    status: "In Stock",
    baseSku: "BL-LC-031",
    sku: "BL-LC-031-M",
    category: "Tops & Blouses",
    subCategory: "Women's Clothing",
    rootCategory: "Clothing",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Clothing", href: "/category/clothing" },
      { label: "Women's Clothing", href: "/category/womens-clothing" },
      { label: "Tops & Blouses", href: "/category/womens-clothing" },
      { label: "Women lace blouse with different colors", href: "#" },
    ],
    brand: "H&M",
    fabric: "Floral Lace, Cotton & Silk Lining",
    rating: 5,
    reviewsCount: 4,
    viewsCount: 280,
    commentsCount: 1,
    favoritesCount: 9,
    readyToShip: "Ready to ship in 2-3 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#18181b" },
      { name: "Blush Pink", hex: "#fbcfe8" },
    ],
    description:
      "A stunning feminine blouse featuring delicate floral lace embroidery, ruffled trim accents, and breathable soft cotton lining. Versatile enough for professional office attire or sophisticated evening dinners.",
    reviews: [
      {
        author: "Elena Rostova",
        avatar: "/assets/img/trendshop-avatar.jpg",
        rating: 5,
        date: "2 weeks ago",
        text: "The lace detail is exquisite! It fits perfectly and feels very delicate and well-constructed.",
      },
    ],
    comments: [
      {
        name: "Jessica",
        date: "3 weeks ago",
        text: "Does this require special dry cleaning or can it be washed on gentle cycle?",
      },
    ],
  },
  // 24. Women's ankle boot with different colors (ID: 46 - New Arrivals)
  46: {
    id: 46,
    slug: "womens-ankle-boot-with-different-colors-46",
    title: "Women's ankle boot with different colors",
    seller: "Admin",
    sellerSlug: "admin",
    image: "/images/products/grey-boots.webp",
    secondaryImage: "/images/products/grey-boots-hover.webp",
    images: [
      "/images/products/grey-boots.webp",
      "/images/products/grey-boots-hover.webp",
    ],
    price: "$59",
    originalPrice: "$69",
    discountPercent: "-14%",
    status: "In Stock",
    baseSku: "BT-GR-046",
    sku: "BT-GR-046-38",
    category: "Boots",
    subCategory: "Women's Shoes",
    rootCategory: "Shoes",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Shoes", href: "/products/shoes" },
      { label: "Women's Shoes", href: "/products/shoes" },
      { label: "Boots", href: "/products/shoes" },
      { label: "Women's ankle boot with different colors", href: "#" },
    ],
    brand: "Zara",
    material: "Suede Upper, Stacked Block Heel, Cushioned Footbed",
    rating: 5,
    reviewsCount: 3,
    viewsCount: 260,
    commentsCount: 0,
    favoritesCount: 10,
    readyToShip: "Ready to ship in 2-3 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: [
      { name: "Slate Grey", hex: "#64748b" },
      { name: "Classic Black", hex: "#1e293b" },
    ],
    description:
      "Chic grey ankle bootie featuring a stacked block heel, cushioned footbed, and convenient inner zip closure for day-to-night comfort and versatile styling.",
    reviews: [
      {
        author: "Admin",
        avatar: "/images/avatars/admin-avatar.jpg",
        rating: 5,
        date: "2 weeks ago",
        text: "Very stylish ankle boots. The suede finish looks premium and the heel height is very comfortable for all-day wear.",
      },
    ],
    comments: [],
  },

  // 25. Women kipling bailey saddle handbag (ID: 40 - New Arrivals)
  40: {
    id: 40,
    slug: "women-kipling-bailey-saddle-handbag-40",
    title: "Women kipling bailey saddle handbag",
    seller: "Admin",
    sellerSlug: "admin",
    image: "/images/products/kipling-bag.webp",
    secondaryImage: "/images/products/kipling-bag-hover.webp",
    images: [
      "/images/products/kipling-bag.webp",
      "/images/products/kipling-bag-hover.webp",
    ],
    price: "$59",
    originalPrice: "$69",
    discountPercent: "-14%",
    status: "In Stock",
    baseSku: "WT4283SHADB-40",
    sku: "WT4283SHADB-Black",
    category: "Bags & Purses",
    subCategory: "Handbags",
    rootCategory: "Jewelry & Accessories",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Jewelry & Accessories", href: "/products/jewelry-accessories" },
      { label: "Bags & Purses", href: "/products/bags-purses" },
      { label: "Women kipling bailey saddle handbag", href: "#" },
    ],
    brand: "Gucci",
    material: "Durable Lightweight Nylon & Leather Trim",
    rating: 5,
    reviewsCount: 3,
    viewsCount: 220,
    commentsCount: 0,
    favoritesCount: 16,
    readyToShip: "Ready to ship in 1-2 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    colors: [
      { name: "Black", hex: "#0f172a" },
      { name: "White", hex: "#f8fafc" },
      { name: "Coral", hex: "#e11d48" },
    ],
    description:
      "The Kipling Bailey Saddle Handbag for women combines chic style with functional design, perfect for daily use or casual outings. Crafted with lightweight durable fabric and multi-pocket convenience.",
    reviews: [],
    comments: [],
  },

  // 26. Women casual dress (ID: 28 - Clothing)
  28: {
    id: 28,
    slug: "women-casual-dress-28",
    title: "Women casual dress",
    seller: "Admin",
    sellerSlug: "admin",
    image: "/images/products/women-casual-dress.webp",
    images: ["/images/products/women-casual-dress.webp"],
    price: "$56",
    status: "In Stock",
    baseSku: "DR-CS-028",
    sku: "DR-CS-028-M",
    category: "Dresses",
    subCategory: "Women's Clothing",
    rootCategory: "Clothing",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Clothing", href: "/category/clothing" },
      { label: "Women's Clothing", href: "/category/womens-clothing" },
      { label: "Dresses", href: "/category/dresses" },
      { label: "Women casual dress", href: "#" },
    ],
    brand: "Zara",
    fabric: "Linen Cotton Blend",
    rating: 4,
    reviewsCount: 2,
    viewsCount: 175,
    commentsCount: 0,
    favoritesCount: 8,
    readyToShip: "Ready to ship in 2-3 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Emerald Green", hex: "#065f46" },
      { name: "Beige", hex: "#f5f5f4" },
    ],
    description:
      "Everyday relaxed casual dress tailored with breathable linen-cotton blend. Ideal for both office casual and weekend getaways.",
    reviews: [],
    comments: [],
  },

  // 27. Women red casual dress (ID: 22 - Clothing)
  22: {
    id: 22,
    slug: "women-red-casual-dress-22",
    title: "Women red casual dress",
    seller: "Admin",
    sellerSlug: "admin",
    image: "/images/products/women-red-dress.webp",
    images: ["/images/products/women-red-dress.webp"],
    price: "$99",
    status: "In Stock",
    baseSku: "DR-RD-022",
    sku: "DR-RD-022-M",
    category: "Dresses",
    subCategory: "Women's Clothing",
    rootCategory: "Clothing",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Clothing", href: "/category/clothing" },
      { label: "Women's Clothing", href: "/category/womens-clothing" },
      { label: "Dresses", href: "/category/dresses" },
      { label: "Women red casual dress", href: "#" },
    ],
    brand: "Hugo Boss",
    fabric: "100% Breathable Viscose Crepe",
    rating: 4,
    reviewsCount: 3,
    viewsCount: 190,
    commentsCount: 0,
    favoritesCount: 11,
    readyToShip: "Ready to ship in 2-3 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Crimson Red", hex: "#dc2626" },
      { name: "Wine Burgundy", hex: "#881337" },
    ],
    description:
      "Striking scarlet red casual dress designed with a flattering wrap tie and subtle V-neckline. Makes an effortless style statement.",
    reviews: [],
    comments: [],
  },

  // 28. Elegant white lace fabric (ID: 14 - Clothing)
  14: {
    id: 14,
    slug: "elegant-white-lace-fabric-14",
    title: "Elegant white lace fabric",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    image: "/images/products/elegant-white-lace.webp",
    images: ["/images/products/elegant-white-lace.webp"],
    price: "$59",
    originalPrice: "$69",
    discountPercent: "-14%",
    status: "In Stock",
    baseSku: "LC-WH-014",
    sku: "LC-WH-014",
    category: "Fabrics",
    subCategory: "Women's Clothing",
    rootCategory: "Clothing",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Clothing", href: "/category/clothing" },
      { label: "Women's Clothing", href: "/category/womens-clothing" },
      { label: "Fabrics", href: "/category/clothing" },
      { label: "Elegant white lace fabric", href: "#" },
    ],
    brand: "Armani",
    fabric: "Floral Cotton Lace",
    rating: 4,
    reviewsCount: 2,
    viewsCount: 165,
    commentsCount: 0,
    favoritesCount: 8,
    readyToShip: "Ready to ship in 2-3 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    colors: [{ name: "Pure White", hex: "#ffffff" }],
    description:
      "High grade floral white lace fabric suitable for dressmaking, festive couture, accents, and custom luxury tailoring.",
    reviews: [],
    comments: [],
  },

  // 29. Handmade cute handbag (ID: 3 - Jewelry & Accessories)
  3: {
    id: 3,
    slug: "handmade-cute-handbag-3",
    title: "Handmade cute handbag",
    seller: "Admin",
    sellerSlug: "admin",
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&auto=format&fit=crop&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop&q=80",
    ],
    price: "$30",
    originalPrice: "$46",
    discountPercent: "-35%",
    status: "In Stock",
    baseSku: "HM-HB-003",
    sku: "HM-HB-003",
    category: "Handbags",
    subCategory: "Bags & Purses",
    rootCategory: "Jewelry & Accessories",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Jewelry & Accessories", href: "/products/jewelry-accessories" },
      { label: "Bags & Purses", href: "/products/jewelry-accessories" },
      { label: "Handbags", href: "/products/jewelry-accessories" },
      { label: "Handmade cute handbag", href: "#" },
    ],
    brand: "Mango",
    material: "Woven Natural Straw & Vegan Leather Strap",
    rating: 4,
    reviewsCount: 1,
    viewsCount: 195,
    commentsCount: 0,
    favoritesCount: 6,
    readyToShip: "Ready to ship in 1-2 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    description:
      "Handcrafted round straw woven summer handbag with stylish shoulder strap and protective interior lining. Perfect for beach days, vacation outings, and sunny weekend brunches.",
    reviews: [],
    comments: [],
  },

  // 30. Modern blue handbag (ID: 6 - Jewelry & Accessories)
  6: {
    id: 6,
    slug: "modern-blue-handbag-6",
    title: "Modern blue handbag",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80",
    ],
    price: "$45",
    originalPrice: "$60",
    discountPercent: "-25%",
    status: "In Stock",
    baseSku: "HB-BL-006",
    sku: "HB-BL-006",
    category: "Handbags",
    subCategory: "Bags & Purses",
    rootCategory: "Jewelry & Accessories",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Jewelry & Accessories", href: "/products/jewelry-accessories" },
      { label: "Bags & Purses", href: "/products/jewelry-accessories" },
      { label: "Handbags", href: "/products/jewelry-accessories" },
      { label: "Modern blue handbag", href: "#" },
    ],
    brand: "Tommy Hilfiger",
    material: "Premium Vegan Leather, Gold Finished Hardware",
    rating: 4,
    reviewsCount: 3,
    viewsCount: 275,
    commentsCount: 0,
    favoritesCount: 11,
    readyToShip: "Ready to ship in 1-3 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    description:
      "Contemporary tote handbag with spacious interior compartments and premium vegan leather finish. Designed with dual reinforced grab handles and an optional adjustable shoulder strap.",
    reviews: [],
    comments: [],
  },

  // 31. Women black leather handbag (ID: 7 - Jewelry & Accessories)
  7: {
    id: 7,
    slug: "women-black-leather-handbag-7",
    title: "Women black leather handbag",
    seller: "Admin",
    sellerSlug: "admin",
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&auto=format&fit=crop&q=80",
    ],
    price: "$39",
    originalPrice: "$49",
    discountPercent: "-20%",
    status: "In Stock",
    baseSku: "HB-LK-007",
    sku: "HB-LK-007",
    category: "Handbags",
    subCategory: "Bags & Purses",
    rootCategory: "Jewelry & Accessories",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Jewelry & Accessories", href: "/products/jewelry-accessories" },
      { label: "Bags & Purses", href: "/products/jewelry-accessories" },
      { label: "Handbags", href: "/products/jewelry-accessories" },
      { label: "Women black leather handbag", href: "#" },
    ],
    brand: "Gucci",
    material: "Genuine Italian Textured Leather",
    rating: 4,
    reviewsCount: 2,
    viewsCount: 188,
    commentsCount: 0,
    favoritesCount: 9,
    readyToShip: "Ready to ship in 1-2 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    description:
      "Classic black leather handbag featuring gold metallic hardware, dual handles, and zippered top closure. Elegant, timeless, and effortlessly pairs with any formal or business casual outfit.",
    reviews: [],
    comments: [],
  },

  // 32. Black gold fashion backpack (ID: 8 - Jewelry & Accessories)
  8: {
    id: 8,
    slug: "black-gold-fashion-backpack-8",
    title: "Black gold fashion backpack",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    ],
    price: "Request a Quote",
    isQuote: true,
    status: "In Stock",
    baseSku: "BP-BG-008",
    sku: "BP-BG-008",
    category: "Backpacks",
    subCategory: "Bags & Purses",
    rootCategory: "Jewelry & Accessories",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Jewelry & Accessories", href: "/products/jewelry-accessories" },
      { label: "Bags & Purses", href: "/products/jewelry-accessories" },
      { label: "Backpacks", href: "/products/jewelry-accessories" },
      { label: "Black gold fashion backpack", href: "#" },
    ],
    brand: "Nike",
    material: "Waterproof Oxford Fabric, Polished Brass Accents",
    rating: 5,
    reviewsCount: 1,
    viewsCount: 164,
    commentsCount: 0,
    favoritesCount: 7,
    readyToShip: "Ready to ship in 2-3 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    description:
      "Modern backpack with gold accents, drawstrings, and multiple utility pockets. Designed for urban exploration, college, and weekend travels.",
    reviews: [],
    comments: [],
  },

  // 33. Black bag over the shoulder (ID: 9 - Jewelry & Accessories)
  9: {
    id: 9,
    slug: "black-bag-over-the-shoulder-9",
    title: "Black bag over the shoulder",
    seller: "Admin",
    sellerSlug: "admin",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&auto=format&fit=crop&q=80",
    ],
    price: "$49",
    originalPrice: "$69",
    discountPercent: "-29%",
    status: "In Stock",
    baseSku: "SB-BK-009",
    sku: "SB-BK-009",
    category: "Handbags",
    subCategory: "Bags & Purses",
    rootCategory: "Jewelry & Accessories",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Jewelry & Accessories", href: "/products/jewelry-accessories" },
      { label: "Bags & Purses", href: "/products/jewelry-accessories" },
      { label: "Handbags", href: "/products/jewelry-accessories" },
      { label: "Black bag over the shoulder", href: "#" },
    ],
    brand: "Puma",
    material: "Soft Grain Faux Leather",
    rating: 5,
    reviewsCount: 5,
    viewsCount: 312,
    commentsCount: 2,
    favoritesCount: 14,
    readyToShip: "Ready to ship in 1-2 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    description:
      "Versatile over-the-shoulder everyday bag with slouchy relaxed silhouette. Provides ample room for daily accessories, phone, cosmetics, and keys.",
    reviews: [],
    comments: [],
  },

  // 34. Bohemian Multicolor Handmade Bracelet Set (ID: 51 - Jewelry & Accessories)
  51: {
    id: 51,
    slug: "bohemian-multicolor-handmade-bracelet-set-51",
    title: "Bohemian Multicolor Handmade Bracelet Set",
    seller: "Trendshop",
    sellerSlug: "trendshop",
    image: "https://images.unsplash.com/photo-1611591475152-4735496181b3?w=800&auto=format&fit=crop&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1611591475152-4735496181b3?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80",
    ],
    price: "$49",
    originalPrice: "$69",
    discountPercent: "-29%",
    status: "In Stock",
    baseSku: "BR-BM-051",
    sku: "BR-BM-051",
    category: "Bracelets",
    subCategory: "Necklaces & Accessories",
    rootCategory: "Jewelry & Accessories",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Jewelry & Accessories", href: "/products/jewelry-accessories" },
      { label: "Necklaces & Accessories", href: "/products/jewelry-accessories" },
      { label: "Bracelets", href: "/products/jewelry-accessories" },
      { label: "Bohemian Multicolor Handmade Bracelet Set", href: "#" },
    ],
    brand: "Mango",
    material: "Natural Semiprecious Stones, Bohemian Beads & Gold Plated Charms",
    rating: 4,
    reviewsCount: 3,
    viewsCount: 298,
    commentsCount: 0,
    favoritesCount: 15,
    readyToShip: "Ready to ship in 1-2 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    description:
      "Vibrant bohemian layered beaded bracelets set handcrafted with natural stones and charms. Elastic stretch fit comfortably contours to most wrist sizes.",
    reviews: [],
    comments: [],
  },

  // 35. Vintage Golden Ring with Emerald Stone (ID: 12 - Jewelry & Accessories)
  12: {
    id: 12,
    slug: "vintage-golden-ring-with-emerald-stone-12",
    title: "Vintage Golden Ring with Emerald Stone",
    seller: "Admin",
    sellerSlug: "admin",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop&q=80",
    ],
    price: "$75",
    originalPrice: "$90",
    discountPercent: "-17%",
    status: "In Stock",
    baseSku: "RG-EM-012",
    sku: "RG-EM-012-7",
    category: "Rings",
    subCategory: "Jewelry",
    rootCategory: "Jewelry & Accessories",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Jewelry & Accessories", href: "/products/jewelry-accessories" },
      { label: "Rings", href: "/products/jewelry-accessories" },
      { label: "Vintage Golden Ring with Emerald Stone", href: "#" },
    ],
    brand: "Gucci",
    material: "18K Gold Plated Brass, Emerald Cut Created Green Stone",
    rating: 5,
    reviewsCount: 5,
    viewsCount: 340,
    commentsCount: 1,
    favoritesCount: 20,
    readyToShip: "Ready to ship in 1-2 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    sizes: ["6", "7", "8"],
    description:
      "Exquisite vintage 18k gold plated ring set with a vibrant deep emerald center stone and delicate art deco filigree engravings. A statement jewelry piece for celebrations and formal events.",
    reviews: [],
    comments: [],
  },
};

/**
 * Helper to dynamically convert any standard product object from SPECIAL_OFFERS,
 * allProductsData, or CATEGORY_PRODUCTS into a complete DetailedProduct for ProductDetailView.
 */
function buildDetailedProductFromGeneric(p: any): DetailedProduct {
  const images: string[] =
    Array.isArray(p.images) && p.images.length > 0
      ? p.images
      : p.secondaryImage
      ? [p.image, p.secondaryImage]
      : [p.image];

  const category = p.category || "General";
  const seller = p.seller || "Admin";
  const sellerSlug = seller.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const slug = p.slug || `${(p.title || "product").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${p.id}`;

  return {
    id: p.id,
    slug,
    title: p.title || "Product",
    seller,
    sellerSlug,
    image: p.image,
    secondaryImage: p.secondaryImage || images[1] || undefined,
    images,
    price: p.price || "$0",
    originalPrice: p.originalPrice || undefined,
    discountPercent: p.discountPercent || p.badge || undefined,
    status: p.status || "In Stock",
    baseSku: p.sku || `SKU-${p.id}`,
    sku: p.sku || `SKU-${p.id}`,
    category,
    subCategory: p.subCategory || category,
    rootCategory: p.rootCategory || category,
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: category, href: `/products` },
      { label: p.title || "Product", href: "#" },
    ],
    brand: p.brand || (seller === "Admin" ? "Modesy Brand" : seller),
    material: p.material || p.fabric || "Premium Quality Materials",
    rating: typeof p.rating === "number" ? p.rating : 5,
    reviewsCount: p.reviewsCount || 0,
    viewsCount: p.viewsCount || 150,
    commentsCount: p.commentsCount || 0,
    favoritesCount: p.favorites || p.wishlist || 0,
    readyToShip: "Ready to ship in 1-3 Business Days",
    location: "Berlin, Germany",
    mapQuery: "Berlin, Germany",
    sizes: p.sizes || undefined,
    colors: p.colors || undefined,
    description:
      p.description ||
      `${p.title}. Crafted with high quality materials and precision styling to deliver outstanding performance and aesthetic elegance.`,
    reviews: [],
    comments: [],
  };
}

export function getProductByIdOrSlug(idOrSlug: string | number): DetailedProduct {
  if (typeof idOrSlug === "number") {
    if (DETAILED_PRODUCTS[idOrSlug]) return DETAILED_PRODUCTS[idOrSlug];
  }

  const str = String(idOrSlug).trim();
  const numericId = parseInt(str, 10);
  if (!isNaN(numericId)) {
    if (DETAILED_PRODUCTS[numericId]) return DETAILED_PRODUCTS[numericId];
    // Legacy jewelry alias mapping
    if (numericId === 2 && DETAILED_PRODUCTS[17]) return DETAILED_PRODUCTS[17];
    if (numericId === 4 && DETAILED_PRODUCTS[47]) return DETAILED_PRODUCTS[47];
    if (numericId === 5 && DETAILED_PRODUCTS[43]) return DETAILED_PRODUCTS[43];
  }

  // Try extracting ID from end of slug (e.g. "black-sneakers-with-white-sole-107" -> 107)
  const match = str.match(/-(\d+)$/);
  if (match) {
    const extractedId = parseInt(match[1], 10);
    if (DETAILED_PRODUCTS[extractedId]) {
      return DETAILED_PRODUCTS[extractedId];
    }
    if (extractedId === 2 && DETAILED_PRODUCTS[17]) return DETAILED_PRODUCTS[17];
    if (extractedId === 4 && DETAILED_PRODUCTS[47]) return DETAILED_PRODUCTS[47];
    if (extractedId === 5 && DETAILED_PRODUCTS[43]) return DETAILED_PRODUCTS[43];
  }

  // Search in DETAILED_PRODUCTS by exact slug or exact title
  const foundInRegistry = Object.values(DETAILED_PRODUCTS).find(
    (p) =>
      p.slug.toLowerCase() === str.toLowerCase() ||
      p.title.toLowerCase() === str.toLowerCase()
  );
  if (foundInRegistry) return foundInRegistry;

  // Search in SPECIAL_OFFERS, NEW_ARRIVALS_PRODUCTS, CLOTHING_PRODUCTS, jewelryProductsData, allProductsData, and CATEGORY_PRODUCTS by ID
  const targetId = !isNaN(numericId) ? numericId : match ? parseInt(match[1], 10) : null;
  if (targetId !== null) {
    const fromSpecial = SPECIAL_OFFERS.find((s) => s.id === targetId);
    if (fromSpecial) {
      const built = buildDetailedProductFromGeneric(fromSpecial);
      DETAILED_PRODUCTS[targetId] = built;
      return built;
    }

    const fromNew = NEW_ARRIVALS_PRODUCTS.find((n) => n.id === targetId);
    if (fromNew) {
      const built = buildDetailedProductFromGeneric({
        ...fromNew,
        price: fromNew.price ? `$${fromNew.price}` : "Request a Quote",
        originalPrice: fromNew.oldPrice ? `$${fromNew.oldPrice}` : undefined,
      });
      DETAILED_PRODUCTS[targetId] = built;
      return built;
    }

    const fromClothing = CLOTHING_PRODUCTS.find((c) => c.id === targetId);
    if (fromClothing) {
      const built = buildDetailedProductFromGeneric({
        ...fromClothing,
        price: fromClothing.price ? `$${fromClothing.price}` : "Request a Quote",
        originalPrice: fromClothing.oldPrice ? `$${fromClothing.oldPrice}` : undefined,
      });
      DETAILED_PRODUCTS[targetId] = built;
      return built;
    }

    const fromJewelry = jewelryProductsData.find((j) => j.id === targetId);
    if (fromJewelry) {
      const built = buildDetailedProductFromGeneric(fromJewelry);
      DETAILED_PRODUCTS[targetId] = built;
      return built;
    }

    const fromAll = allProductsData.find((a) => a.id === targetId);
    if (fromAll) {
      const built = buildDetailedProductFromGeneric(fromAll);
      DETAILED_PRODUCTS[targetId] = built;
      return built;
    }

    const fromCat = CATEGORY_PRODUCTS.find((c) => c.id === targetId);
    if (fromCat) {
      const built = buildDetailedProductFromGeneric(fromCat);
      DETAILED_PRODUCTS[targetId] = built;
      return built;
    }
  }

  // Search by title or partial slug in other datasets
  const lowerStr = str.toLowerCase();
  const fromSpecialBySlug = SPECIAL_OFFERS.find(
    (s) =>
      lowerStr.includes(s.title.toLowerCase()) ||
      s.title.toLowerCase().includes(lowerStr)
  );
  if (fromSpecialBySlug) {
    const built = buildDetailedProductFromGeneric(fromSpecialBySlug);
    DETAILED_PRODUCTS[fromSpecialBySlug.id] = built;
    return built;
  }

  const fromNewBySlug = NEW_ARRIVALS_PRODUCTS.find(
    (n) =>
      lowerStr.includes(n.title.toLowerCase()) ||
      n.title.toLowerCase().includes(lowerStr)
  );
  if (fromNewBySlug) {
    const built = buildDetailedProductFromGeneric({
      ...fromNewBySlug,
      price: fromNewBySlug.price ? `$${fromNewBySlug.price}` : "Request a Quote",
      originalPrice: fromNewBySlug.oldPrice ? `$${fromNewBySlug.oldPrice}` : undefined,
    });
    DETAILED_PRODUCTS[fromNewBySlug.id] = built;
    return built;
  }

  const fromClothingBySlug = CLOTHING_PRODUCTS.find(
    (c) =>
      lowerStr.includes(c.title.toLowerCase()) ||
      c.title.toLowerCase().includes(lowerStr)
  );
  if (fromClothingBySlug) {
    const built = buildDetailedProductFromGeneric({
      ...fromClothingBySlug,
      price: fromClothingBySlug.price ? `$${fromClothingBySlug.price}` : "Request a Quote",
      originalPrice: fromClothingBySlug.oldPrice ? `$${fromClothingBySlug.oldPrice}` : undefined,
    });
    DETAILED_PRODUCTS[fromClothingBySlug.id] = built;
    return built;
  }

  const fromJewelryBySlug = jewelryProductsData.find(
    (j) =>
      lowerStr.includes(j.title.toLowerCase()) ||
      j.title.toLowerCase().includes(lowerStr)
  );
  if (fromJewelryBySlug) {
    const built = buildDetailedProductFromGeneric(fromJewelryBySlug);
    DETAILED_PRODUCTS[fromJewelryBySlug.id] = built;
    return built;
  }

  const fromAllBySlug = allProductsData.find(
    (a) =>
      lowerStr.includes(a.title.toLowerCase()) ||
      a.title.toLowerCase().includes(lowerStr)
  );
  if (fromAllBySlug) {
    const built = buildDetailedProductFromGeneric(fromAllBySlug);
    DETAILED_PRODUCTS[fromAllBySlug.id] = built;
    return built;
  }

  // Final fallback to 41 if absolutely no product can be found anywhere
  return DETAILED_PRODUCTS[41];
}
