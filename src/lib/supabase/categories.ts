import { supabase, isSupabaseConfigured } from "./client";
import { DbCategory } from "./types";

export interface CreateCategoryInput {
  name: string;
  slug?: string;
  parent_id?: string | null;
  description?: string;
  image_url?: string;
  order_index?: number;
  is_featured?: boolean;
  show_on_homepage?: boolean;
}

export interface UpdateCategoryInput extends Partial<CreateCategoryInput> {
  id: string;
}

export function generateCategorySlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Fetch all categories from Supabase
 */
export async function getCategories() {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error("Supabase is not configured yet") };
  }

  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("order_index", { ascending: true });

    return { data: data as DbCategory[] | null, error };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

/**
 * Create a new category (INSERT)
 */
export async function createCategory(input: CreateCategoryInput) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error("Supabase is not configured yet") };
  }

  try {
    const slug = input.slug || generateCategorySlug(input.name);

    const { data, error } = await supabase
      .from("categories")
      .insert({
        name: input.name,
        slug,
        parent_id: input.parent_id || null,
        description: input.description || null,
        image_url: input.image_url || null,
        order_index: input.order_index || 1,
        is_featured: input.is_featured ?? false,
        show_on_homepage: input.show_on_homepage ?? true,
      })
      .select()
      .single();

    return { data: data as DbCategory | null, error };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

/**
 * Update a category (UPDATE)
 */
export async function updateCategory(input: UpdateCategoryInput) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error("Supabase is not configured yet") };
  }

  try {
    const { id, ...fields } = input;
    const { data, error } = await supabase
      .from("categories")
      .update(fields)
      .eq("id", id)
      .select()
      .single();

    return { data: data as DbCategory | null, error };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

/**
 * Delete a category (DELETE)
 */
export async function deleteCategory(id: string) {
  if (!isSupabaseConfigured()) {
    return { success: false, error: new Error("Supabase is not configured yet") };
  }

  try {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) return { success: false, error };
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err as Error };
  }
}
