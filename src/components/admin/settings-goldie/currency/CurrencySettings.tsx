"use client";

import React, { useState } from "react";
import GeneralCurrencyCard from "./GeneralCurrencyCard";
import CurrencyConverterCard from "./CurrencyConverterCard";
import CurrenciesTableCard from "./CurrenciesTableCard";
import AddCurrencyModal from "./AddCurrencyModal";
import { CurrencyItem, NewCurrencyPayload } from "./types";
import { initialCurrenciesData } from "./mockData";

export default function CurrencySettings() {
  const [currencies, setCurrencies] =
    useState<CurrencyItem[]>(initialCurrenciesData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  const handleAddCurrency = (payload: NewCurrencyPayload) => {
    const nextId =
      currencies.length > 0 ? Math.max(...currencies.map((c) => c.id)) + 1 : 1;
    const newCurr: CurrencyItem = {
      id: nextId,
      name: payload.name,
      code: payload.code,
      symbol: payload.symbol,
      rate: payload.rate,
      isActive: payload.isActive,
      isDefault: false,
    };
    setCurrencies((prev) => [newCurr, ...prev]);
    showNotification(`Currency "${payload.name}" added successfully.`);
  };

  const handleRateChange = (id: number, newRate: number) => {
    setCurrencies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, rate: newRate } : c))
    );
    showNotification("Exchange rate updated.");
  };

  const handleDelete = (id: number) => {
    const target = currencies.find((c) => c.id === id);
    if (target?.isDefault) {
      alert("Cannot delete default currency.");
      return;
    }
    if (confirm(`Are you sure you want to delete currency "${target?.name}"?`)) {
      setCurrencies((prev) => prev.filter((c) => c.id !== id));
      showNotification(`Currency "${target?.name}" deleted.`);
    }
  };

  const handleUpdateRates = () => {
    showNotification("Exchange rates updated successfully from API.");
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
        Currency Settings
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

      {/* Top 2 Cards: Currency Settings + Currency Converter */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <GeneralCurrencyCard
          onSave={() => showNotification("Currency settings saved.")}
        />
        <CurrencyConverterCard
          onSave={() => showNotification("Currency converter settings saved.")}
        />
      </div>

      {/* Bottom Large Card: Currencies Table */}
      <CurrenciesTableCard
        currencies={currencies}
        onUpdateRates={handleUpdateRates}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onRateChange={handleRateChange}
        onDelete={handleDelete}
      />

      {/* Add Currency Modal */}
      <AddCurrencyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCurrency}
      />
    </div>
  );
}
