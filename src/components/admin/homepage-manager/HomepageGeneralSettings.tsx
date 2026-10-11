"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { ModesyHomepageSettings } from "@/types/uliladmin";

interface Props {
  onNotify?: (msg: string) => void;
}

export default function HomepageGeneralSettings({ onNotify }: Props) {
  const [settings, setSettings] = useState<ModesyHomepageSettings>({
    featuredCategories: "Show",
    featuredProducts: "Show",
    latestProducts: "Show",
    blogSlider: "Show",
    productsPerRow: "6 Products",
    featuredProductsCount: 12,
    latestProductsCount: 12,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNotify) onNotify("Homepage settings saved successfully!");
  };

  // Helper component for Modesy radio buttons (with purple checkmark)
  const CustomRadio = ({
    name,
    value,
    selected,
    onSelect,
    label,
  }: {
    name: string;
    value: string;
    selected: boolean;
    onSelect: () => void;
    label: string;
  }) => {
    return (
      <label
        onClick={onSelect}
        className="inline-flex items-center gap-2 cursor-pointer select-none text-xs text-gray-700"
      >
        <div
          className={`w-4 h-4 rounded-full flex items-center justify-center transition ${
            selected
              ? "bg-[#5046e5] text-white"
              : "border-2 border-gray-300 bg-white hover:border-gray-400"
          }`}
        >
          {selected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
        </div>
        <span>{label}</span>
      </label>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-none max-w-xl">
      <h2 className="text-base font-semibold text-gray-700 mb-6">Settings</h2>

      <form onSubmit={handleSave} className="space-y-5 text-xs">
        {/* 1. Featured Categories */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Featured Categories
          </label>
          <div className="flex items-center gap-8">
            <CustomRadio
              name="featuredCategories"
              value="Show"
              selected={settings.featuredCategories === "Show"}
              onSelect={() => setSettings({ ...settings, featuredCategories: "Show" })}
              label="Show"
            />
            <CustomRadio
              name="featuredCategories"
              value="Hide"
              selected={settings.featuredCategories === "Hide"}
              onSelect={() => setSettings({ ...settings, featuredCategories: "Hide" })}
              label="Hide"
            />
          </div>
        </div>

        {/* 2. Featured Products */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Featured Products
          </label>
          <div className="flex items-center gap-8">
            <CustomRadio
              name="featuredProducts"
              value="Show"
              selected={settings.featuredProducts === "Show"}
              onSelect={() => setSettings({ ...settings, featuredProducts: "Show" })}
              label="Show"
            />
            <CustomRadio
              name="featuredProducts"
              value="Hide"
              selected={settings.featuredProducts === "Hide"}
              onSelect={() => setSettings({ ...settings, featuredProducts: "Hide" })}
              label="Hide"
            />
          </div>
        </div>

        {/* 3. Latest Products */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Latest Products
          </label>
          <div className="flex items-center gap-8">
            <CustomRadio
              name="latestProducts"
              value="Show"
              selected={settings.latestProducts === "Show"}
              onSelect={() => setSettings({ ...settings, latestProducts: "Show" })}
              label="Show"
            />
            <CustomRadio
              name="latestProducts"
              value="Hide"
              selected={settings.latestProducts === "Hide"}
              onSelect={() => setSettings({ ...settings, latestProducts: "Hide" })}
              label="Hide"
            />
          </div>
        </div>

        {/* 4. Blog Slider */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Blog Slider
          </label>
          <div className="flex items-center gap-8">
            <CustomRadio
              name="blogSlider"
              value="Show"
              selected={settings.blogSlider === "Show"}
              onSelect={() => setSettings({ ...settings, blogSlider: "Show" })}
              label="Show"
            />
            <CustomRadio
              name="blogSlider"
              value="Hide"
              selected={settings.blogSlider === "Hide"}
              onSelect={() => setSettings({ ...settings, blogSlider: "Hide" })}
              label="Hide"
            />
          </div>
        </div>

        {/* 5. Products per Row on Homepage */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Products per Row on Homepage
          </label>
          <div className="flex items-center gap-8">
            <CustomRadio
              name="productsPerRow"
              value="5 Products"
              selected={settings.productsPerRow === "5 Products"}
              onSelect={() => setSettings({ ...settings, productsPerRow: "5 Products" })}
              label="5 Products"
            />
            <CustomRadio
              name="productsPerRow"
              value="6 Products"
              selected={settings.productsPerRow === "6 Products"}
              onSelect={() => setSettings({ ...settings, productsPerRow: "6 Products" })}
              label="6 Products"
            />
          </div>
        </div>

        {/* 6. Number of Featured Products to Show */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1.5">
            Number of Featured Products to Show
          </label>
          <input
            type="number"
            min="1"
            value={settings.featuredProductsCount}
            onChange={(e) =>
              setSettings({ ...settings, featuredProductsCount: Number(e.target.value) })
            }
            className="w-full border border-gray-300 rounded-xs px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#0084ff]"
          />
        </div>

        {/* 7. Number of Latest Products to Show */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1.5">
            Number of Latest Products to Show
          </label>
          <input
            type="number"
            min="1"
            value={settings.latestProductsCount}
            onChange={(e) =>
              setSettings({ ...settings, latestProductsCount: Number(e.target.value) })
            }
            className="w-full border border-gray-300 rounded-xs px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-[#0084ff]"
          />
        </div>

        {/* Save button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 bg-[#0084ff] hover:bg-[#0073e6] text-white text-xs font-medium rounded-xs transition shadow-none"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
