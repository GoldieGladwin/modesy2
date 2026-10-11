"use client";

import React from "react";
import PreferencesPageHeader from "@/components/admin/preferences/PreferencesPageHeader";
import PreferencesMainCard from "@/components/admin/preferences/PreferencesMainCard";
import AiContentGeneratorCard from "@/components/admin/preferences/AiContentGeneratorCard";
import StorageSettingsCard from "@/components/admin/preferences/StorageSettingsCard";

export default function AdminPreferencesPage() {
  return (
    <div className="space-y-4 max-w-[1440px] mx-auto font-sans text-[#333]">
      {/* 1. Page Header */}
      <PreferencesPageHeader title="Preferences" />

      {/* 2. Main Layout Matching Screenshot */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        {/* Left Column: Preferences Card & AI Content Generator Card */}
        <div className="space-y-6 flex flex-col gap-6">
          <PreferencesMainCard />
          <AiContentGeneratorCard />
        </div>

        {/* Right Column: Storage Card */}
        <div className="space-y-6">
          <StorageSettingsCard />
        </div>
      </div>
    </div>
  );
}
