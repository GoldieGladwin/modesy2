"use client";

import React, { useState } from "react";
import { RouteItem } from "./types";

interface RouteSettingsCardProps {
  initialRoutes: RouteItem[];
  onSave: (routes: RouteItem[]) => void;
}

export default function RouteSettingsCard({
  initialRoutes,
  onSave,
}: RouteSettingsCardProps) {
  const [routes, setRoutes] = useState<RouteItem[]>(initialRoutes);

  const handleSlugChange = (key: string, newSlug: string) => {
    setRoutes((prev) =>
      prev.map((r) => (r.key === key ? { ...r, customSlug: newSlug } : r))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(routes);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-6 space-y-6 max-w-4xl"
    >
      <h2 className="text-sm font-bold text-gray-800 pb-2 border-b border-gray-100">
        Route Settings
      </h2>

      <div className="space-y-3.5">
        {routes.map((route) => (
          <div
            key={route.key}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center"
          >
            {/* Left Column: Fixed / Default Route Pill */}
            <div className="bg-[#f0f2f5] border border-gray-200 rounded-[3px] px-4 py-2 text-xs font-medium text-gray-700 select-none">
              {route.defaultSlug}
            </div>

            {/* Right Column: Customizable Route Slug Input */}
            <div>
              <input
                type="text"
                value={route.customSlug}
                onChange={(e) => handleSlugChange(route.key, e.target.value)}
                placeholder={route.defaultSlug}
                className="w-full bg-white border border-gray-300 rounded-[3px] px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-100 flex justify-end">
        <button
          type="submit"
          className="bg-[#007bff] hover:bg-[#0069d9] text-white text-xs font-semibold px-5 py-2 rounded-[3px] shadow-xs transition cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
