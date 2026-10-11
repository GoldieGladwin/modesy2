"use client";

import React from "react";

interface PreferencesPageHeaderProps {
  title?: string;
}

export default function PreferencesPageHeader({
  title = "Preferences",
}: PreferencesPageHeaderProps) {
  return (
    <div className="mb-4">
      <h1 className="text-[20px] font-normal text-[#333333] tracking-tight">
        {title}
      </h1>
    </div>
  );
}
