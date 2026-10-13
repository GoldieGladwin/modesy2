"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { ShippingZoneItem } from "./types";

interface ShippingZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  zone: ShippingZoneItem | null;
  onSave: (zone: ShippingZoneItem) => void;
}

const AVAILABLE_METHODS = [
  "Free Shipping",
  "Flat Rate",
  "Local Pickup",
];

export default function ShippingZoneModal({
  isOpen,
  onClose,
  zone,
  onSave,
}: ShippingZoneModalProps) {
  const [name, setName] = useState("");
  const [regionsInput, setRegionsInput] = useState("");
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);

  useEffect(() => {
    if (zone) {
      setName(zone.name);
      setRegionsInput(zone.regions.join(", "));
      setSelectedMethods(zone.shippingMethods);
    } else {
      setName("");
      setRegionsInput("");
      setSelectedMethods(["Free Shipping"]);
    }
  }, [zone, isOpen]);

  if (!isOpen) return null;

  const handleToggleMethod = (method: string) => {
    setSelectedMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const regions = regionsInput
      .split(",")
      .map((r) => r.trim())
      .filter(Boolean);

    onSave({
      id: zone ? zone.id : Date.now(),
      name: name.trim(),
      regions: regions.length > 0 ? regions : ["Global"],
      shippingMethods:
        selectedMethods.length > 0 ? selectedMethods : ["Free Shipping"],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-[4px] max-w-md w-full shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 font-sans">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-[#2d3748]">
            {zone ? "Edit Shipping Zone" : "Add Shipping Zone"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block text-xs font-semibold text-[#333e48] mb-1.5">
              Zone Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. International, Domestic"
              className="w-full px-3 py-2 text-xs border border-[#d1d5db] rounded-[4px] focus:outline-none focus:border-[#00a99d] text-[#333e48]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#333e48] mb-1.5">
              Regions (separate by commas)
            </label>
            <input
              type="text"
              value={regionsInput}
              onChange={(e) => setRegionsInput(e.target.value)}
              placeholder="e.g. Europe, Asia, Africa, South America"
              className="w-full px-3 py-2 text-xs border border-[#d1d5db] rounded-[4px] focus:outline-none focus:border-[#00a99d] text-[#333e48]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#333e48] mb-2">
              Shipping Methods
            </label>
            <div className="space-y-2">
              {AVAILABLE_METHODS.map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={selectedMethods.includes(method)}
                    onChange={() => handleToggleMethod(method)}
                    className="w-4 h-4 rounded text-[#00a99d] border-gray-300 focus:ring-[#00a99d]"
                  />
                  <span className="text-xs text-[#333e48]">{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 border border-gray-300 rounded-[3px] text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white font-semibold rounded-[3px] shadow-xs transition cursor-pointer"
            >
              {zone ? "Save Changes" : "Add Zone"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
