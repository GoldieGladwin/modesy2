"use client";

import React, { useState } from "react";
import SiteFontCard from "./SiteFontCard";
import AddFontCard from "./AddFontCard";
import FontsTableCard from "./FontsTableCard";
import { FontItem, NewFontPayload } from "./types";
import { initialFontsData } from "./mockData";

export default function FontSettings() {
  const [fonts, setFonts] = useState<FontItem[]>(initialFontsData);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleAddFont = (payload: NewFontPayload) => {
    const nextId =
      fonts.length > 0 ? Math.max(...fonts.map((f) => f.id)) + 1 : 1;
    const newFont: FontItem = {
      id: nextId,
      name: payload.name,
      fontFamily: payload.fontFamily,
      url: payload.url,
    };
    setFonts((prev) => [newFont, ...prev]);
    showNotification(`Font "${payload.name}" added successfully.`);
  };

  const handleDelete = (id: number) => {
    const target = fonts.find((f) => f.id === id);
    if (confirm(`Are you sure you want to delete font "${target?.name}"?`)) {
      setFonts((prev) => prev.filter((f) => f.id !== id));
      showNotification(`Font "${target?.name}" deleted.`);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
        Font Settings
      </h1>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-[#d4edda] border border-[#c3e6cb] text-[#155724] px-4 py-2.5 rounded-[3px] text-xs font-medium flex items-center justify-between shadow-xs">
          <span>{notification}</span>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-[#155724] font-bold text-sm cursor-pointer ml-4"
          >
            ×
          </button>
        </div>
      )}

      {/* 2-Column Grid: Left (Site Font + Add Font), Right (Fonts Table) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (1/3) */}
        <div className="space-y-6 lg:col-span-1">
          <SiteFontCard
            onSave={() => showNotification("Site fonts saved successfully.")}
          />
          <AddFontCard onAddFont={handleAddFont} />
        </div>

        {/* Right Column (2/3) */}
        <div className="lg:col-span-2">
          <FontsTableCard fonts={fonts} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
