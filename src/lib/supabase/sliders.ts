import { supabase, isSupabaseConfigured } from "./client";
import { DbSlider } from "./types";

export interface CreateSliderInput {
  title?: string;
  link_url?: string;
  image_url: string;
  order_index?: number;
  is_active?: boolean;
}

export interface UpdateSliderInput extends Partial<CreateSliderInput> {
  id: string;
}

export async function getSliders() {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error("Supabase is not configured yet") };
  }

  try {
    const { data, error } = await supabase
      .from("sliders")
      .select("*")
      .order("order_index", { ascending: true });

    return { data: data as DbSlider[] | null, error };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

export async function createSlider(input: CreateSliderInput) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error("Supabase is not configured yet") };
  }

  try {
    const { data, error } = await supabase
      .from("sliders")
      .insert({
        title: input.title || null,
        link_url: input.link_url || null,
        image_url: input.image_url,
        order_index: input.order_index || 1,
        is_active: input.is_active ?? true,
      })
      .select()
      .single();

    return { data: data as DbSlider | null, error };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

export async function updateSlider(input: UpdateSliderInput) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error("Supabase is not configured yet") };
  }

  try {
    const { id, ...fields } = input;
    const { data, error } = await supabase
      .from("sliders")
      .update(fields)
      .eq("id", id)
      .select()
      .single();

    return { data: data as DbSlider | null, error };
  } catch (err) {
    return { data: null, error: err as Error };
  }
}

export async function deleteSlider(id: string) {
  if (!isSupabaseConfigured()) {
    return { success: false, error: new Error("Supabase is not configured yet") };
  }

  try {
    const { error } = await supabase.from("sliders").delete().eq("id", id);
    if (error) return { success: false, error };
    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err as Error };
  }
}
