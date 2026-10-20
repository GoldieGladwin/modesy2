"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCurrency } from "@/context/CurrencyContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const isWishlisted = isInWishlist(product.id);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const hasMultipleImages = Boolean(product.secondaryImage);
  const pathname = usePathname();
  const isGuest = pathname?.startsWith("/guest");
  const productUrl = isGuest ? `/guest/product/${product.id}` : `/product/${product.id}`;

  return (
    <div className="relative bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow duration-300 h-full">
      {/* ================= THUMBNAIL AREA (HOVER ISOLATED ONLY TO IMAGE) ================= */}
      <div
        className="relative w-full aspect-square bg-gray-50 overflow-hidden select-none flex-shrink-0"
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
      >
        {/* Featured Badge */}
        {product.isFeatured && (
          <span className="absolute top-2 left-2 z-10 bg-[#00a99d] text-white text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-xs shadow-xs pointer-events-none">
            Featured
          </span>
        )}

        {/* Product Image Container with Hardware-Accelerated Smooth Cross-fade */}
        <Link href={productUrl} className="block w-full h-full relative overflow-hidden">
          {/* Primary Image */}
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover object-center will-change-transform"
            style={{
              transform: isImageHovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 700ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            loading="eager"
          />

          {/* Secondary Image - Smooth Crossfade Only When Image is Hovered */}
          {hasMultipleImages && (
            <img
              src={product.secondaryImage}
              alt={`${product.title} alternative view`}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none will-change-transform will-change-opacity"
              style={{
                opacity: isImageHovered ? 1 : 0,
                transform: isImageHovered ? "scale(1.05)" : "scale(1)",
                transition: "opacity 700ms cubic-bezier(0.4, 0, 0.2, 1), transform 700ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              loading="eager"
            />
          )}
        </Link>

        {/* Floating Quick Action Buttons (Shows only when cursor is on image) */}
        <div
          className={`absolute top-2 right-2 z-10 flex flex-col gap-1.5 transition-all duration-300 ease-out ${
            isImageHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-1 pointer-events-none"
          }`}
        >
          {/* Add to Cart button */}
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
                sku: product.sku,
              }, 1);
            }}
            className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:text-[#00a99d] hover:border-[#00a99d] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
            title="Add to cart"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
          </button>

          {/* Add to Wishlist button */}
          <button
            type="button"
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              await toggleWishlist(product.id);
            }}
            className={`w-8 h-8 rounded-full bg-white border shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer ${
              isWishlisted
                ? "text-rose-500 border-rose-300"
                : "text-gray-700 border-gray-200 hover:text-rose-500 hover:border-rose-300"
            }`}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors duration-200 ${
                isWishlisted ? "fill-rose-500 text-rose-500" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* ================= CARD DETAILS ================= */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Product Title */}
          <Link href={productUrl} className="block">
            <h3 className="text-xs sm:text-[13px] font-medium text-gray-800 line-clamp-2 hover:text-[#1963d8] leading-snug transition-colors h-[2.3rem] overflow-hidden">
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
          {/* Stars & Favorite count */}
          <div className="flex items-center justify-between text-gray-400 mb-1.5">
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

            <button
              type="button"
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                await toggleWishlist(product.id);
              }}
              className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-rose-500 transition-colors cursor-pointer bg-transparent border-0 p-0"
              title={isWishlisted ? "Unlike" : "Like"}
            >
              <Heart
                className={`w-3 h-3 transition-colors ${
                  isWishlisted
                    ? "fill-rose-500 text-rose-500 stroke-none"
                    : "text-gray-300 stroke-[1.5]"
                }`}
              />
              <span className={isWishlisted ? "text-rose-500 font-semibold" : ""}>
                {product.favorites + (isWishlisted ? 1 : 0)}
              </span>
            </button>
          </div>

          {/* Pricing Logic */}
          <div className="flex items-center gap-1.5 pt-0.5 min-h-[20px]">
            {product.isQuote ? (
              <span className="text-xs font-bold text-gray-800">
                {product.price}
              </span>
            ) : product.isDiscounted && product.originalPrice ? (
              <>
                <span className="text-sm font-bold text-[#00a99d]">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-gray-400 line-through font-normal">
                  {formatPrice(product.originalPrice)}
                </span>
              </>
            ) : (
              <span className="text-sm font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
