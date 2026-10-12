'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Palette,
  SlidersHorizontal,
  Layout,
  ShoppingCart,
  ShoppingBag,
  RotateCcw,
  Package,
  FolderTree,
  ListFilter,
  DollarSign,
  CreditCard,
  UsersRound,
  ShieldCheck,
  Users,
  MessageSquare,
  Star,
  Search,
  Settings,
  ChevronRight
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen?: boolean;
}

export default function AdminSidebar({ isOpen = true }: AdminSidebarProps) {
  const pathname = usePathname();

  const isRolesActive =
    pathname === '/admin/roles' ||
    pathname === '/admin/roles-permissions' ||
    pathname.startsWith('/admin/roles');

  const menuSections = [
    {
      title: 'NAVIGATION',
      items: [
        { name: 'Home', href: '/admin', icon: Home, active: pathname === '/admin' },
        { name: 'Theme', href: '/admin/admin-panel/theme', icon: Palette, active: pathname === '/admin/admin-panel/theme' || pathname === '/admin/theme' },
        { name: 'Slider', href: '/admin/slider', icon: SlidersHorizontal, active: pathname === '/admin/slider' },
        { name: 'Homepage Manager', href: '/admin/homepage-manager', icon: Layout, active: pathname === '/admin/homepage-manager' }
      ]
    },
    {
      title: 'ORDERS',
      items: [
        { name: 'Orders', href: '/admin/orders', icon: ShoppingCart, hasDropdown: true, active: pathname === '/admin/orders' },
        { name: 'Digital Sales', href: '/admin/digital-sales', icon: ShoppingBag, active: pathname === '/admin/digital-sales' },
        { name: 'Refund Requests', href: '/admin/refund-requests', icon: RotateCcw, active: pathname === '/admin/refund-requests' }
      ]
    },
    {
      title: 'PRODUCTS',
      items: [
        { name: 'Products', href: '/admin/products', icon: Package, active: pathname === '/admin/products' },
        { name: 'Categories', href: '/admin/categories', icon: FolderTree, active: pathname === '/admin/categories' },
        { name: 'Custom Fields', href: '/admin/admin-panel/custom-fields', icon: ListFilter, active: pathname === '/admin/admin-panel/custom-fields' || pathname === '/admin/custom-fields' }
      ]
    },
    {
      title: 'FINANCES',
      items: [
        { name: 'Earning', href: '/admin/earnings', icon: DollarSign, active: pathname === '/admin/earnings' },
        { name: 'Payouts', href: '/admin/payouts', icon: CreditCard, active: pathname === '/admin/payouts' }
      ]
    },
    {
      title: 'MEMBERSHIP & USERS',
      items: [
        { name: 'Membership', href: '/admin/membership', icon: UsersRound, active: pathname === '/admin/membership' },
        { name: 'Roles & Permissions', href: '/admin/roles-permissions', icon: ShieldCheck, active: isRolesActive },
        { name: 'Users', href: '/admin/users', icon: Users, active: pathname === '/admin/users' }
      ]
    },
    {
      title: 'CONTENT & TOOLS',
      items: [
        { name: 'Comments', href: '/admin/comments', icon: MessageSquare, active: pathname === '/admin/comments' },
        { name: 'Reviews', href: '/admin/reviews', icon: Star, active: pathname === '/admin/reviews' },
        { name: 'SEO Tools', href: '/admin/admin-panel/seo-tools', icon: Search, active: pathname === '/admin/admin-panel/seo-tools' || pathname === '/admin/seo-tools' },
        { name: 'Settings', href: '/admin/settings', icon: Settings, active: pathname === '/admin/settings' }
      ]
    }
  ];

  return (
    <aside
      className={`bg-[#222d32] text-[#b8c7ce] w-64 min-h-screen flex-shrink-0 flex flex-col transition-all duration-200 z-30 ${
        isOpen ? 'block' : 'hidden md:block md:w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-14 bg-[#1a2226] flex items-center px-5 font-bold text-lg text-white tracking-wide border-b border-gray-800">
        <span>Modesy Panel</span>
      </div>

      {/* User Status Card */}
      <div className="p-4 flex items-center gap-3 border-b border-gray-800/80 bg-[#1e282c]/40">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-tr from-purple-500 via-pink-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm shadow-sm ring-2 ring-gray-700">
          A
        </div>
        <div className="flex flex-col">
          <span className="text-white font-medium text-sm">Admin</span>
          <span className="text-[11px] text-gray-300 flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-[#00a65a] animate-pulse"></span>
            Online
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-2 text-xs scrollbar-thin">
        {menuSections.map((section, idx) => (
          <div key={idx} className="mb-2">
            <div className="px-5 pt-3 pb-1 text-[10px] font-bold tracking-wider text-gray-500 uppercase">
              {section.title}
            </div>
            <ul>
              {section.items.map((item, itemIdx) => {
                const Icon = item.icon;
                return (
                  <li key={itemIdx}>
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between px-5 py-2.5 transition-colors ${
                        item.active
                          ? 'text-white bg-[#1e282c] border-l-4 border-[#00a65a] font-medium'
                          : 'text-[#b8c7ce] hover:text-white hover:bg-[#1e282c]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 ${
                            item.active ? 'text-[#00a65a]' : 'text-gray-400'
                          }`}
                        />
                        <span className="text-[13px]">{item.name}</span>
                      </div>
                      {item.hasDropdown && (
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
