"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowUpDown,
  Search,
  ChevronDown,
  ChevronUp,
  Star,
  Heart,
  ShoppingCart,
} from "lucide-react";
import {
  CATEGORIES,
  CategoryItem,
  getCategoryBySlug,
  getCategorySlug,
} from "@/data/categories";
import {
  CATEGORY_PRODUCTS,
  CATEGORY_BRANDS,
  CategoryProduct,
} from "@/data/categoryProducts";
import { useCart } from "@/context/CartContext";

interface CategoryPageViewProps {
  slug: string;
  role?: "guest" | "member" | "moderator" | "vendor" | "admin";
}

function CategoryPageContent({
  slug,
  role = "guest",
}: CategoryPageViewProps) {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const initialSub = searchParams.get("sub");

  // Resolve category details from slug
  const category: CategoryItem = useMemo(() => {
    const found = getCategoryBySlug(slug);
    if (found) return found;
    // Default fallback to Clothing if not found
    return CATEGORIES[0];
  }, [slug]);

  const categorySlug = useMemo(() => getCategorySlug(category), [category]);

  // States
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    initialSub || null
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brandSearch, setBrandSearch] = useState<string>("");
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("most_recent");
  const [wishlistState, setWishlistState] = useState<{ [key: number]: boolean }>({});
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // Sync subcategory when URL search param changes
  useEffect(() => {
    if (initialSub) {
      setSelectedSubCategory(initialSub);
    }
  }, [initialSub]);

  // Subcategories from category
  const subCategoryList = useMemo(() => {
    return category.subcategories?.map((s) => s.title) || [];
  }, [category]);

  // Filter brands based on search input
  const filteredBrands = useMemo(() => {
    if (!brandSearch.trim()) return CATEGORY_BRANDS;
    return CATEGORY_BRANDS.filter((b) =>
      b.toLowerCase().includes(brandSearch.toLowerCase().trim())
    );
  }, [brandSearch]);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleWishlistToggle = (productId: number) => {
    setWishlistState((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Get products for this category
  const productsForCategory = useMemo(() => {
    return CATEGORY_PRODUCTS.filter(
      (p) =>
        p.categorySlug === categorySlug ||
        p.category.toLowerCase() === category.title.toLowerCase()
    );
  }, [categorySlug, category.title]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    let result = productsForCategory.filter((product) => {
      // Subcategory filter
      if (
        selectedSubCategory &&
        product.subCategory?.toLowerCase() !== selectedSubCategory.toLowerCase()
      ) {
        return false;
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // Keyword filter
      if (keyword.trim()) {
        const query = keyword.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(query);
        const matchesSeller = product.seller.toLowerCase().includes(query);
        const matchesBrand = product.brand?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSeller && !matchesBrand) {
          return false;
        }
      }

      // Price filter
      if (minPrice && product.numericPrice < parseFloat(minPrice)) {
        return false;
      }
      if (maxPrice && product.numericPrice > parseFloat(maxPrice)) {
        return false;
      }

      return true;
    });

    // Sort products
    if (sortBy === "lowest_price") {
      result = [...result].sort((a, b) => a.numericPrice - b.numericPrice);
    } else if (sortBy === "highest_price") {
      result = [...result].sort((a, b) => b.numericPrice - a.numericPrice);
    } else if (sortBy === "highest_rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [
    productsForCategory,
    selectedSubCategory,
    selectedBrands,
    keyword,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  // Role based links
  const homeHref = role === "guest" ? "/" : `/${role}`;
  const productsHref =
    role === "guest"
      ? `/category/${categorySlug}`
      : `/${role}/category/${categorySlug}`;

  return (
    <div className="w-full bg-[#f8f9fa] pb-12">
      {/* 1. BREADCRUMB */}
      <div className="max-w-[1320px] mx-auto px-4 pt-4 pb-3 w-full">
        <nav className="text-xs text-gray-500 flex items-center gap-1.5 flex-wrap">
          <Link
            href={homeHref}
            className="hover:text-[#00a99d] transition-colors"
          >
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href={productsHref}
            className="hover:text-[#00a99d] transition-colors"
          >
            Products
          </Link>
          <span className="text-gray-400">/</span>
          <span
            className={`font-semibold cursor-pointer ${
              selectedSubCategory
                ? "hover:text-[#00a99d] text-gray-600"
                : "text-gray-900"
            }`}
            onClick={() => setSelectedSubCategory(null)}
          >
            {category.title}
          </span>
          {selectedSubCategory && (
            <>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-semibold">
                {selectedSubCategory}
              </span>
            </>
          )}
        </nav>
      </div>

      {/* 2. MAIN LAYOUT */}
      <main className="max-w-[1320px] mx-auto px-4 py-2 w-full">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* ================= LEFT SIDEBAR FILTER ================= */}
          <aside className="w-full lg:w-[260px] shrink-0 space-y-4">
            {/* 1. Category Filter Card */}
            <div className="bg-white border border-[#ebebeb] rounded-[2px] p-4 shadow-xs">
              <h3 className="text-xs font-bold uppercase text-gray-800 tracking-wider mb-2.5">
                Category
              </h3>
              <div className="space-y-1.5 text-xs text-gray-700">
                <button
                  type="button"
                  onClick={() => setSelectedSubCategory(null)}
                  className={`flex items-center gap-1.5 font-bold cursor-pointer transition text-[13px] ${
                    selectedSubCategory === null
                      ? "text-[#00a99d]"
                      : "text-gray-900 hover:text-[#00a99d]"
                  }`}
                >
                  <span className="text-sm">←</span>
                  <span>{category.title}</span>
                </button>

                {subCategoryList.length > 0 && (
                  <div className="pl-4 space-y-1.5 pt-1 text-gray-600">
                    {subCategoryList.map((sub) => {
                      const isSelected =
                        selectedSubCategory?.toLowerCase() === sub.toLowerCase();
                      return (
                        <button
                          key={sub}
                          type="button"
                          onClick={() =>
                            setSelectedSubCategory(isSelected ? null : sub)
                          }
                          className={`block text-left w-full text-[13px] hover:text-[#00a99d] transition cursor-pointer leading-[19px] ${
                            isSelected
                              ? "text-[#00a99d] font-semibold"
                              : "text-gray-600"
                          }`}
                        >
                          {sub}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* 2. Brand Filter Card (Collapsible) */}
            <div className="bg-white border border-[#ebebeb] rounded-[2px] p-4 shadow-xs">
              <div
                onClick={() => setIsBrandOpen(!isBrandOpen)}
                className="flex items-center justify-between cursor-pointer select-none mb-2.5"
              >
                <h3 className="text-xs font-bold uppercase text-gray-800 tracking-wider">
                  Brand
                </h3>
                {isBrandOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                )}
              </div>

              {isBrandOpen && (
                <div className="pt-1 space-y-2.5">
                  {/* Brand search box */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Brand"
                      value={brandSearch}
                      onChange={(e) => setBrandSearch(e.target.value)}
                      className="w-full px-2.5 py-1 text-xs bg-white border border-gray-300 rounded-[2px] focus:outline-none focus:border-[#00a99d] text-gray-700 placeholder-gray-400"
                    />
                  </div>

                  {/* Brand checkbox list */}
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {filteredBrands.map((brand) => (
                      <label
                        key={brand}
                        className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer hover:text-gray-900 select-none"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandToggle(brand)}
                          className="rounded-[2px] border-gray-300 text-[#00a99d] focus:ring-[#00a99d] accent-[#00a99d] cursor-pointer w-3.5 h-3.5"
                        />
                        <span className="text-[13px]">{brand}</span>
                      </label>
                    ))}
                    {filteredBrands.length === 0 && (
                      <p className="text-[11px] text-gray-400 italic">
                        No brands found
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Price Filter Card */}
            <div className="bg-white border border-[#ebebeb] rounded-[2px] p-4 shadow-xs">
              <h3 className="text-xs font-bold uppercase text-gray-800 tracking-wider mb-2.5">
                Price
              </h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-1/2 px-2.5 py-1.5 text-xs bg-white border border-gray-300 rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                />
                <span className="text-gray-400 text-xs">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-1/2 px-2.5 py-1.5 text-xs bg-white border border-gray-300 rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                />
              </div>
            </div>

            {/* 4. Filter by Keyword Card */}
            <div className="bg-white border border-[#ebebeb] rounded-[2px] p-4 shadow-xs">
              <h3 className="text-xs font-bold uppercase text-gray-800 tracking-wider mb-2.5">
                Filter by keyword
              </h3>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-gray-300 rounded-[2px] focus:outline-none focus:border-[#00a99d]"
                />
                <button
                  type="button"
                  onClick={() => {}}
                  className="w-full py-1.5 px-3 bg-[#f6f6f6] hover:bg-[#00a99d] hover:text-white text-gray-700 text-xs font-semibold rounded-[2px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-gray-200"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Filter</span>
                </button>
              </div>
            </div>
          </aside>

          {/* ================= RIGHT PRODUCT GRID ================= */}
          <div className="flex-1 w-full space-y-4">
            {/* Top Toolbar: Sort Dropdown */}
            <div className="flex justify-between items-center bg-white border border-[#ebebeb] rounded-[2px] px-4 py-2.5 shadow-xs">
              <span className="text-xs text-gray-500 font-medium">
                Showing {filteredProducts.length} results
              </span>

              <div className="flex items-center gap-2">
                <div className="relative flex items-center">
                  <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 pointer-events-none" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pl-8 pr-6 py-1 text-xs bg-white border border-gray-300 rounded-[2px] focus:outline-none focus:border-[#00a99d] text-gray-700 cursor-pointer"
                  >
                    <option value="most_recent">Most Recent</option>
                    <option value="lowest_price">Lowest Price</option>
                    <option value="highest_price">Highest Price</option>
                    <option value="highest_rating">Highest Rating</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid: 4 columns matching user screenshot */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => {
                  const isHovered = hoveredProduct === product.id;
                  const isWishlisted = Boolean(wishlistState[product.id]);
                  const hasSecondaryImage = Boolean(
                    product.secondaryImage || product.fallbackSecondaryImage
                  );
                  const effectiveSecondary =
                    product.secondaryImage || product.fallbackSecondaryImage;

                  return (
                    <div
                      key={product.id}
                      className="relative bg-white border border-[#ebebeb] rounded-[2px] overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow duration-300 h-full group"
                    >
                      {/* Thumbnail container */}
                      <div
                        className="relative w-full aspect-square bg-[#f8f9fa] overflow-hidden select-none shrink-0"
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        {/* Featured Badge (green in screenshot) */}
                        {product.isFeatured && (
                          <span className="absolute top-2 left-2 z-10 bg-[#00a99d] text-white text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-[2px] shadow-xs pointer-events-none">
                            Featured
                          </span>
                        )}

                        {/* Product Image */}
                        <Link
                          href={`/product/${product.id}`}
                          className="block w-full h-full relative overflow-hidden"
                        >
                          <img
                            src={product.image}
                            alt={product.title}
                            onError={(e) => {
                              if (product.fallbackImage) {
                                e.currentTarget.src = product.fallbackImage;
                              }
                            }}
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            loading="eager"
                          />

                          {/* Secondary Image cross-fade */}
                          {hasSecondaryImage && effectiveSecondary && (
                            <img
                              src={effectiveSecondary}
                              alt={`${product.title} hover`}
                              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-500"
                              style={{
                                opacity: isHovered ? 1 : 0,
                              }}
                              loading="eager"
                            />
                          )}
                        </Link>

                        {/* Floating quick actions */}
                        <div
                          className={`absolute top-2 right-2 z-10 flex flex-col gap-1.5 transition-all duration-200 ${
                            isHovered
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 translate-x-1 pointer-events-none"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart({
                                id: product.id,
                                title: product.title,
                                price: product.price,
                                image: product.image,
                                seller: product.seller,
                              }, 1);
                            }}
                            className="w-7 h-7 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 hover:text-[#00a99d] hover:border-[#00a99d] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                            title="Add to cart"
                            aria-label="Add to cart"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Card details */}
                      <div className="p-3 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Title */}
                          <Link
                            href={`/product/${product.id}`}
                            className="block"
                          >
                            <h3 className="text-xs sm:text-[13px] font-medium text-gray-800 line-clamp-2 hover:text-[#00a99d] leading-snug transition-colors h-[2.3rem] overflow-hidden">
                              {product.title}
                            </h3>
                          </Link>

                          {/* Seller */}
                          <div className="mt-1">
                            <span className="text-[11px] text-[#1963d8] hover:underline cursor-pointer truncate block">
                              {product.seller}
                            </span>
                          </div>
                        </div>

                        <div className="mt-2.5">
                          {/* Rating & Wishlist */}
                          <div className="flex items-center justify-between text-gray-400 mb-1.5">
                            {/* Stars */}
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-3 h-3 ${
                                    star <= product.rating
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-gray-300 stroke-[1.5]"
                                  }`}
                                />
                              ))}
                            </div>

                            {/* Wishlist Heart */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleWishlistToggle(product.id);
                              }}
                              className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-rose-500 transition-colors cursor-pointer bg-transparent border-0 p-0"
                              title={isWishlisted ? "Unlike" : "Like"}
                            >
                              <Heart
                                className={`w-3 h-3 transition-colors ${
                                  isWishlisted || product.favorites > 0
                                    ? "fill-rose-400 text-rose-400 stroke-none"
                                    : "text-gray-300 stroke-[1.5]"
                                }`}
                              />
                              <span
                                className={
                                  isWishlisted
                                    ? "text-rose-500 font-semibold"
                                    : ""
                                }
                              >
                                {isWishlisted
                                  ? product.favorites + 1
                                  : product.favorites}
                              </span>
                            </button>
                          </div>

                          {/* Price */}
                          <div className="flex items-center gap-1.5 pt-0.5 min-h-[20px]">
                            {product.isQuote ? (
                              <span className="text-xs font-bold text-gray-800">
                                {product.price}
                              </span>
                            ) : product.isDiscounted &&
                              product.originalPrice ? (
                              <>
                                <span className="text-sm font-bold text-[#00a99d]">
                                  {product.price}
                                </span>
                                <span className="text-xs text-gray-400 line-through font-normal">
                                  {product.originalPrice}
                                </span>
                              </>
                            ) : (
                              <span className="text-sm font-bold text-gray-900">
                                {product.price}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white border border-[#ebebeb] rounded-[2px] p-12 text-center text-gray-500 text-sm shadow-xs">
                No products found matching your filter criteria.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CategoryPageView(props: CategoryPageViewProps) {
  return (
    <React.Suspense
      fallback={
        <div className="w-full bg-[#f8f9fa] min-h-[400px] flex items-center justify-center text-gray-500 text-sm">
          Loading products...
        </div>
      }
    >
      <CategoryPageContent {...props} />
    </React.Suspense>
  );
}
