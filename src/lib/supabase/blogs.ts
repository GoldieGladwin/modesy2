import { supabase, isSupabaseConfigured } from "./client";

export interface DbBlogPost {
  id: string;
  category_id?: string | null;
  author_id?: string | null;
  title: string;
  slug: string;
  summary?: string | null;
  content: string;
  image_url?: string | null;
  is_published: boolean;
  views_count: number;
  created_at: string;
  blog_categories?: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

export async function getBlogPosts(options?: {
  limit?: number;
  categorySlug?: string;
}) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error("Supabase is not configured yet") };
  }

  try {
    let query = supabase
      .from("blog_posts")
      .select(`
        *,
        blog_categories ( id, name, slug )
      `)
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    return { data: data as DbBlogPost[] | null, error };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}
