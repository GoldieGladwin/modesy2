import { supabase, isSupabaseConfigured } from "./client";
import { getProductByIdOrSlug, DetailedProduct } from "@/data/productsRegistry";

export const WISHLIST_STORAGE_KEY = "modesy_wishlist_ids";
export const WISHLIST_CHANGE_EVENT = "modesy_wishlist_change";

/**
 * Normalizes any product identifier (number, string id, or slug) to its canonical numeric string ID.
 * Examples:
 * - 37 -> "37"
 * - "seychelles-womens-brown-ankle-bootie-37" -> "37"
 * - "black-midi-skirt-with-white-flowers-41" -> "41"
 */
export function normalizeWishlistId(idOrSlug: string | number): string {
  if (!idOrSlug) return "";
  const str = String(idOrSlug).trim();

  // If it's already a clean numeric string
  if (/^\d+$/.test(str)) {
    return str;
  }

  // If it ends with -<digits> (standard slug pattern in Modesy)
  const match = str.match(/-(\d+)$/);
  if (match) {
    return match[1];
  }

  // Try registry lookup
  try {
    const p = getProductByIdOrSlug(str);
    if (p && p.id !== undefined && p.id !== null) {
      return String(p.id);
    }
  } catch {}

  return str;
}

export function getLocalWishlistIds(scope = "guest"): string[] {
  if (typeof window === "undefined") return [];
  try {
    // Clean up legacy global un-scoped key
    const legacy = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (legacy !== null) {
      if (localStorage.getItem("modesy_wishlist_guest") === null) {
        localStorage.setItem("modesy_wishlist_guest", legacy);
      }
      localStorage.removeItem(WISHLIST_STORAGE_KEY);
    }

    const key = `modesy_wishlist_${scope}`;
    const raw = localStorage.getItem(key);
    if (raw === null) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return Array.from(new Set(parsed.map((id) => normalizeWishlistId(id)).filter(Boolean)));
    }
    return [];
  } catch {
    return [];
  }
}

export function saveLocalWishlistIds(ids: string[], scope = "guest"): void {
  if (typeof window === "undefined") return;
  try {
    const key = `modesy_wishlist_${scope}`;
    const normalized = Array.from(
      new Set(ids.map((id) => normalizeWishlistId(id)).filter(Boolean))
    );
    localStorage.setItem(key, JSON.stringify(normalized));
    window.dispatchEvent(
      new CustomEvent(WISHLIST_CHANGE_EVENT, { detail: { ids: normalized, scope } })
    );
  } catch (e) {
    console.error("Failed to save wishlist", e);
  }
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function resolveProductUuid(productId: string | number): Promise<string | null> {
  const str = String(productId).trim();
  if (UUID_REGEX.test(str)) return str;
  if (!isSupabaseConfigured()) return null;

  try {
    // If it's a numeric id like "37"
    if (/^\d+$/.test(str)) {
      const { data } = await supabase
        .from("products")
        .select("id")
        .ilike("slug", `%-${str}`)
        .maybeSingle();
      if (data?.id) return data.id;
    }

    // Try exact slug lookup
    const { data } = await supabase
      .from("products")
      .select("id")
      .eq("slug", str)
      .maybeSingle();
    if (data?.id) return data.id;
  } catch (err) {
    console.warn("Could not resolve product UUID:", err);
  }

  return null;
}

export async function getWishlistProductIds(
  userId?: string | null,
  scope = "guest"
): Promise<string[]> {
  const localIds = getLocalWishlistIds(scope);

  if (isSupabaseConfigured() && userId) {
    try {
      const { data, error } = await supabase
        .from("wishlists")
        .select(`
          product_id,
          products ( id, slug )
        `)
        .eq("user_id", userId);

      if (!error && data) {
        const dbIds = data
          .map((row: any) => {
            const slug = row.products?.slug;
            if (slug) return normalizeWishlistId(slug);
            return normalizeWishlistId(row.product_id);
          })
          .filter(Boolean);
        const userIds = Array.from(new Set(dbIds));
        saveLocalWishlistIds(userIds, scope);
        return userIds;
      }
    } catch (e) {
      console.warn("Failed to fetch wishlist from Supabase", e);
    }
  }

  return localIds;
}

export async function toggleWishlist(
  productId: string | number,
  userId?: string | null,
  scope = "guest"
): Promise<{ isWishlisted: boolean; ids: string[] }> {
  const idStr = normalizeWishlistId(productId);
  const currentIds = getLocalWishlistIds(scope);
  const exists = currentIds.includes(idStr);

  const nextIds = exists
    ? currentIds.filter((id) => id !== idStr)
    : [...currentIds, idStr];

  saveLocalWishlistIds(nextIds, scope);

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
