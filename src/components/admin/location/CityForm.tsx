"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { List, ChevronDown, CheckCircle2 } from "lucide-react";
import CustomRadio from "./CustomRadio";
import { CityItem, CountryItem, StateItem } from "./types";
import {
  getStoredCities,
  getStoredCountries,
  getStoredStates,
  saveStoredCities,
  saveSingleCity,
} from "./locationData";

interface CityFormProps {
  mode: "add" | "edit";
  initialCity?: CityItem | null;
}

export default function CityForm({ mode, initialCity }: CityFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initialCity?.name || "");
  const [countries, setCountries] = useState<CountryItem[]>([]);
  const [states, setStates] = useState<StateItem[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<number>(
    initialCity?.countryId || 1
  );
  const [selectedStateId, setSelectedStateId] = useState<number>(
    initialCity?.stateId || 1
  );
  const [status, setStatus] = useState<"Active" | "Inactive">(
    initialCity?.status || "Active"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const countryList = getStoredCountries();
    const stateList = getStoredStates();
    setCountries(countryList);
    setStates(stateList);

    if (!initialCity && countryList.length > 0) {
      setSelectedCountryId(countryList[0].id);
      const filtered = stateList.filter((s) => s.countryId === countryList[0].id);
      if (filtered.length > 0) {
        setSelectedStateId(filtered[0].id);
      }
    }
  }, [initialCity]);

  // When country changes, auto-select first available state
  const handleCountryChange = (countryId: number) => {
    setSelectedCountryId(countryId);
    const availableStates = states.filter((s) => s.countryId === countryId);
    if (availableStates.length > 0) {
      setSelectedStateId(availableStates[0].id);
    } else {
      setSelectedStateId(0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a city name.");
      return;
    }

    setIsSubmitting(true);
    const cities = getStoredCities();

    const countryObj = countries.find((c) => c.id === selectedCountryId);
    const stateObj = states.find((s) => s.id === selectedStateId);

    const countryName = countryObj ? countryObj.name : "Afghanistan";
    const stateName = stateObj ? stateObj.name : "General";

    const slug = (
      initialCity?.slug ||
      name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
    );

    if (mode === "edit" && initialCity) {
      const updatedCity: CityItem = {
        ...initialCity,
        name: name.trim(),
        countryId: selectedCountryId,
        countryName,
        stateId: selectedStateId,
        stateName,
        status,
      };

      const index = cities.findIndex((c) => c.id === initialCity.id);
      if (index >= 0) {
        cities[index] = updatedCity;
        saveStoredCities(cities);
      } else {
        saveSingleCity(updatedCity);
      }

      setToastMessage("City updated successfully!");
      setTimeout(() => {
        router.push("/admin/admin-panel/location/cities");
      }, 700);
    } else {
      const newId =
        cities.length > 0 ? Math.max(...cities.map((c) => c.id)) + 1 : 1;
      const newCity: CityItem = {
        id: newId,
        name: name.trim(),
        slug,
        countryId: selectedCountryId,
        countryName,
        stateId: selectedStateId,
        stateName,
        status,
      };

      cities.unshift(newCity);
      saveStoredCities(cities);

      setToastMessage("City added successfully!");
      setTimeout(() => {
        router.push("/admin/admin-panel/location/cities");
      }, 700);
    }
  };

  const availableStates = states.filter((s) => s.countryId === selectedCountryId);

  return (
    <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] p-5 relative">
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-[3px] shadow-lg text-white text-xs font-medium bg-[#00a65a] animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="flex items-center justify-between pb-4 border-b border-[#f4f4f4] mb-6">
        <h1 className="text-[18px] font-normal text-[#333333]">
          {mode === "edit" ? "Update City" : "Add City"}
        </h1>
        <Link
          href="/admin/admin-panel/location/cities"
          className="px-3.5 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white text-[13px] font-normal rounded-[3px] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <List className="w-4 h-4" />
          <span>Cities</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
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

        {/* Country */}
        <div>
          <label className="block text-[13px] font-normal text-[#333333] mb-1.5">
            Country
          </label>
          <div className="relative">
            <select
              value={selectedCountryId}
              onChange={(e) => handleCountryChange(Number(e.target.value))}
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

        {/* State */}
        <div>
          <label className="block text-[13px] font-normal text-[#333333] mb-1.5">
            State
          </label>
          <div className="relative">
            <select
              value={selectedStateId}
              onChange={(e) => setSelectedStateId(Number(e.target.value))}
              className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-2 rounded-[3px] appearance-none pr-8 focus:outline-none focus:border-[#0073b7] transition-colors"
            >
              {availableStates.length === 0 ? (
                <option value={0}>No States Available</option>
              ) : (
                availableStates.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))
              )}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Status */}
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

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 bg-[#0073b7] hover:bg-[#005a92] disabled:opacity-50 text-white text-[13px] font-medium rounded-[3px] shadow-2xs transition-colors cursor-pointer"
          >
            {mode === "edit" ? "Update City" : "Add City"}
          </button>
        </div>
      </form>
    </div>
  );
}
