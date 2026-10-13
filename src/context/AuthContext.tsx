"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import LoginModal from "@/components/auth/LoginModal";
import { useRouter } from "next/navigation";

export interface User {
  name: string;
  email: string;
  role: "admin" | "user";
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
      const params = new URLSearchParams(window.location.search);
      if (params.get("login") === "true" || params.get("action") === "login") {
        setIsLoginModalOpen(true);
        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);
      }
    }
  }, []);

  const login = (userData?: Partial<User>) => {
    const adminUser: User = {
      name: userData?.name || "Admin",
      email: userData?.email || "admin@codingest.net",
      role: (userData?.role as "admin" | "user") || "admin",
      avatar: userData?.avatar || "/assets/img/admin-avatar.jpg",
    };
    setUser(adminUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser));
    } catch (e) {
      console.error("Failed to store user", e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear user", e);
    }
    // If in admin area, route back to guest
    if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
      router.push("/guest");
    }
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
          const isAdmin =
            loggedUser.email.toLowerCase().includes("admin") ||
            loggedUser.email === "admin@codingest.net";
          login({
            email: loggedUser.email,
            name: isAdmin ? "Admin" : loggedUser.name || "User",
            role: isAdmin ? "admin" : "user",
            avatar: "/assets/img/admin-avatar.jpg",
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
