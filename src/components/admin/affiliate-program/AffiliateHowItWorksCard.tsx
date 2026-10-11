"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { HowItWorksItem } from "./types";
import { INITIAL_HOW_IT_WORKS_ITEMS } from "./initialData";

interface AffiliateHowItWorksCardProps {
  initialItems?: HowItWorksItem[];
  onSave?: (items: HowItWorksItem[]) => void;
}

export default function AffiliateHowItWorksCard({
  initialItems = INITIAL_HOW_IT_WORKS_ITEMS,
  onSave,
}: AffiliateHowItWorksCardProps) {
  const [items, setItems] = useState<HowItWorksItem[]>(initialItems);

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  const handleSaveClick = () => {
    onSave?.(items);
    alert("Success: How It Works settings have been saved!");
  };

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-[4px] shadow-2xs p-5 relative pb-16">
      <h2 className="text-[15px] font-semibold text-[#333333] pb-3 border-b border-[#f0f0f0] mb-5">
        How It Works
      </h2>

      <div className="space-y-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-[#e2e8f0] rounded-[3px] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full px-4 py-2.5 bg-white hover:bg-gray-50 text-left text-[13px] font-medium text-[#444] flex items-center justify-between transition cursor-pointer"
            >
              <span>{item.title}</span>
              {item.isOpen ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>
            {item.isOpen && (
              <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 text-[12px] text-gray-600 leading-relaxed">
                {item.content}
              </div>
            )}
          </div>
        ))}
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
