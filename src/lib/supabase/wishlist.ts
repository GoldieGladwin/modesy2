import { supabase, isSupabaseConfigured } from "./client";
import { getProductByIdOrSlug, DetailedProduct } from "@/data/productsRegistry";

export const WISHLIST_STORAGE_KEY = "modesy_wishlist_ids";
export const WISHLIST_CHANGE_EVENT = "modesy_wishlist_change";

export function getLocalWishlistIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : ["41"]; // Default with skirt #41
  } catch {
    return [];
  }
}

export function saveLocalWishlistIds(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent(WISHLIST_CHANGE_EVENT, { detail: ids }));
  } catch (e) {
    console.error("Failed to save wishlist", e);
  }
}

export async function getWishlistProductIds(userId?: string | null): Promise<string[]> {
  const localIds = getLocalWishlistIds();

  if (isSupabaseConfigured() && userId) {
    try {
      const { data, error } = await supabase
        .from("wishlists")
        .select("product_id")
        .eq("user_id", userId);

      if (!error && data) {
        const dbIds = data.map((row: any) => String(row.product_id));
        const merged = Array.from(new Set([...localIds, ...dbIds]));
        saveLocalWishlistIds(merged);
        return merged;
      }
    } catch (e) {
      console.warn("Failed to fetch wishlist from Supabase", e);
    }
  }

  return localIds;
}

export async function toggleWishlist(
  productId: string | number,
  userId?: string | null
): Promise<{ isWishlisted: boolean; ids: string[] }> {
  const idStr = String(productId);
  const currentIds = getLocalWishlistIds();
  const exists = currentIds.includes(idStr);

  const nextIds = exists
    ? currentIds.filter((id) => id !== idStr)
    : [...currentIds, idStr];

  saveLocalWishlistIds(nextIds);

  if (isSupabaseConfigured() && userId) {
    try {
      if (exists) {
        await supabase
          .from("wishlists")
          .delete()
          .eq("user_id", userId)
          .eq("product_id", idStr);
      } else {
        await supabase
          .from("wishlists")
          .insert({ user_id: userId, product_id: idStr });
      }
    } catch (e) {
      console.warn("Failed to toggle wishlist in Supabase", e);
    }
  }

  return { isWishlisted: !exists, ids: nextIds };
}

export interface WishlistItem {
  id: number | string;
  title: string;
  price: string;
  originalPrice?: string;
  image: string;
  category: string;
  vendor: string;
  rating: number;
  reviewCount: number;
  slug: string;
}

export function getWishlistProducts(ids: string[]): WishlistItem[] {
  const results: WishlistItem[] = [];
  const seen = new Set<string>();

  for (const id of ids) {
    if (!id || seen.has(id)) continue;
    seen.add(id);

    try {
      const p: DetailedProduct = getProductByIdOrSlug(id);
      if (p) {
        results.push({
          id: p.id,
          title: p.title,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image || p.images?.[0] || "/images/products/placeholder.webp",
          category: p.category,
          vendor: p.seller || "Trendshop",
          rating: p.rating || 4.5,
          reviewCount: p.reviewsCount || p.reviews?.length || 0,
          slug: p.slug,
        });
      }
    } catch (e) {
      console.warn(`Could not resolve product with id ${id}`, e);
    }
  }

  return results;
}
