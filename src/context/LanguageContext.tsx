"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Language {
  code: "en" | "ar";
  name: string;
  flag: string;
  dir: "ltr" | "rtl";
}

export const LANGUAGES: Language[] = [
  { code: "en", name: "English", flag: "/assets/img/flag_eng.jpg", dir: "ltr" },
  { code: "ar", name: "Arabic", flag: "/assets/img/flag_ar.png", dir: "rtl" },
];

const TRANSLATIONS: Record<string, Record<string, string>> = {
  ar: {
    "Home": "الرئيسية",
    "Products": "المنتجات",
    "Cart": "عربة التسوق",
    "Wishlist": "المفضلة",
    "Login": "تسجيل الدخول",
    "Register": "تسجيل جديد",
    "Logout": "تسجيل الخروج",
    "Search": "بحث",
    "Sell Now": "بيع الآن",
    "Sell on Modesy": "البيع على موديسي",
    "Start Selling": "ابدأ البيع",
    "Profile": "الملف الشخصي",
    "Dashboard": "لوحة التحكم",
    "Admin Panel": "لوحة الإدارة",
    "Orders": "الطلبات",
    "Settings": "الإعدادات",
    "Wallet": "المحفظة",
    "Messages": "الرسائل",
    "My Coupons": "قسائمي",
    "Search for products, categories or brands": "ابحث عن المنتجات أو الفئات أو العلامات التجارية",
    "Categories": "الفئات",
    "Proceed to Checkout": "متابعة إتمام الطلب",
    "Estimated Total": "المجموع التقديري",
    "Subtotal": "المجموع الفرعي",
    "Shipping": "الشحن",
    "Calculated at checkout": "يتم الحساب عند الدفع",
    "Your cart is currently empty": "سلة التسوق الخاصة بك فارغة حاليًا",
    "Continue Shopping": "متابعة التسوق",
    "Shopping Cart": "عربة التسوق",
    "Location": "الموقع",
    "Select Location": "اختر الموقع",
    "Close": "إغلاق",
    "Save Changes": "حفظ التغييرات",
  },
};

interface LanguageContextType {
  language: Language;
  languages: Language[];
  dir: "ltr" | "rtl";
  setLanguage: (codeOrName: string) => void;
  t: (key: string, defaultText?: string) => string;
}

const STORAGE_KEY = "modesy_language";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(LANGUAGES[0]);

  const applyLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof document !== "undefined") {
      document.documentElement.dir = lang.dir;
      document.documentElement.lang = lang.code;
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const found = LANGUAGES.find(
          (l) => l.code === saved || l.name.toLowerCase() === saved.toLowerCase()
        );
        if (found) {
          applyLanguage(found);
        }
      }
    } catch (e) {
      // ignore
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        const val = e.newValue;
        const found = LANGUAGES.find(
          (l) => l.code === val || l.name.toLowerCase() === val.toLowerCase()
        );
        if (found) applyLanguage(found);
      }
    };

    const handleCustomChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        const found = LANGUAGES.find(
          (l) => l.code === customEvent.detail || l.name.toLowerCase() === customEvent.detail.toLowerCase()
        );
        if (found) applyLanguage(found);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("modesy_language_change", handleCustomChange);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("modesy_language_change", handleCustomChange);
    };
  }, []);

  const setLanguage = (codeOrName: string) => {
    const found = LANGUAGES.find(
      (l) =>
        l.code === codeOrName.toLowerCase() ||
        l.name.toLowerCase() === codeOrName.toLowerCase()
    );
    if (!found) return;

    applyLanguage(found);
    try {
      localStorage.setItem(STORAGE_KEY, found.code);
      document.cookie = `NEXT_LOCALE=${found.code}; path=/; max-age=31536000; SameSite=Lax`;
      window.dispatchEvent(
        new CustomEvent("modesy_language_change", { detail: found.code })
      );
    } catch (e) {
      // ignore
    }
  };

  const t = (key: string, defaultText?: string): string => {
    if (language.code === "ar" && TRANSLATIONS.ar[key]) {
      return TRANSLATIONS.ar[key];
    }
    return defaultText !== undefined ? defaultText : key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        languages: LANGUAGES,
        dir: language.dir,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: LANGUAGES[0],
      languages: LANGUAGES,
      dir: "ltr",
      setLanguage: () => {},
      t: (key, defaultText) => defaultText || key,
    };
  }
  return context;
}
