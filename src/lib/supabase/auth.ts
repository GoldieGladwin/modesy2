import { supabase, isSupabaseConfigured } from "./client";
import { DbProfile } from "./types";

export interface SignUpParams {
  email: string;
  password: string;
  username?: string;
  role?: "member" | "vendor" | "moderator" | "admin";
  first_name?: string;
  last_name?: string;
  is_vendor?: boolean;
}

export interface SignInParams {
  email: string;
  password: string;
}

/**
 * Register a new user in Supabase Auth & public.profiles
 */
export async function signUpWithEmail(params: SignUpParams) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error("Supabase is not configured yet") };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
      options: {
        data: {
          username: params.username || params.email.split("@")[0],
          role: params.role || (params.is_vendor ? "vendor" : "member"),
          first_name: params.first_name || "",
          last_name: params.last_name || "",
          is_vendor: params.is_vendor || params.role === "vendor",
        },
      },
    });

    if (error) return { data: null, error };
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(params: SignInParams) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error("Supabase is not configured yet") };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: params.email,
      password: params.password,
    });

    if (error) return { data: null, error };
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

/**
 * Sign out from Supabase Auth
 */
export async function signOutUser() {
  if (!isSupabaseConfigured()) {
    return { error: null };
  }

  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (err) {
    return { error: err as Error };
  }
}

/**
 * Get profile data from public.profiles table
 */
export async function getProfile(userId: string) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error("Supabase is not configured yet") };
  }

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    return { data: data as DbProfile | null, error };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

/**
 * Update user profile
 */
export async function updateProfile(userId: string, updates: Partial<DbProfile>) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error("Supabase is not configured yet") };
  }

  try {
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    return { data: data as DbProfile | null, error };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}
