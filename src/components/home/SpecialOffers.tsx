"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  PROMO_BANNERS,
  SpecialOfferProduct,
} from "@/data/specialOffers";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCurrency } from "@/context/CurrencyContext";
import { getProducts } from "@/lib/supabase/products";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { Heart, ShoppingCart } from "lucide-react";

export default function SpecialOffers() {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const [products, setProducts] = useState<SpecialOfferProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOffers() {
      if (isSupabaseConfigured()) {
        try {
          let { data } = await getProducts({ isSpecialOffer: true, status: "active", limit: 18 });
          if (!data || data.length === 0) {
            const fallback = await getProducts({ status: "active", limit: 18 });
            data = fallback.data;
          }
          if (data && data.length > 0) {
            const mapped: SpecialOfferProduct[] = data.map((p) => {
              const sortedImages = p.product_images
                ? [...p.product_images].sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
                : [];
              const primary =
                sortedImages.find((img) => img.is_primary)?.image_url ||
                sortedImages[0]?.image_url ||
                "/images/products/midi-skirt.webp";

              const disc = Number(p.discount_rate) > 0 ? Math.round(Number(p.discount_rate)) : 10;
              const priceNum = Math.round(Number(p.price));
              const origNum = Math.round(priceNum / (1 - disc / 100));

              // Extract canonical numeric ID from slug ending or numeric id
              const match = p.slug?.match(/-(\d+)$/);
              const canonicalId = match ? parseInt(match[1], 10) : (typeof p.id === "number" ? p.id : 1);

              return {
                id: canonicalId,
                slug: p.slug || String(canonicalId),
                title: p.title,
                badge: `-${disc}%`,
                image: primary,
                seller: p.profiles?.username || "Trendshop",
                rating: Number(p.rating_avg) || 5,
                wishlist: 0,
                price: `$${priceNum}`,
                originalPrice: `$${origNum}`,
              };
            });
            setProducts(mapped);
            setCurrentIndex(mapped.length);
          }
        } catch (e) {
          console.error("Error loading special offers:", e);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    loadOffers();
  }, []);

  const baseCount = products.length;
  // 3 duplicate sets of products for seamless infinite loop
  const extendedProducts = products.length > 0 ? [
    ...products,
    ...products,
    ...products,
  ] : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(6);

  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive itemsPerView detection
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(2);
      } else if (width < 768) {
        setItemsPerView(3);
      } else if (width < 1024) {
        setItemsPerView(4);
      } else {
        setItemsPerView(6);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number | null>(null);
  const hasDraggedRef = useRef(false);
  const dragDistanceRef = useRef(0);

  // Slide navigation
  const handleNext = () => {
    if (isMoving) return;
    setIsMoving(true);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isMoving) return;
    setIsMoving(true);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Drag & Swipe navigation (Fungsi Geser)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    startXRef.current = e.clientX;
    hasDraggedRef.current = false;
    dragDistanceRef.current = 0;
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startXRef.current === null) return;
    const currentX = e.clientX;
    const diff = currentX - startXRef.current;
    dragDistanceRef.current = Math.abs(diff);

    // Only activate drag visuals if moved more than 12px
    if (Math.abs(diff) > 12) {
      hasDraggedRef.current = true;
      setIsDragging(true);
      setDragOffset(diff);
    }
  };

  const handleMouseUp = () => {
    if (startXRef.current === null) return;
    const offset = dragOffset;

    if (hasDraggedRef.current) {
      if (offset > 40) {
        handlePrev();
      } else if (offset < -40) {
        handleNext();
      }
    }

    setIsDragging(false);
    setDragOffset(0);
    startXRef.current = null;
    dragDistanceRef.current = 0;

    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 120);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    hasDraggedRef.current = false;
    dragDistanceRef.current = 0;
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startXRef.current === null) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startXRef.current;
    dragDistanceRef.current = Math.abs(diff);

    if (Math.abs(diff) > 12) {
      hasDraggedRef.current = true;
      setIsDragging(true);
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    if (startXRef.current === null) return;
    const offset = dragOffset;

    if (hasDraggedRef.current) {
      if (offset > 40) {
        handlePrev();
      } else if (offset < -40) {
        handleNext();
      }
    }

    setIsDragging(false);
    setDragOffset(0);
    startXRef.current = null;
    dragDistanceRef.current = 0;

    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 120);
  };

  // Reset position seamlessly when reaching boundary
  const handleTransitionEnd = () => {
    setIsMoving(false);
    if (currentIndex >= baseCount * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - baseCount);
    } else if (currentIndex < baseCount) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + baseCount);
    }
  };

  // Re-enable transition if it was turned off for a snap
  useEffect(() => {
    if (!isTransitioning) {
      // Small timeout to allow DOM to render snapped position without transition
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Smooth Auto-Play every 3.5 seconds
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered, isMoving]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // Star rendering helper
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-0.5 text-[12px]">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? "text-[#f39c12]" : "text-[#dcdcdc]"}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const itemWidthPercentage = 100 / itemsPerView;

  return (
    <section className="w-full py-4 font-sans">
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[20px] font-bold text-[#222222] tracking-tight">
          Special Offers
        </h3>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 py-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-[4px] p-2 animate-pulse space-y-2">
              <div className="aspect-square bg-gray-100 rounded-[3px]" />
              <div className="h-3.5 bg-gray-200 rounded w-3/4 mt-2" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/3 mt-2" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? null : (
      /* CAROUSEL CONTAINER */
      <div
        className="relative group/carousel select-none px-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* PREV BUTTON */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute -left-3.5 top-[40%] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.18)] flex items-center justify-center text-[#555] hover:text-[#00a99d] hover:scale-105 active:scale-95 transition-all cursor-pointer border-0"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* SLIDER VIEWPORT & SMOOTH SLIDING TRACK */}
        <div
          className={`overflow-hidden w-full py-1 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex will-change-transform"
            style={{
              transform: `translateX(calc(-${currentIndex * itemWidthPercentage}% + ${dragOffset}px))`,
              transition: isDragging
                ? "none"
                : isTransitioning
                ? "transform 600ms cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedProducts.map((product, idx) => (
              <div
                key={`${product.id}-${idx}`}
                className="shrink-0 px-2"
                style={{ width: `${itemWidthPercentage}%` }}
              >
                <div className="bg-white border border-[#e8e8e8] rounded-[4px] overflow-hidden flex flex-col justify-between hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-200 group/card h-full">
                  {/* Product Image & Badge */}
                  <div className="relative bg-[#fcfcfc] overflow-hidden aspect-square flex items-center justify-center">
                    {/* Discount Badge */}
                    {product.badge && (
                      <span className="absolute top-2 left-2 bg-[#e74c3c] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-[2px] z-10 leading-none">
                        {product.badge}
                      </span>
                    )}

                    {/* Main Product Image Container with Link */}
                    <Link
                      href={`/product/${product.slug || product.id}`}
                      className="block w-full h-full relative cursor-pointer"
                      onClick={(e) => {
                        if (hasDraggedRef.current) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-105"
                        draggable={false}
                      />
                    </Link>

                    {/* Floating Quick Action Overlay (Cart & Wishlist) */}
                    <div className="absolute right-2 top-2 z-10 flex flex-col gap-1.5 opacity-0 group-hover/card:opacity-100 transition-all duration-300">
                      {/* Add to Wishlist button */}
                      <button
                        type="button"
                        onMouseDown={(e) => e.stopPropagation()}
                        onMouseUp={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                        onTouchEnd={(e) => e.stopPropagation()}
                        aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                        title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                        onClick={async (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          await toggleWishlist(product.id);
                        }}
                        className={`w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer ${
                          isInWishlist(product.id)
                            ? "text-rose-500 border-rose-300"
                            : "text-gray-700 hover:text-rose-500 hover:border-rose-300"
                        }`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 transition-colors ${
                            isInWishlist(product.id) ? "fill-rose-500 text-rose-500" : ""
                          }`}
                        />
                      </button>

                      {/* Add to Cart button */}
                      <button
                        type="button"
                        onMouseDown={(e) => e.stopPropagation()}
                        onMouseUp={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                        onTouchEnd={(e) => e.stopPropagation()}
                        aria-label="Add to cart"
                        title="Add to cart"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(
                            {
                              id: String(product.id),
                              title: product.title,
                              price: product.price,
                              image: product.image,
                              seller: product.seller,
                            },
                            1
                          );
                        }}
                        className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:text-[#00a99d] hover:border-[#00a99d] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-3 flex flex-col flex-1 justify-between bg-white">
                    <div>
                      {/* Title with Link */}
                      <Link
                        href={`/product/${product.slug || product.id}`}
                        className="block"
                        onClick={(e) => {
                          if (hasDraggedRef.current) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <h4 className="text-[13px] font-normal text-[#222222] line-clamp-2 h-[38px] leading-[19px] hover:text-[#00a99d] transition-colors cursor-pointer mb-1">
                          {product.title}
                        </h4>
                      </Link>

                      {/* Seller */}
                      <div className="text-[12px] text-[#7b808a] truncate mb-2">
                        <span className="hover:text-[#00a99d] cursor-pointer">
                          {product.seller}
                        </span>
                      </div>
                    </div>

                    <div>
                      {/* Rating & Likes (Bagian Depan Kartu) */}
                      <div className="flex items-center justify-between text-[12px] mb-2">
                        {renderStars(product.rating)}
                        <button
                          type="button"
                          onMouseDown={(e) => e.stopPropagation()}
                          onMouseUp={(e) => e.stopPropagation()}
                          onTouchStart={(e) => e.stopPropagation()}
                          onTouchEnd={(e) => e.stopPropagation()}
                          aria-label={isInWishlist(product.id) ? "Unlike" : "Like"}
                          title={isInWishlist(product.id) ? "Unlike" : "Like"}
                          onClick={async (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            await toggleWishlist(product.id);
                          }}
                          className="flex items-center text-[11px] text-[#888] hover:text-rose-500 transition-colors cursor-pointer bg-transparent border-0 p-0"
                        >
                          <Heart
                            className={`w-3 h-3 mr-1 transition-colors ${
                              isInWishlist(product.id)
                                ? "fill-rose-500 text-rose-500 stroke-none"
                                : "text-gray-400 stroke-[1.5]"
                            }`}
                          />
                          <span className={isInWishlist(product.id) ? "text-rose-500 font-semibold" : ""}>
                            {product.wishlist + (isInWishlist(product.id) ? 1 : 0)}
                          </span>
                        </button>
                      </div>

                      {/* Price */}
                      <div className="flex items-center space-x-2">
                        <span className="text-[15px] font-bold text-[#00a99d] leading-none">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[13px] text-[#868e96] line-through leading-none">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NEXT BUTTON */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute -right-3.5 top-[40%] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.18)] flex items-center justify-center text-[#555] hover:text-[#00a99d] hover:scale-105 active:scale-95 transition-all cursor-pointer border-0"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
      )}

      {/* PROMO BANNERS SECTION (BELOW SPECIAL OFFERS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {PROMO_BANNERS.map((banner, idx) => {
          const bannerLink =
            idx === 0
              ? "/category/clothing?sub=Women's%20Clothing"
              : "/category/jewelry-accessories?sub=Bags%20%26%20Purses";
          return (
            <Link
              key={banner.id}
              href={bannerLink}
              className="overflow-hidden rounded-[4px] cursor-pointer group/banner shadow-sm block relative hover:opacity-95 transition-opacity"
            >
              <img
                src={banner.image}
                alt={banner.alt}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover/banner:scale-[1.01]"
                draggable={false}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
