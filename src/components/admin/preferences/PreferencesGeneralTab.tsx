"use client";

import React from "react";
import PreferencesRadioGroup from "./PreferencesRadioGroup";
import { GeneralPreferences } from "./types";
import { DEFAULT_GENERAL_PREFERENCES } from "./initialData";

interface PreferencesGeneralTabProps {
  preferences?: GeneralPreferences;
  onChange?: (updated: GeneralPreferences) => void;
}

export default function PreferencesGeneralTab({
  preferences = DEFAULT_GENERAL_PREFERENCES,
  onChange,
}: PreferencesGeneralTabProps) {
  const updateField = <K extends keyof GeneralPreferences>(
    key: K,
    val: GeneralPreferences[K]
  ) => {
    onChange?.({ ...preferences, [key]: val });
  };

  return (
    <div className="space-y-4">
      <PreferencesRadioGroup<boolean>
        label="Multilingual System"
        value={preferences.multilingual}
        onChange={(val) => updateField("multilingual", val)}
      />

      <PreferencesRadioGroup<boolean>
        label="Maintenance Mode"
        value={preferences.maintenanceMode}
        onChange={(val) => updateField("maintenanceMode", val)}
      />

      <PreferencesRadioGroup<boolean>
        label="RSS Feeds"
        value={preferences.rssFeeds}
        onChange={(val) => updateField("rssFeeds", val)}
      />

      <PreferencesRadioGroup<boolean>
        label="Dark Mode"
        value={preferences.darkMode}
        onChange={(val) => updateField("darkMode", val)}
      />

      <PreferencesRadioGroup<boolean>
        label="Email Verification"
        value={preferences.emailVerification}
        onChange={(val) => updateField("emailVerification", val)}
      />
    </div>
  );
}
