"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  getLocalWishlistIds,
  saveLocalWishlistIds,
  toggleWishlist as toggleWishlistLib,
  getWishlistProductIds,
  WISHLIST_CHANGE_EVENT,
} from "@/lib/supabase/wishlist";
import { useAuth } from "./AuthContext";

interface WishlistContextType {
  wishlistIds: string[];
  totalWishlistItems: number;
  isInWishlist: (productId: string | number) => boolean;
  toggleWishlist: (productId: string | number) => Promise<boolean>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Initialize wishlist from local storage & Supabase
  useEffect(() => {
    setMounted(true);
    const initial = getLocalWishlistIds();
    setWishlistIds(initial);

    // If logged in, sync with Supabase
    if (user?.id) {
      getWishlistProductIds(user.id).then((ids) => {
        setWishlistIds(ids);
      });
    }

    // Listen to changes across tabs or other components
    const handleStorageChange = (e: any) => {
      if (e?.detail) {
        setWishlistIds(e.detail);
      } else {
        setWishlistIds(getLocalWishlistIds());
      }
    };

    window.addEventListener(WISHLIST_CHANGE_EVENT, handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(WISHLIST_CHANGE_EVENT, handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [user?.id]);

  const isInWishlist = useCallback(
    (productId: string | number): boolean => {
      const idStr = String(productId);
      return wishlistIds.includes(idStr);
    },
    [wishlistIds]
  );

  const toggleWishlist = useCallback(
    async (productId: string | number): Promise<boolean> => {
      const idStr = String(productId);
      const isCurrentlyWishlisted = wishlistIds.includes(idStr);
      const nextWishlisted = !isCurrentlyWishlisted;

      // Optimistic update
      const nextIds = nextWishlisted
        ? [...wishlistIds, idStr]
        : wishlistIds.filter((id) => id !== idStr);

      setWishlistIds(nextIds);
      saveLocalWishlistIds(nextIds);

      // Call library to persist in Supabase if logged in
      try {
        await toggleWishlistLib(productId, user?.id);
      } catch (err) {
        console.warn("Failed to persist wishlist change:", err);
      }

      return nextWishlisted;
    },
    [wishlistIds, user?.id]
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        totalWishlistItems: mounted ? wishlistIds.length : 0,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextType {
  const context = useContext(WishlistContext);
  if (!context) {
    return {
      wishlistIds: [],
      totalWishlistItems: 0,
      isInWishlist: () => false,
      toggleWishlist: async () => false,
    };
  }
  return context;
}
