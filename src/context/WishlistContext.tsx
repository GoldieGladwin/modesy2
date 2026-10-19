"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  getLocalWishlistIds,
  saveLocalWishlistIds,
  getWishlistProductIds,
  normalizeWishlistId,
  resolveProductUuid,
  WISHLIST_CHANGE_EVENT,
} from "@/lib/supabase/wishlist";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { useAuth } from "./AuthContext";
import { getStorageScope } from "@/lib/storageScope";

interface WishlistContextType {
  wishlistIds: string[];
  totalWishlistItems: number;
  isInWishlist: (productId: string | number) => boolean;
  toggleWishlist: (productId: string | number) => Promise<boolean>;
  removeFromWishlist: (productId: string | number) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const scope = getStorageScope(user, pathname);

  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const currentLoadedScopeRef = useRef<string>(scope);

  // Initialize and synchronize wishlist per scope
  useEffect(() => {
    setMounted(true);
    currentLoadedScopeRef.current = scope;

    const initial = getLocalWishlistIds(scope);
    setWishlistIds(initial);

    // If logged in and not guest scope, sync with Supabase
    if (user?.id && scope !== "guest") {
      getWishlistProductIds(user.id, scope).then((ids) => {
        if (currentLoadedScopeRef.current === scope) {
          setWishlistIds(ids);
        }
      });
    }

    // Listen to changes across tabs or other components
    const handleStorageChange = (e: any) => {
      if (e?.detail) {
        if (e.detail.scope === scope) {
          setWishlistIds(e.detail.ids || []);
        }
      } else {
        // Native window storage event
        setWishlistIds(getLocalWishlistIds(scope));
      }
    };

    window.addEventListener(WISHLIST_CHANGE_EVENT, handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(WISHLIST_CHANGE_EVENT, handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [scope, user?.id]);

  const isInWishlist = useCallback(
    (productId: string | number): boolean => {
      const target = normalizeWishlistId(productId);
      return wishlistIds.some((id) => normalizeWishlistId(id) === target);
    },
    [wishlistIds]
  );

  const removeFromWishlist = useCallback(
    async (productId: string | number) => {
      const target = normalizeWishlistId(productId);
      const nextIds = wishlistIds.filter((id) => normalizeWishlistId(id) !== target);
      setWishlistIds(nextIds);
      saveLocalWishlistIds(nextIds, scope);

      if (isSupabaseConfigured() && user?.id && scope !== "guest") {
        try {
          const productUuid = await resolveProductUuid(productId);
          if (productUuid) {
            await supabase
              .from("wishlists")
              .delete()
              .eq("user_id", user.id)
              .eq("product_id", productUuid);
          }
        } catch (err) {
          console.warn("Failed to delete wishlist item from Supabase:", err);
        }
      }
    },
    [wishlistIds, scope, user?.id]
  );

  const toggleWishlist = useCallback(
    async (productId: string | number): Promise<boolean> => {
      const target = normalizeWishlistId(productId);
      const isCurrentlyWishlisted = wishlistIds.some(
        (id) => normalizeWishlistId(id) === target
      );
      const nextWishlisted = !isCurrentlyWishlisted;

      // Optimistic update using normalized canonical ID
      const nextIds = nextWishlisted
        ? [...wishlistIds.filter((id) => normalizeWishlistId(id) !== target), target]
        : wishlistIds.filter((id) => normalizeWishlistId(id) !== target);

      setWishlistIds(nextIds);
      saveLocalWishlistIds(nextIds, scope);

      // Persist in Supabase directly using resolved product UUID only for authenticated scope
      if (isSupabaseConfigured() && user?.id && scope !== "guest") {
        try {
          const productUuid = await resolveProductUuid(productId);
          if (productUuid) {
            if (nextWishlisted) {
              await supabase
                .from("wishlists")
                .upsert(
                  { user_id: user.id, product_id: productUuid },
                  { onConflict: "user_id,product_id" }
                );
            } else {
              await supabase
                .from("wishlists")
                .delete()
                .eq("user_id", user.id)
                .eq("product_id", productUuid);
            }
          }
        } catch (err) {
          console.warn("Failed to persist wishlist change in Supabase:", err);
        }
      }

      return nextWishlisted;
    },
    [wishlistIds, scope, user?.id]
  );

  const uniqueWishlistCount = new Set(
    wishlistIds.map((id) => normalizeWishlistId(id)).filter(Boolean)
  ).size;

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        totalWishlistItems: mounted ? uniqueWishlistCount : 0,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
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
      removeFromWishlist: async () => {},
    };
  }
  return context;
}

