"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthContext";
import { useCurrency } from "./CurrencyContext";
import { getStorageScope } from "@/lib/storageScope";

export interface CartProductInput {
  id: string | number;
  title: string;
  price: string | number;
  image: string;
  seller?: string;
  sku?: string;
}

export interface CartItem {
  id: string | number;
  title: string;
  price: string;
  numericPrice: number;
  image: string;
  seller?: string;
  sku?: string;
  quantity: number;
}

export interface AddedToCartSummary {
  product: {
    id: string | number;
    title: string;
    price: string;
    image: string;
  };
  quantity: number;
  subtotal: string;
}

interface CartContextType {
  cartItems: CartItem[];
  totalCartItems: number;
  totalCartPrice: number;
  formattedTotalPrice: string;
  isAddedModalOpen: boolean;
  lastAddedItem: AddedToCartSummary | null;
  addToCart: (product: CartProductInput, quantity?: number) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
  closeAddedModal: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function parsePrice(val: string | number | undefined): number {
  if (typeof val === "number") return val;
  if (!val) return 0;
  if (val.toLowerCase().includes("quote")) return 0;
  const cleaned = val.replace(/[^0-9.-]+/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export function formatPrice(num: number): string {
  if (num % 1 !== 0) {
    return `$${num.toFixed(2)}`;
  }
  return `$${num}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { formatPrice: formatCurrencyPrice, currency } = useCurrency();
  const pathname = usePathname();
  const scope = getStorageScope(user, pathname);
  const storageKey = `modesy_cart_${scope}`;

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAddedModalOpen, setIsAddedModalOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<AddedToCartSummary | null>(null);
  const currentLoadedKeyRef = useRef<string | null>(null);

  // Load cart from localStorage when storageKey changes
  useEffect(() => {
    try {
      // Legacy global un-scoped key migration
      const legacy = localStorage.getItem("modesy_cart_items");
      if (legacy !== null) {
        if (localStorage.getItem("modesy_cart_guest") === null) {
          localStorage.setItem("modesy_cart_guest", legacy);
        }
        localStorage.removeItem("modesy_cart_items");
      }

      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        } else {
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
      setCartItems([]);
    } finally {
      currentLoadedKeyRef.current = storageKey;
      setIsLoaded(true);
    }
  }, [storageKey]);

  // Save cart to localStorage on changes, guarded by currentLoadedKeyRef
  useEffect(() => {
    if (!isLoaded || currentLoadedKeyRef.current !== storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cartItems, isLoaded, storageKey]);

  // Cross-tab synchronization
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === storageKey) {
        try {
          setCartItems(e.newValue ? JSON.parse(e.newValue) : []);
        } catch {}
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [storageKey]);

  const addToCart = (product: CartProductInput, quantity = 1) => {
    const qty = Math.max(1, quantity || 1);
    const numPrice = parsePrice(product.price);
    const isQuote = typeof product.price === "string" && product.price.toLowerCase().includes("quote");

    const formattedUnit = isQuote ? "Request a Quote" : formatCurrencyPrice(numPrice);
    const subtotal = isQuote ? "Request a Quote" : formatCurrencyPrice(numPrice * qty);

    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex(
        (item) => String(item.id) === String(product.id)
      );

      if (existingIdx > -1) {
        const next = [...prevItems];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + qty,
        };
        return next;
      }

      return [
        ...prevItems,
        {
          id: product.id,
          title: product.title,
          price: formattedUnit,
          numericPrice: numPrice,
          image: product.image,
          seller: product.seller,
          sku: product.sku,
          quantity: qty,
        },
      ];
    });

    setLastAddedItem({
      product: {
        id: product.id,
        title: product.title,
        price: formattedUnit,
        image: product.image,
      },
      quantity: qty,
      subtotal,
    });

    setIsAddedModalOpen(true);
  };

  const removeFromCart = (id: string | number) => {
    setCartItems((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        String(item.id) === String(id) ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const closeAddedModal = () => {
    setIsAddedModalOpen(false);
  };

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce(
    (acc, item) => acc + item.numericPrice * item.quantity,
    0
  );
  const formattedTotalPrice = formatCurrencyPrice(totalCartPrice);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCartItems,
        totalCartPrice,
        formattedTotalPrice,
        isAddedModalOpen,
        lastAddedItem,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        closeAddedModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    return {
      cartItems: [],
      totalCartItems: 0,
      totalCartPrice: 0,
      formattedTotalPrice: "$0",
      isAddedModalOpen: false,
      lastAddedItem: null,
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      closeAddedModal: () => {},
    };
  }
  return context;
}
