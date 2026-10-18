"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { FaqItem } from "./types";
import { INITIAL_FAQ_ITEMS } from "./initialData";

interface AffiliateFaqCardProps {
  initialItems?: FaqItem[];
  onSave?: (items: FaqItem[]) => void;
}

export default function AffiliateFaqCard({
  initialItems = INITIAL_FAQ_ITEMS,
  onSave,
}: AffiliateFaqCardProps) {
  const [faqItems, setFaqItems] = useState<FaqItem[]>(initialItems);

  const toggleFaq = (id: number) => {
    setFaqItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  const handleAddQuestion = () => {
    const newId = faqItems.length + 1;
    setFaqItems((prev) => [
      ...prev,
      {
        id: newId,
        question: `New Question #${newId}`,
        answer: "Provide detailed answer information for your affiliates here.",
        isOpen: true,
      },
    ]);
  };

  const handleSaveClick = () => {
    onSave?.(faqItems);
    alert("Success: Frequently Asked Questions settings have been saved!");
  };

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-[4px] shadow-2xs p-5 relative pb-16">
      <h2 className="text-[15px] font-semibold text-[#333333] pb-3 border-b border-[#f0f0f0] mb-5">
        Frequently Asked Questions
      </h2>

      <div className="space-y-2.5 mb-4">
        {faqItems.map((item) => (
          <div
            key={item.id}
            className="border border-[#e2e8f0] rounded-[3px] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggleFaq(item.id)}
              className="w-full px-4 py-2.5 bg-white hover:bg-gray-50 text-left text-[13px] font-medium text-[#444] flex items-center justify-between transition cursor-pointer"
            >
              <span>{item.question}</span>
              {item.isOpen ? (
                <ChevronUp className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </button>
            {item.isOpen && (
              <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 text-[12px] text-gray-600 leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Question Button */}
      <button
        type="button"
        onClick={handleAddQuestion}
        className="px-3 py-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-[12px] font-semibold rounded-[3px] transition cursor-pointer inline-flex items-center gap-1 shadow-2xs"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Add Question</span>
      </button>

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
