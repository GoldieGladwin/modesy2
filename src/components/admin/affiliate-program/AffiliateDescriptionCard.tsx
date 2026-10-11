"use client";

import React, { useState } from "react";
import { AffiliateDescription } from "./types";
import { DEFAULT_AFFILIATE_DESCRIPTION } from "./initialData";

interface AffiliateDescriptionCardProps {
  initialDescription?: AffiliateDescription;
  onSave?: (desc: AffiliateDescription) => void;
}

export default function AffiliateDescriptionCard({
  initialDescription = DEFAULT_AFFILIATE_DESCRIPTION,
  onSave,
}: AffiliateDescriptionCardProps) {
  const [descState, setDescState] = useState<AffiliateDescription>(initialDescription);

  const handleTitleChange = (val: string) => {
    setDescState((prev) => ({ ...prev, title: val }));
  };

  const handleDescriptionChange = (val: string) => {
    setDescState((prev) => ({ ...prev, description: val }));
  };

  const handleSaveClick = () => {
    onSave?.(descState);
    alert("Success: Description settings have been saved!");
  };

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-[4px] shadow-2xs p-5 relative pb-16">
      <h2 className="text-[15px] font-semibold text-[#333333] pb-3 border-b border-[#f0f0f0] mb-5">
        Description
      </h2>

      <div className="space-y-5 text-[13px]">
        {/* Title Input */}
        <div>
          <label className="block text-[13px] font-semibold text-[#555] mb-1.5">
            Title
          </label>
          <input
            type="text"
            value={descState.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full border border-[#d2d6de] rounded-[3px] px-3 py-2 text-[13px] text-[#444] focus:outline-none focus:border-[#00a99d]"
          />
        </div>

        {/* Description Textarea */}
        <div>
          <label className="block text-[13px] font-semibold text-[#555] mb-1.5">
            Description
          </label>
          <textarea
            rows={5}
            value={descState.description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            className="w-full border border-[#d2d6de] rounded-[3px] px-3 py-2 text-[13px] text-[#444] focus:outline-none focus:border-[#00a99d] leading-relaxed resize-y"
          />
        </div>
      </div>

      {/* Save Changes Button (Bottom Right) */}
      <div className="absolute right-5 bottom-4">
        <button
          type="button"
          onClick={handleSaveClick}
          className="px-4 py-2 bg-[#007bff] hover:bg-[#0069d9] text-white rounded-[3px] text-[13px] font-semibold transition cursor-pointer shadow-2xs"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
