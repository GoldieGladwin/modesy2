"use client";

import React, { useState, useEffect } from "react";
import { LOCATIONS_DATA } from "@/components/admin/location/locations";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (location: string) => void;
  currentLocation?: string;
}

export default function LocationModal({
  isOpen,
  onClose,
  onSelectLocation,
  currentLocation,
}: LocationModalProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  // Populate or reset selections when modal opens
  useEffect(() => {
    if (isOpen) {
      if (currentLocation && currentLocation !== "Location") {
        const parts = currentLocation.split(",").map((p) => p.trim());
        // e.g., ["Pasuruan", "East Java", "Indonesia"]
        if (parts.length === 3) {
          setSelectedCity(parts[0]);
          setSelectedState(parts[1]);
          setSelectedCountry(parts[2]);
        } else if (parts.length === 2) {
          setSelectedState(parts[0]);
          setSelectedCountry(parts[1]);
          setSelectedCity("");
        } else if (parts.length === 1) {
          setSelectedCountry(parts[0]);
          setSelectedState("");
          setSelectedCity("");
        }
      } else {
        setSelectedCountry("");
        setSelectedState("");
        setSelectedCity("");
      }
    }
  }, [isOpen, currentLocation]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Find country data
  const currentCountryData = LOCATIONS_DATA.find(
    (c) => c.country === selectedCountry
  );

  // Find state data
  const currentStateData = currentCountryData?.states.find(
    (s) => s.state === selectedState
  );

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity("");
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCountry) {
      return;
    }

    let locationParts: string[] = [];
    if (selectedCity) locationParts.push(selectedCity);
    if (selectedState) locationParts.push(selectedState);
    if (selectedCountry) locationParts.push(selectedCountry);

    const formattedLocation = locationParts.join(", ");
    onSelectLocation(formattedLocation);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-150">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-[460px] bg-white rounded-[6px] shadow-2xl p-7 md:p-8 z-10 transition-all transform scale-100">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer bg-transparent border-0"
          aria-label="Close"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <h3 className="text-[20px] font-bold text-[#222222] mb-1">
            Select Location
          </h3>
          <p className="text-[13.5px] text-[#7b808a] m-0">
            Filter products by location
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* 1. Country Selection */}
          <div className="relative">
            <select
              value={selectedCountry}
              onChange={handleCountryChange}
              className="w-full h-[42px] px-3.5 pr-8 bg-white border border-[#ced4da] rounded-[4px] text-[14px] text-[#495057] focus:outline-none focus:border-[#00a99d] transition-colors appearance-none cursor-pointer"
            >
              <option value="">Country</option>
              {LOCATIONS_DATA.map((c) => (
                <option key={c.country} value={c.country}>
                  {c.country}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                <path d="M0 0l5 5 5-5z" />
              </svg>
            </div>
          </div>

          {/* 2. State Selection (Appears once Country is selected) */}
          {selectedCountry && currentCountryData && currentCountryData.states.length > 0 && (
            <div className="relative animate-in fade-in slide-in-from-top-1 duration-150">
              <select
                value={selectedState}
                onChange={handleStateChange}
                className="w-full h-[42px] px-3.5 pr-8 bg-white border border-[#ced4da] rounded-[4px] text-[14px] text-[#495057] focus:outline-none focus:border-[#00a99d] transition-colors appearance-none cursor-pointer"
              >
                <option value="">State</option>
                {currentCountryData.states.map((s) => (
                  <option key={s.state} value={s.state}>
                    {s.state}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                  <path d="M0 0l5 5 5-5z" />
                </svg>
              </div>
            </div>
          )}

          {/* 3. City Selection (Appears once State is selected) */}
          {selectedState && currentStateData && currentStateData.cities.length > 0 && (
            <div className="relative animate-in fade-in slide-in-from-top-1 duration-150">
              <select
                value={selectedCity}
                onChange={handleCityChange}
                className="w-full h-[42px] px-3.5 pr-8 bg-white border border-[#ced4da] rounded-[4px] text-[14px] text-[#495057] focus:outline-none focus:border-[#00a99d] transition-colors appearance-none cursor-pointer"
              >
                <option value="">City</option>
                {currentStateData.cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                  <path d="M0 0l5 5 5-5z" />
                </svg>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!selectedCountry}
            className={`w-full h-[42px] font-medium text-[14px] rounded-[3px] transition-colors mt-4 flex items-center justify-center border-0 cursor-pointer ${
              selectedCountry
                ? "bg-[#00a99d] hover:bg-[#00968b] text-white"
                : "bg-[#00a99d]/60 text-white cursor-not-allowed"
            }`}
          >
            Select Location
          </button>
        </form>
      </div>
    </div>
  );
}
