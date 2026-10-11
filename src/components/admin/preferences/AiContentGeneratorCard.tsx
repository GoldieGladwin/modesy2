"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AiContentGeneratorSettings, AiProvider } from "./types";
import {
  DEFAULT_AI_SETTINGS,
  AI_MODELS_GOOGLE,
  AI_MODELS_OPENAI,
} from "./initialData";

interface AiContentGeneratorCardProps {
  initialSettings?: AiContentGeneratorSettings;
  onSave?: (settings: AiContentGeneratorSettings) => void;
}

export default function AiContentGeneratorCard({
  initialSettings = DEFAULT_AI_SETTINGS,
  onSave,
}: AiContentGeneratorCardProps) {
  const [settings, setSettings] = useState<AiContentGeneratorSettings>(initialSettings);
  const [selectedProviderTab, setSelectedProviderTab] = useState<AiProvider>("google");

  const handleStatusToggle = () => {
    setSettings((prev) => ({ ...prev, statusEnabled: !prev.statusEnabled }));
  };

  const handleActiveProviderChange = (provider: AiProvider) => {
    setSettings((prev) => ({
      ...prev,
      activeProvider: provider,
      model:
        provider === "google"
          ? "Gemini 1.5 Flash Lite (Lowest Cost)"
          : "gpt-4o-mini",
    }));
    setSelectedProviderTab(provider);
  };

  const handleSaveClick = () => {
    onSave?.(settings);
    alert("Success: AI Content Generator settings have been saved!");
  };

  const availableModels =
    selectedProviderTab === "google" ? AI_MODELS_GOOGLE : AI_MODELS_OPENAI;

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-[4px] shadow-2xs p-5 relative pb-16">
      <h2 className="text-[15px] font-semibold text-[#333333] pb-3 border-b border-[#f0f0f0] mb-5">
        AI Content Generator
      </h2>

      <div className="space-y-4 text-[13px]">
        {/* 1. Status Toggle Switch */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={settings.statusEnabled}
            onClick={handleStatusToggle}
            className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
              settings.statusEnabled ? "bg-[#00a99d]" : "bg-[#d2d6de]"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                settings.statusEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span className="text-[13px] font-semibold text-[#555]">Status</span>
        </div>

        {/* 2. Active Provider Select */}
        <div>
          <label
            htmlFor="ai-active-provider-select"
            className="block text-[13px] font-semibold text-[#555] mb-1.5"
          >
            Active Provider
          </label>
          <div className="relative">
            <select
              id="ai-active-provider-select"
              value={settings.activeProvider}
              onChange={(e) =>
                handleActiveProviderChange(e.target.value as AiProvider)
              }
              className="w-full bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3.5 py-2 rounded-[3px] appearance-none focus:outline-none focus:border-[#007bff]"
            >
              <option value="google">Gemini (Google)</option>
              <option value="openai">ChatGPT (Open AI)</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* 3. Provider Tabs / Pills */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setSelectedProviderTab("openai")}
            className={`px-4 py-1.5 rounded-[3px] text-[12px] font-medium border transition-colors cursor-pointer ${
              selectedProviderTab === "openai"
                ? "border-[#007bff] text-[#007bff] bg-blue-50/20 font-semibold"
                : "border-[#d2d6de] text-[#555555] bg-white hover:bg-gray-50"
            }`}
          >
            ChatGPT (Open AI)
          </button>
          <button
            type="button"
            onClick={() => setSelectedProviderTab("google")}
            className={`px-4 py-1.5 rounded-[3px] text-[12px] font-medium border transition-colors cursor-pointer ${
              selectedProviderTab === "google"
                ? "border-[#007bff] text-[#007bff] bg-blue-50/20 font-semibold"
                : "border-[#d2d6de] text-[#555555] bg-white hover:bg-gray-50"
            }`}
          >
            Gemini (Google)
          </button>
        </div>

        {/* 4. Api Key */}
        <div>
          <label className="block text-[13px] font-semibold text-[#555] mb-1.5">
            Api Key
          </label>
          <input
            type="text"
            value={settings.apiKey}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, apiKey: e.target.value }))
            }
            placeholder="Enter API Key"
            className="w-full border border-[#d2d6de] rounded-[3px] px-3.5 py-2 text-[13px] text-[#444] focus:outline-none focus:border-[#007bff]"
          />
        </div>

        {/* 5. Model Select */}
        <div>
          <label
            htmlFor="ai-model-select"
            className="block text-[13px] font-semibold text-[#555] mb-1.5"
          >
            Model
          </label>
          <div className="relative">
            <select
              id="ai-model-select"
              value={settings.model}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, model: e.target.value }))
              }
              className="w-full bg-white border border-[#007bff] text-[13px] text-[#444] px-3.5 py-2 rounded-[3px] appearance-none focus:outline-none"
            >
              {availableModels.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Save Changes Button (Bottom Right) */}
      <div className="absolute right-5 bottom-4">
        <button
          type="button"
          onClick={handleSaveClick}
          className="px-4 py-2 bg-[#007bff] hover:bg-[#0069d9] text-white rounded-[3px] text-[13px] font-semibold transition cursor-pointer shadow-2xs"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
