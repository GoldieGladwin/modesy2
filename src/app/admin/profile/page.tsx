"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Check,
  Star,
  ShoppingCart,
  Phone,
  Mail,
  Search,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Heart,
  Globe,
  Rss,
  Share2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface Product {
  id: number;
  title: string;
  category: string;
  price: number | "Free";
  oldPrice?: number;
  image: string;
  rating: number;
  wishlist: number;
  isFeatured?: boolean;
}

const PRODUCTS_DATA: Product[] = [
  {
    id: 1,
    title: "Handcrafted decorative pillow for a luxurious touch",
    category: "Home & Living",
    price: 59,
    oldPrice: 69,
    image: "/images/products/pillow.webp",
    rating: 0,
    wishlist: 0,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Women kipling bailey saddle handbag",
    category: "Home & Living",
    price: 59,
    oldPrice: 69,
    image: "/images/products/kipling-bag.webp",
    rating: 0,
    wishlist: 0,
    isFeatured: true,
  },
  {
    id: 3,
    title: "Floral women sundress",
    category: "Clothing",
    price: 80,
    oldPrice: 89,
    image: "/images/products/floral-sundress.webp",
    rating: 4,
    wishlist: 0,
    isFeatured: true,
  },
  {
    id: 4,
    title: "Adorable animals photo pack",
    category: "Graphics & Photos",
    price: "Free",
    image: "/images/products/cat-art.webp",
    rating: 0,
    wishlist: 1,
    isFeatured: true,
  },
  {
    id: 5,
    title: "Women maxi twirl skirt",
    category: "Clothing",
    price: 45,
    oldPrice: 50,
    image: "/images/products/midi-skirt.webp",
    rating: 0,
    wishlist: 0,
    isFeatured: true,
  },
  {
    id: 6,
    title: "Abstract outdoor artist painting",
    category: "Home & Living",
    price: 65,
    oldPrice: 75,
    image: "/categories/painting.jpg",
    rating: 0,
    wishlist: 2,
    isFeatured: true,
  },
  {
    id: 7,
    title: "Round woven straw handbag with floral scarf",
    category: "Jewelry & Accessories",
    price: 32,
    oldPrice: 40,
    image: "/categories/handbags.jpg",
    rating: 0,
    wishlist: 0,
    isFeatured: true,
  },
  {
    id: 8,
    title: "Green cotton crewneck t-shirt",
    category: "Clothing",
    price: 24,
    oldPrice: 30,
    image: "/categories/clothing.jpg",
    rating: 0,
    wishlist: 0,
    isFeatured: true,
  },
  {
    id: 9,
    title: "Car Race Pro License Keys",
    category: "Web Templates & Code",
    price: 19,
    oldPrice: 25,
    image: "/categories/graphics.jpg",
    rating: 0,
    wishlist: 1,
  },
  {
    id: 10,
    title: "Futuristic landscape animation",
    category: "Video & Audio",
    price: 18,
    oldPrice: 20,
    image: "/images/products/draft-red-art.jpg",
    rating: 0,
    wishlist: 0,
  },
  {
    id: 11,
    title: "Men's sport shoe",
    category: "Shoes",
    price: 45,
    oldPrice: 49,
    image: "/images/products/grey-boots.webp",
    rating: 0,
    wishlist: 0,
  },
  {
    id: 12,
    title: "Adidas daily shoes",
    category: "Shoes",
    price: 59,
    image: "/images/products/brown-bootie.webp",
    rating: 0,
    wishlist: 0,
  },
  {
    id: 13,
    title: "Women vintage collage art design",
    category: "Graphics & Photos",
    price: 15,
    oldPrice: 20,
    image: "/images/products/women-lace-blouse.webp",
    rating: 0,
    wishlist: 0,
  },
  {
    id: 14,
    title: "Black sneakers with white sole",
    category: "Shoes",
    price: 69,
    oldPrice: 89,
    image: "/images/products/grey-boots-hover.webp",
    rating: 0,
    wishlist: 0,
  },
  {
    id: 15,
    title: "Women red casual dress",
    category: "Clothing",
    price: 99,
    image: "/images/products/women-red-dress.webp",
    rating: 0,
    wishlist: 0,
  },
  {
    id: 16,
    title: "Women black leather handbag",
    category: "Jewelry & Accessories",
    price: 39,
    oldPrice: 49,
    image: "/images/products/kipling-bag-hover.webp",
    rating: 0,
    wishlist: 0,
  },
  {
    id: 17,
    title: "Black bag over the shoulder",
    category: "Jewelry & Accessories",
    price: 49,
    oldPrice: 60,
    image: "/images/products/kipling-bag.webp",
    rating: 5,
    wishlist: 0,
  },
  {
    id: 18,
    title: "Gucci nylon fabric smart backpack",
    category: "Jewelry & Accessories",
    price: 89,
    image: "/images/products/black-backpack.webp",
    rating: 0,
    wishlist: 0,
  },
  {
    id: 19,
    title: "Stylish navy blue sneakers",
    category: "Shoes",
    price: 55,
    oldPrice: 65,
    image: "/images/products/brown-bootie-hover.webp",
    rating: 0,
    wishlist: 0,
  },
  {
    id: 20,
    title: "Polka dot summer dress",
    category: "Clothing",
    price: 35,
    oldPrice: 45,
    image: "/images/products/polka-dress.webp",
    rating: 0,
    wishlist: 0,
  },
  {
    id: 21,
    title: "Colorful women scarves",
    category: "Jewelry & Accessories",
    price: 19,
    image: "/images/products/scarves.webp",
    rating: 0,
    wishlist: 0,
  },
  {
    id: 22,
    title: "White elegant lace top",
    category: "Clothing",
    price: 42,
    oldPrice: 50,
    image: "/images/products/elegant-white-lace.webp",
    rating: 0,
    wishlist: 0,
  },
  {
    id: 23,
    title: "Cobalt casual men t-shirt",
    category: "Clothing",
    price: 22,
    image: "/images/products/cobalt-man-tshirt.webp",
    rating: 0,
    wishlist: 0,
  },
];

const CATEGORIES = [
  "Clothing",
  "Shoes",
  "Home & Living",
  "Jewelry & Accessories",
  "Toys & Entertainment",
  "Graphics & Photos",
  "Video & Audio",
];

type ProfileTab =
  | "products"
  | "followers"
  | "following"
  | "reviews"
  | "my-reviews"
  | "shop-policies";

export default function AdminProfilePage() {
  const { user } = useAuth();
  const displayName = user?.name || "Admin";
  const displayAvatar = user?.avatar || "/assets/img/admin-avatar.jpg";
  const displayEmail = user?.email || "admin@gmail.com";
  const [activeTab, setActiveTab] = useState<ProfileTab>("products");
  const [showPhone, setShowPhone] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("Most Recent");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Filter products
  const filteredProducts = PRODUCTS_DATA.filter((p) => {
    if (selectedCategory && p.category !== selectedCategory) {
      return false;
    }
    if (keyword && !p.title.toLowerCase().includes(keyword.toLowerCase())) {
      return false;
    }
    if (minPrice && typeof p.price === "number" && p.price < Number(minPrice)) {
      return false;
    }
    if (maxPrice && typeof p.price === "number" && p.price > Number(maxPrice)) {
      return false;
    }
    return true;
  });

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen">
      {/* 1. Full-Width Cover Banner */}
      <div className="w-full h-[220px] sm:h-[280px] md:h-[340px] overflow-hidden relative bg-[#2a2e33]">
        <img
          src="/images/banners/admin-profile-cover.jpg"
          alt="Home Design Cover"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* 2. Main Profile Content Container */}
      <div className="max-w-[1320px] mx-auto px-4 py-6 font-sans">
        {/* Profile Card Header */}
        <div className="bg-white rounded-[4px] border border-[#e9ecef] p-6 mb-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Square Rounded Avatar */}
            <div className="shrink-0">
              <img
                src={displayAvatar}
                alt={displayName}
                className="w-[140px] h-[140px] sm:w-[150px] sm:h-[150px] object-cover rounded-[4px] shadow-xs border border-gray-100"
              />
            </div>

            {/* Profile Info Details */}
            <div className="flex-1 space-y-2">
              {/* Name & Verified Badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-[22px] sm:text-[24px] font-bold text-[#222222] tracking-tight">
                  {displayName}
                </h1>
                <span
                  title="Verified Vendor"
                  className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-[#00a99d] text-white"
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
              </div>

              {/* Online Status */}
              <div className="flex items-center gap-2 text-[12px] text-[#777777]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#28a745] inline-block shadow-2xs" />
                <span>
                  Last seen: <span className="font-medium text-[#555555]">Just Now</span>
                </span>
              </div>

              {/* Ratings and Sales */}
              <div className="flex items-center gap-3 text-[13px] pt-0.5">
                <div className="flex items-center gap-0.5 text-[#ffc107]">
                  <Star className="w-4 h-4 fill-[#ffc107] text-[#ffc107]" />
                  <Star className="w-4 h-4 fill-[#ffc107] text-[#ffc107]" />
                  <Star className="w-4 h-4 fill-[#ffc107] text-[#ffc107]" />
                  <Star className="w-4 h-4 fill-[#ffc107] text-[#ffc107]" />
                  <Star className="w-4 h-4 fill-[#ffc107] text-[#ffc107]" />
                </div>
                <span className="text-[#555555] font-medium">(2)</span>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-1.5 text-[#555555]">
                  <ShoppingCart className="w-3.5 h-3.5 text-[#777777]" />
                  <span>9 Sales</span>
                </div>
              </div>

              {/* Bio / Description */}
              <p className="text-[13px] text-[#666666] leading-relaxed pt-1 max-w-4xl">
                We offer a wide variety of products ranging from everyday essentials to specialty items, all carefully selected to meet your needs and exceed your expectations.
              </p>

              {/* Member Since, Phone, Email */}
              <div className="flex items-center flex-wrap gap-x-5 gap-y-2 text-[13px] text-[#777777] pt-2">
                <span>Member since July 2026</span>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#555555]" />
                  <button
                    type="button"
                    onClick={() => setShowPhone(!showPhone)}
                    className="hover:text-[#00a99d] transition-colors cursor-pointer text-[#555555]"
                  >
                    {showPhone ? "+1 (555) 019-2834" : "Show"}
                  </button>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#555555]" />
                  <a
                    href={`mailto:${displayEmail}`}
                    className="hover:text-[#00a99d] transition-colors text-[#555555]"
                  >
                    {displayEmail}
                  </a>
                </div>
              </div>

              {/* Social Media Circular Buttons */}
              <div className="flex items-center flex-wrap gap-2 pt-3">
                {[
                  { name: "Facebook", icon: "f", url: "https://facebook.com" },
                  { name: "Twitter", icon: "𝕏", url: "https://twitter.com" },
                  { name: "Instagram", icon: "ig", url: "https://instagram.com" },
                  { name: "TikTok", icon: "tt", url: "https://tiktok.com" },
                  { name: "WhatsApp", icon: "wa", url: "https://whatsapp.com" },
                  { name: "YouTube", icon: "yt", url: "https://youtube.com" },
                  { name: "Discord", icon: "dc", url: "https://discord.com" },
                  { name: "Twitch", icon: "tw", url: "https://twitch.tv" },
                  { name: "Website", icon: "web", url: "https://codingest.net" },
                  { name: "RSS", icon: "rss", url: "#" },
                ].map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.name}
                    className="w-[30px] h-[30px] rounded-full border border-[#ced4da] hover:border-[#00a99d] hover:bg-[#00a99d] hover:text-white text-[#777777] flex items-center justify-center transition-all text-[12px] font-semibold cursor-pointer"
                  >
                    {s.icon === "web" ? (
                      <Globe className="w-3.5 h-3.5" />
                    ) : s.icon === "rss" ? (
                      <Rss className="w-3.5 h-3.5" />
                    ) : (
                      <span>{s.icon}</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Profile Navigation Tabs */}
        <div className="border-b border-[#e5e5e5] mb-6 bg-white rounded-t-[4px] px-2 pt-2">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
            {[
              { id: "products", label: "Products (23)" },
              { id: "followers", label: "Followers (0)" },
              { id: "following", label: "Following (1)" },
              { id: "reviews", label: "Reviews (2)" },
              { id: "my-reviews", label: "My Reviews (5)" },
              { id: "shop-policies", label: "Shop Policies" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as ProfileTab)}
                  className={`pb-3 px-4 sm:px-5 text-[14px] transition-colors cursor-pointer select-none relative whitespace-nowrap ${
                    isActive
                      ? "text-[#222222] font-semibold"
                      : "text-[#666666] hover:text-[#222222] font-medium"
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#222222]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Tab Content: PRODUCTS (23) */}
        {activeTab === "products" && (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Left Filter Sidebar */}
            <aside className="w-full lg:w-[250px] shrink-0 bg-white border border-[#e9ecef] rounded-[3px] p-5 space-y-6 shadow-2xs">
              {/* Category Filter */}
              <div>
                <h3 className="text-[14px] font-bold text-[#222222] mb-3 border-b border-[#f1f3f5] pb-2">
                  Category
                </h3>
                <div className="flex flex-col space-y-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(null)}
                    className={`text-left text-[13px] transition-colors py-0.5 cursor-pointer ${
                      selectedCategory === null
                        ? "text-[#00a99d] font-semibold"
                        : "text-[#666666] hover:text-[#00a99d]"
                    }`}
                  >
                    All Categories
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        setSelectedCategory(selectedCategory === cat ? null : cat)
                      }
                      className={`text-left text-[13px] transition-colors py-0.5 cursor-pointer ${
                        selectedCategory === cat
                          ? "text-[#00a99d] font-semibold"
                          : "text-[#666666] hover:text-[#00a99d]"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-[14px] font-bold text-[#222222] mb-3 border-b border-[#f1f3f5] pb-2">
                  Price
                </h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full h-[36px] px-3 text-[13px] text-[#495057] placeholder:text-[#adb5bd] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full h-[36px] px-3 text-[13px] text-[#495057] placeholder:text-[#adb5bd] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                  />
                </div>
              </div>

              {/* Filter by keyword */}
              <div>
                <h3 className="text-[14px] font-bold text-[#222222] mb-3 border-b border-[#f1f3f5] pb-2">
                  Filter by keyword
                </h3>
                <input
                  type="text"
                  placeholder="Keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full h-[36px] px-3 text-[13px] text-[#495057] placeholder:text-[#adb5bd] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] mb-3"
                />
                <button
                  type="button"
                  onClick={() => {}}
                  className="w-full h-[36px] bg-[#f0f2f5] hover:bg-[#e4e6eb] text-[#495057] text-[13px] font-medium rounded-[2px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Filter</span>
                </button>
              </div>
            </aside>

            {/* Right Products Content Area */}
            <div className="flex-1 w-full">
              {/* Sort By Dropdown Bar */}
              <div className="flex justify-end mb-4 relative">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="flex items-center gap-2 px-3.5 py-1.5 border border-[#ced4da] bg-white hover:bg-gray-50 rounded-[2px] text-[13px] text-[#495057] cursor-pointer transition-colors"
                  >
                    <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
                    <span>{sortBy}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  </button>

                  {showSortDropdown && (
                    <div className="absolute right-0 mt-1 w-44 bg-white border border-[#ced4da] rounded-[2px] shadow-md z-20 py-1 text-[13px]">
                      {["Most Recent", "Lowest Price", "Highest Price", "Top Rated"].map(
                        (option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setSortBy(option);
                              setShowSortDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 hover:bg-gray-100 transition-colors cursor-pointer ${
                              sortBy === option ? "font-semibold text-[#00a99d]" : "text-[#495057]"
                            }`}
                          >
                            {option}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Products 4-Column Grid matching Screenshots 2 & 3 */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white border border-[#eef0f2] rounded-[3px] overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
                    >
                      {/* Product Image Box */}
                      <div className="relative aspect-square overflow-hidden bg-gray-50">
                        {product.isFeatured && (
                          <span className="absolute top-2 left-2 z-10 bg-[#28a745] text-white text-[10px] font-medium px-2 py-0.5 rounded-[2px] shadow-2xs">
                            Featured
                          </span>
                        )}
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="p-3.5 flex flex-col flex-1 justify-between">
                        <div>
                          <h4 className="text-[13px] font-medium text-[#222222] line-clamp-2 hover:text-[#00a99d] transition-colors leading-snug cursor-pointer mb-1">
                            {product.title}
                          </h4>
                          <p className="text-[12px] text-[#777777] mb-2">Admin</p>
                        </div>

                        <div>
                          {/* Rating & Wishlist Row */}
                          <div className="flex items-center justify-between text-[12px] text-gray-400 mb-2">
                            <div className="flex items-center gap-0.5 text-[#ffc107]">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-3 h-3 ${
                                    star <= product.rating
                                      ? "fill-[#ffc107] text-[#ffc107]"
                                      : "fill-transparent text-[#e0e0e0]"
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="flex items-center gap-1 text-[#999999]">
                              <Heart className="w-3.5 h-3.5" />
                              <span>{product.wishlist}</span>
                            </div>
                          </div>

                          {/* Price Row */}
                          <div className="flex items-center gap-1.5">
                            {product.price === "Free" ? (
                              <span className="text-[15px] font-bold text-[#28a745]">
                                Free
                              </span>
                            ) : (
                              <>
                                <span className="text-[15px] font-bold text-[#28a745]">
                                  ${product.price}
                                </span>
                                {product.oldPrice && (
                                  <span className="text-[13px] text-[#999999] line-through">
                                    ${product.oldPrice}
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-[#eef0f2] rounded-[3px] py-16 text-center text-[#777777]">
                  No products found matching your filters.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 5. Tab Content: FOLLOWERS (0) */}
        {activeTab === "followers" && (
          <div className="bg-white border border-[#eef0f2] rounded-[3px] py-24 text-center">
            <p className="text-[14px] text-[#777777] font-normal">No records found!</p>
          </div>
        )}

        {/* 6. Tab Content: FOLLOWING (1) */}
        {activeTab === "following" && (
          <div className="bg-white border border-[#eef0f2] rounded-[3px] p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-4 border border-[#e9ecef] rounded-[3px] hover:shadow-2xs transition-shadow">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/trendshop-avatar.jpg"
                    alt="Trendshop"
                    className="w-12 h-12 rounded-full object-cover border border-gray-100"
                  />
                  <div>
                    <h4 className="text-[14px] font-semibold text-[#222222]">Trendshop</h4>
                    <p className="text-[12px] text-[#777777]">12 Products • 4.8 Rating</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="px-3 py-1 text-[12px] font-medium border border-[#00a99d] text-[#00a99d] hover:bg-[#00a99d] hover:text-white rounded-[2px] transition-colors cursor-pointer"
                >
                  Following
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 7. Tab Content: REVIEWS (2) */}
        {activeTab === "reviews" && (
          <div className="bg-white border border-[#eef0f2] rounded-[3px] p-6 space-y-6">
            {[
              {
                id: 1,
                author: "Sarah Jenkins",
                date: "2 weeks ago",
                rating: 5,
                comment:
                  "Absolutely love the handcrafted decorative pillow! The quality of the fabric is top notch and it arrived faster than expected.",
                product: "Handcrafted decorative pillow for a luxurious touch",
              },
              {
                id: 2,
                author: "David Miller",
                date: "1 month ago",
                rating: 5,
                comment:
                  "The floral sundress is so lightweight and breathable. Perfect fit for the summer season. Very happy with the purchase!",
                product: "Floral women sundress",
              },
            ].map((rev) => (
              <div key={rev.id} className="border-b border-[#f1f3f5] pb-5 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[14px] text-[#222222]">
                      {rev.author}
                    </span>
                    <span className="text-[12px] text-gray-400">• {rev.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-[#ffc107]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#ffc107] text-[#ffc107]" />
                    ))}
                  </div>
                </div>
                <p className="text-[13px] text-[#555555] leading-relaxed mb-1">{rev.comment}</p>
                <span className="text-[12px] text-[#00a99d] font-medium">
                  Product: {rev.product}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 8. Tab Content: MY REVIEWS (5) */}
        {activeTab === "my-reviews" && (
          <div className="bg-white border border-[#eef0f2] rounded-[3px] p-6 space-y-5">
            {[
              {
                id: 1,
                seller: "Trendshop",
                product: "Women kipling bailey saddle handbag",
                rating: 5,
                date: "2 months ago",
                review: "The material feels durable, and the design is sleek enough to match both casual and formal outfits.",
              },
              {
                id: 2,
                seller: "FashionHub",
                product: "Floral women sundress",
                rating: 5,
                date: "3 months ago",
                review: "The summer fashion lace top is absolutely beautiful! The lace detailing gives it a very elegant and feminine look.",
              },
              {
                id: 3,
                seller: "ArtisanCrafts",
                product: "Handcrafted decorative pillow",
                rating: 5,
                date: "4 months ago",
                review: "Exceptional craftsmanship. Great addition to the living room sofa.",
              },
              {
                id: 4,
                seller: "UrbanWear",
                product: "Black sneakers with white sole",
                rating: 5,
                date: "5 months ago",
                review: "Comfortable sole cushioning for daily walks. Highly recommended.",
              },
              {
                id: 5,
                seller: "HomeStyle",
                product: "Abstract outdoor artist painting",
                rating: 5,
                date: "6 months ago",
                review: "Vibrant colors that brighten up the whole room! Received well packed.",
              },
            ].map((rev) => (
              <div key={rev.id} className="border-b border-[#f1f3f5] pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[13px] text-[#222222]">
                      Seller: {rev.seller}
                    </span>
                    <span className="text-[12px] text-gray-400">• {rev.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-[#ffc107]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-[#ffc107] text-[#ffc107]" />
                    ))}
                  </div>
                </div>
                <p className="text-[13px] text-[#555555] mb-1">{rev.review}</p>
                <p className="text-[12px] text-gray-400 font-normal">
                  Reviewed: <span className="text-[#00a99d]">{rev.product}</span>
                </p>
              </div>
            ))}
          </div>
        )}

        {/* 9. Tab Content: SHOP POLICIES */}
        {activeTab === "shop-policies" && (
          <div className="bg-white border border-[#eef0f2] rounded-[3px] p-6 sm:p-8 space-y-6 text-[#495057]">
            <div>
              <h3 className="text-[16px] font-bold text-[#222222] mb-2">Shipping Policy</h3>
              <p className="text-[13px] leading-relaxed text-[#666666]">
                All standard orders are processed and shipped within 1-2 business days. Express delivery options are available at checkout. International orders may take 7-14 business days depending on customs clearance.
              </p>
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#222222] mb-2">Refund & Return Policy</h3>
              <p className="text-[13px] leading-relaxed text-[#666666]">
                We accept returns within 14 days of receipt for unopened and unused items. Digital goods and downloads are non-refundable once delivered. Please contact customer support before initiating any return request.
              </p>
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#222222] mb-2">Customer Support</h3>
              <p className="text-[13px] leading-relaxed text-[#666666]">
                Our support team is available Monday through Friday, 9:00 AM – 6:00 PM EST. For any inquiries regarding orders, products, or shipping, please reach out via email at admin@gmail.com.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Floating Back to Top Button matching Screenshot 3 */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          title="Scroll to Top"
          className="fixed bottom-6 right-6 w-9 h-9 bg-[#222222] hover:bg-black text-white flex items-center justify-center rounded-[3px] shadow-lg transition-all z-40 cursor-pointer"
        >
          <ChevronUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
}
