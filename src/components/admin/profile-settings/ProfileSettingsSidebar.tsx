"use client";

import React from "react";
import {
  UserPen,
  MapPin,
  Truck,
  Link2,
  Share2,
  Lock,
  UserX,
} from "lucide-react";
import { ProfileTab } from "./types";

interface ProfileSettingsSidebarProps {
  activeTab: ProfileTab;
  onSelectTab: (tab: ProfileTab) => void;
}

interface MenuItem {
  id: ProfileTab;
  label: string;
  icon: React.ElementType;
}

const MENU_ITEMS: MenuItem[] = [
  { id: "update-profile", label: "Update Profile", icon: UserPen },
  { id: "location", label: "Location", icon: MapPin },
  { id: "shipping-address", label: "Shipping Address", icon: Truck },
  { id: "affiliate-links", label: "Affiliate Links", icon: Link2 },
  { id: "social-media", label: "Social Media", icon: Share2 },
  { id: "change-password", label: "Change Password", icon: Lock },
  { id: "delete-account", label: "Delete Account", icon: UserX },
];

export const ProfileSettingsSidebar: React.FC<ProfileSettingsSidebarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  return (
    <div className="w-full">
      <nav className="flex flex-col space-y-1">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-2.5 text-[14px] text-left transition-colors rounded-[3px] cursor-pointer ${
                isActive
                  ? "bg-[#f4f5f7] text-[#222222] font-semibold"
                  : "text-[#555555] hover:bg-[#f8f9fa] hover:text-[#222222] font-normal"
              }`}
            >
              <Icon
                className={`w-[17px] h-[17px] shrink-0 ${
                  isActive ? "text-[#222222]" : "text-[#777777]"
                }`}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
