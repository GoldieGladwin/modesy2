"use client";

import React, { useState } from "react";
import RouteSettingsCard from "./RouteSettingsCard";
import { RouteItem } from "./types";
import { initialRoutesData } from "./mockData";

export default function RouteSettings() {
  const [routes, setRoutes] = useState<RouteItem[]>(initialRoutesData);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleSave = (updatedRoutes: RouteItem[]) => {
    setRoutes(updatedRoutes);
    showNotification("Route settings updated successfully.");
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
        Route Settings
      </h1>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-[#d4edda] border border-[#c3e6cb] text-[#155724] px-4 py-2.5 rounded-[3px] text-xs font-medium flex items-center justify-between shadow-xs max-w-4xl">
          <span>{notification}</span>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-[#155724] font-bold text-sm cursor-pointer ml-4"
          >
            ×
          </button>
        </div>
      )}

      {/* Route Settings Card */}
      <RouteSettingsCard initialRoutes={routes} onSave={handleSave} />
    </div>
  );
}
