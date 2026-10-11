"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Folder, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { blogPostsData } from "@/data/blogs";

export default function BlogSection() {
  const baseCount = blogPostsData.length;
  // Duplicate 3 sets for smooth infinite repeating slider
  const extendedPosts = [
    ...blogPostsData,
    ...blogPostsData,
    ...blogPostsData,
  ];

  const [currentIndex, setCurrentIndex] = useState(baseCount);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const startXRef = useRef<number | null>(null);

  // Responsive itemsPerView
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(1);
      } else if (width < 768) {
        setItemsPerView(2);
      } else if (width < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

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

  // Seamless reset for infinite loop
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

  // Optional auto-slide paused on hover
  useEffect(() => {
    if (isHovered || isDragging) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered, isDragging, isMoving]);

  // Drag & Swipe navigation
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
    if (dragOffset > 50) {
      handlePrev();
    } else if (dragOffset < -50) {
      handleNext();
    }
    setDragOffset(0);
    startXRef.current = null;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
    if (dragOffset > 50) {
      handlePrev();
    } else if (dragOffset < -50) {
      handleNext();
    }
    setDragOffset(0);
    startXRef.current = null;
  };

  const itemWidthPercentage = 100 / itemsPerView;

  return (
    <section className="w-full my-8 font-sans">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <Link href="/blog" className="group/title inline-block">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 group-hover/title:text-[#00a99d] tracking-tight transition-colors">
            Latest Blog Posts
          </h2>
        </Link>
        <Link
          href="/blog"
          className="text-xs sm:text-sm font-medium text-[#1963d8] hover:underline flex items-center gap-1 transition cursor-pointer"
        >
          View All <span className="text-sm">→</span>
        </Link>
      </div>

      {/* Blog Cards Container with Carousel Controls */}
      <div
        className="relative group select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left Arrow */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute -left-3.5 top-[38%] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:text-[#00a99d] hover:bg-white hover:scale-105 active:scale-95 transition cursor-pointer"
          aria-label="Previous blog posts"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Viewport & Sliding Track */}
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
                ? "transform 550ms cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedPosts.map((post, idx) => (
              <div
                key={`${post.id}-${idx}`}
                className="shrink-0 px-2"
                style={{ width: `${itemWidthPercentage}%` }}
              >
                <div className="bg-white border border-gray-200 rounded-[4px] overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200 h-full">
                  {/* Thumbnail */}
                  <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
                    <Link
                      href={`/blog/${post.categorySlug}/${post.slug}`}
                      className="block w-full h-full"
                      onClick={(e) => {
                        if (isDragging) e.preventDefault();
                      }}
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                        draggable={false}
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.src = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1000&auto=format&fit=crop&q=80";
                        }}
                      />
                    </Link>
                  </div>

                  {/* Card Body */}
                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Article Title */}
                      <Link
                        href={`/blog/${post.categorySlug}/${post.slug}`}
                        onClick={(e) => {
                          if (isDragging) e.preventDefault();
                        }}
                      >
                        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 hover:text-[#00a99d] leading-snug transition-colors">
                          {post.title}
                        </h3>
                      </Link>

                      {/* Meta: Category & Date */}
                      <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-2 mb-2">
                        <Link
                          href={`/blog?category=${encodeURIComponent(post.category)}`}
                          className="flex items-center gap-1 hover:text-[#00a99d] transition"
                        >
                          <Folder className="w-3 h-3 text-gray-400 stroke-[1.5]" />
                          <span>{post.category}</span>
                        </Link>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400 stroke-[1.5]" />
                          <span>{post.time}</span>
                        </div>
                      </div>

                      {/* Snippet / Description */}
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                        {post.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute -right-3.5 top-[38%] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:text-[#00a99d] hover:bg-white hover:scale-105 active:scale-95 transition cursor-pointer"
          aria-label="Next blog posts"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
