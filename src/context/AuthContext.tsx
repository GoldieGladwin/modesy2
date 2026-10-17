"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import LoginModal from "@/components/auth/LoginModal";
import { useRouter } from "next/navigation";

export interface User {
  name: string;
  email: string;
  role: "admin" | "vendor" | "user";
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (userData?: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "modesy_auth_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  // Load user from localStorage on mount and check ?login=true query param
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse auth user", e);
    }

    if (typeof window !== "undefined") {
      const isExplicitLogout = sessionStorage.getItem("modesy_explicit_logout") === "true";
      if (
        !isExplicitLogout &&
        (window.location.pathname.startsWith("/vendor") ||
          window.location.pathname.startsWith("/dashboard"))
      ) {
        const stored = localStorage.getItem(STORAGE_KEY);
        let parsed: User | null = null;
        try {
          if (stored) parsed = JSON.parse(stored);
        } catch (e) {
          console.error(e);
        }
        if (!parsed || parsed.role !== "vendor") {
          const vendorUser: User = {
            name: "Trendshop",
            email: "trendshop@codingest.net",
            role: "vendor",
            avatar: "/assets/img/trendshop-avatar.jpg",
          };
          setUser(vendorUser);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(vendorUser));
          } catch (e) {
            console.error(e);
          }
        }
      }

      const params = new URLSearchParams(window.location.search);
      if (params.get("login") === "true" || params.get("action") === "login") {
        setIsLoginModalOpen(true);
        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);
      }
    }
  }, []);

  const login = (userData?: Partial<User>) => {
    try {
      sessionStorage.removeItem("modesy_explicit_logout");
    } catch (e) {}
    const email = userData?.email || "trendshop@codingest.net";
    const isVendor =
      userData?.role === "vendor" ||
      email.toLowerCase().includes("trendshop") ||
      email.toLowerCase().includes("vendor");
    const isAdmin =
      !isVendor &&
      (userData?.role === "admin" ||
        email.toLowerCase().includes("admin"));

    const resolvedRole: "admin" | "vendor" | "user" = isVendor
      ? "vendor"
      : isAdmin
      ? "admin"
      : (userData?.role as "admin" | "vendor" | "user") || "user";

    const authenticatedUser: User = {
      name:
        userData?.name ||
        (isVendor ? "Trendshop" : isAdmin ? "Admin" : email.split("@")[0] || "User"),
      email: email,
      role: resolvedRole,
      avatar:
        userData?.avatar ||
        (isVendor
          ? "/assets/img/trendshop-avatar.jpg"
          : isAdmin
          ? "/assets/img/admin-avatar.jpg"
          : "/assets/img/admin-avatar.jpg"),
    };
    setUser(authenticatedUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));
    } catch (e) {
      console.error("Failed to store user", e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.setItem("modesy_explicit_logout", "true");
    } catch (e) {
      console.error("Failed to clear user", e);
    }
    router.push("/");
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        login,
        logout,
      }}
    >
      {children}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onSuccess={(loggedUser) => {
          const email = loggedUser.email.toLowerCase();
          const isVendor =
            email.includes("trendshop") ||
            email.includes("vendor");
          const isAdmin =
            !isVendor &&
            (email.includes("admin") || email === "admin@codingest.net");

          login({
            email: loggedUser.email,
            name: isVendor
              ? "Trendshop"
              : isAdmin
              ? "Admin"
              : loggedUser.name || "User",
            role: isVendor ? "vendor" : isAdmin ? "admin" : "user",
            avatar: isVendor
              ? "/assets/img/trendshop-avatar.jpg"
              : "/assets/img/admin-avatar.jpg",
          });
        }}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      isLoggedIn: false,
      isLoginModalOpen: false,
      openLoginModal: () => {},
      closeLoginModal: () => {},
      login: () => {},
      logout: () => {},
    };
  }
  return context;
}
