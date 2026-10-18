"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight, Search } from "lucide-react";

export interface CategoryTreeItem {
  id: string;
  name: string;
  code: string;
  children?: { id: string; name: string }[];
}

export const CATEGORY_TREE_DATA: CategoryTreeItem[] = [
  {
    id: "1",
    name: "Clothing",
    code: "• #1",
    children: [
      { id: "1-1", name: "Clothing / Women's Clothing" },
      { id: "1-2", name: "Clothing / Men's Clothing" },
      { id: "1-3", name: "Clothing / Kid's Clothing" },
    ],
  },
  {
    id: "6",
    name: "Graphics & Photos",
    code: "• #6",
    children: [
      { id: "6-1", name: "Graphics & Photos / Graphics" },
      { id: "6-2", name: "Graphics & Photos / Photos" },
    ],
  },
  {
    id: "3",
    name: "Home & Living",
    code: "• #3",
    children: [
      { id: "3-1", name: "Home & Living / Furniture" },
      { id: "3-2", name: "Home & Living / Home Decor / Decorative Pillows" },
      { id: "3-3", name: "Home & Living / Painting" },
    ],
  },
  {
    id: "4",
    name: "Jewelry & Accessories",
    code: "• #4",
    children: [
      { id: "4-1", name: "Jewelry & Accessories / Necklaces & Accessories" },
      { id: "4-2", name: "Jewelry & Accessories / Bags & Purses / Handbags" },
    ],
  },
  {
    id: "2",
    name: "Shoes",
    code: "• #2",
    children: [
      { id: "2-1", name: "Shoes / Women's Shoes / Boots" },
      { id: "2-2", name: "Shoes / Men's Shoes" },
    ],
  },
  {
    id: "5",
    name: "Toys & Entertainment",
    code: "• #5",
    children: [
      { id: "5-1", name: "Toys & Entertainment / Board Games" },
      { id: "5-2", name: "Toys & Entertainment / Action Figures" },
    ],
  },
  {
    id: "7",
    name: "Video & Audio",
    code: "• #7",
    children: [
      { id: "7-1", name: "Video & Audio / Sound Effects" },
      { id: "7-2", name: "Video & Audio / Stock Footage" },
    ],
  },
  {
    id: "8",
    name: "Web Templates & Code",
    code: "• #8",
    children: [
      { id: "8-1", name: "Web Templates & Code / HTML Templates" },
      { id: "8-2", name: "Web Templates & Code / Scripts & Code" },
    ],
  },
];

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function CategorySelectDropdown({
  value,
  onChange,
  placeholder = "Select Category",
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelect = (name: string) => {
    onChange(name);
    setIsOpen(false);
  };

  // Filter categories by search
  const filteredTree = CATEGORY_TREE_DATA.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const parentMatches = item.name.toLowerCase().includes(q);
    const childMatches = item.children?.some((c) =>
      c.name.toLowerCase().includes(q)
    );
    return parentMatches || childMatches;
  });

  return (
    <div ref={containerRef} className="relative w-full text-xs">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between border rounded-xs px-3 py-2 text-xs bg-white text-left transition-all duration-200 cursor-pointer ${
          isOpen
            ? "border-[#0084ff] ring-1 ring-[#0084ff]/20"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <span className={value ? "text-gray-800 font-normal" : "text-gray-500"}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#0084ff]" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu with animation */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-300 rounded-xs shadow-lg z-50 overflow-hidden animate-dropdown-menu">
          {/* Search Box */}
          <div className="p-2 border-b border-gray-100 bg-white">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-xs px-3 py-1.5 text-xs text-gray-700 outline-none focus:border-[#0084ff] focus:ring-1 focus:ring-[#0084ff]/20 transition"
              />
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto divide-y divide-gray-50 scrollbar-thin">
            {/* "None" option */}
            <div
              onClick={() => handleSelect("")}
              className="px-4 py-2 hover:bg-[#e9ecef] cursor-pointer text-gray-700 transition-colors font-medium bg-[#f8f9fa]"
            >
              None
            </div>

            {filteredTree.map((cat) => {
              const isExpanded = expandedNodes[cat.id] || Boolean(searchQuery);

              return (
                <div key={cat.id}>
                  {/* Parent item */}
                  <div
                    onClick={() => handleSelect(cat.name)}
                    className="flex items-center gap-1.5 px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 transition-colors group"
                  >
                    {cat.children && cat.children.length > 0 ? (
                      <button
                        type="button"
                        onClick={(e) => toggleExpand(cat.id, e)}
                        className="p-0.5 text-gray-400 hover:text-gray-700 transition"
                      >
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform duration-150 ${
                            isExpanded ? "rotate-90 text-[#0084ff]" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <span className="w-4" />
                    )}
                    <span className="font-normal text-gray-800">
                      {cat.name}
                    </span>
                    <span className="text-[11px] text-gray-400 ml-1">
                      {cat.code}
                    </span>
                  </div>

                  {/* Children Subcategories */}
                  {isExpanded && cat.children && (
                    <div className="bg-gray-50/70 border-l-2 border-gray-200 ml-4 animate-in fade-in duration-150">
                      {cat.children.map((child) => (
                        <div
                          key={child.id}
                          onClick={() => handleSelect(child.name)}
                          className="pl-4 pr-3 py-1.5 hover:bg-gray-200/80 cursor-pointer text-gray-600 hover:text-gray-900 transition-colors text-[11px]"
                        >
                          {child.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {filteredTree.length === 0 && (
              <div className="p-3 text-center text-gray-400 text-xs">
                No categories found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
