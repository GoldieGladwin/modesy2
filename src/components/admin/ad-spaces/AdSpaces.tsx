"use client";

import React, { useState } from "react";
import { AdSpaceConfig } from "./types";
import { initialAdSpacesData, adSpaceOptions } from "./mockData";
import AdSpacesSelectCard from "./AdSpacesSelectCard";
import AdBannerConfigCard from "./AdBannerConfigCard";
import GoogleAdsenseCard from "./GoogleAdsenseCard";

export default function AdSpaces() {
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>("index_1");
  const [spacesData, setSpacesData] = useState<Record<string, AdSpaceConfig>>(
    initialAdSpacesData
  );
  const [adsenseCode, setAdsenseCode] = useState<string>("");
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const currentConfig: AdSpaceConfig = spacesData[selectedSpaceId] || {
    id: selectedSpaceId,
    name:
      adSpaceOptions.find((o) => o.id === selectedSpaceId)?.name ||
      "Index Ad Space 1",
    desktop: { width: 728, height: 90, adCode: "", adUrl: "" },
    mobile: { width: 300, height: 250, adCode: "", adUrl: "" },
  };

  const handleSaveBanner = (updated: AdSpaceConfig) => {
    setSpacesData((prev) => ({
      ...prev,
      [updated.id]: updated,
    }));
    showNotification(`Ad space "${updated.name}" updated successfully.`);
  };

  const handleSaveAdsense = (code: string) => {
    setAdsenseCode(code);
    showNotification("Google Adsense Code updated successfully.");
  };

  return (
    <div className="space-y-5 font-sans">
      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
        Ad Spaces
      </h1>

      {/* Toast Alert */}
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

      {/* Select Ad Space Dropdown Card */}
      <AdSpacesSelectCard
        selectedId={selectedSpaceId}
        onSelect={setSelectedSpaceId}
      />

      {/* Banner Configuration Card for selected space */}
      <AdBannerConfigCard config={currentConfig} onSave={handleSaveBanner} />

      {/* Google Adsense Code Card */}
      <GoogleAdsenseCard
        initialCode={adsenseCode}
        onSave={handleSaveAdsense}
      />
    </div>
  );
}
