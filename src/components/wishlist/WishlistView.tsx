"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ModesyHeader from "@/components/layout/guest/ModesyHeader";
import ModesyFooter from "@/components/layout/guest/ModesyFooter";
import {
  getWishlistProducts,
  normalizeWishlistId,
} from "@/lib/supabase/wishlist";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface WishlistViewProps {
  role?: "guest" | "member" | "vendor" | "admin" | "moderator";
  hideHeaderFooter?: boolean;
  currentUser?: {
    email: string;
    name: string;
    avatar?: string;
    role?: "admin" | "vendor" | "member" | "moderator";
  } | null;
}

export default function WishlistView({
  role = "guest",
  hideHeaderFooter = false,
  currentUser,
}: WishlistViewProps = {}) {
  const { addToCart } = useCart();
  const { wishlistIds, removeFromWishlist } = useWishlist();
  const [products, setProducts] = useState<any[]>([]);

  const homeUrl =
    role === "guest"
      ? "/guest"
      : role === "vendor"
      ? "/vendor"
      : role === "member"
      ? "/member"
      : role === "moderator"
      ? "/moderator"
      : role === "admin"
      ? "/admin"
      : "/";

  const productUrl = (slugOrId: string | number) =>
    role === "guest" ? `/guest/product/${slugOrId}` : `/product/${slugOrId}`;

  useEffect(() => {
    const prods = getWishlistProducts(wishlistIds);
    setProducts(prods);
  }, [wishlistIds]);

  const handleRemove = async (productId: string | number) => {
    const target = normalizeWishlistId(productId);
    setProducts((prev) =>
      prev.filter((item) => normalizeWishlistId(item.id) !== target)
    );
    await removeFromWishlist(productId);
  };

  const content = (
    <main className="flex-1 w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-6">
      {/* Breadcrumb: Home / Wishlist */}
      <nav
        className="text-[12px] text-gray-500 mb-3 flex items-center gap-1.5 font-normal"
        aria-label="Breadcrumb"
      >
        <Link
          href={homeUrl}
          className="text-gray-500 hover:text-[#00a99d] transition-colors"
        >
          Home
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600">Wishlist</span>
      </nav>

      {/* Heading: Wishlist */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
        <h1 className="text-[22px] font-bold text-[#222222]">
          Wishlist ({products.length})
        </h1>
      </div>

        {/* Products Grid or Empty State */}
        {products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[#666666] text-[14px]">No products found!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="group relative bg-white border border-gray-200 rounded-[3px] overflow-hidden hover:shadow-md transition flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
                  <Link href={productUrl(p.slug || p.id)}>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRemove(p.id);
                    }}
                    title="Remove from wishlist"
                    className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-rose-500 hover:text-rose-600 shadow-md flex items-center justify-center transition cursor-pointer hover:scale-110 active:scale-95"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] text-gray-400 block mb-0.5 truncate">
                      {p.category}
                    </span>
                    <Link
                      href={productUrl(p.slug || p.id)}
                      className="text-[13px] font-medium text-gray-800 hover:text-[#00a99d] line-clamp-2 leading-tight mb-2 transition"
                    >
                      {p.title}
                    </Link>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-sm font-bold text-[#00a99d]">
                        {p.price.startsWith("$") ? p.price : `$${p.price}`}
                      </span>
                      {p.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {p.originalPrice.startsWith("$") ? p.originalPrice : `$${p.originalPrice}`}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        addToCart({
                          id: String(p.id),
                          title: p.title,
                          price: p.price,
                          image: p.image,
                          seller: p.vendor || "Trendshop",
                        });
                        alert(`Added "${p.title}" to cart!`);
                      }}
                      className="w-full py-1.5 px-2 bg-[#f8f9fa] hover:bg-[#00a99d] text-gray-700 hover:text-white text-xs font-semibold rounded-[2px] border border-gray-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
  );

  if (hideHeaderFooter) {
    return content;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-800 antialiased">
      {/* 1. Modesy Header */}
      <ModesyHeader
        currentUser={
          currentUser !== undefined
            ? currentUser
            : role === "guest"
            ? null
            : undefined
        }
      />

      {/* 2. Main Content Area */}
      {content}

      {/* 3. Footer */}
      <ModesyFooter />
    </div>
  );
}
