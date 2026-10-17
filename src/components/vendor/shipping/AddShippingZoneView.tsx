"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlignJustify, X } from "lucide-react";
import { addShippingZone } from "./shippingStore";
import { AVAILABLE_CONTINENTS } from "./mockData";

export default function AddShippingZoneView() {
  const router = useRouter();
  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [estDeliveryEn, setEstDeliveryEn] = useState("");
  const [estDeliveryAr, setEstDeliveryAr] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedContinent, setSelectedContinent] = useState("");

  const handleAddRegion = (continent: string) => {
    if (continent && !selectedRegions.includes(continent)) {
      setSelectedRegions([...selectedRegions, continent]);
    }
    setSelectedContinent("");
  };

  const handleRemoveRegion = (region: string) => {
    setSelectedRegions(selectedRegions.filter((r) => r !== region));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn.trim()) return;

    addShippingZone({
      name: {
        en: nameEn.trim(),
        ar: nameAr.trim() || nameEn.trim(),
      },
      estimatedDelivery: {
        en: estDeliveryEn.trim() || "3-5 Days",
        ar: estDeliveryAr.trim() || "3-5 أيام",
      },
      regions: selectedRegions.length > 0 ? selectedRegions : ["Europe"],
      methods: [
        {
          id: `m_${Date.now()}_1`,
          type: "free",
          name: { en: "Free Shipping", ar: "الشحن مجانا" },
          status: true,
          minOrderAmount: "100",
        },
        {
          id: `m_${Date.now()}_2`,
          type: "flat_rate",
          name: { en: "Flat Rate", ar: "سعر موحد" },
          status: true,
          cost: "10",
        },
      ],
    });

    router.push("/dashboard/shipping_settings");
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded border border-[#e4e7ea] p-6 shadow-sm">
        {/* Card Header */}
        <div className="flex items-center justify-between pb-5 border-b border-gray-100 mb-6">
          <h1 className="text-[16px] font-semibold text-gray-800">
            Add Shipping Zone
          </h1>
          <Link
            href="/dashboard/shipping_settings"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#20c997] hover:bg-[#1bb285] text-white text-[12.5px] font-medium rounded-[3px] transition-colors shadow-xs"
          >
            <AlignJustify className="w-3.5 h-3.5" />
            <span>Shipping Zones</span>
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
          {/* Zone Name */}
          <div>
            <label className="block text-[13px] text-gray-700 font-medium mb-1.5">
              Zone Name
            </label>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="English"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-[3px] px-3.5 py-2 text-[13px] text-gray-800 focus:outline-none focus:border-[#20c997] transition-colors placeholder:text-gray-400"
              />
              <input
                type="text"
                placeholder="Arabic"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                dir="rtl"
                className="w-full border border-gray-300 rounded-[3px] px-3.5 py-2 text-[13px] text-gray-800 focus:outline-none focus:border-[#20c997] transition-colors placeholder:text-gray-400 text-right"
              />
            </div>
          </div>

          {/* Estimated Delivery */}
          <div>
            <label className="block text-[13px] text-gray-700 font-medium mb-1.5">
              Estimated Delivery{" "}
              <span className="text-gray-400 font-normal">
                (Example: 3-5 Days)
              </span>
            </label>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="English"
                value={estDeliveryEn}
                onChange={(e) => setEstDeliveryEn(e.target.value)}
                className="w-full border border-gray-300 rounded-[3px] px-3.5 py-2 text-[13px] text-gray-800 focus:outline-none focus:border-[#20c997] transition-colors placeholder:text-gray-400"
              />
              <input
                type="text"
                placeholder="Arabic"
                value={estDeliveryAr}
                onChange={(e) => setEstDeliveryAr(e.target.value)}
                dir="rtl"
                className="w-full border border-gray-300 rounded-[3px] px-3.5 py-2 text-[13px] text-gray-800 focus:outline-none focus:border-[#20c997] transition-colors placeholder:text-gray-400 text-right"
              />
            </div>
          </div>

          {/* Regions */}
          <div>
            <label className="block text-[13px] text-gray-700 font-medium mb-1.5">
              Regions
            </label>

            {/* Selected Regions Pills (if any) */}
            {selectedRegions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 items-center mb-2.5">
                {selectedRegions.map((region) => (
                  <span
                    key={region}
                    className="inline-flex items-center gap-1.5 bg-[#e9ecef] text-[#495057] text-[12px] font-medium px-2.5 py-1 rounded-[3px]"
                  >
                    <span>{region}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRegion(region)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Continent Dropdown */}
            <select
              value={selectedContinent}
              onChange={(e) => handleAddRegion(e.target.value)}
              className="w-full border border-gray-300 rounded-[3px] px-3.5 py-2 text-[13px] text-gray-600 bg-white focus:outline-none focus:border-[#20c997]"
            >
              <option value="">Continent</option>
              {AVAILABLE_CONTINENTS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="px-6 py-2 bg-[#20c997] hover:bg-[#1bb285] text-white text-[13px] font-medium rounded-[3px] transition-colors shadow-sm cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
