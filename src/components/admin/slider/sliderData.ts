import { SliderItem, SliderSettings } from "./types";

export const SLIDER_LANGUAGES = ["Arabic", "English", "French", "German"];

export const SLIDER_ANIMATIONS = [
  "none",
  "fadeIn",
  "fadeInDown",
  "fadeInUp",
  "fadeInLeft",
  "fadeInRight",
  "bounceIn",
  "bounceInDown",
  "bounceInUp",
  "bounceInLeft",
  "bounceInRight",
  "zoomIn",
  "zoomInDown",
  "zoomInUp",
  "zoomInLeft",
  "zoomInRight",
  "slideInDown",
  "slideInUp",
  "slideInLeft",
  "slideInRight",
];

export const INITIAL_SLIDER_ITEMS: SliderItem[] = [
  {
    id: 4,
    title: "ابحث عن حقائب الظهر التي تناسبك",
    description: "قطع كلاسيكية وعصرية وأنيقة مصنوعة من مواد فائقة الجودة وبراعة في الصنع",
    link: "https://modesy.codingest.net/bags_purses/backpacks",
    order: 2,
    buttonText: "اشتري الآن",
    textColor: "#ffffff",
    buttonColor: "#000000",
    buttonTextColor: "#ffffff",
    animationTitle: "bounceIn",
    animationDescription: "bounceInDown",
    animationButton: "bounceInRight",
    image: "/images/slider/slider-1.webp",
    imageMobile: "/images/slider/slider-1-mobile.webp",
    language: "Arabic",
  },
  {
    id: 3,
    title: "أزياء عصرية وإكسسوارات صيفية",
    description: "اكتشف تشكيلتنا الحصرية لموسم الصيف بأسعار مميزة وتصاميم رائعة",
    link: "https://modesy.codingest.net/summer-collection",
    order: 1,
    buttonText: "تسوق الآن",
    textColor: "#ffffff",
    buttonColor: "#000000",
    buttonTextColor: "#ffffff",
    animationTitle: "fadeInUp",
    animationDescription: "fadeInUp",
    animationButton: "fadeInUp",
    image: "/images/slider/slider-2.webp",
    imageMobile: "/images/slider/slider-2-mobile.webp",
    language: "Arabic",
  },
  {
    id: 2,
    title: "Women Urban Backpacks",
    description: "Discover versatile modern backpacks for work and adventure.",
    link: "https://modesy.codingest.net/bags_purses/backpacks",
    order: 2,
    buttonText: "Shop Now",
    textColor: "#ffffff",
    buttonColor: "#000000",
    buttonTextColor: "#ffffff",
    animationTitle: "bounceIn",
    animationDescription: "bounceInDown",
    animationButton: "bounceInRight",
    image: "/images/slider/slider-1.webp",
    imageMobile: "/images/slider/slider-1-mobile.webp",
    language: "English",
  },
  {
    id: 1,
    title: "Summer Vacation Essentials",
    description: "Lightweight styles and bohemian accessories for sunny getaways.",
    link: "https://modesy.codingest.net/summer-collection",
    order: 1,
    buttonText: "Explore",
    textColor: "#ffffff",
    buttonColor: "#000000",
    buttonTextColor: "#ffffff",
    animationTitle: "fadeInUp",
    animationDescription: "fadeInUp",
    animationButton: "fadeInUp",
    image: "/images/slider/slider-2.webp",
    imageMobile: "/images/slider/slider-2-mobile.webp",
    language: "English",
  },
];

export const DEFAULT_SLIDER_SETTINGS: SliderSettings = {
  status: "Enable",
  type: "Full Width",
  effect: "Slide",
};

const KEY_SLIDER_ITEMS = "modesy_admin_slider_items_v4";
const KEY_SLIDER_SETTINGS = "modesy_admin_slider_settings_v4";

/* Slider Items Storage */
export function getStoredSliderItems(): SliderItem[] {
  if (typeof window === "undefined") return INITIAL_SLIDER_ITEMS;
  try {
    const data = localStorage.getItem(KEY_SLIDER_ITEMS);
    if (!data) {
      localStorage.setItem(
        KEY_SLIDER_ITEMS,
        JSON.stringify(INITIAL_SLIDER_ITEMS)
      );
      return INITIAL_SLIDER_ITEMS;
    }
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(
        KEY_SLIDER_ITEMS,
        JSON.stringify(INITIAL_SLIDER_ITEMS)
      );
      return INITIAL_SLIDER_ITEMS;
    }
    return parsed;
  } catch {
    return INITIAL_SLIDER_ITEMS;
  }
}

export function getStoredSliderItemById(id: number): SliderItem | null {
  const items = getStoredSliderItems();
  return items.find((item) => item.id === id) || null;
}

export function saveStoredSliderItems(items: SliderItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY_SLIDER_ITEMS, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save slider items", e);
  }
}

import { createSlider, updateSlider, deleteSlider } from "@/lib/supabase/sliders";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export function deleteStoredSliderItem(id: number | string): SliderItem[] {
  const items = getStoredSliderItems();
  const updated = items.filter((i) => i.id !== id);
  saveStoredSliderItems(updated);

  if (isSupabaseConfigured()) {
    deleteSlider(String(id)).catch((e) => console.error("Supabase deleteSlider error:", e));
  }

  return updated;
}

export function saveSingleSliderItem(item: SliderItem): SliderItem[] {
  const items = getStoredSliderItems();
  const idx = items.findIndex((i) => i.id === item.id);
  if (idx >= 0) {
    items[idx] = item;
    if (isSupabaseConfigured()) {
      updateSlider({
        id: String(item.id),
        title: item.title,
        link_url: item.link,
        image_url: item.image,
        order_index: item.order,
      }).catch((e) => console.error("Supabase updateSlider error:", e));
    }
  } else {
    items.unshift(item);
    if (isSupabaseConfigured()) {
      createSlider({
        title: item.title,
        link_url: item.link,
        image_url: item.image,
        order_index: item.order,
      }).catch((e) => console.error("Supabase createSlider error:", e));
    }
  }
  saveStoredSliderItems(items);
  return items;
}

/* Slider Settings Storage */
export function getStoredSliderSettings(): SliderSettings {
  if (typeof window === "undefined") return DEFAULT_SLIDER_SETTINGS;
  try {
    const data = localStorage.getItem(KEY_SLIDER_SETTINGS);
    if (!data) {
      localStorage.setItem(
        KEY_SLIDER_SETTINGS,
        JSON.stringify(DEFAULT_SLIDER_SETTINGS)
      );
      return DEFAULT_SLIDER_SETTINGS;
    }
    return JSON.parse(data);
  } catch {
    return DEFAULT_SLIDER_SETTINGS;
  }
}

export function saveStoredSliderSettings(settings: SliderSettings): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY_SLIDER_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error("Failed to save slider settings", e);
  }
}
