"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Star,
  ShoppingCart,
  Phone,
  Mail,
  Rss,
  Heart,
  Search,
  ChevronUp,
  BadgeCheck,
} from "lucide-react";
import VendorHeader from "@/components/layout/vendor/VendorHeader";
import ModesyFooter from "@/components/layout/guest/ModesyFooter";

export type ProfileTabType =
  | "products"
  | "followers"
  | "following"
  | "reviews"
  | "my_reviews"
  | "policies";

interface ProfileProduct {
  id: number;
  title: string;
  category: string;
  categoryId: number;
  subcategoryId?: number;
  childCategoryId?: number;
  price: number;
  originalPrice?: number;
  rating: number;
  likes: number;
  image: string;
  hoverImage?: string;
  isFeatured?: boolean;
  isQuote?: boolean;
}

const PRODUCTS_DATA: ProfileProduct[] = [
  // 1. Black midi skirt with white flowers (Clothing -> Women's Clothing -> Skirts)
  {
    id: 41,
    title: "Black midi skirt with white flowers",
    category: "Clothing",
    categoryId: 1,
    subcategoryId: 9,
    childCategoryId: 43,
    price: 48,
    originalPrice: 55,
    rating: 1,
    likes: 0,
    isFeatured: true,
    image: "/images/products/midi-skirt.webp",
  },
  // 2. Light blue women shirt (Clothing -> Women's Clothing -> Sweaters/Shirts)
  {
    id: 15,
    title: "Light blue women shirt",
    category: "Clothing",
    categoryId: 1,
    subcategoryId: 9,
    childCategoryId: 45,
    price: 49,
    originalPrice: 80,
    rating: 5,
    likes: 0,
    isFeatured: true,
    image: "/images/products/light-blue-shirt.webp",
    hoverImage: "/images/products/light-blue-shirt-hover.webp",
  },
  // 3. Summer fashion top lace (Clothing -> Women's Clothing -> Dresses)
  {
    id: 13,
    title: "Summer fashion top lace",
    category: "Clothing",
    categoryId: 1,
    subcategoryId: 9,
    childCategoryId: 42,
    price: 65,
    originalPrice: 70,
    rating: 5,
    likes: 1,
    isFeatured: true,
    image: "/images/products/summer-top-lace.webp",
    hoverImage: "/images/products/summer-top-lace-hover.webp",
  },
  // 4. Navy polka dot dress (Clothing -> Women's Clothing -> Dresses)
  {
    id: 45,
    title: "Navy polka dot dress",
    category: "Clothing",
    categoryId: 1,
    subcategoryId: 9,
    childCategoryId: 42,
    price: 120,
    originalPrice: 130,
    rating: 0,
    likes: 1,
    image: "/images/products/polka-dress.webp",
    hoverImage: "/images/products/polka-dress-hover.webp",
  },
  // 5. Men outerwear navy color (Clothing -> Men's Clothing -> Jackets & Coats)
  {
    id: 35,
    title: "Men outerwear navy color",
    category: "Clothing",
    categoryId: 1,
    subcategoryId: 10,
    childCategoryId: 46,
    price: 59,
    originalPrice: 69,
    rating: 0,
    likes: 0,
    image: "/images/products/men-outerwear.webp",
  },
  // 6. Women lace blouse with different colors (Clothing -> Women's Clothing)
  {
    id: 25,
    title: "Women lace blouse with different colors",
    category: "Clothing",
    categoryId: 1,
    subcategoryId: 9,
    childCategoryId: 42,
    price: 59,
    originalPrice: 70,
    rating: 0,
    likes: 1,
    image: "/images/products/women-lace-blouse.webp",
    hoverImage: "/images/products/women-lace-blouse-hover.webp",
  },
  // 7. Elegant white lace fabric (Clothing -> Women's Clothing)
  {
    id: 4,
    title: "Elegant white lace fabric",
    category: "Clothing",
    categoryId: 1,
    subcategoryId: 9,
    childCategoryId: 42,
    price: 59,
    originalPrice: 69,
    rating: 0,
    likes: 0,
    image: "/images/products/elegant-white-lace.webp",
  },

  // 8. Animation of popular vacation spots (Graphics & Photos -> Photos)
  {
    id: 33,
    title: "Animation of popular vacation spots",
    category: "Graphics & Photos",
    categoryId: 6,
    subcategoryId: 31,
    price: 10,
    originalPrice: 15,
    rating: 5,
    likes: 1,
    isFeatured: true,
    image: "/images/products/vacation-spots.jpg",
  },
  // 9. Sneaker shoes men (Shoes -> Men's Shoes -> Sneakers)
  {
    id: 30,
    title: "Sneaker shoes men",
    category: "Shoes",
    categoryId: 2,
    subcategoryId: 13,
    childCategoryId: 54,
    price: 89,
    originalPrice: 100,
    rating: 0,
    likes: 0,
    isFeatured: true,
    image: "/images/products/shoes-streetwear.jpg",
  },
  // 10. Sun hat for women protection cap (Jewelry & Accessories -> Necklaces & Accessories -> Sun Hats)
  {
    id: 17,
    title: "Sun hat for women protection cap",
    category: "Jewelry & Accessories",
    categoryId: 4,
    subcategoryId: 20,
    childCategoryId: 70,
    price: 29,
    rating: 0,
    likes: 0,
    isFeatured: true,
    image: "/images/products/black-cap.jpg",
  },
  // 11. Blanket comfort couch pillow (Home & Living -> Home Decor -> Decorative Pillows)
  {
    id: 11,
    title: "Blanket comfort couch pillow",
    category: "Home & Living",
    categoryId: 3,
    subcategoryId: 15,
    childCategoryId: 61,
    price: 28,
    originalPrice: 35,
    rating: 0,
    likes: 0,
    isFeatured: true,
    image: "/images/products/pillow.webp",
    hoverImage: "/images/products/pillow-hover.webp",
  },
  // 12. Colorful women scarves (Jewelry & Accessories -> Necklaces & Accessories -> Scarfs)
  {
    id: 47,
    title: "Colorful women scarves",
    category: "Jewelry & Accessories",
    categoryId: 4,
    subcategoryId: 20,
    childCategoryId: 87,
    price: 18,
    originalPrice: 24,
    rating: 0,
    likes: 0,
    image: "/images/products/scarves.webp",
    hoverImage: "/images/products/scarves-hover.webp",
  },
  // 13. Black fashion women backpack (Jewelry & Accessories -> Bags & Purses -> Backpacks)
  {
    id: 43,
    title: "Black fashion women backpack",
    category: "Jewelry & Accessories",
    categoryId: 4,
    subcategoryId: 19,
    childCategoryId: 67,
    price: 0,
    isQuote: true,
    rating: 0,
    likes: 0,
    image: "/images/products/kipling-bag.webp",
    hoverImage: "/images/products/kipling-bag-hover.webp",
  },
  // 14. Animal colorful digital prints (Home & Living -> Painting -> Digital Prints)
  {
    id: 39,
    title: "Animal colorful digital prints",
    category: "Home & Living",
    categoryId: 3,
    subcategoryId: 36,
    childCategoryId: 119,
    price: 29,
    originalPrice: 39,
    rating: 5,
    likes: 0,
    image: "/images/products/ship-art.webp",
  },
  // 15. Seychelles women's brown ankle bootie (Shoes -> Women's Shoes -> Boots)
  {
    id: 37,
    title: "Seychelles women's brown ankle bootie",
    category: "Shoes",
    categoryId: 2,
    subcategoryId: 12,
    childCategoryId: 52,
    price: 79,
    rating: 0,
    likes: 0,
    image: "/images/products/grey-boots.webp",
    hoverImage: "/images/products/grey-boots-hover.webp",
  },
  // 16. Modern blue handbag (Jewelry & Accessories -> Bags & Purses -> Handbags)
  {
    id: 32,
    title: "Modern blue handbag",
    category: "Jewelry & Accessories",
    categoryId: 4,
    subcategoryId: 19,
    childCategoryId: 68,
    price: 45,
    originalPrice: 60,
    rating: 0,
    likes: 0,
    image: "/images/products/women-casual-dress.webp",
  },
  // 17. Vastu plants for your house (Home & Living -> Outdoor & Gardening -> Plants)
  {
    id: 27,
    title: "Vastu plants for your house",
    category: "Home & Living",
    categoryId: 3,
    subcategoryId: 18,
    childCategoryId: 60,
    price: 69,
    rating: 0,
    likes: 0,
    image: "/images/products/grey-couch.webp",
  },
  // 18. Motivation piano with cello and drums (Video & Audio -> Music)
  {
    id: 23,
    title: "Motivation piano with cello and drums",
    category: "Video & Audio",
    categoryId: 7,
    subcategoryId: 34,
    price: 25,
    originalPrice: 29,
    rating: 0,
    likes: 0,
    image: "/images/banners/banner-1.webp",
  },
  // 19. Intro animation with purple background and white triangles (Video & Audio -> After Effects)
  {
    id: 22,
    title: "Intro animation with purple background and white triangles",
    category: "Video & Audio",
    categoryId: 7,
    subcategoryId: 32,
    price: 25,
    originalPrice: 29,
    rating: 0,
    likes: 0,
    image: "/images/slider/slider-1.webp",
  },
  // 20. Fashionable black and white sneakers (Shoes -> Men's Shoes -> Sneakers)
  {
    id: 19,
    title: "Fashionable black and white sneakers",
    category: "Shoes",
    categoryId: 2,
    subcategoryId: 13,
    childCategoryId: 54,
    price: 49,
    originalPrice: 69,
    rating: 0,
    likes: 0,
    image: "/images/products/puma-shoes.jpg",
  },
  // 21. Black gold fashion backpack (Jewelry & Accessories -> Bags & Purses -> Backpacks)
  {
    id: 9,
    title: "Black gold fashion backpack",
    category: "Jewelry & Accessories",
    categoryId: 4,
    subcategoryId: 19,
    childCategoryId: 67,
    price: 0,
    isQuote: true,
    rating: 0,
    likes: 0,
    image: "/images/products/kipling-bag.webp",
  },
  // 22. Varient - News & Magazine Script (Web Templates & Code -> PHP Scripts)
  {
    id: 6,
    title: "Varient - News & Magazine Script",
    category: "Web Templates & Code",
    categoryId: 8,
    subcategoryId: 39,
    price: 49,
    rating: 0,
    likes: 0,
    image: "/uploads/banners/block_68b02a364b90c6-71529931.webp",
  },
  // 23. Infinite - Blog & Magazine Script (Web Templates & Code -> PHP Scripts)
  {
    id: 5,
    title: "Infinite - Blog & Magazine Script",
    category: "Web Templates & Code",
    categoryId: 8,
    subcategoryId: 39,
    price: 36,
    rating: 0,
    likes: 0,
    image: "/uploads/banners/block_68b02a59a1d144-08234125.webp",
  },
  // 24. Bohemian Multicolor Handmade Bracelet Set (Jewelry & Accessories -> Necklaces & Accessories)
  {
    id: 2,
    title: "Bohemian Multicolor Handmade Bracelet Set",
    category: "Jewelry & Accessories",
    categoryId: 4,
    subcategoryId: 20,
    price: 49,
    originalPrice: 69,
    rating: 0,
    likes: 0,
    image: "/images/products/floral-sundress.webp",
    hoverImage: "/images/products/floral-sundress-hover.webp",
  },
];

interface CategoryMeta {
  id: number;
  name: string;
  parentId: number | null;
  children: { id: number; name: string }[];
}

const TOP_CATEGORIES = [
  { id: 1, name: "Clothing" },
  { id: 2, name: "Shoes" },
  { id: 3, name: "Home & Living" },
  { id: 4, name: "Jewelry & Accessories" },
  { id: 6, name: "Graphics & Photos" },
  { id: 7, name: "Video & Audio" },
  { id: 8, name: "Web Templates & Code" },
];

const CATEGORY_MAP: Record<number, CategoryMeta> = {
  1: {
    id: 1,
    name: "Clothing",
    parentId: null,
    children: [
      { id: 9, name: "Women's Clothing" },
      { id: 10, name: "Men's Clothing" },
    ],
  },
  9: {
    id: 9,
    name: "Women's Clothing",
    parentId: 1,
    children: [
      { id: 42, name: "Dresses" },
      { id: 43, name: "Skirts" },
      { id: 45, name: "Sweaters" },
    ],
  },
  10: {
    id: 10,
    name: "Men's Clothing",
    parentId: 1,
    children: [
      { id: 46, name: "Jackets & Coats" },
    ],
  },
  42: {
    id: 42,
    name: "Dresses",
    parentId: 9,
    children: [],
  },
  43: {
    id: 43,
    name: "Skirts",
    parentId: 9,
    children: [],
  },
  45: {
    id: 45,
    name: "Sweaters",
    parentId: 9,
    children: [],
  },
  46: {
    id: 46,
    name: "Jackets & Coats",
    parentId: 10,
    children: [],
  },
  2: {
    id: 2,
    name: "Shoes",
    parentId: null,
    children: [
      { id: 12, name: "Women's Shoes" },
      { id: 13, name: "Men's Shoes" },
    ],
  },
  12: {
    id: 12,
    name: "Women's Shoes",
    parentId: 2,
    children: [
      { id: 52, name: "Boots" },
    ],
  },
  13: {
    id: 13,
    name: "Men's Shoes",
    parentId: 2,
    children: [
      { id: 54, name: "Sneakers" },
    ],
  },
  3: {
    id: 3,
    name: "Home & Living",
    parentId: null,
    children: [
      { id: 15, name: "Home Decor" },
      { id: 18, name: "Outdoor & Gardening" },
      { id: 36, name: "Painting" },
    ],
  },
  15: {
    id: 15,
    name: "Home Decor",
    parentId: 3,
    children: [
      { id: 61, name: "Decorative Pillows" },
    ],
  },
  18: {
    id: 18,
    name: "Outdoor & Gardening",
    parentId: 3,
    children: [
      { id: 60, name: "Plants" },
    ],
  },
  36: {
    id: 36,
    name: "Painting",
    parentId: 3,
    children: [
      { id: 119, name: "Digital Prints" },
    ],
  },
  4: {
    id: 4,
    name: "Jewelry & Accessories",
    parentId: null,
    children: [
      { id: 19, name: "Bags & Purses" },
      { id: 20, name: "Necklaces & Accessories" },
    ],
  },
  19: {
    id: 19,
    name: "Bags & Purses",
    parentId: 4,
    children: [
      { id: 67, name: "Backpacks" },
      { id: 68, name: "Handbags" },
    ],
  },
  20: {
    id: 20,
    name: "Necklaces & Accessories",
    parentId: 4,
    children: [
      { id: 70, name: "Sun Hats" },
      { id: 87, name: "Scarfs" },
    ],
  },
  6: {
    id: 6,
    name: "Graphics & Photos",
    parentId: null,
    children: [
      { id: 31, name: "Photos" },
    ],
  },
  7: {
    id: 7,
    name: "Video & Audio",
    parentId: null,
    children: [
      { id: 32, name: "After Effects" },
      { id: 34, name: "Music" },
    ],
  },
  8: {
    id: 8,
    name: "Web Templates & Code",
    parentId: null,
    children: [
      { id: 39, name: "PHP Scripts" },
    ],
  },
};

interface VendorPublicProfileViewProps {
  initialTab?: ProfileTabType;
  slug?: string;
}

function VendorPublicProfileInner({
  initialTab = "products",
  slug = "daniel_jones",
}: VendorPublicProfileViewProps) {
  const [activeTab, setActiveTab] = useState<ProfileTabType>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [showPhone, setShowPhone] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Sync category with URL query param `p_cat`
  useEffect(() => {
    const pCat = searchParams?.get("p_cat");
    if (pCat) {
      const parsed = parseInt(pCat, 10);
      if (!isNaN(parsed) && CATEGORY_MAP[parsed]) {
        setSelectedCategory(parsed);
        return;
      }
    }
    // Check window.location if SSR / initial load without hydration
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const winCat = params.get("p_cat");
      if (winCat) {
        const parsed = parseInt(winCat, 10);
        if (!isNaN(parsed) && CATEGORY_MAP[parsed]) {
          setSelectedCategory(parsed);
          return;
        }
      }
    }
    setSelectedCategory(null);
  }, [searchParams]);

  // Handle popstate for browser back/forward buttons
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const pCat = params.get("p_cat");
      if (pCat) {
        const parsed = parseInt(pCat, 10);
        if (!isNaN(parsed) && CATEGORY_MAP[parsed]) {
          setSelectedCategory(parsed);
          return;
        }
      }
      setSelectedCategory(null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSelectCategory = (catId: number | null) => {
    setSelectedCategory(catId);
    if (typeof window !== "undefined") {
      const basePath = window.location.pathname;
      const newUrl = catId ? `${basePath}?p_cat=${catId}#products` : `${basePath}#products`;
      window.history.pushState(null, "", newUrl);
    }
  };

  // Reviews state (can delete my reviews)
  const [myReviews, setMyReviews] = useState([
    {
      id: "mr1",
      product: "Black bag over the shoulder",
      rating: 5,
      author: "Trendshop",
      comment:
        "The material feels durable, and the design is sleek enough to match both casual and formal outfits. It has plenty of space inside without being too bulky, and the strap is comfortable for carrying all day.",
      date: "2 months ago",
    },
    {
      id: "mr2",
      product: "Floral women sundress",
      rating: 4,
      author: "Trendshop",
      comment:
        "The floral women sundress is really pretty and perfect for summer. The fabric feels light and comfortable, and the floral design is elegant. The fit is nice, though it runs just a little bit larger than expected. Overall, it's a lovely dress that looks great for casual outings or vacations.",
      date: "2 months ago",
    },
  ]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleDeleteMyReview = (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      setMyReviews(myReviews.filter((r) => r.id !== id));
    }
  };

  // Filter products by hierarchical category, price range, and keyword
  const filteredProducts = PRODUCTS_DATA.filter((product) => {
    if (selectedCategory !== null) {
      const matches =
        product.categoryId === selectedCategory ||
        product.subcategoryId === selectedCategory ||
        product.childCategoryId === selectedCategory;
      if (!matches) {
        return false;
      }
    }
    if (minPrice && product.price < Number(minPrice)) {
      return false;
    }
    if (maxPrice && product.price > Number(maxPrice)) {
      return false;
    }
    if (
      keyword &&
      !product.title.toLowerCase().includes(keyword.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-gray-800">
      {/* 1. Modesy Standard Vendor Header */}
      <VendorHeader />

      {/* 2. Cover Banner */}
      <div className="relative w-full h-56 sm:h-72 md:h-80 overflow-hidden bg-gray-200">
        <img
          src="/images/banners/vendor-cover.jpg"
          alt="Trendshop Cover Banner"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* 3. Main Container */}
      <main className="max-w-[1300px] w-full mx-auto px-4 sm:px-6 -mt-16 sm:-mt-20 relative z-10 mb-20 flex-1">
        {/* Profile Card Header */}
        <div className="bg-white border border-[#e4e7ea] rounded-[4px] p-6 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-[4px] border border-gray-200 bg-white p-1 shadow-xs shrink-0 overflow-hidden">
              <img
                src="/assets/img/trendshop-avatar.jpg"
                alt="Trendshop"
                className="w-full h-full object-cover rounded-[2px]"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-[22px] font-bold text-gray-900 tracking-tight">
                  Trendshop
                </h1>
                {/* Blue Verified Badge */}
                <BadgeCheck className="w-5 h-5 text-[#1da1f2] fill-[#1da1f2] stroke-white" />
              </div>

              {/* Online status */}
              <div className="flex items-center gap-1.5 text-[12px] text-gray-400">
                <span className="w-2 h-2 rounded-full bg-[#20c997]"></span>
                <span>Last seen: Just Now</span>
              </div>

              {/* Stars & Sales */}
              <div className="flex items-center gap-4 text-[13px] pt-0.5">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-[#ffc107] text-[#ffc107]"
                    />
                  ))}
                  <span className="text-gray-500 font-medium ml-1">(6)</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600 font-medium">
                  <ShoppingCart className="w-3.5 h-3.5 text-gray-400" />
                  <span>15 Sales</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[12.5px] text-gray-600 leading-relaxed max-w-4xl pt-1">
                Welcome to our store! We offer a wide range of high quality
                products to meet all your needs, from the latest electronics and
                gadgets to stylish clothing and accessories.
              </p>

              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-6 text-[12.5px] text-gray-500 pt-2 border-t border-gray-100">
                <span>Member since July 2026</span>

                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  {showPhone ? (
                    <span className="text-gray-800 font-medium">
                      +1 (555) 123-4567
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowPhone(true)}
                      className="text-gray-700 hover:text-[#20c997] font-medium underline transition-colors cursor-pointer"
                    >
                      Show
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  <a
                    href="mailto:trendshop@gmail.com"
                    className="text-gray-600 hover:text-[#20c997] transition-colors"
                  >
                    trendshop@gmail.com
                  </a>
                </div>
              </div>

              {/* RSS Button */}
              <div className="pt-2">
                <button
                  type="button"
                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#20c997] hover:border-[#20c997] transition-colors cursor-pointer"
                  title="RSS Feed"
                >
                  <Rss className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Bar with Dedicated Page Links */}
        <div className="flex items-center border-b border-gray-200 mb-6 overflow-x-auto text-[14px]">
          <Link
            href={`/profile/${slug}`}
            className={`pb-3 px-4 font-semibold transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === "products"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Products ({PRODUCTS_DATA.length})
          </Link>
          <Link
            href={`/followers/${slug}`}
            className={`pb-3 px-4 font-semibold transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === "followers"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Followers (1)
          </Link>
          <Link
            href={`/following/${slug}`}
            className={`pb-3 px-4 font-semibold transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === "following"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Following (0)
          </Link>
          <Link
            href={`/reviews/${slug}`}
            className={`pb-3 px-4 font-semibold transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === "reviews"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Reviews (6)
          </Link>
          <Link
            href={`/my-reviews/${slug}`}
            className={`pb-3 px-4 font-semibold transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === "my_reviews"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            My Reviews ({myReviews.length})
          </Link>
          <Link
            href={`/shop-policies/${slug}`}
            className={`pb-3 px-4 font-semibold transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === "policies"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Shop Policies
          </Link>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: Products */}
        {/* ========================================================= */}
        {activeTab === "products" && (
          <div>
            {/* Top Sort By */}
            <div className="flex justify-end mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[12.5px] text-gray-500">⇅</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-[3px] px-3 py-1.5 text-[12.5px] text-gray-700 bg-white focus:outline-none focus:border-[#20c997]"
                >
                  <option value="recent">Most Recent</option>
                  <option value="price_asc">Lowest Price</option>
                  <option value="price_desc">Highest Price</option>
                  <option value="rating">Highest Rating</option>
                </select>
              </div>
            </div>

            {/* 2-Column Grid: Filter & 4-Column Product Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Filter Sidebar */}
              <div className="lg:col-span-3 space-y-5">
                {/* Category Card */}
                <div className="bg-white border border-[#e4e7ea] rounded-[4px] p-5 shadow-xs">
                  <h3 className="text-[13.5px] font-semibold text-gray-800 mb-3">
                    Category
                  </h3>

                  {selectedCategory !== null && CATEGORY_MAP[selectedCategory] ? (
                    <div>
                      {/* Current Category / Back link */}
                      <div className="mb-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleSelectCategory(CATEGORY_MAP[selectedCategory].parentId)
                          }
                          className="text-[13px] font-medium text-gray-800 hover:text-[#20c997] flex items-center gap-1.5 transition-colors cursor-pointer group"
                        >
                          <span className="text-[11px] text-gray-500 font-bold group-hover:text-[#20c997] transition-colors">
                            ◀
                          </span>
                          <span>{CATEGORY_MAP[selectedCategory].name}</span>
                        </button>
                      </div>

                      {/* Subcategories list indented */}
                      {CATEGORY_MAP[selectedCategory].children.length > 0 && (
                        <ul className="pl-4 space-y-2 text-[13px]">
                          {CATEGORY_MAP[selectedCategory].children.map((sub) => (
                            <li key={sub.id}>
                              <button
                                type="button"
                                onClick={() => handleSelectCategory(sub.id)}
                                className="text-left w-full text-gray-600 hover:text-[#20c997] transition-colors cursor-pointer"
                              >
                                {sub.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    /* Root: Top Categories */
                    <ul className="space-y-2 text-[13px]">
                      {TOP_CATEGORIES.map((cat) => (
                        <li key={cat.id}>
                          <button
                            type="button"
                            onClick={() => handleSelectCategory(cat.id)}
                            className="text-left w-full text-gray-700 hover:text-[#20c997] transition-colors cursor-pointer"
                          >
                            {cat.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Price Card */}
                <div className="bg-white border border-[#e4e7ea] rounded-[4px] p-5 shadow-xs">
                  <h3 className="text-[13.5px] font-semibold text-gray-800 mb-3">
                    Price
                  </h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full border border-gray-300 rounded-[3px] px-2.5 py-1.5 text-[12.5px] text-gray-800 focus:outline-none focus:border-[#20c997]"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full border border-gray-300 rounded-[3px] px-2.5 py-1.5 text-[12.5px] text-gray-800 focus:outline-none focus:border-[#20c997]"
                    />
                  </div>
                </div>

                {/* Filter by keyword Card */}
                <div className="bg-white border border-[#e4e7ea] rounded-[4px] p-5 shadow-xs">
                  <h3 className="text-[13.5px] font-semibold text-gray-800 mb-3">
                    Filter by keyword
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Keyword"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="w-full border border-gray-300 rounded-[3px] px-2.5 py-1.5 text-[12.5px] text-gray-800 focus:outline-none focus:border-[#20c997]"
                    />
                    <button
                      type="button"
                      onClick={() => {}}
                      className="w-full py-1.5 px-4 bg-[#f8f9fa] hover:bg-gray-100 border border-gray-300 text-gray-700 text-[12.5px] font-medium rounded-[3px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5 text-gray-500" />
                      <span>Filter</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 4-Column Product Grid with Smooth Hover Animation */}
              <div className="lg:col-span-9">
                {sortedProducts.length === 0 ? (
                  <div className="bg-white rounded border border-[#e4e7ea] p-12 text-center text-gray-400">
                    No products found matching your filter criteria.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                    {sortedProducts.map((product) => {
                      const isWishlisted = wishlist.includes(product.id);
                      const productHref =
                        product.id === 41
                          ? "/black-midi-skirt-with-white-flowers-41?sku=B1M2S3W4F5L6-S"
                          : `/product/${product.id}`;

                      return (
                        <div
                          key={product.id}
                          onClick={() => router.push(productHref)}
                          className="group relative bg-white border border-[#ebebeb] rounded-[4px] overflow-hidden flex flex-col transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:border-gray-300 cursor-pointer"
                        >
                          {/* Featured Badge */}
                          {product.isFeatured && (
                            <span className="absolute top-2.5 left-2.5 z-10 bg-[#20c997] text-white text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] shadow-xs pointer-events-none">
                              Featured
                            </span>
                          )}

                          {/* Image Container with Smooth Hover Transition Animation */}
                          <Link
                            href={productHref}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full aspect-square overflow-hidden bg-[#fbfbfb] flex items-center justify-center block"
                          >
                            <img
                              src={product.image}
                              alt={product.title}
                              className={`w-full h-full object-cover transition-all duration-500 ease-out ${
                                product.hoverImage
                                  ? "group-hover:opacity-0 group-hover:scale-105"
                                  : "scale-100 group-hover:scale-108"
                              }`}
                            />
                            {/* Hover secondary image with smooth fade-in and subtle zoom */}
                            {product.hoverImage && (
                              <img
                                src={product.hoverImage}
                                alt={product.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-105 transition-all duration-500 ease-out"
                              />
                            )}
                          </Link>

                          {/* Floating Action Buttons on Hover (Cart & Wishlist stacked vertically) */}
                          <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-1 group-hover:translate-x-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="w-8 h-8 rounded-full bg-white/95 hover:bg-white text-gray-500 hover:text-[#20c997] shadow-sm flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                              title="Add to Cart"
                            >
                              <ShoppingCart className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleWishlist(product.id);
                              }}
                              className="w-8 h-8 rounded-full bg-white/95 hover:bg-white text-gray-500 hover:text-red-500 shadow-sm flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                              title="Add to Wishlist"
                            >
                              <Heart
                                className={`w-4 h-4 transition-colors ${
                                  isWishlisted
                                    ? "fill-red-500 text-red-500"
                                    : ""
                                }`}
                              />
                            </button>
                          </div>

                          {/* Product Card Details */}
                          <div className="p-3.5 flex-1 flex flex-col justify-between">
                            <div>
                              <Link
                                href={productHref}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <h3 className="text-[13px] font-medium text-gray-800 line-clamp-2 leading-snug group-hover:text-[#20c997] transition-colors">
                                  {product.title}
                                </h3>
                              </Link>
                              <p className="text-[11.5px] text-gray-400 mt-1">
                                Trendshop
                              </p>

                              {/* Star Rating & Likes in same row */}
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < product.rating
                                          ? "text-[#ffc107] fill-[#ffc107]"
                                          : "text-gray-300 fill-gray-100"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <div className="flex items-center gap-1 text-[11.5px] text-gray-400">
                                  <Heart className="w-3.5 h-3.5 text-gray-400" />
                                  <span>{product.likes}</span>
                                </div>
                              </div>
                            </div>

                            {/* Bottom Price Row */}
                            <div className="mt-2.5">
                              {product.isQuote ? (
                                <span className="text-[12.5px] font-semibold text-gray-800">
                                  Request a Quote
                                </span>
                              ) : (
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[14px] font-bold text-[#20c997]">
                                    ${product.price}
                                  </span>
                                  {product.originalPrice && (
                                    <span className="text-[11.5px] text-gray-400 line-through">
                                      ${product.originalPrice}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: Followers (Screenshot 1) */}
        {/* ========================================================= */}
        {activeTab === "followers" && (
          <div className="pt-2">
            <div className="flex flex-col items-center w-24">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 shadow-2xs mb-2">
                <img
                  src="/assets/img/admin-avatar.jpg"
                  alt="Admin"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[13px] font-medium text-gray-800 text-center">
                Admin
              </span>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: Following */}
        {/* ========================================================= */}
        {activeTab === "following" && (
          <div className="bg-white rounded border border-[#e4e7ea] p-12 text-center text-gray-400 shadow-xs">
            No following users.
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: Reviews (Screenshot 4 & 5) */}
        {/* ========================================================= */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            {/* Header stars */}
            <div className="flex items-center gap-2 pb-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#ffc107] text-[#ffc107]"
                  />
                ))}
              </div>
              <span className="text-[14px] font-semibold text-gray-800">
                Reviews (6)
              </span>
            </div>

            {/* Reviews List */}
            <div className="space-y-6 divide-y divide-gray-100">
              {/* Review 1 */}
              <div className="pt-4 first:pt-0">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-100">
                    <img
                      src="/assets/img/admin-avatar.jpg"
                      alt="Admin"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] text-gray-700">
                        <span className="font-semibold text-gray-800">Product: </span>
                        <span className="text-gray-800">Animal colorful digital prints</span>
                      </p>
                      <button className="text-[12px] text-gray-400 hover:text-red-500 transition-colors">
                        Report
                      </button>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#ffc107] text-[#ffc107]" />
                      ))}
                    </div>
                    <p className="text-[13px] font-semibold text-gray-800">Admin</p>
                    <p className="text-[13px] text-gray-600">dfg</p>
                    <p className="text-[11.5px] text-gray-400">12 days ago</p>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="pt-6">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-100">
                    <img
                      src="/images/peter-jone-avatar.jpg"
                      alt="Peter Jone"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] text-gray-700">
                        <span className="font-semibold text-gray-800">Product: </span>
                        <span className="text-gray-800">Animal colorful digital prints</span>
                      </p>
                      <button className="text-[12px] text-gray-400 hover:text-red-500 transition-colors">
                        Report
                      </button>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#ffc107] text-[#ffc107]" />
                      ))}
                    </div>
                    <p className="text-[13px] font-semibold text-gray-800">Peter Jone</p>
                    <p className="text-[13px] text-gray-600">Test 1</p>
                    <p className="text-[11.5px] text-gray-400">1 month ago</p>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div className="pt-6">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-100">
                    <img
                      src="/assets/img/admin-avatar.jpg"
                      alt="Admin"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] text-gray-700">
                        <span className="font-semibold text-gray-800">Product: </span>
                        <span className="text-gray-800">Summer fashion top lace</span>
                      </p>
                      <button className="text-[12px] text-gray-400 hover:text-red-500 transition-colors">
                        Report
                      </button>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#ffc107] text-[#ffc107]" />
                      ))}
                    </div>
                    <p className="text-[13px] font-semibold text-gray-800">Admin</p>
                    <p className="text-[13px] text-gray-600 leading-relaxed">
                      The summer fashion lace top is absolutely beautiful! The lace detailing gives it a very elegant and feminine look, while the fabric is light and breathable perfect for warm weather. It fits nicely and pairs well with both jeans and skirts. Stylish, comfortable, and versatile highly recommend!
                    </p>
                    <p className="text-[11.5px] text-gray-400">2 months ago</p>
                  </div>
                </div>
              </div>

              {/* Review 4 */}
              <div className="pt-6">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-100">
                    <img
                      src="/assets/img/admin-avatar.jpg"
                      alt="Admin"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] text-gray-700">
                        <span className="font-semibold text-gray-800">Product: </span>
                        <span className="text-gray-800">Animation of popular vacation spots</span>
                      </p>
                      <button className="text-[12px] text-gray-400 hover:text-red-500 transition-colors">
                        Report
                      </button>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#ffc107] text-[#ffc107]" />
                      ))}
                    </div>
                    <p className="text-[13px] font-semibold text-gray-800">Admin</p>
                    <p className="text-[13px] text-gray-600 leading-relaxed">
                      The visuals are vibrant, and it really captures the essence of each vacation spot. It's both informative and entertaining, making me want to visit every location featured. Highly recommended for travel enthusiasts!
                    </p>
                    <p className="text-[11.5px] text-gray-400">2 months ago</p>
                  </div>
                </div>
              </div>

              {/* Review 5 */}
              <div className="pt-6">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-100">
                    <img
                      src="/assets/img/admin-avatar.jpg"
                      alt="Admin"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] text-gray-700">
                        <span className="font-semibold text-gray-800">Product: </span>
                        <span className="text-gray-800">Light blue women shirt</span>
                      </p>
                      <button className="text-[12px] text-gray-400 hover:text-red-500 transition-colors">
                        Report
                      </button>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#ffc107] text-[#ffc107]" />
                      ))}
                    </div>
                    <p className="text-[13px] font-semibold text-gray-800">Admin</p>
                    <p className="text-[13px] text-gray-600 leading-relaxed">
                      The light blue color is soft and flattering, and the fabric feels high-quality and breathable. It fits perfectly and looks great both casually and at work. Definitely a wardrobe favorite!
                    </p>
                    <p className="text-[11.5px] text-gray-400">2 months ago</p>
                  </div>
                </div>
              </div>

              {/* Review 6 */}
              <div className="pt-6">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-100">
                    <img
                      src="/assets/img/admin-avatar.jpg"
                      alt="Admin"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] text-gray-700">
                        <span className="font-semibold text-gray-800">Product: </span>
                        <span className="text-gray-800">Black midi skirt with white flowers</span>
                      </p>
                      <button className="text-[12px] text-gray-400 hover:text-red-500 transition-colors">
                        Report
                      </button>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#ffc107] text-[#ffc107]" />
                      ))}
                      <Star className="w-3.5 h-3.5 text-gray-300 fill-gray-100" />
                    </div>
                    <p className="text-[13px] font-semibold text-gray-800">Admin</p>
                    <p className="text-[13px] text-gray-600 leading-relaxed">
                      This skirt is beautiful and the floral pattern is very charming. The material feels nice and it drapes well. I gave it 4 stars because the sizing runs a little small, but overall it's a lovely addition to my wardrobe.
                    </p>
                    <p className="text-[11.5px] text-gray-400">2 months ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: My Reviews (Screenshot 2) */}
        {/* ========================================================= */}
        {activeTab === "my_reviews" && (
          <div className="space-y-5">
            <h2 className="text-[14.5px] font-semibold text-gray-800">
              My Reviews ({myReviews.length})
            </h2>

            <div className="space-y-6 divide-y divide-gray-100">
              {myReviews.map((review) => (
                <div key={review.id} className="pt-4 first:pt-0">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-100">
                      <img
                        src="/assets/img/trendshop-avatar.jpg"
                        alt="Trendshop"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[13px] text-gray-700">
                          <span className="font-semibold text-gray-800">Product: </span>
                          <span className="text-gray-800 hover:text-[#20c997] cursor-pointer">
                            {review.product}
                          </span>
                        </p>
                        <button
                          type="button"
                          onClick={() => handleDeleteMyReview(review.id)}
                          className="text-[12px] text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < review.rating
                                ? "fill-[#ffc107] text-[#ffc107]"
                                : "text-gray-300 fill-gray-100"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-[13px] font-semibold text-gray-800">
                        {review.author}
                      </p>
                      <p className="text-[13px] text-gray-600 leading-relaxed">
                        {review.comment}
                      </p>
                      <p className="text-[11.5px] text-gray-400">
                        {review.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: Shop Policies (Screenshot 3) */}
        {/* ========================================================= */}
        {activeTab === "policies" && (
          <div className="space-y-4 text-[13px] text-gray-700 leading-relaxed">
            <p className="leading-relaxed">
              Welcome to <span className="font-bold text-gray-900">Trendshop</span> store! As a vendor, establishing clear shop policies is essential to building trust with your customers and ensuring a smooth and transparent transaction process. This guide will help you create effective shop policies tailored to your unique business needs on the Modesy platform.
            </p>

            {/* 1. Shipping Policy */}
            <div className="pt-2">
              <h3 className="font-bold text-[14px] text-gray-900 mb-2">
                1. Shipping Policy
              </h3>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Processing Time: </span>
                Clearly state the time it takes to prepare and ship orders. This might vary depending on the product type and availability. For example, &quot;All orders are processed within 2-3 business days.&quot;
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Shipping Methods: </span>
                Outline the available shipping options, including standard, express, and any international shipping services you offer. Include estimated delivery times and the carriers used (e.g., USPS, FedEx, DHL).
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Shipping Fees: </span>
                Specify if you offer free shipping or if fees apply. If applicable, include details about flat-rate shipping, weight-based pricing, or any other shipping fee structure.
              </p>
              <p>
                <span className="font-semibold text-gray-800">International Shipping: </span>
                If you ship internationally, mention any restrictions, additional fees, or customs duties that may apply.
              </p>
            </div>

            {/* 2. Returns and Exchanges */}
            <div className="pt-2">
              <h3 className="font-bold text-[14px] text-gray-900 mb-2">
                2. Returns and Exchanges
              </h3>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Return Eligibility: </span>
                Define the conditions under which items can be returned, such as within a specific time frame (e.g., &quot;Items can be returned within 14 days of receipt&quot;). Specify which products are non-returnable, like perishable goods, custom-made items, or digital downloads.
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Return Process: </span>
                Explain the steps customers need to take to initiate a return or exchange. Include instructions for contacting customer support, returning the product, and any required documentation (e.g., receipt or proof of purchase).
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Refunds: </span>
                State how and when refunds will be issued (e.g., &quot;Refunds will be processed within 5 business days of receiving the returned item&quot;). Indicate whether the original shipping fee will be refunded and how the customer will receive their refund (e.g., original payment method, store credit).
              </p>
              <p>
                <span className="font-semibold text-gray-800">Exchanges: </span>
                If you offer exchanges, detail the process and any conditions. For example, &quot;Exchanges are only available for items of equal or lesser value.&quot;
              </p>
            </div>

            {/* 3. Payment Policy */}
            <div className="pt-2">
              <h3 className="font-bold text-[14px] text-gray-900 mb-2">
                3. Payment Policy
              </h3>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Accepted Payment Methods: </span>
                List all payment methods you accept, such as credit/debit cards, PayPal, bank transfers, or other payment gateways supported by Modesy.
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Payment Terms: </span>
                Clarify when payment is due, especially for custom or made-to-order items. For example, &quot;Full payment is required at the time of purchase.&quot;
              </p>
              <p>
                <span className="font-semibold text-gray-800">Payment Security: </span>
                Reassure customers by highlighting the security measures you take to protect their payment information, such as encryption or secure payment gateways.
              </p>
            </div>

            {/* 4. Cancellation Policy */}
            <div className="pt-2">
              <h3 className="font-bold text-[14px] text-gray-900 mb-2">
                4. Cancellation Policy
              </h3>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Order Cancellations: </span>
                Outline the conditions under which customers can cancel their orders. Include a time frame, such as &quot;Orders can be canceled within 24 hours of purchase.&quot;
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Non-Cancellable Orders: </span>
                Specify any circumstances in which orders cannot be canceled, such as custom or personalized items.
              </p>
              <p>
                <span className="font-semibold text-gray-800">Refunds for Cancellations: </span>
                Explain if and how refunds will be processed for canceled orders, and whether any fees will be deducted.
              </p>
            </div>

            {/* 5. Privacy Policy */}
            <div className="pt-2">
              <h3 className="font-bold text-[14px] text-gray-900 mb-2">
                5. Privacy Policy
              </h3>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Customer Information: </span>
                Ensure customers that their personal information is handled with care. Mention what data is collected (e.g., name, address, payment details) and how it is used (e.g., order processing, marketing).
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Data Protection: </span>
                Describe the measures you take to protect customer data, such as encryption, secure servers, and compliance with data protection regulations.
              </p>
              <p>
                <span className="font-semibold text-gray-800">Third-Party Sharing: </span>
                Clearly state if and when customer data might be shared with third parties, such as for shipping or payment processing.
              </p>
            </div>

            {/* 6. Customer Service */}
            <div className="pt-2">
              <h3 className="font-bold text-[14px] text-gray-900 mb-2">
                6. Customer Service
              </h3>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Contact Information: </span>
                Provide clear instructions on how customers can contact you with questions or concerns. Include your preferred communication channels, such as email, phone, or a contact form on your Modesy store page.
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Response Time: </span>
                Set expectations for when customers can expect a response. For example, &quot;We aim to respond to all inquiries within 24 hours.&quot;
              </p>
              <p>
                <span className="font-semibold text-gray-800">Dispute Resolution: </span>
                Explain your approach to resolving disputes, including how customers can escalate issues if they are not satisfied with the initial resolution.
              </p>
            </div>

            {/* 7. Store Rules */}
            <div className="pt-2">
              <h3 className="font-bold text-[14px] text-gray-900 mb-2">
                7. Store Rules
              </h3>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Behavioral Expectations: </span>
                Define any specific rules for customers interacting with your store, such as respectful communication or adherence to community guidelines.
              </p>
              <p>
                <span className="font-semibold text-gray-800">Prohibited Actions: </span>
                List any actions that are not allowed, such as fraudulent transactions or abusive behavior. Explain the consequences of violating these rules, such as order cancellation or account suspension.
              </p>
            </div>

            {/* 8. Custom Orders */}
            <div className="pt-2">
              <h3 className="font-bold text-[14px] text-gray-900 mb-2">
                8. Custom Orders
              </h3>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Process for Custom Orders: </span>
                Detail how customers can request custom orders, including the required information, design approval process, and payment terms.
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Lead Time: </span>
                Clearly state the time frame for creating and delivering custom orders, which may be longer than standard items.
              </p>
              <p>
                <span className="font-semibold text-gray-800">No Returns on Custom Orders: </span>
                If applicable, inform customers that custom orders are non-returnable and non-refundable unless defective.
              </p>
            </div>

            {/* 9. Digital Products (If Applicable) */}
            <div className="pt-2">
              <h3 className="font-bold text-[14px] text-gray-900 mb-2">
                9. Digital Products (If Applicable)
              </h3>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Delivery of Digital Products: </span>
                Specify how and when digital products will be delivered, such as via email or download link, immediately upon payment confirmation.
              </p>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Usage Rights: </span>
                Clarify the rights customers have regarding the use of digital products, such as personal use only or restrictions on sharing.
              </p>
              <p>
                <span className="font-semibold text-gray-800">No Returns on Digital Products: </span>
                Explain that digital products are non-returnable and non-refundable due to the nature of the product.
              </p>
            </div>

            {/* 10. Legal Compliance */}
            <div className="pt-2">
              <h3 className="font-bold text-[14px] text-gray-900 mb-2">
                10. Legal Compliance
              </h3>
              <p className="mb-2">
                <span className="font-semibold text-gray-800">Consumer Rights: </span>
                Ensure your policies comply with relevant consumer protection laws, including rights to return items, warranties, and data protection regulations.
              </p>
              <p>
                <span className="font-semibold text-gray-800">Jurisdiction: </span>
                If necessary, state the legal jurisdiction under which your shop operates, particularly for resolving disputes.
              </p>
            </div>

            {/* Conclusion */}
            <div className="pt-4 border-t border-gray-100 mt-4">
              <p className="leading-relaxed">
                Establishing clear and concise shop policies on your Modesy store is crucial for creating a trustworthy and professional shopping experience. Regularly review and update your policies to reflect any changes in your business practices or legal requirements. By doing so, you’ll not only protect your business but also enhance customer satisfaction and loyalty.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* 4. Modesy Footer */}
      <ModesyFooter />

      {/* 5. Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 bg-black/85 hover:bg-black text-white rounded-[4px] flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer"
          title="Scroll to top"
        >
          <ChevronUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
}

export default function VendorPublicProfileView(
  props: VendorPublicProfileViewProps
) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8f9fa]" />}>
      <VendorPublicProfileInner {...props} />
    </Suspense>
  );
}
