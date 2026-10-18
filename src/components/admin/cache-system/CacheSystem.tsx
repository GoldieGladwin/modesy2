"use client";

import React, { useState } from "react";
import ProductCacheCard from "./ProductCacheCard";
import StaticCacheCard from "./StaticCacheCard";
import { ProductCacheSettings, StaticCacheSettings } from "./types";

export default function CacheSystem() {
  const [notification, setNotification] = useState<{
    text: string;
    type: "success" | "warning";
  } | null>(null);

  const showNotification = (
    text: string,
    type: "success" | "warning" = "success"
  ) => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleSaveProductCache = (settings: ProductCacheSettings) => {
    showNotification("Product cache settings saved successfully.");
  };

  const handleResetProductCache = () => {
    showNotification("Product cache has been reset.", "warning");
  };

  const handleSaveStaticCache = (settings: StaticCacheSettings) => {
    showNotification("Static cache settings saved successfully.");
  };

  const handleResetStaticCache = () => {
    showNotification("Static cache has been reset.", "warning");
  };

  return (
    <div className="space-y-5 font-sans">
      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
        Cache System
      </h1>

      {/* Toast Alert */}
      {notification && (
        <div
          className={`border px-4 py-2.5 rounded-[3px] text-xs font-medium flex items-center justify-between shadow-xs ${
            notification.type === "warning"
              ? "bg-[#fff3cd] border-[#ffeeba] text-[#856404]"
              : "bg-[#d4edda] border-[#c3e6cb] text-[#155724]"
          }`}
        >
          <span>{notification.text}</span>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="font-bold text-sm cursor-pointer ml-4"
          >
            ×
          </button>
        </div>
      )}

      {/* 2-Column Responsive Grid matching Foto 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <ProductCacheCard
          onSave={handleSaveProductCache}
          onReset={handleResetProductCache}
        />
        <StaticCacheCard
          onSave={handleSaveStaticCache}
          onReset={handleResetStaticCache}
        />
      </div>
    </div>
  );
}
