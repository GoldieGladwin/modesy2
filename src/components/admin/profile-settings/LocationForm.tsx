"use client";

import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { LocationSettingsData } from "./types";
import { initialLocationData, COUNTRIES_LIST } from "./mockData";

interface LocationFormProps {
  onSaved?: (data: LocationSettingsData) => void;
}

export const LocationForm: React.FC<LocationFormProps> = ({ onSaved }) => {
  const [formData, setFormData] = useState<LocationSettingsData>(initialLocationData);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSaved) {
      onSaved(formData);
    }
    setToastMessage("Location settings updated successfully!");
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div className="w-full">
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-[#00a99d] text-white px-5 py-3 rounded-[3px] shadow-lg text-[14px]">
          <Check className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Section Label */}
        <label className="block text-[13px] font-medium text-[#495057]">
          Location
        </label>

        {/* Row 1: Country & State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Country Select */}
          <div className="relative">
            <select
              value={formData.country}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, country: e.target.value }))
              }
              className="w-full h-[40px] px-3.5 pr-8 text-[14px] text-[#495057] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] appearance-none cursor-pointer"
            >
              {COUNTRIES_LIST.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* State Select / Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, state: e.target.value }))
              }
              className="w-full h-[40px] px-3.5 pr-8 text-[14px] text-[#495057] placeholder:text-[#6c757d] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
            />
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Row 2: Address & Zip Code */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Address (approx 75% width) */}
          <div className="md:col-span-9">
            <input
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
              className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder:text-[#6c757d] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
            />
          </div>

          {/* Zip Code (approx 25% width) */}
          <div className="md:col-span-3">
            <input
              type="text"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, zipCode: e.target.value }))
              }
              className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder:text-[#6c757d] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d]"
            />
          </div>
        </div>

        {/* Row 3: Show my location checkbox */}
        <div className="pt-2">
          <label
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                showLocation: !prev.showLocation,
              }))
            }
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div
              className={`w-[18px] h-[18px] rounded-[2px] flex items-center justify-center transition-colors ${
                formData.showLocation
                  ? "bg-[#00a99d] text-white"
                  : "border border-[#ced4da] bg-white"
              }`}
            >
              {formData.showLocation && (
                <Check className="w-[13px] h-[13px] stroke-[3]" />
              )}
            </div>
            <span className="text-[14px] text-[#495057]">
              Show my location
            </span>
          </label>
        </div>

        {/* Row 4: Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            className="bg-[#00a99d] hover:bg-[#008f85] text-white font-normal text-[14px] px-6 py-2.5 rounded-[2px] transition-colors cursor-pointer shadow-xs"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
