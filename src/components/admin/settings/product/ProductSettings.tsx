"use client";

import React, { useState } from "react";
import MarketplaceCard from "./MarketplaceCard";
import ClassifiedAdsCard from "./ClassifiedAdsCard";
import PhysicalProductsCard from "./PhysicalProductsCard";
import DigitalProductsCard from "./DigitalProductsCard";
import ProductListingCard from "./ProductListingCard";

export default function ProductSettings() {
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
        Product Settings
      </h1>

      {/* Notification */}
      {notification && (
        <div className="bg-[#d4edda] border border-[#c3e6cb] text-[#155724] px-4 py-2.5 rounded-[3px] text-xs font-medium flex items-center justify-between shadow-xs">
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

      {/* Top 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        <MarketplaceCard
          onSave={() => showNotification("Marketplace settings saved.")}
        />
        <ClassifiedAdsCard
          onSave={() => showNotification("Classified Ads settings saved.")}
        />
        <PhysicalProductsCard
          onSave={() => showNotification("Physical products settings saved.")}
        />
      </div>

      {/* Bottom 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <DigitalProductsCard
          onSave={() => showNotification("Digital products settings saved.")}
        />
        <ProductListingCard
          onSave={() =>
            showNotification("Product search & listing settings saved.")
          }
        />
      </div>
    </div>
  );
}
