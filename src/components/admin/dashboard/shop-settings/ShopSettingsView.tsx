"use client";

import React, { useState } from "react";
import ShopSettingsCard from "./ShopSettingsCard";
import MembershipPlanCard from "./MembershipPlanCard";
import VacationModeCard from "./VacationModeCard";
import VatSettingsCard from "./VatSettingsCard";

export default function ShopSettingsView() {
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  return (
    <div className="font-sans max-w-7xl space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="bg-[#d4edda] border border-[#c3e6cb] text-[#155724] px-4 py-2.5 rounded-[3px] text-xs font-medium flex items-center justify-between shadow-2xs transition-all">
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

      {/* 2-Column Responsive Layout matching screenshots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* ================= LEFT COLUMN ================= */}
        <div className="space-y-6">
          <ShopSettingsCard onSuccess={showNotification} />
          <VatSettingsCard onSuccess={showNotification} />
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="space-y-6">
          <MembershipPlanCard />
          <VacationModeCard onSuccess={showNotification} />
        </div>
      </div>
    </div>
  );
}
