"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { List, ChevronDown, CheckCircle2 } from "lucide-react";
import CustomRadio from "./CustomRadio";
import { CountryItem } from "./types";
import {
  CONTINENTS,
  getStoredCountries,
  saveStoredCountries,
  saveSingleCountry,
} from "./locationData";

interface CountryFormProps {
  mode: "add" | "edit";
  initialCountry?: CountryItem | null;
}

export default function CountryForm({
  mode,
  initialCountry,
}: CountryFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initialCountry?.name || "");
  const [continent, setContinent] = useState(
    initialCountry?.continent || (mode === "edit" ? "Asia" : "Europe")
  );
  const [status, setStatus] = useState<"Active" | "Inactive">(
    initialCountry?.status || "Active"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a country name.");
      return;
    }

    setIsSubmitting(true);
    const countries = getStoredCountries();

    const slug = (
      initialCountry?.slug ||
      name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
    );

    if (mode === "edit" && initialCountry) {
      const updatedCountry: CountryItem = {
        ...initialCountry,
        name: name.trim(),
        continent,
        status,
      };

      const index = countries.findIndex((c) => c.id === initialCountry.id);
      if (index >= 0) {
        countries[index] = updatedCountry;
        saveStoredCountries(countries);
      } else {
        saveSingleCountry(updatedCountry);
      }

      setToastMessage("Country updated successfully!");
      setTimeout(() => {
        router.push("/admin/admin-panel/location/countries");
      }, 700);
    } else {
      // Add mode
      const newId =
        countries.length > 0 ? Math.max(...countries.map((c) => c.id)) + 1 : 1;
      const newCountry: CountryItem = {
        id: newId,
        name: name.trim(),
        slug,
        continent,
        status,
      };

      countries.unshift(newCountry);
      saveStoredCountries(countries);

      setToastMessage("Country added successfully!");
      setTimeout(() => {
        router.push("/admin/admin-panel/location/countries");
      }, 700);
    }
  };

  return (
    <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] p-5 relative">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-[3px] shadow-lg text-white text-xs font-medium bg-[#00a65a] animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER: Title & Green List Button (Screenshot 3 & 4) */}
      <div className="flex items-center justify-between pb-4 border-b border-[#f4f4f4] mb-6">
        <h1 className="text-[18px] font-normal text-[#333333]">
          {mode === "edit" ? "Update Country" : "Add Country"}
        </h1>
        <Link
          href="/admin/admin-panel/location/countries"
          className="px-3.5 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white text-[13px] font-normal rounded-[3px] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <List className="w-4 h-4" />
          <span>Countries</span>
        </Link>
      </div>

      {/* FORM (Screenshot 3 & 4) */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Field */}
        <div>
          <label className="block text-[13px] font-normal text-[#333333] mb-1.5">
            Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-[#0073b7] transition-colors"
          />
        </div>

        {/* Continent Dropdown */}
        <div>
          <label className="block text-[13px] font-normal text-[#333333] mb-1.5">
            Continent
          </label>
          <div className="relative">
            <select
              value={continent}
              onChange={(e) => setContinent(e.target.value)}
              className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] appearance-none pr-8 focus:outline-none focus:border-[#0073b7] transition-colors"
            >
              {CONTINENTS.map((cont) => (
                <option key={cont} value={cont}>
                  {cont}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Status Radio Buttons (Screenshot 3 & 4) */}
        <div>
          <label className="block text-[13px] font-normal text-[#333333] mb-2">
            Status
          </label>
          <div className="flex items-center gap-6">
            <CustomRadio
              name="status"
              label="Active"
              value="Active"
              checked={status === "Active"}
              onChange={() => setStatus("Active")}
            />
            <CustomRadio
              name="status"
              label="Inactive"
              value="Inactive"
              checked={status === "Inactive"}
              onChange={() => setStatus("Inactive")}
            />
          </div>
        </div>

        {/* SUBMIT BUTTON (Bottom right, blue button as in screenshot 3 & 4) */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 bg-[#0073b7] hover:bg-[#005a92] disabled:opacity-50 text-white text-[13px] font-medium rounded-[3px] shadow-2xs transition-colors cursor-pointer"
          >
            {mode === "edit" ? "Update Country" : "Add Country"}
          </button>
        </div>
      </form>
    </div>
  );
}
