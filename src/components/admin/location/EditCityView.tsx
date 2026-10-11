"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { List } from "lucide-react";
import CityForm from "./CityForm";
import { CityItem } from "./types";
import {
  getCityBySlug,
  INITIAL_CITIES,
} from "./locationData";

export default function EditCityView() {
  const params = useParams();
  const slugParam = (params?.slug as string) || "";
  const decodedSlug = decodeURIComponent(slugParam);

  const [city, setCity] = useState<CityItem | null | undefined>(undefined);

  useEffect(() => {
    if (!decodedSlug) return;
    const found =
      getCityBySlug(decodedSlug) ||
      INITIAL_CITIES.find((c) => c.slug === decodedSlug);
    setCity(found || null);
  }, [decodedSlug]);

  if (city === undefined) {
    return (
      <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] p-8 text-center text-gray-500 text-xs">
        Loading city data for slug:{" "}
        <span className="font-mono text-purple-700">{decodedSlug}</span>...
      </div>
    );
  }

  if (city === null) {
    return (
      <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] p-8 text-center">
        <h2 className="text-base font-semibold text-gray-800 mb-2">
          City Not Found
        </h2>
        <p className="text-xs text-gray-500 mb-5">
          No city found with the slug:{" "}
          <span className="font-mono text-red-600 font-semibold">{decodedSlug}</span>
        </p>
        <Link
          href="/admin/admin-panel/location/cities"
          className="px-4 py-2 bg-[#00a65a] hover:bg-[#008d4c] text-white text-xs rounded-[3px] inline-flex items-center gap-1.5 transition-colors"
        >
          <List className="w-4 h-4" />
          <span>Back to Cities</span>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <CityForm mode="edit" initialCity={city} />
    </div>
  );
}
