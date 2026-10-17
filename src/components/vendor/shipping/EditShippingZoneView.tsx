"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlignJustify, Plus, Edit3, Trash2, X, CheckCircle2 } from "lucide-react";
import {
  getShippingZoneById,
  updateShippingZone,
} from "./shippingStore";
import { ShippingMethod } from "./types";
import { AVAILABLE_CONTINENTS } from "./mockData";
import ShippingMethodModal from "./ShippingMethodModal";
import AddShippingMethodSelectModal from "./AddShippingMethodSelectModal";

interface EditShippingZoneViewProps {
  zoneId: string;
}

export default function EditShippingZoneView({ zoneId }: EditShippingZoneViewProps) {
  const router = useRouter();

  const [nameEn, setNameEn] = useState("International");
  const [nameAr, setNameAr] = useState("دولي");
  const [estDeliveryEn, setEstDeliveryEn] = useState("20-25 Days");
  const [estDeliveryAr, setEstDeliveryAr] = useState("20-25 يوماً");
  const [regions, setRegions] = useState<string[]>([
    "Europe",
    "Asia",
    "North America",
    "South America",
    "Oceania",
    "Antarctica",
  ]);
  const [selectedContinent, setSelectedContinent] = useState("");
  const [methods, setMethods] = useState<ShippingMethod[]>([
    {
      id: "m1",
      type: "free",
      name: { en: "Free Shipping", ar: "الشحن مجانا" },
      status: true,
      minOrderAmount: "200",
    },
    {
      id: "m2",
      type: "flat_rate",
      name: { en: "Flat Rate", ar: "سعر موحد" },
      status: true,
      cost: "10",
    },
  ]);

  // Method Modal states
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isMethodModalOpen, setIsMethodModalOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState<ShippingMethod | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const existing = getShippingZoneById(zoneId);
    if (existing) {
      setNameEn(existing.name.en);
      setNameAr(existing.name.ar);
      setEstDeliveryEn(existing.estimatedDelivery.en);
      setEstDeliveryAr(existing.estimatedDelivery.ar);
      setRegions([...existing.regions]);
      setMethods([...existing.methods]);
    }
  }, [zoneId]);

  const handleAddRegion = (continent: string) => {
    if (continent && !regions.includes(continent)) {
      setRegions([...regions, continent]);
    }
    setSelectedContinent("");
  };

  const handleRemoveRegion = (reg: string) => {
    setRegions(regions.filter((r) => r !== reg));
  };

  const handleOpenAddMethod = () => {
    setIsSelectModalOpen(true);
  };

  const handleApplySelectMethod = (methodType: "free" | "flat_rate" | "local_pickup") => {
    const newMethod: ShippingMethod = {
      id: `m_${Date.now()}`,
      type: methodType,
      name:
        methodType === "free"
          ? { en: "Free Shipping", ar: "الشحن مجانا" }
          : methodType === "local_pickup"
          ? { en: "Local Pickup", ar: "استلام شخصي" }
          : { en: "Flat Rate", ar: "سعر موحد" },
      status: true,
      minOrderAmount: methodType === "free" ? "200" : undefined,
      cost: methodType === "flat_rate" ? "10" : undefined,
    };
    setMethods([...methods, newMethod]);
    showToast(`${newMethod.name.en} added successfully!`);
  };

  const handleOpenEditMethod = (method: ShippingMethod) => {
    setEditingMethod(method);
    setIsMethodModalOpen(true);
  };

  const handleSaveMethod = (savedMethod: ShippingMethod) => {
    if (editingMethod) {
      setMethods(methods.map((m) => (m.id === savedMethod.id ? savedMethod : m)));
      showToast("Shipping method updated successfully!");
    } else {
      setMethods([...methods, savedMethod]);
      showToast("Shipping method added successfully!");
    }
  };

  const handleDeleteMethod = (methodId: string) => {
    if (confirm("Are you sure you want to delete this shipping method?")) {
      setMethods(methods.filter((m) => m.id !== methodId));
      showToast("Shipping method deleted successfully!");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateShippingZone(zoneId, {
      name: { en: nameEn, ar: nameAr },
      estimatedDelivery: { en: estDeliveryEn, ar: estDeliveryAr },
      regions,
      methods,
    });
    showToast("Shipping zone saved successfully!");
  };

  return (
    <div className="w-full">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white text-xs font-medium px-4 py-3 rounded shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="bg-white rounded border border-[#e4e7ea] p-6 shadow-sm">
        {/* Card Header */}
        <div className="flex items-center justify-between pb-5 border-b border-gray-100 mb-6">
          <h1 className="text-[16px] font-semibold text-gray-800">
            Edit Shipping Zone
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
                className="w-full border border-gray-300 rounded-[3px] px-3.5 py-2 text-[13px] text-gray-800 focus:outline-none focus:border-[#20c997] transition-colors"
              />
              <input
                type="text"
                placeholder="Arabic"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                dir="rtl"
                className="w-full border border-gray-300 rounded-[3px] px-3.5 py-2 text-[13px] text-gray-800 focus:outline-none focus:border-[#20c997] transition-colors text-right"
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
                className="w-full border border-gray-300 rounded-[3px] px-3.5 py-2 text-[13px] text-gray-800 focus:outline-none focus:border-[#20c997] transition-colors"
              />
              <input
                type="text"
                placeholder="Arabic"
                value={estDeliveryAr}
                onChange={(e) => setEstDeliveryAr(e.target.value)}
                dir="rtl"
                className="w-full border border-gray-300 rounded-[3px] px-3.5 py-2 text-[13px] text-gray-800 focus:outline-none focus:border-[#20c997] transition-colors text-right"
              />
            </div>
          </div>

          {/* Regions */}
          <div>
            <label className="block text-[13px] text-gray-700 font-medium mb-2">
              Regions
            </label>

            {/* Selected Region Pills */}
            <div className="flex flex-wrap gap-2 items-center mb-3">
              {regions.map((region) => (
                <span
                  key={region}
                  className="inline-flex items-center gap-2 bg-[#e9ecef] text-[#495057] text-[12.5px] font-medium px-3 py-1 rounded-[3px]"
                >
                  <span>{region}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveRegion(region)}
                    className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

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

          {/* Shipping Methods Section */}
          <div className="pt-2 space-y-3">
            <h2 className="text-[13px] font-semibold text-gray-800">
              Shipping Methods
            </h2>

            {/* Methods List */}
            <div className="space-y-2">
              {methods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-3.5 bg-gray-50/70 border border-gray-200 rounded-[3px]"
                >
                  <span className="text-[13px] font-medium text-gray-800">
                    {method.name.en}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEditMethod(method)}
                      className="w-7 h-7 rounded border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-[#20c997] hover:bg-gray-50 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteMethod(method.id)}
                      className="w-7 h-7 rounded border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-gray-50 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Shipping Method Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleOpenAddMethod}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#20c997] hover:bg-[#1bb285] text-white text-[12.5px] font-medium rounded-[3px] transition-colors shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Add Shipping Method</span>
              </button>
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit"
              className="px-6 py-2 bg-[#20c997] hover:bg-[#1bb285] text-white text-[13px] font-medium rounded-[3px] transition-colors shadow-sm cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Add Shipping Method Select Modal (Screenshot 1) */}
      <AddShippingMethodSelectModal
        isOpen={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
        onApply={handleApplySelectMethod}
      />

      {/* Edit Shipping Method Detail Modal (Screenshot 5) */}
      <ShippingMethodModal
        isOpen={isMethodModalOpen}
        onClose={() => setIsMethodModalOpen(false)}
        onSave={handleSaveMethod}
        initialData={editingMethod}
      />
    </div>
  );
}
