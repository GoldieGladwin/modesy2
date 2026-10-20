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
  isInitialized: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (userData?: Partial<User> & { password?: string }) => Promise<{ success: boolean; error?: string; user?: User }>;
  register: (userData: { email: string; password?: string; name?: string; role?: string }) => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<boolean>;
  logout: () => Promise<void> | void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "modesy_auth_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
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
        const parsed = JSON.parse(stored);
        // Clean up legacy auto-injected mock vendor user
        if (parsed?.id === "00000000-0000-0000-0000-000000000002" && parsed?.email === "trendshop@gmail.com") {
          localStorage.removeItem(STORAGE_KEY);
        } else {
          setUser(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to parse auth user", e);
    } finally {
      setIsInitialized(true);
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

    const handleAuthChange = (e: any) => {
      if (e?.detail) {
        setUser(e.detail);
      } else {
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) setUser(JSON.parse(stored));
        } catch {}
      }
    };
    window.addEventListener("modesy_auth_change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("modesy_auth_change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const REGISTERED_USERS_KEY = "modesy_registered_users";

  const getRegisteredUsers = () => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(REGISTERED_USERS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const saveRegisteredUser = (newUser: {
    email: string;
    password?: string;
    name: string;
    role: "admin" | "vendor" | "member" | "moderator";
    avatar?: string;
  }) => {
    if (typeof window === "undefined") return;
    try {
      const users = getRegisteredUsers();
      const existingIdx = users.findIndex(
        (u: any) => u.email.toLowerCase() === newUser.email.toLowerCase()
      );
      if (existingIdx >= 0) {
        users[existingIdx] = { ...users[existingIdx], ...newUser };
      } else {
        users.push(newUser);
      }
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
    } catch (e) {
      console.error("Failed to save registered user", e);
    }
  };

  const login = async (
    userData?: Partial<User> & { password?: string }
  ): Promise<{ success: boolean; error?: string; user?: User }> => {
    try {
      sessionStorage.removeItem("modesy_explicit_logout");
    } catch (e) {}

    const email = (userData?.email || "").trim();
    const password = (userData?.password || "").trim();

    if (!email) {
      return { success: false, error: "Please enter your email address." };
    }
    if (!password) {
      return { success: false, error: "Please enter your password." };
    }

    // 1. If Supabase is connected and password provided, authenticate against Supabase Auth
    if (isSupabaseConfigured() && password && email) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!error && data.user) {
        const syncedUser = await syncSupabaseUser(data.user);
        return { success: true, user: syncedUser || undefined };
      }
    }

    const normalizedEmail = email.toLowerCase();
    const registeredUsers = getRegisteredUsers();
    const foundRegistered = registeredUsers.find(
      (u: any) => u.email.toLowerCase() === normalizedEmail
    );

    // If found in local registered users
    if (foundRegistered) {
      if (foundRegistered.password && foundRegistered.password !== password) {
        return { success: false, error: "Incorrect password. Please try again." };
      }
      const role = (foundRegistered.role || "member") as "admin" | "vendor" | "member" | "moderator";
      const authenticatedUser: User = {
        id: foundRegistered.id || "00000000-0000-0000-0000-000000000004",
        name: foundRegistered.name || email.split("@")[0],
        email: foundRegistered.email,
        role: role,
        avatar: foundRegistered.avatar || "/images/peter-jone-avatar.jpg",
        is_vendor: role === "vendor",
        wallet_balance: role === "admin" ? 1250.0 : role === "vendor" ? 793.52 : role === "moderator" ? 150.0 : 45.0,
      };

      setUser(authenticatedUser);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));
        window.dispatchEvent(new CustomEvent("modesy_auth_change", { detail: authenticatedUser }));
      } catch (e) {}
      return { success: true, user: authenticatedUser };
    }

    // 2. Demo accounts validation
    const isVendor =
      userData?.role === "vendor" ||
      normalizedEmail === "trendshop@gmail.com" ||
      normalizedEmail === "vendor@gmail.com";
    const isModerator =
      userData?.role === "moderator" ||
      normalizedEmail === "moderator@gmail.com";
    const isAdmin =
      !isVendor &&
      !isModerator &&
      (userData?.role === "admin" ||
        normalizedEmail === "admin@gmail.com" ||
        normalizedEmail === "admin@codingest.net");
    const isMember =
      normalizedEmail === "member@gmail.com" ||
      normalizedEmail === "members@gmail.com" ||
      normalizedEmail === "user@gmail.com";

    const isRecognizedDemo = isAdmin || isVendor || isModerator || isMember;

    if (!isRecognizedDemo && !isSupabaseConfigured()) {
      return {
        success: false,
        error: "Account not registered. Please create an account first.",
      };
    }

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
          ? "Roger Novak"
          : "Peter Jone"),
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
          : isModerator
          ? "/assets/img/roger-avatar.jpg"
          : isAdmin
          ? "/assets/img/admin-avatar.jpg"
          : "/images/peter-jone-avatar.jpg"),
      is_vendor: isVendor,
      wallet_balance: isAdmin ? 1250.0 : isVendor ? 793.52 : isModerator ? 150.0 : 45.0,
    };

    setUser(authenticatedUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));
      window.dispatchEvent(new CustomEvent("modesy_auth_change", { detail: authenticatedUser }));
    } catch (e) {
      console.error("Failed to store user", e);
    }

    return { success: true, user: authenticatedUser };
  };

  const register = async (userData: { email: string; password?: string; name?: string; role?: string }) => {
    saveRegisteredUser({
      email: userData.email.trim(),
      password: userData.password,
      name: userData.name || userData.email.split("@")[0],
      role: (userData.role as any) || "member",
    });

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
    // Authenticate and save local session
    await login({
      email: userData.email,
      password: userData.password,
      name: userData.name,
      role: (userData.role as any) || "member",
    });
  };

  const updateUser = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;

    const updatedUser: User = {
      ...user,
      ...data,
      name: data.name !== undefined ? data.name : user.name,
      avatar: data.avatar !== undefined ? data.avatar : user.avatar,
    };

    setUser(updatedUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      window.dispatchEvent(
        new CustomEvent("modesy_auth_change", { detail: updatedUser })
      );
    } catch (e) {
      console.error("Failed to store updated user", e);
    }

    if (isSupabaseConfigured() && user.id) {
      try {
        const names = (data.name || "").trim().split(" ");
        const firstName = data.name ? names[0] : undefined;
        const lastName = data.name && names.length > 1 ? names.slice(1).join(" ") : undefined;

        const updatePayload: any = {};
        if (data.name) updatePayload.username = data.name;
        if (firstName) updatePayload.first_name = firstName;
        if (lastName) updatePayload.last_name = lastName;
        if (data.avatar) updatePayload.avatar_url = data.avatar;

        if (Object.keys(updatePayload).length > 0) {
          await supabase.from("profiles").update(updatePayload).eq("id", user.id);
        }
      } catch (err) {
        console.warn("Could not sync profile update to Supabase:", err);
      }
    }

    return true;
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
        isInitialized,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        login,
        register,
        updateUser,
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

          // Redirect to appropriate landing page based on role
          if (res?.user) {
            const role = res.user.role;
            if (role === "admin") {
              router.push("/admin");
            } else if (role === "vendor") {
              router.push("/vendor");
            } else if (role === "moderator") {
              router.push("/moderator");
            } else if (role === "member") {
              router.push("/member");
            } else {
              router.push("/guest");
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
      isInitialized: false,
      isLoginModalOpen: false,
      openLoginModal: () => {},
      closeLoginModal: () => {},
      login: async () => ({ success: false }),
      register: async () => {},
      updateUser: async () => false,
      logout: () => {},
    };
  }
  return context;
}
