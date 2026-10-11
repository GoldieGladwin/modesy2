import React from "react";
import Link from "next/link";
import { Palette, CheckCircle } from "lucide-react";

export default function AdminThemePage() {
  const themes = [
    { id: "default", name: "Default Modesy Teal", primary: "#00a99d", secondary: "#222d32", active: true },
    { id: "dark", name: "Modern Dark Slate", primary: "#3b82f6", secondary: "#1e293b", active: false },
    { id: "emerald", name: "Emerald Green", primary: "#10b981", secondary: "#064e3b", active: false },
    { id: "purple", name: "Royal Violet", primary: "#8b5cf6", secondary: "#4c1d95", active: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#00a99d]" /> Theme Settings
        </h1>
        <div className="text-xs text-gray-500">
          <Link href="/admin/admin-panel/home" className="text-[#00a99d]">Admin</Link> / Theme
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <h2 className="text-sm font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
          Marketplace Theme &amp; Color Scheme
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {themes.map((t) => (
            <div
              key={t.id}
              className={`p-4 border rounded-sm transition cursor-pointer ${
                t.active ? "border-[#00a99d] ring-2 ring-[#00a99d]/20 bg-teal-50/20" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="h-20 rounded flex items-center justify-center gap-2 mb-3" style={{ backgroundColor: t.secondary }}>
                <span className="w-6 h-6 rounded-full" style={{ backgroundColor: t.primary }}></span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-900">{t.name}</span>
                {t.active && <CheckCircle className="w-4 h-4 text-[#00a99d]" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
