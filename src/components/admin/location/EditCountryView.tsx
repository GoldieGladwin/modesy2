"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { List } from "lucide-react";
import CountryForm from "./CountryForm";
import { CountryItem } from "./types";
import {
  getCountryBySlug,
  INITIAL_COUNTRIES,
} from "./locationData";

export default function EditCountryView() {
  const params = useParams();
  const slugParam = (params?.slug as string) || "";
  const decodedSlug = decodeURIComponent(slugParam);

  const [country, setCountry] = useState<CountryItem | null | undefined>(undefined);

  useEffect(() => {
    if (!decodedSlug) return;
    const found =
      getCountryBySlug(decodedSlug) ||
      INITIAL_COUNTRIES.find((c) => c.slug === decodedSlug);
    setCountry(found || null);
  }, [decodedSlug]);

  if (country === undefined) {
    return (
      <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] p-8 text-center text-gray-500 text-xs">
        Loading country data for slug:{" "}
        <span className="font-mono text-purple-700">{decodedSlug}</span>...
      </div>
    );
  }

  if (country === null) {
    return (
      <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] p-8 text-center">
        <h2 className="text-base font-semibold text-gray-800 mb-2">
          Country Not Found
        </h2>
        <p className="text-xs text-gray-500 mb-5">
          No country found with the slug:{" "}
          <span className="font-mono text-red-600 font-semibold">{decodedSlug}</span>
        </p>
        <Link
          href="/admin/admin-panel/location/countries"
          className="px-4 py-2 bg-[#00a65a] hover:bg-[#008d4c] text-white text-xs rounded-[3px] inline-flex items-center gap-1.5 transition-colors"
        >
          <List className="w-4 h-4" />
          <span>Back to Countries</span>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <CountryForm mode="edit" initialCountry={country} />
    </div>
  );
}
