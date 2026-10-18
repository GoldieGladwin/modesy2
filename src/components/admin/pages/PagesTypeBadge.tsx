"use client";

import React from "react";
import { CMSPageType } from "./types";

interface PagesTypeBadgeProps {
  pageType: CMSPageType;
}

export default function PagesTypeBadge({ pageType }: PagesTypeBadgeProps) {
  if (pageType === "Custom") {
    return (
      <span className="px-2.5 py-0.5 bg-[#00c0ef] text-white text-[11px] font-normal rounded-[3px] inline-block">
        Custom
      </span>
    );
  }

  return (
    <span className="px-2.5 py-0.5 bg-[#777777] text-white text-[11px] font-normal rounded-[3px] inline-block">
      Default
    </span>
  );
}
