"use client";

import React, { useState } from "react";
import { LanguageItem, NewLanguagePayload } from "./types";
import { initialLanguagesData } from "./mockData";
import LanguagesTable from "./LanguagesTable";
import AddLanguageForm from "./AddLanguageForm";
import ImportLanguageCard from "./ImportLanguageCard";

export default function LanguageSettings() {
  const [languages, setLanguages] =
    useState<LanguageItem[]>(initialLanguagesData);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleSetDefault = (id: number) => {
    setLanguages((prev) =>
      prev.map((l) => ({
        ...l,
        isDefault: l.id === id,
      }))
    );
    const target = languages.find((l) => l.id === id);
    showNotification(`Language "${target?.name}" set as default.`);
  };

  const handleAddLanguage = (payload: NewLanguagePayload) => {
    const nextId =
      languages.length > 0 ? Math.max(...languages.map((l) => l.id)) + 1 : 1;
    const newLang: LanguageItem = {
      id: nextId,
      name: payload.name,
      shortForm: payload.shortForm,
      languageCode: payload.languageCode,
      order: payload.order,
      textDirection: payload.textDirection,
      textEditorLanguage: payload.textEditorLanguage,
      isActive: payload.isActive,
      isDefault: false,
    };
    setLanguages((prev) => [newLang, ...prev]);
    showNotification(`Language "${payload.name}" successfully added.`);
  };

  const handleExport = (lang: LanguageItem) => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(lang, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${lang.shortForm}_language.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification(`Exported translations for "${lang.name}".`);
  };

  const handleDelete = (id: number) => {
    const target = languages.find((l) => l.id === id);
    if (target?.isDefault) {
      alert("Cannot delete default language.");
      return;
    }
    if (confirm(`Are you sure you want to delete language "${target?.name}"?`)) {
      setLanguages((prev) => prev.filter((l) => l.id !== id));
      showNotification(`Language "${target?.name}" deleted.`);
    }
  };

  const handleImport = (file: File) => {
    showNotification(`Importing language file "${file.name}" successfully.`);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
        Language Settings
      </h1>

      {/* Notification */}
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

      {/* Top Languages Table */}
      <LanguagesTable
        languages={languages}
        onSetDefault={handleSetDefault}
        onEditTranslations={(l) =>
          alert(`Edit translations for "${l.name}" modal/page`)
        }
        onExport={handleExport}
        onEdit={(l) => alert(`Editing language "${l.name}"`)}
        onDelete={handleDelete}
      />

      {/* Bottom Grid: Add Language (left) + Import Language (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <AddLanguageForm onAddLanguage={handleAddLanguage} />
        </div>
        <div className="lg:col-span-1">
          <ImportLanguageCard onImport={handleImport} />
        </div>
      </div>
    </div>
  );
}
