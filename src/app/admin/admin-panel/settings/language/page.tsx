import React from "react";
import { LanguageSettings } from "@/components/admin/settings";

export const metadata = {
  title: "Language Settings - Modesy Admin",
  description: "Manage system languages, translations, and default language",
};

export default function AdminLanguageSettingsPage() {
  return <LanguageSettings />;
}
