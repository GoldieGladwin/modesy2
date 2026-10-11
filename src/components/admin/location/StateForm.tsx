"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { List, ChevronDown, CheckCircle2 } from "lucide-react";
import CustomRadio from "./CustomRadio";
import { StateItem, CountryItem } from "./types";
import {
  getStoredStates,
  getStoredCountries,
  saveStoredStates,
  saveSingleState,
} from "./locationData";

interface StateFormProps {
  mode: "add" | "edit";
  initialState?: StateItem | null;
}

export default function StateForm({ mode, initialState }: StateFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initialState?.name || "");
  const [countries, setCountries] = useState<CountryItem[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<number>(
    initialState?.countryId || 1
  );
  const [status, setStatus] = useState<"Active" | "Inactive">(
    initialState?.status || "Active"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const list = getStoredCountries();
    setCountries(list);
    if (!initialState && list.length > 0) {
      setSelectedCountryId(list[0].id);
    }
  }, [initialState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a state name.");
      return;
    }

    setIsSubmitting(true);
    const states = getStoredStates();
    const foundCountry = countries.find((c) => c.id === selectedCountryId);
    const countryName = foundCountry ? foundCountry.name : "Afghanistan";

    const slug = (
      initialState?.slug ||
      name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
    );

    if (mode === "edit" && initialState) {
      const updatedState: StateItem = {
        ...initialState,
        name: name.trim(),
        countryId: selectedCountryId,
        countryName,
        status,
      };

      const index = states.findIndex((s) => s.id === initialState.id);
      if (index >= 0) {
        states[index] = updatedState;
        saveStoredStates(states);
      } else {
        saveSingleState(updatedState);
      }

      setToastMessage("State updated successfully!");
      setTimeout(() => {
        router.push("/admin/admin-panel/location/states");
      }, 700);
    } else {
      const newId =
        states.length > 0 ? Math.max(...states.map((s) => s.id)) + 1 : 1;
      const newState: StateItem = {
        id: newId,
        name: name.trim(),
        slug,
        countryId: selectedCountryId,
        countryName,
        status,
      };

      states.unshift(newState);
      saveStoredStates(states);

      setToastMessage("State added successfully!");
      setTimeout(() => {
        router.push("/admin/admin-panel/location/states");
      }, 700);
    }
  };

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
          {mode === "edit" ? "Update State" : "Add State"}
        </h1>
        <Link
          href="/admin/admin-panel/location/states"
          className="px-3.5 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white text-[13px] font-normal rounded-[3px] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
        >
          <List className="w-4 h-4" />
          <span>States</span>
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
              onChange={(e) => setSelectedCountryId(Number(e.target.value))}
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
            {mode === "edit" ? "Update State" : "Add State"}
          </button>
        </div>
      </form>
    </div>
  );
}
