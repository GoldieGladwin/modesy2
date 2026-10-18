"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ModesyHeader from "@/components/layout/guest/ModesyHeader";
import ModesyFooter from "@/components/layout/guest/ModesyFooter";
import { useAuth } from "@/context/AuthContext";
import {
  getWishlistProductIds,
  getWishlistProducts,
  toggleWishlist,
  WISHLIST_CHANGE_EVENT,
} from "@/lib/supabase/wishlist";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function WishlistView() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadWishlist = async () => {
    setIsLoading(true);
    const ids = await getWishlistProductIds(user?.id);
    setWishlistIds(ids);
    const prods = getWishlistProducts(ids);
    setProducts(prods);
    setIsLoading(false);
  };

  useEffect(() => {
    loadWishlist();

    const handleWishlistChange = (e: any) => {
      const ids: string[] = e.detail || [];
      setWishlistIds(ids);
      setProducts(getWishlistProducts(ids));
    };

    window.addEventListener(WISHLIST_CHANGE_EVENT, handleWishlistChange);
    return () => {
      window.removeEventListener(WISHLIST_CHANGE_EVENT, handleWishlistChange);
    };
  }, [user?.id]);

  const handleRemove = async (productId: string | number) => {
    await toggleWishlist(productId, user?.id);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-800 antialiased">
      {/* 1. Modesy Header */}
      <ModesyHeader
        currentUser={{
          name: user?.name || "Trendshop",
          email: user?.email || "trendshop@gmail.com",
          avatar: user?.avatar || "/assets/img/trendshop-avatar.jpg",
          role: user?.role || "vendor",
        }}
        cartCount={3}
      />

      {/* 2. Main Content Area */}
      <main className="flex-1 w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb: Home / Wishlist */}
        <nav
          className="text-[12px] text-gray-500 mb-3 flex items-center gap-1.5 font-normal"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
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
                  <Link href={`/product/${p.id}`}>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemove(p.id)}
                    title="Remove from wishlist"
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-rose-500 hover:text-rose-600 shadow-sm flex items-center justify-center transition cursor-pointer"
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
                      href={`/product/${p.id}`}
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

      {/* 3. Footer */}
      <ModesyFooter />
    </div>
  );
}
