"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, Heart, ShoppingBag, ArrowRight } from "lucide-react";

export interface ProductItem {
  id: number;
  title: string;
  seller: string;
  sellerLink?: string;
  image: string;
  fallbackImage: string;
  hoverImage?: string;
  fallbackHoverImage?: string;
  rating: number; // 0 sampai 5
  likes: number;
  price?: number;
  oldPrice?: number;
  isQuote?: boolean;
  link: string;
}

// 12 Produk New Arrivals persis sesuai data dan gambar Modesy di screenshot beserta gambar hover
export const NEW_ARRIVALS_PRODUCTS: ProductItem[] = [
  {
    id: 47,
    title: "Colorful women scarves",
    seller: "Trendshop",
    image: "/images/products/scarves.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b48824422f87-70195961.webp",
    hoverImage: "/images/products/scarves-hover.webp",
    fallbackHoverImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b48827defcd6-43890638.webp",
    rating: 0,
    likes: 0,
    price: 40,
    oldPrice: 45,
    link: "#",
  },
  {
    id: 46,
    title: "Women's ankle boot with different colors",
    seller: "Admin",
    image: "/images/products/grey-boots.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b48729787ae5-77108034.webp",
    hoverImage: "/images/products/grey-boots-hover.webp",
    fallbackHoverImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b48731af7348-03410142.webp",
    rating: 0,
    likes: 0,
    price: 59,
    oldPrice: 69,
    link: "#",
  },
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
    id: 44,
    title: "Modern grey couch and pillows",
    seller: "Admin",
    image: "/images/products/grey-couch.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b484e37e8a50-42247775.webp",
    rating: 0,
    likes: 1,
    price: 299,
    link: "#",
  },
  {
    id: 43,
    title: "Black fashion women backpack",
    seller: "Trendshop",
    image: "/images/products/black-backpack.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b4841c7942d4-77775842.webp",
    hoverImage: "/images/products/black-backpack-hover.webp",
    fallbackHoverImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b48436761319-74272069.webp",
    rating: 0,
    likes: 1,
    isQuote: true,
    link: "#",
  },
  {
    id: 42,
    title: "Handcrafted decorative pillow for a luxurious...",
    seller: "Admin",
    image: "/images/products/pillow.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b483286b2598-48004230.webp",
    hoverImage: "/images/products/pillow-hover.webp",
    fallbackHoverImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b4833ada8cd5-61059376.webp",
    rating: 0,
    likes: 0,
    price: 59,
    oldPrice: 69,
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
    id: 40,
    title: "Women kipling bailey saddle handbag",
    seller: "Admin",
    image: "/images/products/kipling-bag.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b47ead253a50-47019432.webp",
    hoverImage: "/images/products/kipling-bag-hover.webp",
    fallbackHoverImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b47eabaeb595-62316622.webp",
    rating: 0,
    likes: 0,
    price: 59,
    oldPrice: 69,
    link: "#",
  },
  {
    id: 39,
    title: "Animal colorful digital prints",
    seller: "Trendshop",
    image: "/images/products/cat-art.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b47e4f83c917-29188591.webp",
    hoverImage: "/images/products/cat-art-hover.webp",
    fallbackHoverImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b47e4d8478d6-88291147.webp",
    rating: 5,
    likes: 0,
    price: 29,
    oldPrice: 39,
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
    id: 37,
    title: "Seychelles women's brown ankle bootie",
    seller: "Trendshop",
    image: "/images/products/brown-bootie.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b4773855d892-33492018.webp",
    hoverImage: "/images/products/brown-bootie-hover.webp",
    fallbackHoverImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b477333a6929-77670847.webp",
    rating: 0,
    likes: 0,
    price: 79,
    link: "#",
  },
  {
    id: 36,
    title: "Ship illustration royalty free image",
    seller: "Admin",
    image: "/images/products/ship-art.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/images/202508/img_w480_68b476dea0d5d2-94701714.webp",
    rating: 0,
    likes: 0,
    price: 15,
    oldPrice: 20,
    link: "#",
  },
];

// 3 Promo Banners di bawah produk New Arrivals
export const PROMO_BANNERS = [
  {
    id: 1,
    title: "New Summer Collection",
    image: "/images/banners/banner-1.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/blocks/202508/block_68b02a748392d5-47296084.webp",
    link: "#",
  },
  {
    id: 2,
    title: "Limited Time SALE",
    image: "/images/banners/banner-2.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/blocks/202508/block_68b02b0fa06e09-81527750.webp",
    link: "#",
  },
  {
    id: 3,
    title: "Up to 50% SALE - Summer Collection",
    image: "/images/banners/banner-3.webp",
    fallbackImage:
      "https://modesy.codingest.net/uploads/blocks/202508/block_68b02a91357c27-13557247.webp",
    link: "#",
  },
];

export default function NewArrivals() {
  const [wishlistState, setWishlistState] = useState<{ [key: number]: boolean }>({});

  const toggleWishlist = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    setWishlistState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="w-full bg-[#fcfcfc] py-10 sm:py-14 lg:py-16">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bagian New Arrivals */}
        <div className="flex items-center justify-between pb-5 sm:pb-6 border-b border-gray-100 mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-[28px] lg:text-3xl font-bold text-gray-900 tracking-tight">
            New Arrivals
          </h2>
          <Link
            href="#"
            className="group inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-semibold text-gray-700 hover:text-black transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid Produk New Arrivals: 6 Kolom di Layar Lebar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
          {NEW_ARRIVALS_PRODUCTS.map((product) => {
            const isLiked = wishlistState[product.id] ?? false;

            return (
              <div
                key={product.id}
                className="group h-full flex flex-col bg-white rounded-lg border border-gray-200/90 hover:border-gray-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Gambar Produk & Tombol Action Overlay */}
                <div className="relative aspect-square w-full bg-[#f8f9fa] overflow-hidden">
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
            );
          })}
        </div>

        {/* 3 Promo Banners di Bawah New Arrivals Sesuai Gambar ke-2 */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-7">
          {PROMO_BANNERS.map((banner) => (
            <Link
              key={banner.id}
              href={banner.link}
              className="group block relative w-full overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes("modesy.codingest")) {
                    target.src = banner.fallbackImage;
                  }
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
