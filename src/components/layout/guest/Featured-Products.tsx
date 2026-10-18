"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Heart, ChevronDown, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getProducts } from "@/lib/supabase/products";
import { isSupabaseConfigured } from "@/lib/supabase/client";

type Product = {
  id: string;
  title: string;
  seller: string;
  rating: number;
  reviewsCount?: number;
  favoriteCount: number;
  currentPrice: string;
  originalPrice?: string;
  imageUrl: string;
  hoverImageUrl: string;
  fallbackImageUrl?: string;
  fallbackHoverImageUrl?: string;
};

export default function FeaturedProducts() {
  const { addToCart } = useCart();
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function loadFeatured() {
      if (isSupabaseConfigured()) {
        try {
          let { data } = await getProducts({ isFeatured: true, status: "active", limit: 12 });
          // If no featured flag set on some products, load latest active
          if (!data || data.length === 0) {
            const fallback = await getProducts({ status: "active", limit: 12 });
            data = fallback.data;
          }

          if (data && data.length > 0) {
            const liveProducts: Product[] = data.map((p) => {
              const sortedImages = p.product_images
                ? [...p.product_images].sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
                : [];
              const primary =
                sortedImages.find((img) => img.is_primary)?.image_url ||
                sortedImages[0]?.image_url ||
                "/images/products/midi-skirt.webp";
              const secondary = sortedImages[1]?.image_url || primary;

              const isQuote = p.listing_type === "ordinary_listing" || Number(p.price) === 0;
              const formattedPrice = isQuote ? "Request a Quote" : `$${Math.round(Number(p.price))}`;
              const origPrice = Number(p.discount_rate) > 0 && !isQuote
                ? `$${Math.round(Number(p.price) / (1 - Number(p.discount_rate) / 100))}`
                : undefined;

              return {
                id: p.slug || p.id,
                title: p.title,
                seller: p.profiles?.username || "Trendshop",
                rating: Number(p.rating_avg) || 5,
                reviewsCount: p.review_count || 0,
                favoriteCount: 12,
                currentPrice: formattedPrice,
                originalPrice: origPrice,
                imageUrl: primary,
                hoverImageUrl: secondary,
              };
            });
            setProductList(liveProducts);
          }
        } catch (e) {
          console.error("Error loading featured products from database:", e);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">Featured Products</h2>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-[4px] p-2 animate-pulse space-y-2">
              <div className="aspect-[4/5] bg-gray-100 rounded-[3px]" />
              <div className="h-3.5 bg-gray-200 rounded w-3/4 mt-2" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/3 mt-2" />
            </div>
          ))}
        </div>
      ) : productList.length === 0 ? (
        <div className="text-center py-10 text-gray-400 bg-white border border-gray-200 rounded-[4px] text-sm">
          No featured products found in database.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {productList.map((product) => {
            const isLiked = !!likedMap[product.id];
            const displayLikes = product.favoriteCount + (isLiked ? 1 : 0);

          return (
            <div
              key={product.id}
              className="group bg-white border border-gray-200 rounded-[4px] overflow-hidden hover:shadow-md transition-all duration-300 relative cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/5] bg-gray-50 w-full overflow-hidden">
                {/* Product Image Link */}
                <Link href={`/product/${product.id}`} className="block w-full h-full relative overflow-hidden">
                  {/* Primary Image */}
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover transition-all duration-400 ease-in-out group-hover:scale-105 group-hover:opacity-0"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (product.fallbackImageUrl && !target.src.includes("modesy.codingest")) {
                        target.src = product.fallbackImageUrl;
                      }
                    }}
                  />
                  
                  {/* Secondary (Hover) Image */}
                  <img
                    src={product.hoverImageUrl}
                    alt={`${product.title} alternate view`}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-400 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (product.fallbackHoverImageUrl) {
                        target.src = product.fallbackHoverImageUrl;
                      } else if (product.fallbackImageUrl) {
                        target.src = product.fallbackImageUrl;
                      }
                    }}
                  />
                </Link>
                
                {/* Hover Actions (Cart & Wishlist) */}
                <div className="absolute top-2 right-2 flex flex-col gap-2 translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                  <button
                    type="button"
                    onClick={(e) => toggleLike(product.id, e)}
                    className={`bg-white rounded-full p-2 shadow-sm transition-all flex items-center justify-center w-8 h-8 cursor-pointer hover:scale-110 active:scale-95 ${
                      isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
                    }`}
                    title={isLiked ? "Unlike" : "Add to Wishlist"}
                    aria-label="Add to Wishlist"
                  >
                    <Heart
                      size={16}
                      className={isLiked ? "fill-red-500 text-red-500 transition-colors" : "transition-colors"}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart({
                        id: product.id,
                        title: product.title,
                        price: product.currentPrice,
                        image: product.imageUrl || product.fallbackImageUrl || "",
                        seller: product.seller,
                      }, 1);
                    }}
                    className="bg-white rounded-full p-2 text-gray-400 hover:text-[#00a99d] shadow-sm transition-all flex items-center justify-center w-8 h-8 cursor-pointer hover:scale-110 active:scale-95"
                    title="Add to Cart"
                    aria-label="Add to Cart"
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
              
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <Link href={`/product/${product.id}`} className="block">
                    <h3 className="text-[13px] font-medium text-gray-800 leading-snug mb-1 line-clamp-2 min-h-[34px] group-hover:text-[#00a99d] transition-colors">
                      {product.title}
                    </h3>
                  </Link>
                  
                  <div className="text-[11px] text-gray-400 mb-2 truncate">
                    {product.seller}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < product.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={(e) => toggleLike(product.id, e)}
                      className="flex items-center text-xs text-gray-400 hover:text-red-500 transition-colors cursor-pointer bg-transparent border-0 p-0"
                      title={isLiked ? "Unlike" : "Like"}
                    >
                      <Heart
                        size={12}
                        className={`mr-1 transition-colors ${
                          isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
                        }`}
                      />
                      <span className={isLiked ? "text-red-500 font-semibold" : ""}>
                        {displayLikes}
                      </span>
                    </button>
                  </div>
                  
                  <div className="flex items-center pt-1 border-t border-gray-100">
                    {product.currentPrice === "Free" ? (
                      <span className="text-sm font-bold text-[#00a99d]">{product.currentPrice}</span>
                    ) : product.currentPrice === "Request a Quote" ? (
                      <span className="text-sm font-bold text-gray-800">{product.currentPrice}</span>
                    ) : (
                      <>
                        <span className="text-sm font-bold text-[#00a99d] mr-2">{product.currentPrice}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">{product.originalPrice}</span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      )}
      
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          className="flex items-center text-sm font-medium text-gray-700 hover:text-[#00a99d] transition-colors cursor-pointer border border-gray-200 px-5 py-2 rounded-[3px] bg-white hover:bg-gray-50"
        >
          Load More
          <ChevronDown size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
}
