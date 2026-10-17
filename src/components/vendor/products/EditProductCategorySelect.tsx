"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

export interface CategoryLeafItem {
  name: string;
}

export interface CategorySubItem {
  id: string;
  name: string;
  code: string;
  items?: string[];
}

export interface CategoryParentItem {
  id: string;
  name: string;
  code: string;
  children: CategorySubItem[];
}

// Complete Category Hierarchy with exact Modesy IDs
export const CATEGORY_TREE_DATA: CategoryParentItem[] = [
  {
    id: "1",
    name: "Clothing",
    code: "- #1",
    children: [
      {
        id: "9",
        name: "Women's Clothing",
        code: "- #9",
        items: ["Dresses", "Skirts", "Pants & Capris", "Sweaters", "Scarves"],
      },
      {
        id: "10",
        name: "Men's Clothing",
        code: "- #10",
        items: ["Jackets & Coats", "Sweaters", "Pants & Jeans", "Shirts"],
      },
      {
        id: "11",
        name: "Kid's Clothing",
        code: "- #11",
        items: ["Clothing Sets"],
      },
    ],
  },
  {
    id: "6",
    name: "Graphics & Photos",
    code: "- #6",
    children: [
      {
        id: "28",
        name: "Graphics",
        code: "- #28",
        items: ["Icons", "Vectors", "Add-ons"],
      },
      {
        id: "30",
        name: "Logos",
        code: "- #30",
        items: ["Abstract", "Company", "Numbers", "Objects"],
      },
      {
        id: "31",
        name: "Photos",
        code: "- #31",
        items: [
          "Animals",
          "Architecture & Business",
          "Food & Health",
          "Sports & People",
          "Technology & Travel",
        ],
      },
      {
        id: "29",
        name: "Web Elements",
        code: "- #29",
        items: ["Badges Stickers", "Banners Ads"],
      },
    ],
  },
  {
    id: "3",
    name: "Home & Living",
    code: "- #3",
    children: [
      {
        id: "15",
        name: "Home Decor",
        code: "- #15",
        items: ["Decorative Pillows", "Clocks", "Vases"],
      },
      {
        id: "16",
        name: "Furniture",
        code: "- #16",
        items: ["Living Room Furniture", "Dining Room Furniture"],
      },
      {
        id: "17",
        name: "Office",
        code: "- #17",
        items: ["Office & School Supplies"],
      },
      {
        id: "18",
        name: "Outdoor & Gardening",
        code: "- #18",
        items: ["Garden Decoration", "Plants"],
      },
      {
        id: "19",
        name: "Painting",
        code: "- #19",
        items: ["Acrylic", "Watercolor", "Digital Prints"],
      },
    ],
  },
  {
    id: "4",
    name: "Jewelry & Accessories",
    code: "- #4",
    children: [
      {
        id: "20",
        name: "Bags & Purses",
        code: "- #20",
        items: ["Backpacks", "Handbags"],
      },
      {
        id: "21",
        name: "Necklaces & Accessories",
        code: "- #21",
        items: ["Pendants", "Sun Hats", "Scarfs"],
      },
      {
        id: "22",
        name: "Rings",
        code: "- #22",
        items: [],
      },
    ],
  },
  {
    id: "2",
    name: "Shoes",
    code: "- #2",
    children: [
      {
        id: "12",
        name: "Women's Shoes",
        code: "- #12",
        items: ["Sneakers & Athletic Shoes", "Boots", "Sandals"],
      },
      {
        id: "13",
        name: "Men's Shoes",
        code: "- #13",
        items: ["Sneakers", "Boots", "Sandals"],
      },
      {
        id: "14",
        name: "Kid's Shoes",
        code: "- #14",
        items: ["Booties & Crib Shoes", "Slippers"],
      },
    ],
  },
  {
    id: "5",
    name: "Toys & Entertainment",
    code: "- #5",
    children: [
      {
        id: "23",
        name: "Musical Instruments",
        code: "- #23",
        items: ["Guitars", "Drums", "Stringed Instruments"],
      },
      {
        id: "24",
        name: "Video Games",
        code: "- #24",
        items: [],
      },
      {
        id: "25",
        name: "Toys",
        code: "- #25",
        items: ["Electronic Toys", "Dolls & Action Figures", "Puzzles"],
      },
      {
        id: "26",
        name: "Headphones",
        code: "- #26",
        items: ["Over-Ear Headphones", "Earbud Headphones"],
      },
      {
        id: "27",
        name: "Magazines",
        code: "- #27",
        items: ["Arts, Music & Photography", "Fashion & Style"],
      },
      {
        id: "41",
        name: "Movies",
        code: "- #41",
        items: ["Movies & TV", "Blu-Ray"],
      },
      {
        id: "42",
        name: "Books",
        code: "- #42",
        items: [
          "Art & Photography Books",
          "History Books",
          "Poetry Books",
          "Novels",
        ],
      },
    ],
  },
  {
    id: "7",
    name: "Video & Audio",
    code: "- #7",
    children: [
      {
        id: "32",
        name: "After Effects",
        code: "- #32",
        items: ["Video Overlays & Elements", "Product Promo", "Video Displays"],
      },
      {
        id: "33",
        name: "Premiere Pro",
        code: "- #33",
        items: ["Broadcast Packages", "Product Promo", "Video Displays"],
      },
      {
        id: "34",
        name: "Music",
        code: "- #34",
        items: [
          "Ambient",
          "Cinematic Music",
          "Classical Music",
          "Corporate",
        ],
      },
      {
        id: "35",
        name: "Sound Effects",
        code: "- #35",
        items: [
          "Cartoon Sounds",
          "Domestic Sounds",
          "Futuristic Sounds",
          "Nature Sounds",
          "Human Sounds",
        ],
      },
    ],
  },
  {
    id: "8",
    name: "Web Templates & Code",
    code: "- #8",
    children: [
      {
        id: "36",
        name: "WordPress Templates",
        code: "- #36",
        items: ["Blog & Magazine", "Directory & Listing", "Real Estate"],
      },
      {
        id: "37",
        name: "HTML Templates",
        code: "- #37",
        items: ["Corporate", "Creative", "Other"],
      },
      {
        id: "38",
        name: "PHP Scripts",
        code: "- #38",
        items: ["eCommerce", "Miscellaneous", "Corporate", "Education"],
      },
      {
        id: "39",
        name: "Plugins",
        code: "- #39",
        items: ["Widgets"],
      },
      {
        id: "40",
        name: "JavaScript & CSS",
        code: "- #40",
        items: ["Calendars", "Charts And Graphs"],
      },
    ],
  },
];

interface EditProductCategorySelectProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function EditProductCategorySelect({
  value,
  onChange,
  placeholder = "Select Category",
}: EditProductCategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Map of opened parent categories (can be opened and closed toggleable)
  const [openParents, setOpenParents] = useState<Record<string, boolean>>({});

  // Map of opened subcategories (can be opened and closed toggleable)
  const [openSubs, setOpenSubs] = useState<Record<string, boolean>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // When opening dropdown, pre-expand the parent of current selected item if found
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);

      // Find which parent category contains the current value
      if (value) {
        const lowerVal = value.toLowerCase();
        CATEGORY_TREE_DATA.forEach((parent) => {
          if (parent.name.toLowerCase() === lowerVal) {
            setOpenParents((prev) => ({ ...prev, [parent.id]: true }));
          }
          parent.children.forEach((sub) => {
            if (
              sub.name.toLowerCase() === lowerVal ||
              sub.items?.some((it) => it.toLowerCase() === lowerVal)
            ) {
              setOpenParents((prev) => ({ ...prev, [parent.id]: true }));
              setOpenSubs((prev) => ({ ...prev, [sub.id]: true }));
            }
          });
        });
      }
    } else {
      setSearchQuery("");
    }
  }, [isOpen, value]);

  // Toggle open / close for Parent category ("ada penutupnya")
  const handleToggleParent = (parentId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setOpenParents((prev) => ({
      ...prev,
      [parentId]: !prev[parentId],
    }));
  };

  // Toggle open / close for Subcategory ("ada penutupnya")
  const handleToggleSub = (subId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setOpenSubs((prev) => ({
      ...prev,
      [subId]: !prev[subId],
    }));
  };

  const handleSelect = (selectedName: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onChange(selectedName);
    setIsOpen(false);
  };

  // Search filter
  const q = searchQuery.toLowerCase().trim();
  const filteredTree = CATEGORY_TREE_DATA.filter((parent) => {
    if (!q) return true;
    if (parent.name.toLowerCase().includes(q)) return true;
    return parent.children.some(
      (sub) =>
        sub.name.toLowerCase().includes(q) ||
        sub.items?.some((it) => it.toLowerCase().includes(q))
    );
  });

  return (
    <div ref={containerRef} className="relative w-full text-xs">
      {/* 1. Category Trigger Box (Persis Screenshot 1 & 2) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-[36px] px-3 flex items-center justify-between border rounded-[3px] text-xs bg-white text-left transition-colors cursor-pointer ${
          isOpen
            ? "border-[#0084ff] ring-1 ring-[#0084ff]/25"
            : "border-[#d2d6de] hover:border-gray-400"
        }`}
      >
        <span className={value ? "text-[#333] font-normal" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* 2. Category Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#d2d6de] rounded-[3px] shadow-lg z-50 overflow-hidden">
          {/* Search Box */}
          <div className="p-2.5 border-b border-[#f0f0f0] bg-white">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[32px] px-3 border border-[#d2d6de] rounded-[2px] text-xs text-[#555] placeholder-gray-400 outline-none focus:border-[#0084ff] transition-colors"
            />
          </div>

          {/* Categories Tree List */}
          <div className="max-h-72 overflow-y-auto py-1 text-xs select-none">
            {filteredTree.map((parent) => {
              const isParentOpen =
                openParents[parent.id] || Boolean(searchQuery);

              return (
                <div key={parent.id} className="text-left">
                  {/* Parent Row: > Category - #ID (Clickable to open & close) */}
                  <div
                    onClick={() => handleToggleParent(parent.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-[#f8f9fa] cursor-pointer text-[#495057] transition-colors select-none group"
                  >
                    {/* Toggle Icon: > (closed) or v (open in blue) */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleParent(parent.id, e)}
                      className="p-0.5 text-gray-400 hover:text-[#0084ff] transition cursor-pointer"
                    >
                      {isParentOpen ? (
                        <ChevronDown className="w-3.5 h-3.5 text-[#0084ff]" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600" />
                      )}
                    </button>

                    <span className="font-normal text-[#333] group-hover:text-[#0084ff] transition-colors">
                      {parent.name}
                    </span>
                    <span className="text-[11px] text-gray-400 ml-1">
                      {parent.code}
                    </span>
                  </div>

                  {/* Subcategories (Level 2: Indented) */}
                  {isParentOpen && (
                    <div className="pl-6">
                      {parent.children.map((sub) => {
                        const hasItems = sub.items && sub.items.length > 0;
                        const isSubOpen =
                          openSubs[sub.id] || Boolean(searchQuery);

                        return (
                          <div key={sub.id} className="text-left">
                            {/* Subcategory Row */}
                            <div
                              onClick={() => {
                                if (hasItems) {
                                  handleToggleSub(sub.id);
                                } else {
                                  handleSelect(sub.name);
                                }
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-[#f8f9fa] cursor-pointer text-[#495057] transition-colors select-none group"
                            >
                              {/* Subcategory Toggle Icon: > (closed) or v (open in blue) */}
                              {hasItems ? (
                                <button
                                  type="button"
                                  onClick={(e) => handleToggleSub(sub.id, e)}
                                  className="p-0.5 text-gray-400 hover:text-[#0084ff] transition cursor-pointer"
                                >
                                  {isSubOpen ? (
                                    <ChevronDown className="w-3.5 h-3.5 text-[#0084ff]" />
                                  ) : (
                                    <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600" />
                                  )}
                                </button>
                              ) : (
                                <span className="w-3.5" />
                              )}

                              <span className="font-normal text-[#444] group-hover:text-[#0084ff] transition-colors">
                                {sub.name}
                              </span>
                              <span className="text-[11px] text-gray-400 ml-1">
                                {sub.code}
                              </span>
                            </div>

                            {/* Subcategory Items (Level 3: e.g. Scarfs, Backpacks, Dresses) */}
                            {isSubOpen && hasItems && (
                              <div className="pl-6 py-0.5 space-y-0.5">
                                {sub.items!.map((leafItem) => {
                                  const isSelected =
                                    value.toLowerCase() ===
                                    leafItem.toLowerCase();

                                  return (
                                    <div
                                      key={leafItem}
                                      onClick={(e) =>
                                        handleSelect(leafItem, e)
                                      }
                                      className={`px-3 py-1 hover:bg-[#e9ecef] cursor-pointer text-[11.5px] transition-colors rounded-[2px] ${
                                        isSelected
                                          ? "text-[#0084ff] font-semibold bg-blue-50/70"
                                          : "text-[#555] hover:text-[#222]"
                                      }`}
                                    >
                                      {leafItem}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {filteredTree.length === 0 && (
              <div className="p-4 text-center text-gray-400 text-xs">
                No categories found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
