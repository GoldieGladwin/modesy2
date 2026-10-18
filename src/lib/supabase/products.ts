import { supabase, isSupabaseConfigured } from "./client";
import { DbProduct, DbProductImage } from "./types";

export interface CreateProductInput {
  vendor_id?: string;
  category_id?: string | null;
  brand_id?: string | null;
  title: string;
  slug?: string;
  sku?: string;
  short_description?: string;
  description?: string;
  product_type?: "physical" | "digital" | "service";
  listing_type?: "sell_on_site" | "ordinary_listing" | "bidding";
  price: number;
  discount_rate?: number;
  stock?: number;
  is_featured?: boolean;
  is_promoted?: boolean;
  is_special_offer?: boolean;
  images?: string[];
  status?: "active" | "pending_approval" | "draft" | "hidden" | "sold" | "deleted";
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string;
}

// Generate URL slug from title
export function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base}-${Math.floor(1000 + Math.random() * 9000)}`;
}

/**
 * Fetch all products from Supabase with optional filters
 */
export async function getProducts(options?: {
  status?: string;
  isFeatured?: boolean;
  isPromoted?: boolean;
  isSpecialOffer?: boolean;
  categorySlug?: string;
  categoryId?: string;
  vendorId?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error("Supabase is not configured yet") };
  }

  try {
    let query = supabase
      .from("products")
      .select(`
        *,
        product_images ( id, image_url, is_primary, order_index ),
        categories ( id, name, slug ),
        profiles ( username, first_name, last_name, email )
      `)
      .order("created_at", { ascending: false });

    if (options?.status) {
      query = query.eq("status", options.status);
    }
    if (options?.isFeatured !== undefined) {
      query = query.eq("is_featured", options.isFeatured);
    }
    if (options?.isPromoted !== undefined) {
      query = query.eq("is_promoted", options.isPromoted);
    }
    if (options?.isSpecialOffer !== undefined) {
      query = query.eq("is_special_offer", options.isSpecialOffer);
    }
    if (options?.categoryId) {
      query = query.eq("category_id", options.categoryId);
    } else if (options?.categorySlug) {
      const { data: cat } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", options.categorySlug)
        .maybeSingle();

      if (cat) {
        const { data: childCats } = await supabase
          .from("categories")
          .select("id")
          .eq("parent_id", cat.id);

        // Also fetch grandchildren if any
        let grandChildIds: string[] = [];
        if (childCats && childCats.length > 0) {
          const childIds = childCats.map((c) => c.id);
          const { data: grandChildren } = await supabase
            .from("categories")
            .select("id")
            .in("parent_id", childIds);
          grandChildIds = grandChildren?.map((g) => g.id) || [];
        }

        const allIds = [cat.id, ...(childCats?.map((c) => c.id) || []), ...grandChildIds];
        query = query.in("category_id", allIds);
      }
    }
    if (options?.vendorId) {
      query = query.eq("vendor_id", options.vendorId);
    }
    if (options?.search) {
      query = query.ilike("title", `%${options.search}%`);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query;
    return { data: data as DbProduct[] | null, error };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

/**
 * Fetch single product by slug or ID
 */
export async function getProductBySlugOrId(identifier: string) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error("Supabase is not configured yet") };
  }

  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);

    let query = supabase
      .from("products")
      .select(`
        *,
        product_images ( id, image_url, is_primary, order_index ),
        categories ( id, name, slug ),
        profiles ( username, first_name, last_name, email )
      `);

    if (isUuid) {
      query = query.eq("id", identifier);
    } else if (/^\d+$/.test(identifier)) {
      query = query.or(`slug.eq.${identifier},slug.ilike.%-${identifier}`);
    } else {
      query = query.eq("slug", identifier);
    }

    const { data, error } = await query.maybeSingle();
    return { data: data as DbProduct | null, error };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

/**
 * Create a new product in Supabase (INSERT)
 */
export async function createProduct(input: CreateProductInput) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error("Supabase is not configured. Please add your credentials to .env.local") };
  }

  try {
    // 1. Resolve vendor_id
    let vendorId = input.vendor_id;
    if (!vendorId) {
      const { data: authData } = await supabase.auth.getUser();
      vendorId = authData.user?.id;
    }

    // Fallback demo vendor ID if unauthenticated in dev
    if (!vendorId) {
      vendorId = "00000000-0000-0000-0000-000000000002";
    }

    const slug = input.slug || generateSlug(input.title);

    // 2. Insert into products table
    const { data: newProduct, error: productError } = await supabase
      .from("products")
      .insert({
        vendor_id: vendorId,
        category_id: input.category_id || null,
        brand_id: input.brand_id || null,
        title: input.title,
        slug,
        sku: input.sku || null,
        short_description: input.short_description || null,
        description: input.description || null,
        product_type: input.product_type || "physical",
        listing_type: input.listing_type || "sell_on_site",
        price: input.price,
        discount_rate: input.discount_rate || 0,
        stock: input.stock ?? 10,
        is_featured: input.is_featured || false,
        is_promoted: input.is_promoted || false,
        is_special_offer: input.is_special_offer || false,
        status: input.status || "active",
      })
      .select()
      .single();

    if (productError || !newProduct) {
      return { data: null, error: productError };
    }

    // 3. Insert images if provided
    if (input.images && input.images.length > 0) {
      const imageRows = input.images.map((imgUrl, idx) => ({
        product_id: newProduct.id,
        image_url: imgUrl,
        is_primary: idx === 0,
        order_index: idx + 1,
      }));

      await supabase.from("product_images").insert(imageRows);
    }

    return { data: newProduct as DbProduct, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

/**
 * Update an existing product in Supabase (UPDATE)
 */
export async function updateProduct(input: UpdateProductInput) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error("Supabase is not configured yet") };
  }

  try {
    const { id, images, ...updateFields } = input;

    const { data: updatedProduct, error: updateError } = await supabase
      .from("products")
      .update(updateFields)
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      return { data: null, error: updateError };
    }

    // If new images provided, sync product_images
    if (images && images.length > 0) {
      await supabase.from("product_images").delete().eq("product_id", id);

      const imageRows = images.map((imgUrl, idx) => ({
        product_id: id,
        image_url: imgUrl,
        is_primary: idx === 0,
        order_index: idx + 1,
      }));

      await supabase.from("product_images").insert(imageRows);
    }

    return { data: updatedProduct as DbProduct, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

/**
 * Delete a product from Supabase (DELETE)
 */
export async function deleteProduct(productId: string) {
  if (!isSupabaseConfigured()) {
    return { success: false, error: new Error("Supabase is not configured yet") };
  }

  try {
    const { error } = await supabase.from("products").delete().eq("id", productId);
    if (error) {
      return { success: false, error };
    }
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err as Error };
  }
}
