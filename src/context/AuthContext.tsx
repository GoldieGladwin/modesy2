"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import LoginModal from "@/components/auth/LoginModal";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

export interface User {
  id?: string;
  name: string;
  email: string;
  role: "admin" | "vendor" | "member" | "moderator";
  avatar?: string;
  is_vendor?: boolean;
  wallet_balance?: number;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (userData?: Partial<User> & { password?: string }) => Promise<{ success: boolean; error?: string; user?: User }>;
  register: (userData: { email: string; password?: string; name?: string; role?: string }) => Promise<void>;
  logout: () => Promise<void> | void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "modesy_auth_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  // Helper to sync user from Supabase session
  const syncSupabaseUser = async (sessionUser: any): Promise<User | null> => {
    if (!sessionUser) return null;
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", sessionUser.id)
        .maybeSingle();

      const userRole = profile?.role || sessionUser.user_metadata?.role || "member";
      const normalizedRole: "admin" | "vendor" | "member" | "moderator" =
        userRole === "admin"
          ? "admin"
          : userRole === "vendor" || profile?.is_vendor
          ? "vendor"
          : userRole === "moderator"
          ? "moderator"
          : "member";

      const authUser: User = {
        id: sessionUser.id,
        name:
          profile?.first_name && profile?.last_name
            ? `${profile.first_name} ${profile.last_name}`
            : profile?.username || sessionUser.email?.split("@")[0] || "User",
        email: sessionUser.email || "",
        role: normalizedRole,
        avatar:
          profile?.avatar_url ||
          (normalizedRole === "vendor"
            ? "/assets/img/trendshop-avatar.jpg"
            : normalizedRole === "admin"
            ? "/assets/img/admin-avatar.jpg"
            : "/assets/img/admin-avatar.jpg"),
        is_vendor: profile?.is_vendor || normalizedRole === "vendor",
        wallet_balance: Number(profile?.wallet_balance || 0),
      };

      setUser(authUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
      return authUser;
    } catch (e) {
      console.error("Error syncing Supabase user profile:", e);
      return null;
    }
  };

  useEffect(() => {
    // 1. First check local storage for instant offline/mock render
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse auth user", e);
    }

    // 2. If Supabase is configured, listen to Supabase Auth State
    if (isSupabaseConfigured()) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          syncSupabaseUser(session.user);
        }
      });

      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          if (session?.user) {
            await syncSupabaseUser(session.user);
          } else {
            const isExplicitLogout = sessionStorage.getItem("modesy_explicit_logout") === "true";
            if (isExplicitLogout) {
              setUser(null);
            }
          }
        }
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    }

    // 3. Fallback dev mode for /vendor or /dashboard
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
            id: "00000000-0000-0000-0000-000000000002",
            name: "Trendshop",
            email: "trendshop@gmail.com",
            role: "vendor",
            avatar: "/assets/img/trendshop-avatar.jpg",
            is_vendor: true,
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

  const login = async (
    userData?: Partial<User> & { password?: string }
  ): Promise<{ success: boolean; error?: string; user?: User }> => {
    try {
      sessionStorage.removeItem("modesy_explicit_logout");
    } catch (e) {}

    const email = (userData?.email || "").trim();
    const password = userData?.password;

    // 1. If Supabase is connected and password provided, authenticate against Supabase Auth
    if (isSupabaseConfigured() && password && email) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!error && data.user) {
        const syncedUser = await syncSupabaseUser(data.user);
        return { success: true, user: syncedUser || undefined };
      } else if (
        error &&
        !email.includes("codingest.net") &&
        !["admin@gmail.com", "trendshop@gmail.com", "moderator@gmail.com", "members@gmail.com"].includes(
          email.toLowerCase()
        )
      ) {
        // If it's a real Supabase account and error occurred, return error
        return { success: false, error: error.message };
      }
    }

    // 2. Demo / Fallback login (works offline or without Supabase config)
    const normalizedEmail = email.toLowerCase();
    const isVendor =
      userData?.role === "vendor" ||
      normalizedEmail.includes("trendshop") ||
      normalizedEmail.includes("vendor");
    const isModerator =
      userData?.role === "moderator" ||
      normalizedEmail.includes("moderator");
    const isAdmin =
      !isVendor &&
      !isModerator &&
      (userData?.role === "admin" ||
        normalizedEmail.includes("admin") ||
        normalizedEmail === "admin@gmail.com" ||
        normalizedEmail === "admin@codingest.net");

    const resolvedRole: "admin" | "vendor" | "member" | "moderator" = isVendor
      ? "vendor"
      : isModerator
      ? "moderator"
      : isAdmin
      ? "admin"
      : (userData?.role as "admin" | "vendor" | "member" | "moderator") || "member";

    const authenticatedUser: User = {
      id:
        userData?.id ||
        (isAdmin
          ? "00000000-0000-0000-0000-000000000001"
          : isVendor
          ? "00000000-0000-0000-0000-000000000002"
          : isModerator
          ? "00000000-0000-0000-0000-000000000003"
          : "00000000-0000-0000-0000-000000000004"),
      name:
        userData?.name ||
        (isAdmin
          ? "Admin"
          : isVendor
          ? "Trendshop"
          : isModerator
          ? "Moderator"
          : "Member"),
      email:
        email ||
        (isAdmin
          ? "admin@gmail.com"
          : isVendor
          ? "trendshop@gmail.com"
          : isModerator
          ? "moderator@gmail.com"
          : "members@gmail.com"),
      role: resolvedRole,
      avatar:
        userData?.avatar ||
        (isVendor
          ? "/assets/img/trendshop-avatar.jpg"
          : isAdmin
          ? "/assets/img/admin-avatar.jpg"
          : "/assets/img/admin-avatar.jpg"),
      is_vendor: isVendor,
      wallet_balance: isAdmin ? 1250.0 : isVendor ? 793.52 : isModerator ? 150.0 : 45.0,
    };

    setUser(authenticatedUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));
    } catch (e) {
      console.error("Failed to store user", e);
    }

    return { success: true, user: authenticatedUser };
  };

  const register = async (userData: { email: string; password?: string; name?: string; role?: string }) => {
    if (isSupabaseConfigured() && userData.password) {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            username: userData.name || userData.email.split("@")[0],
            role: userData.role || "member",
          },
        },
      });
      if (!error && data.user) {
        await syncSupabaseUser(data.user);
        return;
      }
    }
    // Fallback
    await login({ email: userData.email, name: userData.name, role: (userData.role as any) || "member" });
  };

  const logout = async () => {
    if (isSupabaseConfigured()) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.error("Supabase sign out error:", e);
      }
    }
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
        register,
        logout,
      }}
    >
      {children}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onSuccess={async (loggedUser) => {
          const res = await login({
            email: loggedUser.email,
            password: loggedUser.password,
            name: loggedUser.name,
          });

          // Role-based redirection after login
          if (res?.user) {
            if (res.user.role === "admin") {
              router.push("/admin/admin-panel");
            } else if (res.user.role === "moderator") {
              router.push("/moderator/admin-panel");
            } else if (res.user.role === "vendor") {
              router.push("/vendor/dashboard");
            } else if (res.user.role === "member") {
              router.push("/member/profile");
            }
          }
        }}
      />
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      isLoggedIn: false,
      isLoginModalOpen: false,
      openLoginModal: () => {},
      closeLoginModal: () => {},
      login: async () => ({ success: false }),
      register: async () => {},
      logout: () => {},
    };
  }
  return context;
}
