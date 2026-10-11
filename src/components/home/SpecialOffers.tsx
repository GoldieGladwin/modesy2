"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  SPECIAL_OFFERS,
  PROMO_BANNERS,
} from "@/data/specialOffers";

export default function SpecialOffers() {
  const baseCount = SPECIAL_OFFERS.length;
  // 3 duplicate sets of products for seamless infinite loop
  const extendedProducts = [
    ...SPECIAL_OFFERS,
    ...SPECIAL_OFFERS,
    ...SPECIAL_OFFERS,
  ];

  const [currentIndex, setCurrentIndex] = useState(baseCount);
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
    setIsDragging(true);
    startXRef.current = e.clientX;
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || startXRef.current === null) return;
    const currentX = e.clientX;
    setDragOffset(currentX - startXRef.current);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 40) {
      handlePrev();
    } else if (dragOffset < -40) {
      handleNext();
    }
    setDragOffset(0);
    startXRef.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || startXRef.current === null) return;
    const currentX = e.touches[0].clientX;
    setDragOffset(currentX - startXRef.current);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 40) {
      handlePrev();
    } else if (dragOffset < -40) {
      handleNext();
    }
    setDragOffset(0);
    startXRef.current = null;
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

      {/* CAROUSEL CONTAINER */}
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

                    {/* Main Product Image */}
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/card:scale-105"
                      draggable={false}
                    />

                    {/* Floating Quick Action Overlay (Wishlist & Cart) */}
                    <div className="absolute right-2 top-2 flex flex-col space-y-1.5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 z-10">
                      <button
                        type="button"
                        aria-label="Wishlist"
                        className="w-7 h-7 bg-white rounded-full shadow flex items-center justify-center text-[#666] hover:text-[#00a99d] transition-colors border-0 cursor-pointer"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        aria-label="Add to cart"
                        className="w-7 h-7 bg-white rounded-full shadow flex items-center justify-center text-[#666] hover:text-[#00a99d] transition-colors border-0 cursor-pointer"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                          <line x1="3" y1="6" x2="21" y2="6" />
                          <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-3 flex flex-col flex-1 justify-between bg-white">
                    <div>
                      {/* Title */}
                      <h4 className="text-[13px] font-normal text-[#222222] line-clamp-2 h-[38px] leading-[19px] hover:text-[#00a99d] transition-colors cursor-pointer mb-1">
                        {product.title}
                      </h4>

                      {/* Seller */}
                      <div className="text-[12px] text-[#7b808a] truncate mb-2">
                        <span className="hover:text-[#00a99d] cursor-pointer">
                          {product.seller}
                        </span>
                      </div>
                    </div>

                    <div>
                      {/* Rating & Likes */}
                      <div className="flex items-center justify-between text-[12px] mb-2">
                        {renderStars(product.rating)}
                        <span className="text-[#888] flex items-center text-[11px]">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="mr-1"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                          {product.wishlist}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center space-x-2">
                        <span className="text-[15px] font-bold text-[#00a99d] leading-none">
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[13px] text-[#868e96] line-through leading-none">
                            {product.originalPrice}
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

      {/* PROMO BANNERS SECTION (BELOW SPECIAL OFFERS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {PROMO_BANNERS.map((banner) => (
          <div
            key={banner.id}
            className="overflow-hidden rounded-[4px] cursor-pointer group/banner shadow-sm"
          >
            <img
              src={banner.image}
              alt={banner.alt}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover/banner:scale-[1.01]"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
