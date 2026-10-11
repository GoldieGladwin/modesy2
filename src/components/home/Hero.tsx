"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface HeroSlide {
  id: string | number;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageDesktop: string;
  imageMobile?: string;
  buttonColor?: string;
  buttonTextColor?: string;
}

// Data slide persis sesuai tampilan Modesy
const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: "Find Backpacks That Best Suit You",
    description:
      "Timeless, modern, and feminine pieces made with quality materials and craftsmanship",
    buttonText: "Buy Now",
    buttonLink: "/bags-purses/backpacks",
    imageDesktop: "/images/slider/slider-1.webp",
    imageMobile: "/images/slider/slider-1-mobile.webp",
  },
  {
    id: 2,
    title: "Buy Nice and Unique Clothes",
    description:
      "Discover quality premium basics and trendy essentials at surprisingly affordable prices",
    buttonText: "Explore Now",
    buttonLink: "/clothing/womens-clothing",
    imageDesktop: "/images/slider/slider-2.webp",
    imageMobile: "/images/slider/slider-2-mobile.webp",
  },
];

interface HeroProps {
  slides?: HeroSlide[];
  autoPlayInterval?: number; // Jeda otomatis antar slide (default 5500ms = 5.5 detik)
  showArrows?: boolean;
  className?: string;
}

export default function Hero({
  slides = DEFAULT_SLIDES,
  autoPlayInterval = 5500,
  showArrows = true,
  className = "",
}: HeroProps) {
  // Infinite loop track: kloning slide terakhir di awal (index 0) dan slide pertama di akhir (index 3)
  const extendedSlides = useMemo(() => {
    if (slides.length <= 1) return slides;
    return [slides[slides.length - 1], ...slides, slides[0]];
  }, [slides]);

  // Index dimulai dari 1 (slide asli pertama)
  const [currentIndex, setCurrentIndex] = useState(1);
  const [withAnimation, setWithAnimation] = useState(true);

  // Menyimpan index slide yang saat ini sedang menjalankan animasi teks masuk
  const [animatingIndex, setAnimatingIndex] = useState<number>(1);

  // Lock status agar transisi tidak bertumpuk, dengan safety timeout anti-macet
  const isTransitioningRef = useRef(false);
  const unlockTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fungsi pengunci transisi sementara dengan auto-unlock pengaman
  const lockTransition = useCallback((durationMs = 800) => {
    isTransitioningRef.current = true;
    if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
    unlockTimerRef.current = setTimeout(() => {
      isTransitioningRef.current = false;
    }, durationMs);
  }, []);

  // Drag & Swipe states
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fungsi geser ke kanan / slide berikutnya (Unlimited Scroll tanpa batas)
  const nextSlide = useCallback(() => {
    if (isTransitioningRef.current) return;
    lockTransition(800);

    // Jika sedang berada di ujung clone (index 3), repositioning instan ke index 1 lalu geser ke index 2
    if (currentIndex >= extendedSlides.length - 1) {
      setWithAnimation(false);
      setCurrentIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setWithAnimation(true);
          setCurrentIndex(2);
          setAnimatingIndex(2);
        });
      });
      return;
    }

    setWithAnimation(true);
    const nextIdx = currentIndex + 1;
    setCurrentIndex(nextIdx);
    setAnimatingIndex(nextIdx);
  }, [currentIndex, extendedSlides.length, lockTransition]);

  // Fungsi geser ke kiri / slide sebelumnya (Unlimited Scroll tanpa batas)
  const prevSlide = useCallback(() => {
    if (isTransitioningRef.current) return;
    lockTransition(800);

    // Jika sedang berada di ujung clone awal (index 0), repositioning instan ke index 2 lalu geser ke index 1
    if (currentIndex <= 0) {
      const lastRealIdx = extendedSlides.length - 2;
      setWithAnimation(false);
      setCurrentIndex(lastRealIdx);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setWithAnimation(true);
          const target = lastRealIdx - 1;
          setCurrentIndex(target);
          setAnimatingIndex(target);
        });
      });
      return;
    }

    setWithAnimation(true);
    const prevIdx = currentIndex - 1;
    setCurrentIndex(prevIdx);
    setAnimatingIndex(prevIdx);
  }, [currentIndex, extendedSlides.length, lockTransition]);

  // Handle ketika animasi pergeseran track selesai
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;

    // Buka lock transisi segera setelah track berhenti
    isTransitioningRef.current = false;
  };

  // Bersihkan timer unlock saat unmount
  useEffect(() => {
    return () => {
      if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
    };
  }, []);

  // Autoplay otomatis berganti ke slide berikutnya secara terus menerus
  useEffect(() => {
    if (autoPlayInterval <= 0 || isDragging || slides.length <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlayInterval, isDragging, nextSlide, slides.length, currentIndex]);

  // Touch Swipe Handlers (Layar HP / Tablet)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isTransitioningRef.current) return;
    setTouchStartX(e.targetTouches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null || isTransitioningRef.current) return;
    const currentX = e.targetTouches[0].clientX;
    setDragOffset(currentX - touchStartX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || isTransitioningRef.current) return;
    const minSwipeDistance = 50;

    if (dragOffset < -minSwipeDistance) {
      nextSlide();
    } else if (dragOffset > minSwipeDistance) {
      prevSlide();
    }
    setTouchStartX(null);
    setDragOffset(0);
  };

  // Mouse Drag Handlers (Desktop / Laptop)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isTransitioningRef.current) return;
    setIsDragging(true);
    setTouchStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || touchStartX === null || isTransitioningRef.current) return;
    setDragOffset(e.clientX - touchStartX);
  };

  const handleMouseUp = () => {
    if (!isDragging || isTransitioningRef.current) return;
    const minDragDistance = 60;

    if (dragOffset < -minDragDistance) {
      nextSlide();
    } else if (dragOffset > minDragDistance) {
      prevSlide();
    }
    setIsDragging(false);
    setTouchStartX(null);
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setTouchStartX(null);
      setDragOffset(0);
    }
  };

  return (
    <section
      aria-label="Main Hero Slider"
      className={`relative w-full overflow-hidden select-none bg-neutral-900 ${className}`}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      {/* Definisi Keyframes: Dibuat jauh lebih lambat, mengapung halus & tenang (1.0 detik durasi) */}
      <style>{`
        @keyframes heroTextFadeUp {
          0% {
            opacity: 0;
            transform: translateY(28px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hero-stagger-title {
          animation: heroTextFadeUp 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0.20s both;
        }
        .hero-stagger-desc {
          animation: heroTextFadeUp 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0.45s both;
        }
        .hero-stagger-btn {
          animation: heroTextFadeUp 1.0s cubic-bezier(0.16, 1, 0.3, 1) 0.70s both;
        }
      `}</style>

      {/* Slider Viewport & Infinite Track */}
      <div
        className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] lg:h-[560px] xl:h-[600px] overflow-hidden cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          className="flex h-full w-full will-change-transform"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
            transition:
              isDragging || touchStartX !== null || !withAnimation
                ? "none"
                : "transform 800ms cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          {extendedSlides.map((slide, index) => {
            const isSlideInView = index === currentIndex;
            // Animasi hanya berjalan tepat 1x untuk slide yang sedang dituju
            const shouldAnimate = index === animatingIndex && isSlideInView;

            return (
              <div
                key={`slide-${slide.id}-${index}`}
                className="relative flex-shrink-0 w-full h-full overflow-hidden"
                aria-hidden={!isSlideInView}
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <picture className="w-full h-full block">
                    {slide.imageMobile && (
                      <source
                        media="(max-width: 768px)"
                        srcSet={slide.imageMobile}
                      />
                    )}
                    <img
                      src={slide.imageDesktop}
                      alt={slide.title}
                      className="w-full h-full object-cover object-center pointer-events-none"
                      loading={index === 1 ? "eager" : "lazy"}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (slide.id === 1 && !target.src.includes("modesy.codingest")) {
                          target.src =
                            "https://modesy.codingest.net/uploads/slider/202608/slider_2560x800_6a9434c4d28763-19000658.webp";
                        } else if (slide.id === 2 && !target.src.includes("modesy.codingest")) {
                          target.src =
                            "https://modesy.codingest.net/uploads/slider/202608/slider_2560x800_6a94336760c054-95358530.webp";
                        }
                      }}
                    />
                  </picture>
                  {/* Overlay gradien halus untuk memastikan teks kontras dan terbaca jelas */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent pointer-events-none md:from-black/20" />
                </div>

                {/* Konten Teks di Sisi Kiri */}
                <div className="relative z-10 w-full h-full flex items-center">
                  <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-20 w-full">
                    <div className="max-w-xl sm:max-w-2xl text-left">
                      {/* 1. Judul Slide */}
                      <h2
                        className={`text-2xl sm:text-3xl md:text-4xl lg:text-[46px] xl:text-[50px] font-bold text-white leading-tight sm:leading-tight md:leading-[1.18] tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] ${
                          shouldAnimate
                            ? "hero-stagger-title"
                            : isSlideInView
                            ? "opacity-100 translate-y-0"
                            : "opacity-0"
                        }`}
                        style={{
                          textShadow:
                            "0 2px 10px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3)",
                        }}
                      >
                        {slide.title}
                      </h2>

                      {/* 2. Deskripsi Slide */}
                      <p
                        className={`mt-3 sm:mt-4 text-xs sm:text-sm md:text-base lg:text-[17px] text-white/95 font-normal leading-relaxed max-w-lg drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] ${
                          shouldAnimate
                            ? "hero-stagger-desc"
                            : isSlideInView
                            ? "opacity-100 translate-y-0"
                            : "opacity-0"
                        }`}
                        style={{
                          textShadow: "0 1px 4px rgba(0, 0, 0, 0.45)",
                        }}
                      >
                        {slide.description}
                      </p>

                      {/* 3. Tombol Aksi */}
                      <div
                        className={`mt-5 sm:mt-7 ${
                          shouldAnimate
                            ? "hero-stagger-btn"
                            : isSlideInView
                            ? "opacity-100 translate-y-0"
                            : "opacity-0"
                        }`}
                      >
                        <Link
                          href={slide.buttonLink || "#"}
                          className="inline-flex items-center justify-center px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm md:text-[15px] font-medium text-white bg-[#222222] hover:bg-black rounded-[4px] shadow-md hover:shadow-lg transition-colors duration-200 cursor-pointer"
                          style={{
                            backgroundColor: slide.buttonColor || "#222222",
                            color: slide.buttonTextColor || "#ffffff",
                          }}
                          onClick={(e) => {
                            if (isDragging) e.preventDefault();
                          }}
                        >
                          {slide.buttonText}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tombol Navigasi Panah (Kiri & Kanan Saja Sesuai SS) */}
      {showArrows && slides.length > 1 && (
        <>
          {/* Panah Kiri */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/75 hover:bg-white text-zinc-700 hover:text-black flex items-center justify-center shadow-md backdrop-blur-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/20 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 -ml-0.5" strokeWidth={2.2} />
          </button>

          {/* Panah Kanan */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/75 hover:bg-white text-zinc-700 hover:text-black flex items-center justify-center shadow-md backdrop-blur-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/20 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" strokeWidth={2.2} />
          </button>
        </>
      )}
    </section>
  );
}
