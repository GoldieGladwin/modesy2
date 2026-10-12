'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, Eye, Globe, ChevronDown } from 'lucide-react';

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
}

export default function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-20">
      {/* Left side: Hamburger button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-1.5 rounded text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none"
          title="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Right side: View Site, Language, Admin Profile */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* View Site Button */}
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#00a65a] hover:bg-[#008d4c] rounded shadow-sm transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Site</span>
        </Link>

        {/* Language Dropdown */}
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-xs text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <Globe className="w-4 h-4 text-gray-500" />
          <span className="font-medium">English</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </button>

        {/* User Dropdown */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-tr from-purple-500 via-pink-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-gray-100">
            A
          </div>
          <span className="text-xs font-medium text-gray-700 hidden sm:inline-block">
            Admin
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </div>
      </div>
    </header>
  );
}
