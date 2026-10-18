"use client";

import React, { useState } from "react";
import AffiliateProgramHeader from "@/components/admin/affiliate-program/AffiliateProgramHeader";
import AffiliateSettingsCard from "@/components/admin/affiliate-program/AffiliateSettingsCard";
import AffiliateDescriptionCard from "@/components/admin/affiliate-program/AffiliateDescriptionCard";
import AffiliateContentEditorCard from "@/components/admin/affiliate-program/AffiliateContentEditorCard";
import AffiliateHowItWorksCard from "@/components/admin/affiliate-program/AffiliateHowItWorksCard";
import AffiliateFaqCard from "@/components/admin/affiliate-program/AffiliateFaqCard";

export default function AdminAffiliateProgramPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  return (
    <div className="space-y-6 max-w-[1360px] mx-auto font-sans text-[#333]">
      {/* 1. Header & Language Selector */}
      <AffiliateProgramHeader
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />

      {/* 2. Section 1 (2 Columns: Settings & Description) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <AffiliateSettingsCard />
        <AffiliateDescriptionCard />
      </div>

      {/* 3. Section 2 (Full Width: Content Rich Editor) */}
      <AffiliateContentEditorCard />

      {/* 4. Section 3 (2 Columns: How It Works & FAQ) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <AffiliateHowItWorksCard />
        <AffiliateFaqCard />
      </div>
    </div>
  );
}
