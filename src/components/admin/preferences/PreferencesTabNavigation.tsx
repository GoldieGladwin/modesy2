"use client";

import React from "react";
import { PreferencesTab } from "./types";

interface TabItem {
  id: PreferencesTab;
  label: string;
}

const TABS: TabItem[] = [
  { id: "system", label: "System" },
  { id: "general", label: "General" },
  { id: "products", label: "Products" },
  { id: "shop", label: "Shop" },
  { id: "wallet", label: "Wallet" },
  { id: "file_upload", label: "File Upload" },
];

interface PreferencesTabNavigationProps {
  activeTab: PreferencesTab;
  onTabChange: (tab: PreferencesTab) => void;
}

export default function PreferencesTabNavigation({
  activeTab,
  onTabChange,
}: PreferencesTabNavigationProps) {
  return (
    <div className="flex items-center flex-wrap border-b border-[#e5e5e5] mb-6 text-[13px] gap-1">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`px-3 py-2 transition-colors cursor-pointer select-none font-medium whitespace-nowrap ${
              isActive
                ? "bg-white border-t-2 border-[#007bff] border-l border-r border-[#e5e5e5] -mb-[1px] text-[#333333] font-semibold"
                : "text-[#555555] hover:text-[#222222] border-t-2 border-transparent"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
