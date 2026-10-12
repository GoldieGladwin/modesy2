"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Palette,
  Sliders,
  LayoutTemplate,
  ShoppingCart,
  ShoppingBag,
  Flag,
  ShoppingBasket,
  Tag,
  FolderTree,
  Asterisk,
  ToggleLeft,
  CreditCard,
  DollarSign,
  Banknote,
  FileText,
  BookOpen,
  MapPin,
  Users,
  Key,
  HelpCircle,
  Database,
  Wrench,
  Tv,
  MessageSquare,
  Send,
  Star,
  MessageCircle,
  Mail,
  Share2,
  AlertTriangle,
  Ban,
  List,
  Settings,
  Download,
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

export const ADMIN_PANEL_NAV_SECTIONS: NavSection[] = [
  {
    heading: "NAVIGATION",
    items: [
      { title: "Home", href: "/admin/admin-panel/home", icon: Home },
      { title: "Theme", href: "/admin/admin-panel/theme", icon: Palette },
      { title: "Slider", href: "/admin/admin-panel/slider", icon: Sliders },
      {
        title: "Homepage Manager",
        href: "/admin/admin-panel/homepage-manager",
        icon: LayoutTemplate,
      },
    ],
  },
  {
    heading: "ORDERS",
    items: [
      {
        title: "Orders",
        href: "/admin/admin-panel/orders",
        icon: ShoppingCart,
        hasSubmenu: true,
        subItems: [
          { title: "Orders", href: "/admin/admin-panel/orders" },
          { title: "Transactions", href: "/admin/admin-panel/orders/transactions" },
          { title: "Bank Transfers", href: "/admin/admin-panel/orders/bank-transfers" },
        ],
      },
      {
        title: "Digital Sales",
        href: "/admin/admin-panel/digital-sales",
        icon: ShoppingBag,
      },
      {
        title: "Refund Requests",
        href: "/admin/admin-panel/refund-requests",
        icon: Flag,
      },
    ],
  },
  {
    heading: "PRODUCTS",
    items: [
      {
        title: "Products",
        href: "/admin/admin-panel/products",
        icon: ShoppingBasket,
        hasSubmenu: true,
        subItems: [
          { title: "Products", href: "/admin/admin-panel/products" },
          { title: "Featured Products", href: "/admin/admin-panel/products/featured" },
          { title: "Special Offers", href: "/admin/admin-panel/products/special-offers" },
          { title: "Pending Products", href: "/admin/admin-panel/products/pending" },
          { title: "Hidden Products", href: "/admin/admin-panel/products/hidden" },
          { title: "Expired Products", href: "/admin/admin-panel/products/expired" },
          { title: "Sold Products", href: "/admin/admin-panel/products/sold" },
          { title: "Drafts", href: "/admin/admin-panel/products/drafts" },
          { title: "Deleted Products", href: "/admin/admin-panel/products/deleted" },
        ],
      },
      {
        title: "Quote Requests",
        href: "/admin/admin-panel/quote-requests",
        icon: Tag,
      },
      {
        title: "Categories",
        href: "/admin/admin-panel/categories",
        icon: FolderTree,
      },
      {
        title: "Tags",
        href: "/admin/admin-panel/tags",
        icon: Tag,
      },
      {
        title: "Brands",
        href: "/admin/admin-panel/brands",
        icon: Asterisk,
      },
      {
        title: "Custom Fields",
        href: "/admin/admin-panel/custom-fields",
        icon: ToggleLeft,
      },
    ],
  },
  {
    heading: "PAYMENTS",
    items: [
      { title: "Payments", href: "/admin/admin-panel/payments", icon: CreditCard },
      {
        title: "Earnings",
        href: "/admin/admin-panel/earnings",
        icon: DollarSign,
        hasSubmenu: true,
        subItems: [
          { title: "Earnings", href: "/admin/admin-panel/earnings" },
          { title: "Seller Balances", href: "/admin/admin-panel/earnings/seller-balances" },
        ],
      },
      { title: "Payouts", href: "/admin/admin-panel/payouts", icon: Banknote },
    ],
  },
  {
    heading: "CONTENT",
    items: [
      {
        title: "Pages",
        href: "/admin/admin-panel/pages",
        icon: FileText,
      },
      {
        title: "Blog",
        href: "/admin/admin-panel/blog/posts",
        icon: BookOpen,
        hasSubmenu: true,
        subItems: [
          { title: "Posts", href: "/admin/admin-panel/blog/posts" },
          { title: "Categories", href: "/admin/admin-panel/blog/categories" },
          { title: "Tags", href: "/admin/admin-panel/tags" },
        ],
      },
      {
        title: "Location",
        href: "/admin/admin-panel/location/countries",
        icon: MapPin,
        hasSubmenu: true,
        subItems: [
          { title: "Countries", href: "/admin/admin-panel/location/countries" },
          { title: "States", href: "/admin/admin-panel/location/states" },
          { title: "Cities", href: "/admin/admin-panel/location/cities" },
        ],
      },
    ],
  },
  {
    heading: "MEMBERSHIP",
    items: [
      {
        title: "Membership",
        href: "/admin/admin-panel/membership",
        icon: Users,
        hasSubmenu: true,
        subItems: [
          { title: "Users", href: "/admin/admin-panel/membership/users" },
          { title: "Membership Plans", href: "/admin/admin-panel/membership/plans" },
          { title: "Shop Opening Requests", href: "/admin/admin-panel/membership/shop-opening-requests" },
          { title: "User Login Activities", href: "/admin/admin-panel/membership/login-activities" },
          { title: "Account Deletion Requests", href: "/admin/admin-panel/membership/account-deletion-requests" },
        ],
      },
      {
        title: "Roles & Permissions",
        href: "/admin/admin-panel/roles-permissions",
        icon: Key,
      },
    ],
  },
  {
    heading: "MANAGEMENT TOOLS",
    items: [
      {
        title: "Help Center",
        href: "/admin/admin-panel/help-center/support-tickets",
        icon: HelpCircle,
        hasSubmenu: true,
        subItems: [
          { title: "Support Tickets", href: "/admin/admin-panel/help-center/support-tickets" },
          { title: "Knowledge Base", href: "/admin/admin-panel/help-center/knowledge-base" },
        ],
      },
      {
        title: "Cache System",
        href: "/admin/admin-panel/cache-system",
        icon: Database,
      },
      {
        title: "SEO Tools",
        href: "/admin/admin-panel/seo-tools",
        icon: Wrench,
      },
      {
        title: "Ad Spaces",
        href: "/admin/admin-panel/ad-spaces",
        icon: Tv,
      },
      {
        title: "Chat Messages",
        href: "/admin/admin-panel/chat-messages",
        icon: MessageSquare,
      },
      {
        title: "Contact Messages",
        href: "/admin/admin-panel/contact-messages",
        icon: Send,
      },
      {
        title: "Reviews",
        href: "/admin/admin-panel/reviews",
        icon: Star,
      },
      {
        title: "Comments",
        href: "/admin/admin-panel/comments",
        icon: MessageCircle,
        hasSubmenu: true,
        subItems: [
          { title: "Product Comments", href: "/admin/admin-panel/comments/pending-product" },
          { title: "Blog Comments", href: "/admin/admin-panel/comments/pending-blog" },
        ],
      },
      {
        title: "Newsletter",
        href: "/admin/admin-panel/newsletter",
        icon: Mail,
      },
      {
        title: "Affiliate Program",
        href: "/admin/admin-panel/affiliate-program",
        icon: Share2,
      },
      {
        title: "Abuse Reports",
        href: "/admin/admin-panel/abuse-reports",
        icon: AlertTriangle,
      },
      {
        title: "Email Blacklist",
        href: "/admin/admin-panel/email-blacklist",
        icon: Ban,
      },
    ],
  },
  {
    heading: "SETTINGS",
    items: [
      {
        title: "Preferences",
        href: "/admin/admin-panel/preferences",
        icon: List,
      },
      {
        title: "Settings",
        href: "/admin/admin-panel/settings",
        icon: Settings,
        hasSubmenu: true,
        subItems: [
          { title: "General Settings", href: "/admin/admin-panel/settings" },
          { title: "Language Settings", href: "/admin/admin-panel/settings/language" },
          { title: "Product Settings", href: "/admin/admin-panel/settings/product" },
          { title: "Payment Settings", href: "/admin/admin-panel/settings/payment" },
          { title: "Visual Settings", href: "/admin/admin-panel/settings/visual" },
          { title: "Font Settings", href: "/admin/admin-panel/settings/font" },
          { title: "Route Settings", href: "/admin/admin-panel/settings/route" },
          { title: "Currency Settings", href: "/admin/admin-panel/settings/currency" },
          { title: "Email Settings", href: "/admin/admin-panel/settings/email" },
          { title: "Social Login", href: "/admin/admin-panel/settings/social-login" },
        ],
      },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function AdminPanelSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = React.useState<Record<string, boolean>>({
    Blog: true,
    Location: true,
    "Help Center": true,
    Settings: true,
  });

  React.useEffect(() => {
    if (pathname?.startsWith("/admin/admin-panel/location")) {
      setOpenSubmenus((prev) => ({ ...prev, Location: true }));
    }
    if (pathname?.startsWith("/admin/admin-panel/help-center")) {
      setOpenSubmenus((prev) => ({ ...prev, "Help Center": true }));
    }
    if (pathname?.includes("/settings") || pathname?.includes("/setting")) {
      setOpenSubmenus((prev) => ({ ...prev, Settings: true }));
    }
    if (pathname?.includes("/products")) {
      setOpenSubmenus((prev) => ({ ...prev, Products: true }));
    }
  }, [pathname]);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleDownloadBackup = () => {
    alert("Starting database backup download: modesy_backup.sql");
  };

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-[#343b4a] text-[#95a2b5] flex flex-col font-sans transition-all duration-300 ease-in-out select-none overflow-y-auto scrollbar-thin scrollbar-thumb-[#4a5568] scrollbar-track-transparent ${isOpen
        ? "translate-x-0 opacity-100 visible"
        : "-translate-x-full lg:-translate-x-full opacity-0 invisible pointer-events-none"
        }`}
    >
      {/* 1. BRAND HEADER: "Modesy Panel" */}
      <div className="pt-6 pb-4 text-center shrink-0">
        <Link
          href="/admin/admin-panel/home"
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

      {/* 2. USER PROFILE: Avatar Nebula + "Admin" + "● Online" */}
      <div className="px-6 py-2 flex items-center gap-4 shrink-0">
        {/* Nebula Avatar Circle */}
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden shrink-0 relative bg-slate-900 shadow-sm ring-1 ring-white/10">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-700 via-pink-500 to-cyan-400 opacity-95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.4),transparent_60%)]" />
          <div className="absolute w-5 h-5 rounded-full bg-cyan-300/40 blur-[2px] top-1 right-1.5" />
          <div className="absolute w-6 h-6 rounded-full bg-pink-500/50 blur-[3px] bottom-1 left-1" />
          <div className="absolute w-2 h-2 rounded-full bg-white/80 blur-[1px] top-3 left-3" />
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-white font-semibold text-[15px] leading-tight truncate">
            Admin
          </span>
          <span className="text-[12px] text-[#cbd5e1] flex items-center gap-2 mt-1 font-normal">
            <span className="w-2.5 h-2.5 rounded-full bg-[#48bb78] shrink-0 inline-block" />
            <span>Online</span>
          </span>
        </div>
      </div>

      {/* 3. NAVIGATION MENU LIST */}
      <nav className="py-2 divide-y divide-transparent shrink-0">
        {ADMIN_PANEL_NAV_SECTIONS.map((section) => (
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
                    (item.href === "/admin/admin-panel/home" &&
                      (pathname === "/admin/admin-panel" ||
                        pathname === "/admin/admin-panel/")));

                if (hasSub) {
                  return (
                    <div key={item.title}>
                      <button
                        type="button"
                        onClick={() => toggleSubmenu(item.title)}
                        className={`w-full relative px-6 py-2.5 text-[14px] flex items-center justify-between transition-colors group cursor-pointer ${isParentActive
                          ? "text-white font-medium"
                          : "text-[#95a2b5] hover:text-white"
                          }`}
                      >
                        {isParentActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#007bff]" />
                        )}
                        <div className="flex items-center gap-3.5 min-w-0">
                          <Icon
                            className={`w-[17px] h-[17px] shrink-0 transition-colors ${isParentActive
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
                              pathname?.startsWith(sub.href + "/") ||
                              (sub.href === "/admin/admin-panel/help-center/knowledge-base" &&
                                (pathname === "/admin/admin-panel/help-center" || pathname === "/admin/admin-panel/help-center/")) ||
                              (sub.href === "/admin/admin-panel/help-center/support-tickets" &&
                                (pathname === "/admin/admin-panel/help-center/tickets" || pathname?.startsWith("/admin/admin-panel/help-center/tickets"))) ||
                              (sub.href === "/admin/admin-panel/blog/posts" &&
                                pathname === "/admin/admin-panel/blog");
                            return (
                              <Link
                                key={sub.title}
                                href={sub.href}
                                onClick={() => {
                                  if (window.innerWidth < 1024 && onClose) {
                                    onClose();
                                  }
                                }}
                                className={`block pl-14 pr-6 py-2 text-[13.5px] transition-colors ${isSubActive
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
                    className={`px-6 py-2.5 text-[14px] flex items-center justify-between transition-colors group ${isActive
                        ? "text-white font-medium"
                        : "text-[#95a2b5] hover:text-white"
                      }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#007bff]" />
                    )}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <Icon
                        className={`w-[17px] h-[17px] shrink-0 transition-colors ${isActive
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

        {/* 4. BOTTOM ACTION BUTTON: "Download Database Backup" */}
        <div className="px-5 pt-4 pb-8">
          <button
            type="button"
            onClick={handleDownloadBackup}
            className="w-full bg-[#292f3a] hover:bg-[#20252e] border border-[#3e4858] text-[#c6ccd6] hover:text-white text-xs font-semibold py-2.5 px-3 rounded-[3px] flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
            title="Download Database Backup"
          >
            <Download className="w-3.5 h-3.5 text-gray-300" />
            <span>Download Database Backup</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}