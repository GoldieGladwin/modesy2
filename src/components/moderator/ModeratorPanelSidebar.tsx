"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Home,
  Sliders,
  LayoutTemplate,
  ShoppingBasket,
  Tag,
  FolderTree,
  ToggleLeft,
  Send,
  Star,
  MessageCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";

export interface SubMenuItem {
  title: string;
  href: string;
}

export interface NavMenuItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  hasSubmenu?: boolean;
  subItems?: SubMenuItem[];
}

export interface NavSection {
  heading: string;
  items: NavMenuItem[];
}

// Reduced menu for Moderator (matching admin role sidebar structure, but reduced)
export const MODERATOR_PANEL_NAV_SECTIONS: NavSection[] = [
  {
    heading: "NAVIGATION",
    items: [
      { title: "Home", href: "/moderator/admin-panel", icon: Home },
      { title: "Slider", href: "/moderator/admin-panel/slider", icon: Sliders },
      {
        title: "Homepage Manager",
        href: "/moderator/admin-panel/homepage-manager",
        icon: LayoutTemplate,
      },
    ],
  },
  {
    heading: "PRODUCTS",
    items: [
      {
        title: "Products",
        href: "/moderator/admin-panel/products",
        icon: ShoppingBasket,
        hasSubmenu: true,
        subItems: [
          { title: "Products", href: "/moderator/admin-panel/products" },
          { title: "Featured Products", href: "/moderator/admin-panel/products/featured" },
          { title: "Special Offers", href: "/moderator/admin-panel/products/special-offers" },
          { title: "Pending Products", href: "/moderator/admin-panel/products/pending" },
          { title: "Hidden Products", href: "/moderator/admin-panel/products/hidden" },
          { title: "Expired Products", href: "/moderator/admin-panel/products/expired" },
          { title: "Sold Products", href: "/moderator/admin-panel/products/sold" },
          { title: "Drafts", href: "/moderator/admin-panel/products/drafts" },
          { title: "Deleted Products", href: "/moderator/admin-panel/products/deleted" },
          { title: "Add Product", href: "/moderator/admin-panel/products/add-product" },
          { title: "Bulk Product Upload", href: "/moderator/admin-panel/products/bulk-upload" },
        ],
      },
      {
        title: "Quote Requests",
        href: "/moderator/admin-panel/quote-requests",
        icon: Tag,
      },
      {
        title: "Categories",
        href: "/moderator/admin-panel/categories",
        icon: FolderTree,
      },
      {
        title: "Tags",
        href: "/moderator/admin-panel/tags",
        icon: Tag,
      },
      {
        title: "Custom Fields",
        href: "/moderator/admin-panel/custom-fields",
        icon: ToggleLeft,
      },
    ],
  },
  {
    heading: "MANAGEMENT TOOLS",
    items: [
      {
        title: "Contact Messages",
        href: "/moderator/admin-panel/contact-messages",
        icon: Send,
      },
      {
        title: "Reviews",
        href: "/moderator/admin-panel/reviews",
        icon: Star,
      },
      {
        title: "Comments",
        href: "/moderator/admin-panel/comments",
        icon: MessageCircle,
        hasSubmenu: true,
        subItems: [
          { title: "Product Comments", href: "/moderator/admin-panel/comments" },
          { title: "Blog Comments", href: "/moderator/admin-panel/comments/blog" },
        ],
      },
      {
        title: "Abuse Reports",
        href: "/moderator/admin-panel/abuse-reports",
        icon: AlertTriangle,
      },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function ModeratorPanelSidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    Products: true,
  });

  useEffect(() => {
    if (pathname?.includes("/products")) {
      setOpenSubmenus((prev) => ({ ...prev, Products: true }));
    }
    if (pathname?.includes("/comments")) {
      setOpenSubmenus((prev) => ({ ...prev, Comments: true }));
    }
  }, [pathname]);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-[#343b4a] text-[#95a2b5] flex flex-col font-sans transition-all duration-300 ease-in-out select-none overflow-y-auto scrollbar-thin scrollbar-thumb-[#4a5568] scrollbar-track-transparent ${
        isOpen
          ? "translate-x-0 opacity-100 visible"
          : "-translate-x-full lg:-translate-x-full opacity-0 invisible pointer-events-none"
      }`}
    >
      {/* 1. BRAND HEADER: "Modesy Panel" (Identical to AdminPanelSidebar) */}
      <div className="pt-6 pb-4 text-center shrink-0">
        <Link
          href="/moderator/admin-panel"
          className="inline-flex items-center justify-center cursor-pointer bg-transparent border-0 p-0 focus:outline-none group"
          title="Modesy Panel Home"
        >
          <span className="font-bold text-white text-[23px] tracking-tight group-hover:text-gray-200 transition-colors">
            Modesy
          </span>
          <span className="font-normal text-[#c6ccd6] text-[23px] ml-1.5 group-hover:text-white transition-colors">
            Panel
          </span>
        </Link>
      </div>

      {/* 2. USER PROFILE: Dynamic User + "● Online" */}
      <div className="px-6 py-2 flex items-center gap-4 shrink-0">
        <img
          src={user?.avatar || "/assets/img/roger-avatar.jpg"}
          alt={user?.name || "Roger Novak"}
          className="w-[50px] h-[50px] rounded-full object-cover shrink-0 ring-1 ring-white/10 shadow-sm"
        />
        <div className="flex flex-col min-w-0">
          <span className="text-white font-semibold text-[15px] leading-tight truncate">
            {user?.name || "Roger Novak"}
          </span>
          <span className="text-[12px] text-[#cbd5e1] flex items-center gap-2 mt-1 font-normal">
            <span className="w-2.5 h-2.5 rounded-full bg-[#48bb78] shrink-0 inline-block" />
            <span>Online</span>
          </span>
        </div>
      </div>

      {/* 3. NAVIGATION MENU LIST (Exact structure and CSS of AdminPanelSidebar) */}
      <nav className="py-2 divide-y divide-transparent shrink-0">
        {MODERATOR_PANEL_NAV_SECTIONS.map((section) => (
          <div key={section.heading} className="mb-2">
            {/* Section Heading */}
            <div className="px-6 pt-5 pb-1.5 text-[11px] font-semibold text-[#7e8c9f] uppercase tracking-wider">
              {section.heading}
            </div>

            {/* Menu Items */}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const hasSub = item.subItems && item.subItems.length > 0;
                const isSubmenuOpen = openSubmenus[item.title] ?? false;

                const isParentActive =
                  hasSub &&
                  item.subItems!.some(
                    (sub) =>
                      pathname === sub.href ||
                      pathname?.startsWith(sub.href + "/")
                  );

                const isActive =
                  !hasSub &&
                  (pathname === item.href ||
                    (item.href === "/moderator/admin-panel" &&
                      (pathname === "/moderator/admin-panel/home" ||
                        pathname === "/moderator/moderator-panel")));

                if (hasSub) {
                  return (
                    <div key={item.title}>
                      <button
                        type="button"
                        onClick={() => toggleSubmenu(item.title)}
                        className={`w-full relative px-6 py-2.5 text-[14px] flex items-center justify-between transition-colors group cursor-pointer ${
                          isParentActive
                            ? "text-white font-medium"
                            : "text-[#95a2b5] hover:text-white"
                        }`}
                      >
                        {isParentActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#007bff]" />
                        )}
                        <div className="flex items-center gap-3.5 min-w-0">
                          <Icon
                            className={`w-[17px] h-[17px] shrink-0 transition-colors ${
                              isParentActive
                                ? "text-white"
                                : "text-[#95a2b5] group-hover:text-white"
                            }`}
                          />
                          <span className="truncate">{item.title}</span>
                        </div>
                        {isSubmenuOpen ? (
                          <ChevronDown className="w-3.5 h-3.5 text-white transition-colors shrink-0" />
                        ) : (
                          <ChevronLeft className="w-3.5 h-3.5 text-[#7e8c9f] group-hover:text-white transition-colors shrink-0" />
                        )}
                      </button>

                      {isSubmenuOpen && (
                        <div className="bg-[#292f3a] py-1 space-y-0.5">
                          {item.subItems!.map((sub) => {
                            const isSubActive =
                              pathname === sub.href ||
                              pathname?.startsWith(sub.href + "/");
                            return (
                              <Link
                                key={sub.title}
                                href={sub.href}
                                onClick={() => {
                                  if (window.innerWidth < 1024 && onClose) {
                                    onClose();
                                  }
                                }}
                                className={`block pl-14 pr-6 py-2 text-[13.5px] transition-colors ${
                                  isSubActive
                                    ? "text-white font-medium"
                                    : "text-[#95a2b5] hover:text-white"
                                }`}
                              >
                                {sub.title}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => {
                      if (window.innerWidth < 1024 && onClose) {
                        onClose();
                      }
                    }}
                    className={`relative px-6 py-2.5 text-[14px] flex items-center justify-between transition-colors group ${
                      isActive
                        ? "text-white font-medium"
                        : "text-[#95a2b5] hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#007bff]" />
                    )}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <Icon
                        className={`w-[17px] h-[17px] shrink-0 transition-colors ${
                          isActive
                            ? "text-white"
                            : "text-[#95a2b5] group-hover:text-white"
                        }`}
                      />
                      <span className="truncate">{item.title}</span>
                    </div>

                    {item.hasSubmenu && (
                      <ChevronLeft className="w-3.5 h-3.5 text-[#7e8c9f] group-hover:text-white transition-colors shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
