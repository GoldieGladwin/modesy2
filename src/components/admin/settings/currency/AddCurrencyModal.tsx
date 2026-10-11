"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { NewCurrencyPayload } from "./types";

interface AddCurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (currency: NewCurrencyPayload) => void;
}

export default function AddCurrencyModal({
  isOpen,
  onClose,
  onAdd,
}: AddCurrencyModalProps) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [symbol, setSymbol] = useState("");
  const [rate, setRate] = useState<number>(1);
  const [isActive, setIsActive] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) return;

    onAdd({
      name: name.trim(),
      code: code.trim().toUpperCase(),
      symbol: symbol.trim() || "$",
      rate: Number(rate) || 1,
      isActive,
    });

    setName("");
    setCode("");
    setSymbol("");
    setRate(1);
    setIsActive(true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-[3px] shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm font-bold text-gray-800">Add Currency</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Currency Name
            </label>
            <input
              type="text"
              required
              placeholder="Ex: US Dollar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Currency Code
              </label>
              <input
                type="text"
                required
                placeholder="Ex: USD"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Currency Symbol
              </label>
              <input
                type="text"
                required
                placeholder="Ex: $"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Exchange Rate (According to USD)
            </label>
            <input
              type="number"
              step="0.000000001"
              required
              placeholder="1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Status</label>
            <div className="flex items-center gap-6 text-gray-700">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="currencyStatus"
                  checked={isActive}
                  onChange={() => setIsActive(true)}
                  className="text-[#007bff]"
                />
                <span>Active</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="currencyStatus"
                  checked={!isActive}
                  onChange={() => setIsActive(false)}
                  className="text-[#007bff]"
                />
                <span>Inactive</span>
              </label>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-[3px] transition cursor-pointer"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-[#28a745] hover:bg-[#218838] text-white font-semibold px-4 py-2 rounded-[3px] shadow-xs transition cursor-pointer"
            >
              Add Currency
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
