"use client";

import React from "react";
import CountriesTable from "@/components/admin/location/CountriesTable";
import LocationSettingsCard from "@/components/admin/location/LocationSettingsCard";

export default function AdminLocationPage() {
  return (
    <div className="space-y-6">
      {/* 1. Countries Table Card (Screenshot 1 & 2) */}
      <CountriesTable />

      {/* 2. Settings Card Below Table (Screenshot 1 & 2) */}
      <LocationSettingsCard />
    </div>
  );
}
