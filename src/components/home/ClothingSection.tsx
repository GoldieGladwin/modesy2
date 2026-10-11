"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { Star, Heart, ShoppingBag, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export interface ClothingProduct {
  id: number;
  title: string;
  seller: string;
  image: string;
  fallbackImage: string;
  hoverImage?: string;
  fallbackHoverImage?: string;
  rating: number;
  likes: number;
  price?: number;
  oldPrice?: number;
  isQuote?: boolean;
  link: string;
}

// 11 Produk di Section Clothing persis sesuai dengan Modesy
export const CLOTHING_PRODUCTS: ClothingProduct[] = [
  {
    id: 45,
    title: "Navy polka dot dress",
    seller: "Trendshop",
    image: "/images/products/polka-dress.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b48564a31327-49271135.webp",
    hoverImage: "/images/products/polka-dress-hover.webp",
    fallbackHoverImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b485694fb4e1-78372446.webp",
    rating: 0,
    likes: 0,
    price: 130,
    oldPrice: 150,
    link: "#",
  },
  {
    id: 41,
    title: "Black midi skirt with white flowers",
    seller: "Trendshop",
    image: "/images/products/midi-skirt.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b48029e507b3-80580535.webp",
    rating: 4,
    likes: 0,
    price: 48,
    oldPrice: 55,
    link: "#",
  },
  {
    id: 38,
    title: "Floral women sundress",
    seller: "Admin",
    image: "/images/products/floral-sundress.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b4782b9f3272-81456431.webp",
    hoverImage: "/images/products/floral-sundress-hover.webp",
    fallbackHoverImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b4782d17e5e8-92500257.webp",
    rating: 4,
    likes: 0,
    price: 80,
    oldPrice: 89,
    link: "#",
  },
  {
    id: 35,
    title: "Men outerwear navy color",
    seller: "Trendshop",
    image: "/images/products/men-outerwear.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b4745c78aa80-39123844.webp",
    rating: 0,
    likes: 0,
    price: 89,
    oldPrice: 99,
    link: "#",
  },
  {
    id: 31,
    title: "Women lace blouse with different colors",
    seller: "Trendshop",
    image: "/images/products/women-lace-blouse.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b444b8350808-17188737.webp",
    hoverImage: "/images/products/women-lace-blouse-hover.webp",
    fallbackHoverImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b444ba2690c6-93793826.webp",
    rating: 0,
    likes: 1,
    price: 69,
    oldPrice: 79,
    link: "#",
  },
  {
    id: 28,
    title: "Women casual dress",
    seller: "Admin",
    image: "/images/products/women-casual-dress.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b43a9740e718-26703231.webp",
    rating: 0,
    likes: 0,
    price: 56,
    link: "#",
  },
  {
    id: 25,
    title: "Light blue women shirt",
    seller: "Trendshop",
    image: "/images/products/light-blue-shirt.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b425f06cb814-56414881.webp",
    hoverImage: "/images/products/light-blue-shirt-hover.webp",
    fallbackHoverImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b425f0d4fc67-53412693.webp",
    rating: 5,
    likes: 0,
    price: 49,
    oldPrice: 69,
    link: "#",
  },
  {
    id: 22,
    title: "Women red casual dress",
    seller: "Admin",
    image: "/images/products/women-red-dress.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b4243e488706-95544418.webp",
    rating: 0,
    likes: 0,
    price: 99,
    link: "#",
  },
  {
    id: 19,
    title: "Summer fashion top lace",
    seller: "Trendshop",
    image: "/images/products/summer-top-lace.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b4201f177942-79779282.webp",
    hoverImage: "/images/products/summer-top-lace-hover.webp",
    fallbackHoverImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b4201c061823-88575118.webp",
    rating: 5,
    likes: 1,
    price: 65,
    oldPrice: 79,
    link: "#",
  },
  {
    id: 14,
    title: "Elegant white lace fabric",
    seller: "Trendshop",
    image: "/images/products/elegant-white-lace.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b35fa00c5bb8-59638334.webp",
    rating: 0,
    likes: 0,
    price: 59,
    oldPrice: 69,
    link: "#",
  },
  {
    id: 1,
    title: "Cobalt man t-shirt all colors",
    seller: "Admin",
    image: "/images/products/cobalt-man-tshirt.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b32b29e2f025-79851586.webp",
    hoverImage: "/images/products/cobalt-man-tshirt-hover.webp",
    fallbackHoverImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b304f24b4223-50676672.webp",
    rating: 0,
    likes: 1,
    isQuote: true,
    link: "#",
  },
];

const N = CLOTHING_PRODUCTS.length; // 11 produk

export default function ClothingSection() {
  const [wishlistState, setWishlistState] = useState<{ [key: number]: boolean }>({});
  const [visibleCount, setVisibleCount] = useState(6);
  const [currentIndex, setCurrentIndex] = useState(N); // Mulai dari set tengah (index 11)
  const [withAnimation, setWithAnimation] = useState(true);

  const isTransitioningRef = useRef(false);
  const autoUnlockTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Buffer 3 set produk agar scrolling benar-benar unlimited & bolak-balik tanpa batas
  const extendedProducts = useMemo(() => {
    return [
      ...CLOTHING_PRODUCTS.map((p, idx) => ({ ...p, uniqueKey: `prev-${p.id}-${idx}` })),
      ...CLOTHING_PRODUCTS.map((p, idx) => ({ ...p, uniqueKey: `current-${p.id}-${idx}` })),
      ...CLOTHING_PRODUCTS.map((p, idx) => ({ ...p, uniqueKey: `next-${p.id}-${idx}` })),
    ];
  }, []);

  // Update jumlah kartu tampak sesuai ukuran layar
  useEffect(() => {
    const updateVisibleCount = () => {
      const w = window.innerWidth;
      if (w >= 1024) {
        setVisibleCount(6);
      } else if (w >= 768) {
        setVisibleCount(4);
      } else if (w >= 640) {
        setVisibleCount(3);
      } else {
        setVisibleCount(2);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Kembalikan animasi transisi setelah silent repositioning
  useEffect(() => {
    if (!withAnimation) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setWithAnimation(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [withAnimation]);

  const toggleWishlist = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    setWishlistState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Geser tepat 1 kartu ke KANAN (Unlimited)
  const handleNext = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setWithAnimation(true);
    setCurrentIndex((prev) => prev + 1);

    if (autoUnlockTimerRef.current) clearTimeout(autoUnlockTimerRef.current);
    autoUnlockTimerRef.current = setTimeout(() => {
      isTransitioningRef.current = false;
    }, 420);
  };

  // Geser tepat 1 kartu ke KIRI (Unlimited)
  const handlePrev = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setWithAnimation(true);
    setCurrentIndex((prev) => prev - 1);

    if (autoUnlockTimerRef.current) clearTimeout(autoUnlockTimerRef.current);
    autoUnlockTimerRef.current = setTimeout(() => {
      isTransitioningRef.current = false;
    }, 420);
  };

  // Saat transisi selesai, reset silent jika sudah mencapai clone batas agar unlimited
  const handleTransitionEnd = () => {
    isTransitioningRef.current = false;
    if (currentIndex >= 2 * N) {
      setWithAnimation(false);
      setCurrentIndex((prev) => prev - N);
    } else if (currentIndex < N) {
      setWithAnimation(false);
      setCurrentIndex((prev) => prev + N);
    }
  };

  return (
    <section className="w-full bg-[#fcfcfc] py-8 sm:py-12 lg:py-14 border-t border-gray-100">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bagian Clothing: Persis Sesuai Screenshot Pengguna */}
        <div className="flex items-center justify-between pb-5 sm:pb-6 border-b border-gray-100 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-[28px] lg:text-3xl font-bold text-gray-900 tracking-tight">
            <Link href="#" className="hover:text-[#00a99d] transition-colors">
              Clothing
            </Link>
          </h2>

          <Link
            href="#"
            className="group inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-semibold text-gray-700 hover:text-black transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Carousel Produk Clothing dengan Navigasi 1-Card & Infinite Loop */}
        <div className="relative group/carousel">
          {/* Tombol Scroll Kiri (<): Mengambang di atas gambar kartu sebelah kiri, selalu aktif untuk bolak-balik unlimited */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous product"
            className="absolute left-3.5 top-[37%] -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-gray-800 shadow-[0_3px_12px_rgba(0,0,0,0.18)] border border-gray-100 flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 sm:w-5.5 sm:h-5.5 -ml-0.5 text-gray-700" />
          </button>

          {/* Tombol Scroll Kanan (>): Mengambang di atas gambar kartu sebelah kanan, selalu aktif untuk bolak-balik unlimited */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next product"
            className="absolute right-3.5 top-[37%] -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-gray-800 shadow-[0_3px_12px_rgba(0,0,0,0.18)] border border-gray-100 flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5 sm:w-5.5 sm:h-5.5 -mr-0.5 text-gray-700" />
          </button>

          {/* Viewport Carousel dengan Edge Padding Offset */}
          <div className="overflow-hidden -mx-2 sm:-mx-2.5 pb-4 pt-1">
            <div
              className="flex flex-nowrap items-stretch will-change-transform"
              style={{
                width: `${(extendedProducts.length / visibleCount) * 100}%`,
                transform: `translateX(-${(currentIndex / extendedProducts.length) * 100}%)`,
                transition: withAnimation
                  ? "transform 380ms cubic-bezier(0.25, 1, 0.5, 1)"
                  : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedProducts.map((product) => {
                const isLiked = wishlistState[product.id] ?? false;

                return (
                  <div
                    key={product.uniqueKey}
                    className="flex-shrink-0 px-2 sm:px-2.5 h-full flex flex-col"
                    style={{
                      width: `${100 / extendedProducts.length}%`,
                    }}
                  >
                    <div className="group h-full flex flex-col bg-white rounded-lg border border-gray-200/90 hover:border-gray-300 hover:shadow-lg transition-all duration-300 overflow-hidden">
                      {/* Gambar Produk & Tombol Action Overlay */}
                      <div className="relative aspect-square w-full bg-[#f8f9fa] overflow-hidden flex-shrink-0">
                        <Link href={product.link} className="block w-full h-full relative">
                          {/* Gambar Utama (Default Image) */}
                          <img
                            src={product.image}
                            alt={product.title}
                            className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-all duration-400 ease-in-out ${
                              product.hoverImage
                                ? "group-hover:opacity-0 group-hover:scale-105"
                                : "group-hover:scale-105"
                            }`}
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (!target.src.includes("modesy.codingest")) {
                                target.src = product.fallbackImage;
                              }
                            }}
                          />

                          {/* Gambar Kedua saat Diarahkan Cursor (Hover Image) */}
                          {product.hoverImage && (
                            <img
                              src={product.hoverImage}
                              alt={`${product.title} - Preview`}
                              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-400 ease-in-out"
                              onError={(e) => {
                                const target = e.currentTarget;
                                if (
                                  product.fallbackHoverImage &&
                                  !target.src.includes("modesy.codingest")
                                ) {
                                  target.src = product.fallbackHoverImage;
                                }
                              }}
                            />
                          )}
                        </Link>

                        {/* Tombol Action (Cart & Wishlist) saat Hover */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 translate-y-1 group-hover:translate-y-0">
                          <button
                            type="button"
                            aria-label="Add to cart"
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-gray-700 hover:text-black hover:bg-gray-50 shadow-md flex items-center justify-center transition-all cursor-pointer hover:scale-105"
                            onClick={(e) => e.preventDefault()}
                          >
                            <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                          </button>
                          <button
                            type="button"
                            aria-label="Add to wishlist"
                            onClick={(e) => toggleWishlist(product.id, e)}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-gray-700 hover:text-red-500 hover:bg-gray-50 shadow-md flex items-center justify-center transition-all cursor-pointer hover:scale-105"
                          >
                            <Heart
                              className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors ${
                                isLiked ? "fill-red-500 text-red-500" : ""
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Deskripsi & Detail Kartu Produk: Ukuran seragam untuk semua kartu */}
                      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-2">
                        <div>
                          {/* Judul Produk: Tinggi seragam (2 baris) */}
                          <div className="h-[38px] sm:h-[42px] flex items-start overflow-hidden">
                            <h3 className="text-sm sm:text-[15px] font-semibold text-gray-800 leading-snug line-clamp-2 hover:text-[#00a99d] transition-colors">
                              <Link href={product.link} title={product.title}>
                                {product.title}
                              </Link>
                            </h3>
                          </div>

                          {/* Penjual (Vendor): Tinggi seragam */}
                          <div className="mt-1 h-[18px] flex items-center overflow-hidden">
                            <Link
                              href="#"
                              className="text-xs sm:text-[13px] font-medium text-gray-400 hover:text-gray-600 transition-colors truncate"
                            >
                              {product.seller}
                            </Link>
                          </div>

                          {/* Rating Bintang & Jumlah Likes/Wishlist: Tinggi seragam */}
                          <div className="mt-2 h-[20px] flex items-center justify-between text-xs sm:text-[13px]">
                            {/* 5 Bintang Rating */}
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                                    star <= product.rating
                                      ? "text-amber-400 fill-amber-400"
                                      : "text-gray-200"
                                  }`}
                                />
                              ))}
                            </div>

                            {/* Jumlah Likes / Hati */}
                            <div className="flex items-center gap-1 text-gray-400 font-medium">
                              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                              <span>{product.likes + (isLiked ? 1 : 0)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Harga Produk: Tinggi seragam */}
                        <div className="pt-2 border-t border-gray-100/80 h-[34px] flex items-center">
                          {product.isQuote ? (
                            <span className="text-sm sm:text-[15px] font-bold text-gray-900 hover:text-[#00a99d] hover:underline cursor-pointer">
                              Request a Quote
                            </span>
                          ) : (
                            <div className="flex items-baseline gap-2">
                              <span
                                className={`text-base sm:text-[17px] font-bold ${
                                  product.oldPrice
                                    ? "text-[#00a99d]"
                                    : "text-gray-900"
                                }`}
                              >
                                ${product.price}
                              </span>
                              {product.oldPrice && (
                                <del className="text-xs sm:text-sm text-gray-400 font-medium line-through">
                                  ${product.oldPrice}
                                </del>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
