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
    // Navigation & Top bar
    "Home": "الرئيسية",
    "Contact": "اتصل بنا",
    "Blog": "المدونة",
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
    "Moderator Panel": "لوحة الإشراف",
    "Orders": "الطلبات",
    "Settings": "الإعدادات",
    "Profile Settings": "إعدادات الملف الشخصي",
    "Wallet": "المحفظة",
    "Messages": "الرسائل",
    "My Coupons": "قسائمي",
    "Location": "الموقع",
    "Select Location": "اختر الموقع",
    "Reset": "إعادة تعيين",
    "Close": "إغلاق",
    "Save Changes": "حفظ التغييرات",
    "Search for products, categories or brands": "ابحث عن المنتجات أو الفئات أو العلامات التجارية",
    "Main Menu": "القائمة الرئيسية",
    "Categories": "الفئات",
    "All Categories": "جميع الفئات",
    "Currency:": "العملة:",
    "Lang:": "اللغة:",

    // Categories
    "Clothing": "الملابس",
    "Women's Clothing": "ملابس نسائية",
    "Men's Clothing": "ملابس رجالية",
    "Jewelry & Accessories": "مجوهرات وإكسسوارات",
    "Electronics": "إلكترونيات",
    "Home & Living": "المنزل والمعيشة",
    "Beauty & Care": "الجمال والعناية",
    "Kids & Babies": "أطفال ورضع",
    "Shoes & Bags": "أحذية وحقائب",
    "Sports & Outdoor": "رياضة وخارج المنزل",
    "Books & Stationery": "كتب وقرطاسية",
    "Auto & Moto": "سيارات ودراجات",
    "Services": "خدمات",

    // Subcategories & Items
    "Dresses": "فساتين",
    "T-shirts": "تيشيرتات",
    "Shirts": "قمصان",
    "Pants": "بنطلونات",
    "Jackets & Coats": "سترات ومعاطف",
    "Hoodies & Sweatshirts": "هوديز وسويت شيرت",
    "Skirts": "تنانير",
    "Suits & Blazers": "بدلات وبليزر",
    "Underwear": "ملابس داخلية",
    "Necklaces": "قلائد",
    "Rings": "خواتم",
    "Earrings": "أقراط",
    "Bracelets": "أساور",
    "Watches": "ساعات",
    "Sunglasses": "نظارات شمسية",
    "Smartphones": "هواتف ذكية",
    "Laptops & Computers": "أجهزة كمبيوتر محمولة",
    "Tablets": "أجهزة لوحية",
    "Headphones": "سماعات",
    "Cameras": "كاميرات",
    "Furniture": "أثاث",
    "Kitchenware": "أدوات المطبخ",
    "Bedding": "مفروشات",
    "Lighting": "إضاءة",
    "Home Decor": "ديكور منزلي",
    "Skincare": "العناية بالبشرة",
    "Haircare": "العناية بالشعر",
    "Makeup": "مكياج",
    "Perfumes": "عطور",
    "Personal Care": "عناية شخصية",

    // Cart Page
    "Shopping Cart": "عربة التسوق",
    "Order Summary": "ملخص الطلب",
    "Estimated Total": "المجموع التقديري",
    "Subtotal": "المجموع الفرعي",
    "Shipping": "الشحن",
    "Calculated at checkout": "يتم الحساب عند الدفع",
    "Proceed to Checkout": "متابعة إتمام الطلب",
    "Your cart is currently empty": "سلة التسوق الخاصة بك فارغة حاليًا",
    "Continue Shopping": "متابعة التسوق",
    "Clear Cart": "تفريغ السلة",
    "Product": "المنتج",
    "Price": "السعر",
    "Quantity": "الكمية",
    "Total": "الإجمالي",
    "Remove": "حذف",
    "Secure checkout powered by Modesy": "دفع آمن مدعوم من موديسي",

    // Checkout Page (User Screenshot elements)
    "Checkout": "إتمام الدفع",
    "1. Payment Method": "١. طريقة الدفع",
    "2. Payment": "٢. الدفع",
    "Edit": "تعديل",
    "Confirm and Pay": "تأكيد ودفع",
    "Kartu Debit atau Kredit": "بطاقة مدين أو ائتمان",
    "Debit or Credit Card": "بطاقة مدين أو ائتمان",
    "Ditunjang teknologi PayPal": "مدعوم بتقنية PayPal",
    "Powered by PayPal": "مدعوم بتقنية PayPal",
    "Instant download": "تحميل فوري",
    "License": "الترخيص",
    "License:": "الترخيص:",
    "Regular License": "ترخيص عادي",
    "Extended License": "ترخيص موسع",
    "Seller": "البائع",
    "Seller:": "البائع:",
    "Quantity:": "الكمية:",
    "Price:": "السعر:",
    "VAT": "ضريبة القيمة المضافة",
    "VAT (10%):": "ضريبة القيمة المضافة (١٠٪):",
    "Sale Tax": "ضريبة المبيعات",
    "Sale Tax (5%)": "ضريبة المبيعات (٥٪)",
    "Transaction Fee": "رسوم المعاملة",
    "Transaction Fee (3%)": "رسوم المعاملة (٣٪)",
    "I have read and agree to the": "لقد قرأت ووافقت على",
    "Terms & Conditions": "الشروط والأحكام",
    "Continue to Payment": "المتابعة إلى الدفع",
    "Pay": "دفع",
    "Pay with Card": "الدفع بالبطاقة",
    "Card Number": "رقم البطاقة",
    "Expiration Date": "تاريخ الانتهاء",
    "Cardholder Name": "اسم حامل البطاقة",
    "CVC": "رمز التحقق",
    "Processing Payment...": "جاري معالجة الدفع...",
    "Order Completed Successfully!": "تم إتمام الطلب بنجاح!",
    "Thank you for your purchase.": "شكراً لشرائك.",
    "Order Number:": "رقم الطلب:",
    "View Orders": "عرض الطلبات",
    "Pay with PayPal": "الدفع عبر PayPal",
    "PayPal Payment": "الدفع عبر PayPal",
    "Bank Transfer": "تحويل مصرفي",
    "Cash on Delivery": "الدفع عند الاستلام",
    "Select a payment method": "اختر طريقة الدفع",
    "You will be redirected to PayPal to complete your purchase securely.": "سيتم توجيهك إلى PayPal لإتمام عملية الشراء بأمان.",
    "Items": "العناصر",
    "Order Placed": "تم تقديم الطلب",
    "Back to Cart": "العودة إلى السلة",
    "Items Total": "إجمالي العناصر",
    "Processing Order...": "جاري معالجة الطلب...",
    "Load Demo Items": "تحميل عناصر تجريبية",
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
    if (!key) return defaultText || "";
    if (language.code === "ar") {
      const trimmed = key.trim();
      if (TRANSLATIONS.ar[trimmed]) {
        return TRANSLATIONS.ar[trimmed];
      }
      const lower = trimmed.toLowerCase();
      for (const [k, v] of Object.entries(TRANSLATIONS.ar)) {
        if (k.toLowerCase() === lower) {
          return v;
        }
      }
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
