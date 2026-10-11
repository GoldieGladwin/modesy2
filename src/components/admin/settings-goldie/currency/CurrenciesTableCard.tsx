"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  RotateCw,
  Plus,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CurrencyItem } from "./types";

interface CurrenciesTableCardProps {
  currencies: CurrencyItem[];
  onUpdateRates: () => void;
  onOpenAddModal: () => void;
  onRateChange: (id: number, newRate: number) => void;
  onDelete: (id: number) => void;
}

export default function CurrenciesTableCard({
  currencies,
  onUpdateRates,
  onOpenAddModal,
  onRateChange,
  onDelete,
}: CurrenciesTableCardProps) {
  const [pageSize, setPageSize] = useState<number>(15);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);

  const filteredCurrencies = currencies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5 space-y-4">
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-bold text-gray-800">Currencies</h2>

          {/* Show count */}
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span>Show</span>
            <div className="relative">
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="bg-white border border-gray-300 rounded-[3px] px-2 py-1 text-xs text-gray-700 pr-6 appearance-none focus:outline-none focus:border-[#00a99d]"
              >
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
              <ChevronDown className="w-3 h-3 text-gray-500 absolute right-1.5 top-2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Update Exchange Rates */}
          <button
            type="button"
            onClick={onUpdateRates}
            className="inline-flex items-center gap-1.5 bg-[#17a2b8] hover:bg-[#138496] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] shadow-xs transition cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Update Exchange Rates</span>
          </button>

          {/* Add Currency */}
          <button
            type="button"
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1 bg-[#28a745] hover:bg-[#218838] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] shadow-xs transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Currency</span>
          </button>

          {/* Search Input */}
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span>Search:</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-gray-300 rounded-[3px] px-2.5 py-1 text-xs text-gray-700 focus:outline-none focus:border-[#00a99d] w-32 sm:w-40"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-[#333333] text-xs font-semibold bg-white">
              <th className="py-2.5 px-3 w-16">Id</th>
              <th className="py-2.5 px-3">Currency</th>
              <th className="py-2.5 px-3 w-32">Currency Code</th>
              <th className="py-2.5 px-3 w-28">Status</th>
              <th className="py-2.5 px-3 w-32">Currency Symbol</th>
              <th className="py-2.5 px-3 w-48">Exchange Rate</th>
              <th className="py-2.5 px-3 w-36 text-right">Options</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
            {filteredCurrencies.map((curr) => (
              <tr key={curr.id} className="hover:bg-gray-50/70 transition-colors">
                <td className="py-3 px-3 text-gray-500">{curr.id}</td>

                {/* Currency Name */}
                <td className="py-3 px-3 font-semibold text-gray-800">
                  {curr.name}
                </td>

                {/* Currency Code */}
                <td className="py-3 px-3">
                  <span className="text-gray-700 font-medium">
                    {curr.code}
                  </span>
                </td>

                {/* Status Badge */}
                <td className="py-3 px-3">
                  {curr.isActive ? (
                    <span className="bg-[#28a745] text-white text-[10px] font-bold px-2 py-0.5 rounded-[2px] shadow-2xs">
                      Active
                    </span>
                  ) : (
                    <span className="bg-[#6c757d] text-white text-[10px] font-bold px-2 py-0.5 rounded-[2px] shadow-2xs">
                      Inactive
                    </span>
                  )}
                </td>

                {/* Symbol */}
                <td className="py-3 px-3 text-gray-800 font-semibold text-sm">
                  {curr.symbol}
                </td>

                {/* Exchange Rate */}
                <td className="py-3 px-3">
                  {curr.rate === "Default" ? (
                    <span className="inline-block bg-[#e4e7ea] text-gray-600 font-medium text-xs px-2.5 py-1 rounded-[3px]">
                      Default
                    </span>
                  ) : (
                    <input
                      type="number"
                      step="0.000000001"
                      defaultValue={curr.rate}
                      onBlur={(e) =>
                        onRateChange(curr.id, Number(e.target.value))
                      }
                      className="w-32 bg-white border border-gray-300 rounded-[3px] px-2 py-1 text-xs text-gray-800 focus:outline-none focus:border-[#00a99d]"
                    />
                  )}
                </td>

                {/* Options Dropdown */}
                <td className="py-3 px-3 text-right relative">
                  <div className="inline-block text-left">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdownId(
                          activeDropdownId === curr.id ? null : curr.id
                        )
                      }
                      className="inline-flex items-center gap-1.5 bg-[#605ca8] hover:bg-[#504c94] text-white text-xs font-semibold px-3 py-1 rounded-[3px] shadow-xs transition cursor-pointer"
                    >
                      <span>Select an option</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>

                    {activeDropdownId === curr.id && (
                      <div className="absolute right-3 mt-1 w-32 bg-white border border-gray-200 rounded-[3px] shadow-lg z-30 py-1 text-left">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveDropdownId(null);
                            alert(`Edit currency "${curr.name}"`);
                          }}
                          className="w-full px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                          <span>Edit</span>
                        </button>
                        {!curr.isDefault && (
                          <button
                            type="button"
                            onClick={() => {
                              setActiveDropdownId(null);
                              onDelete(curr.id);
                            }}
                            className="w-full px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-500">
        <div>
          Showing 1 to {filteredCurrencies.length} of {currencies.length} entries
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-[2px] hover:bg-gray-100 cursor-pointer text-gray-600"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center bg-[#007bff] text-white rounded-[2px] font-bold shadow-2xs"
          >
            1
          </button>
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-[2px] hover:bg-gray-100 cursor-pointer text-gray-700"
          >
            2
          </button>
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-[2px] hover:bg-gray-100 cursor-pointer text-gray-700"
          >
            3
          </button>
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-[2px] hover:bg-gray-100 cursor-pointer text-gray-700"
          >
            4
          </button>
          <span className="px-1 text-gray-400">...</span>
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-[2px] hover:bg-gray-100 cursor-pointer text-gray-700"
          >
            11
          </button>
          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-[2px] hover:bg-gray-100 cursor-pointer text-gray-600"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
