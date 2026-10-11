"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { TaxRateItem } from "./types";

interface VatRatesCardProps {
  onAddTax: () => void;
}

export default function VatRatesCard({ onAddTax }: VatRatesCardProps) {
  const [taxes, setTaxes] = useState<TaxRateItem[]>([
    { id: 1, name: "State Tax", rate: 5, status: true },
    { id: 2, name: "County and Municipal Tax", rate: 3, status: true },
  ]);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newTaxes = [...taxes];
    const temp = newTaxes[index];
    newTaxes[index] = newTaxes[index - 1];
    newTaxes[index - 1] = temp;
    setTaxes(newTaxes);
  };

  const moveDown = (index: number) => {
    if (index === taxes.length - 1) return;
    const newTaxes = [...taxes];
    const temp = newTaxes[index];
    newTaxes[index] = newTaxes[index + 1];
    newTaxes[index + 1] = temp;
    setTaxes(newTaxes);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this tax rate?")) {
      setTaxes((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div>
          <h2 className="text-sm font-bold text-gray-800">VAT / Tax Rates</h2>
          <p className="text-[11px] text-gray-400 mt-0.5">Define tax rates for sales and invoices</p>
        </div>
        <button
          type="button"
          onClick={onAddTax}
          className="inline-flex items-center gap-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] shadow-xs transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Tax</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-200 text-[#333333] font-semibold bg-white">
              <th className="py-2.5 px-3 w-12">Id</th>
              <th className="py-2.5 px-3">Tax & State</th>
              <th className="py-2.5 px-3 w-28">Tax Rate</th>
              <th className="py-2.5 px-3 w-24">Status</th>
              <th className="py-2.5 px-3 w-36 text-right">Options</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {taxes.map((t, idx) => (
              <tr key={t.id} className="hover:bg-gray-50/70 transition-colors">
                <td className="py-3 px-3 text-gray-500">{t.id}</td>
                <td className="py-3 px-3 font-medium text-gray-800">{t.name}</td>
                <td className="py-3 px-3 font-semibold text-gray-800">{t.rate}%</td>
                <td className="py-3 px-3">
                  <span className="bg-[#28a745] text-white text-[10px] font-bold px-2 py-0.5 rounded-[2px] shadow-2xs">
                    Active
                  </span>
                </td>
                <td className="py-3 px-3 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-1 justify-end">
                    {/* Move Up */}
                    <button
                      type="button"
                      onClick={() => moveUp(idx)}
                      disabled={idx === 0}
                      className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30 cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    {/* Move Down */}
                    <button
                      type="button"
                      onClick={() => moveDown(idx)}
                      disabled={idx === taxes.length - 1}
                      className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30 cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() => alert(`Edit tax ${t.name}`)}
                      className="p-1 text-gray-500 hover:text-blue-600 cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => handleDelete(t.id)}
                      className="p-1 text-gray-400 hover:text-red-600 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
