"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, ChevronDown } from "lucide-react";
import CustomRadio from "./CustomRadio";
import {
  getStoredCountries,
  getStoredLocationSettings,
  saveStoredLocationSettings,
} from "./locationData";
import { CountryItem, LocationSettings } from "./types";

export default function LocationSettingsCard() {
  const [settings, setSettings] = useState<LocationSettings>(getStoredLocationSettings());
  const [countries, setCountries] = useState<CountryItem[]>([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setSettings(getStoredLocationSettings());
    setCountries(getStoredCountries());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredLocationSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] p-5">
      <h2 className="text-[16px] font-normal text-[#333333] mb-5">Settings</h2>

      {savedSuccess && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-[3px] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>Location settings have been updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5 max-w-xl">
        {/* Single Country Mode Radio (Screenshot 1 & 2) */}
        <div>
          <label className="block text-[13px] font-semibold text-[#333333] mb-2">
            Single Country Mode
          </label>
          <div className="flex items-center gap-6">
            <CustomRadio
              name="singleCountryMode"
              label="Enable"
              value="enable"
              checked={settings.singleCountryMode === true}
              onChange={() =>
                setSettings((prev) => ({ ...prev, singleCountryMode: true }))
              }
            />
            <CustomRadio
              name="singleCountryMode"
              label="Disable"
              value="disable"
              checked={settings.singleCountryMode === false}
              onChange={() =>
                setSettings((prev) => ({ ...prev, singleCountryMode: false }))
              }
            />
          </div>
        </div>

        {/* Country Select (Screenshot 1 & 2) */}
        <div>
          <label className="block text-[13px] font-semibold text-[#333333] mb-1.5">
            Country
          </label>
          <div className="relative">
            <select
              value={settings.defaultCountryId}
              onChange={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  defaultCountryId: Number(e.target.value),
                }))
              }
              className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] appearance-none pr-8 focus:outline-none focus:border-[#0073b7] transition-colors"
            >
              {countries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Save button (Screenshot 1 & 2) */}
        <div className="pt-2">
          <button
            type="submit"
            className="px-5 py-2 bg-[#0073b7] hover:bg-[#005a92] text-white text-[13px] font-medium rounded-[3px] shadow-2xs transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
