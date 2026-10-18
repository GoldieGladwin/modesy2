import { supabase, isSupabaseConfigured } from "./client";

export interface ProductReviewItem {
  id?: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
}

export interface ProductCommentItem {
  id?: string;
  name: string;
  email?: string;
  date: string;
  text: string;
}

const REVIEWS_STORAGE_PREFIX = "modesy_reviews_prod_";
const COMMENTS_STORAGE_PREFIX = "modesy_comments_prod_";

export async function getProductReviews(
  productId: string | number,
  defaultReviews: ProductReviewItem[] = []
): Promise<ProductReviewItem[]> {
  const prodKey = String(productId);

  // 1. Check local storage cache
  let localReviews: ProductReviewItem[] = [];
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(REVIEWS_STORAGE_PREFIX + prodKey);
      if (raw) localReviews = JSON.parse(raw);
    } catch (e) {
      console.warn("Failed to read local reviews", e);
    }
  }

  // 2. Check Supabase
  if (isSupabaseConfigured()) {
    try {
      let { data, error } = await supabase
        .from("product_reviews")
        .select("id, rating, review, review_text, created_at, profiles(username, first_name, last_name, avatar_url)")
        .eq("product_id", prodKey)
        .order("created_at", { ascending: false });

      // Fallback to reviews view if product_reviews has alias issues
      if (error && error.message?.includes("relation")) {
        const fallbackRes = await supabase
          .from("reviews")
          .select("id, rating, review, review_text, created_at, profiles(username, first_name, last_name, avatar_url)")
          .eq("product_id", prodKey)
          .order("created_at", { ascending: false });
        data = fallbackRes.data;
        error = fallbackRes.error;
      }

      if (!error && data && data.length > 0) {
        const dbReviews: ProductReviewItem[] = data.map((d: any) => ({
          id: d.id,
          author: d.profiles?.first_name ? `${d.profiles.first_name} ${d.profiles.last_name || ""}`.trim() : (d.profiles?.username || "Verified Buyer"),
          avatar: d.profiles?.avatar_url || "/assets/img/admin-avatar.jpg",
          rating: d.rating,
          date: new Date(d.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          text: d.review || d.review_text || "",
        }));
        if (typeof window !== "undefined") {
          localStorage.setItem(REVIEWS_STORAGE_PREFIX + prodKey, JSON.stringify(dbReviews));
        }
        return dbReviews;
      }
    } catch (err) {
      console.warn("Failed to fetch reviews from Supabase", err);
    }
  }

  if (localReviews.length > 0) return localReviews;
  return defaultReviews;
}

export async function addProductReview(
  productId: string | number,
  review: { author: string; rating: number; text: string; avatar?: string },
  userId?: string | null
): Promise<ProductReviewItem[]> {
  const prodKey = String(productId);
  const currentReviews = await getProductReviews(productId);

  const newReview: ProductReviewItem = {
    id: `rev-${Date.now()}`,
    author: review.author,
    avatar: review.avatar || "/assets/img/admin-avatar.jpg",
    rating: review.rating,
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    text: review.text,
  };

  const updated = [newReview, ...currentReviews];
  if (typeof window !== "undefined") {
    localStorage.setItem(REVIEWS_STORAGE_PREFIX + prodKey, JSON.stringify(updated));
  }

  if (isSupabaseConfigured()) {
    try {
      const payload: any = {
        product_id: prodKey,
        rating: review.rating,
        review: review.text,
        review_text: review.text,
      };
      if (userId) payload.user_id = userId;

      const { error } = await supabase.from("product_reviews").insert(payload);
      if (error && error.message?.includes("relation")) {
        await supabase.from("reviews").insert(payload);
      }
    } catch (err) {
      console.warn("Failed to insert review into Supabase", err);
    }
  }

  return updated;
}

export async function getProductComments(
  productId: string | number,
  defaultComments: ProductCommentItem[] = []
): Promise<ProductCommentItem[]> {
  const prodKey = String(productId);

  let localComments: ProductCommentItem[] = [];
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(COMMENTS_STORAGE_PREFIX + prodKey);
      if (raw) localComments = JSON.parse(raw);
    } catch (e) {
      console.warn("Failed to read local comments", e);
    }
  }

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("id, name, email, comment, comment_text, created_at")
        .eq("product_id", prodKey)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const dbComments: ProductCommentItem[] = data.map((c: any) => ({
          id: c.id,
          name: c.name || "Anonymous",
          email: c.email,
          date: new Date(c.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          text: c.comment || c.comment_text || "",
        }));
        if (typeof window !== "undefined") {
          localStorage.setItem(COMMENTS_STORAGE_PREFIX + prodKey, JSON.stringify(dbComments));
        }
        return dbComments;
      }
    } catch (err) {
      console.warn("Failed to fetch comments from Supabase", err);
    }
  }

  if (localComments.length > 0) return localComments;
  return defaultComments;
}

export async function addProductComment(
  productId: string | number,
  comment: { name: string; email?: string; text: string },
  userId?: string | null
): Promise<ProductCommentItem[]> {
  const prodKey = String(productId);
  const currentComments = await getProductComments(productId);

  const newComment: ProductCommentItem = {
    id: `cmt-${Date.now()}`,
    name: comment.name,
    email: comment.email,
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    text: comment.text,
  };

  const updated = [newComment, ...currentComments];
  if (typeof window !== "undefined") {
    localStorage.setItem(COMMENTS_STORAGE_PREFIX + prodKey, JSON.stringify(updated));
  }

  if (isSupabaseConfigured()) {
    try {
      const payload: any = {
        product_id: prodKey,
        name: comment.name,
        email: comment.email,
        comment: comment.text,
        comment_text: comment.text,
        target_type: "product",
      };
      if (userId) payload.user_id = userId;
      await supabase.from("comments").insert(payload);
    } catch (err) {
      console.warn("Failed to insert comment into Supabase", err);
    }
  }

  return updated;
}
