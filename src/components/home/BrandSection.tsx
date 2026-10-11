"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BrandItem {
  id: number;
  name: string;
  logo: React.ReactNode;
}

const brands: BrandItem[] = [
  {
    id: 1,
    name: "Armani",
    logo: (
      <div className="flex flex-col items-center justify-center pointer-events-none">
        <svg className="w-12 h-9 text-gray-900" viewBox="0 0 100 50" fill="currentColor">
          <path d="M50 8c-3 0-5 2-5 4 0 3 2 5 5 5s5-2 5-5c0-2-2-4-5-4zm-14 8c-6 0-14 3-20 6 3 3 8 7 14 7 3-3 5-8 6-13zm28 0c1 5 3 10 6 13 6 0 11-4 14-7-6-3-14-6-20-6zm-14 8c-3 0-6 3-6 7 2 6 5 11 6 15 1-4 4-9 6-15 0-4-3-7-6-7zm-12 1c-4 5-8 10-14 13 6 2 12 3 18 3-1-5-3-11-4-16zm24 0c-1 5-3 11-4 16 6 0 12-1 18-3-6-3-10-8-14-13z" />
        </svg>
      </div>
    ),
  },
  {
    id: 2,
    name: "Burberry",
    logo: (
      <div className="flex flex-col items-center justify-center text-[#1e3a8a] pointer-events-none">
        <svg className="w-11 h-8" viewBox="0 0 100 70" fill="currentColor">
          <path d="M30 15c2-4 8-8 15-5 3 2 6 6 8 10 3 2 8 2 12 0-2 4-5 8-8 10 3 3 7 4 11 3-3 4-7 7-12 8 4 5 10 7 16 8-8 4-17 5-25 3-4-1-8-3-11-6-2 3-5 5-9 6 3-4 5-9 6-14-5-1-10-3-14-6 5-1 9-3 13-6-4-4-7-9-8-15 4 1 8 3 11 5-1-4-1-8 0-12z" />
          <text x="25" y="65" fontSize="11" fontWeight="bold" letterSpacing="2">PRORSUM</text>
        </svg>
      </div>
    ),
  },
  {
    id: 3,
    name: "Diesel",
    logo: (
      <div className="bg-[#e11d48] text-white font-black px-3.5 py-1 text-sm tracking-wider uppercase border border-red-700 shadow-xs pointer-events-none">
        DIESEL
      </div>
    ),
  },
  {
    id: 4,
    name: "Dockers",
    logo: (
      <div className="flex flex-col items-center justify-center text-[#1e293b] pointer-events-none">
        <div className="flex items-center gap-1 font-black text-xs tracking-widest uppercase">
          <span className="text-[10px]">⚓</span>
          <span>DOCKERS</span>
          <span className="text-[10px]">⚓</span>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    name: "Gucci",
    logo: (
      <div className="flex flex-col items-center justify-center text-gray-900 pointer-events-none">
        <span className="text-base font-serif font-black tracking-widest">GUCCI</span>
        <div className="flex -space-x-1.5 opacity-80 scale-75">
          <div className="w-5 h-5 rounded-full border-2 border-gray-900"></div>
          <div className="w-5 h-5 rounded-full border-2 border-gray-900"></div>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    name: "H&M",
    logo: (
      <div className="text-[#dc2626] font-black italic text-2xl tracking-tighter pointer-events-none">
        H&amp;M
      </div>
    ),
  },
  {
    id: 7,
    name: "Hugo Boss",
    logo: (
      <div className="flex flex-col items-center justify-center text-gray-900 leading-none pointer-events-none">
        <span className="text-[11px] font-bold text-[#b91c1c] tracking-widest uppercase mb-0.5">HUGO</span>
        <span className="text-base font-extrabold tracking-widest uppercase">BOSS</span>
      </div>
    ),
  },
  {
    id: 8,
    name: "Lacoste",
    logo: (
      <div className="flex flex-col items-center justify-center text-gray-900 pointer-events-none">
        <svg className="w-8 h-4 text-[#15803d]" viewBox="0 0 100 40" fill="currentColor">
          <path d="M10 20c10-8 30-12 50-8 10 2 20 6 30 14-8-1-16-1-24 1-5 1-10 4-15 7-12-1-24-4-35-10-2-1-4-2-6-4z" />
        </svg>
        <span className="text-[11px] font-black tracking-widest uppercase text-gray-900 mt-0.5">
          LACOSTE
        </span>
      </div>
    ),
  },
];

export default function BrandSection() {
  const baseCount = brands.length;
  // Duplicate for seamless infinite loop
  const extendedBrands = [...brands, ...brands, ...brands];

  const [currentIndex, setCurrentIndex] = useState(baseCount);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(8);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number | null>(null);

  // Responsive itemsPerView
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(3);
      } else if (width < 768) {
        setItemsPerView(4);
      } else if (width < 1024) {
        setItemsPerView(6);
      } else {
        setItemsPerView(8);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Slide navigation: exactly 1 brand card per click
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

  // Infinite circular snap
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

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Drag functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || startXRef.current === null) return;
    setDragOffset(e.clientX - startXRef.current);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 30) {
      handlePrev();
    } else if (dragOffset < -30) {
      handleNext();
    }
    setDragOffset(0);
    startXRef.current = null;
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragOffset(0);
      startXRef.current = null;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || startXRef.current === null) return;
    setDragOffset(e.touches[0].clientX - startXRef.current);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 30) {
      handlePrev();
    } else if (dragOffset < -30) {
      handleNext();
    }
    setDragOffset(0);
    startXRef.current = null;
  };

  const itemWidthPercentage = 100 / itemsPerView;

  return (
    <section className="w-full my-6 font-sans">
      {/* Title */}
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-3.5">
        Shop By Brand
      </h2>

      {/* Brand Box with Navigation */}
      <div className="relative group select-none">
        {/* Left Arrow */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute -left-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:text-[#00a99d] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="Previous brand"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Brand Container with smooth 1-card infinite slide track */}
        <div
          className={`bg-white border border-gray-200 rounded-sm overflow-hidden shadow-2xs ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex will-change-transform divide-x divide-gray-200"
            style={{
              transform: `translateX(calc(-${currentIndex * itemWidthPercentage}% + ${dragOffset}px))`,
              transition: isDragging
                ? "none"
                : isTransitioning
                ? "transform 450ms cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedBrands.map((brand, idx) => (
              <div
                key={`${brand.id}-${idx}`}
                className="shrink-0 h-20 sm:h-22 flex items-center justify-center p-3 hover:bg-gray-50/80 transition-colors group/item"
                style={{ width: `${itemWidthPercentage}%` }}
              >
                <Link
                  href="/"
                  draggable={false}
                  onClick={(e) => {
                    if (isDragging) e.preventDefault();
                  }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <div className="transition-transform duration-200 group-hover/item:scale-105 pointer-events-none">
                    {brand.logo}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:text-[#00a99d] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="Next brand"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
