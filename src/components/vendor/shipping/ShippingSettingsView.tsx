"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit3, Trash2, CheckCircle2 } from "lucide-react";
import {
  getShippingZones,
  deleteShippingZone,
  getDeliveryTimes,
  addDeliveryTime,
  updateDeliveryTime,
  deleteDeliveryTime,
  subscribeShipping,
} from "./shippingStore";
import { ShippingZone, DeliveryTime } from "./types";
import AddDeliveryTimeModal from "./AddDeliveryTimeModal";

export default function ShippingSettingsView() {
  const [zones, setZones] = useState<ShippingZone[]>([]);
  const [deliveryTimes, setDeliveryTimes] = useState<DeliveryTime[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(15);

  // Delivery Time Modal state
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [editingDeliveryTime, setEditingDeliveryTime] = useState<DeliveryTime | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const sync = () => {
      setZones([...getShippingZones()]);
      setDeliveryTimes([...getDeliveryTimes()]);
    };
    sync();
    return subscribeShipping(sync);
  }, []);

  const handleDeleteZone = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete shipping zone "${name}"?`)) {
      deleteShippingZone(id);
      showToast("Shipping zone deleted successfully!");
    }
  };

  const handleOpenAddDeliveryModal = () => {
    setEditingDeliveryTime(null);
    setIsDeliveryModalOpen(true);
  };

  const handleOpenEditDeliveryModal = (item: DeliveryTime) => {
    setEditingDeliveryTime(item);
    setIsDeliveryModalOpen(true);
  };

  const handleSaveDeliveryTime = (data: { en: string; ar: string }) => {
    if (editingDeliveryTime) {
      updateDeliveryTime(editingDeliveryTime.id, data);
      showToast("Delivery time updated successfully!");
    } else {
      addDeliveryTime(data);
      showToast("Delivery time added successfully!");
    }
  };

  const handleDeleteDeliveryTime = (id: string) => {
    if (confirm("Are you sure you want to delete this delivery time?")) {
      deleteDeliveryTime(id);
      showToast("Delivery time deleted successfully!");
    }
  };

  // Filtered zones
  const filteredZones = zones.filter((z) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = z.name.en.toLowerCase().includes(term);
    const regionMatch = z.regions.some((r) => r.toLowerCase().includes(term));
    return nameMatch || regionMatch;
  });

  return (
    <div className="w-full space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white text-xs font-medium px-4 py-3 rounded shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* CARD 1: Shipping Zones */}
      {/* ========================================================= */}
      <div className="bg-white rounded border border-[#e4e7ea] p-6 shadow-sm">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-4">
          <h1 className="text-[16px] font-semibold text-gray-800">
            Shipping Zones
          </h1>
          <Link
            href="/dashboard/add_shipping_zone"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#20c997] hover:bg-[#1bb285] text-white text-[12.5px] font-medium rounded-[3px] transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Shipping Zone</span>
          </Link>
        </div>

        {/* Filter Controls: Show dropdown & Search input */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 pb-4">
          <div className="flex items-center gap-2 text-[13px] text-gray-600">
            <span>Show</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="border border-gray-300 rounded-[3px] px-2.5 py-1 text-[13px] text-gray-700 bg-white focus:outline-none focus:border-[#20c997]"
            >
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-[13px] text-gray-600">
            <span>Search:</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-[3px] px-2.5 py-1 text-[13px] text-gray-800 w-44 focus:outline-none focus:border-[#20c997]"
            />
          </div>
        </div>

        {/* Zones Table */}
        <div className="overflow-x-auto border-t border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-3.5 text-[12.5px] font-semibold text-gray-700 w-[18%]">
                  Zone Name
                </th>
                <th className="py-3 px-3.5 text-[12.5px] font-semibold text-gray-700 w-[42%]">
                  Regions
                </th>
                <th className="py-3 px-3.5 text-[12.5px] font-semibold text-gray-700 w-[28%]">
                  Shipping Methods
                </th>
                <th className="py-3 px-3.5 text-[12.5px] font-semibold text-gray-700 w-[12%] text-center">
                  Options
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[13px]">
              {filteredZones.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-400 text-[13px]">
                    No shipping zones found.
                  </td>
                </tr>
              ) : (
                filteredZones.map((zone) => (
                  <tr key={zone.id} className="hover:bg-gray-50/60 transition-colors">
                    {/* Zone Name */}
                    <td className="py-3.5 px-3.5 font-normal text-gray-800 align-middle">
                      {zone.name.en}
                    </td>

                    {/* Regions Pills */}
                    <td className="py-3.5 px-3.5 align-middle">
                      <div className="flex flex-wrap gap-1.5 items-center">
                        {zone.regions.map((region, rIdx) => (
                          <span
                            key={rIdx}
                            className="inline-block bg-[#e9ecef] text-[#495057] text-[11px] font-medium px-2 py-0.5 rounded-[3px]"
                          >
                            {region}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Shipping Methods */}
                    <td className="py-3.5 px-3.5 text-gray-700 align-middle">
                      {zone.methods.map((m) => m.name.en).join(", ")}
                    </td>

                    {/* Options (Edit & Delete) */}
                    <td className="py-3.5 px-3.5 align-middle text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Link
                          href={`/dashboard/edit_shipping_zone/${zone.id}`}
                          className="w-7 h-7 rounded border border-gray-200 bg-gray-50/80 flex items-center justify-center text-gray-600 hover:text-[#20c997] hover:bg-gray-100 transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteZone(zone.id, zone.name.en)}
                          className="w-7 h-7 rounded border border-gray-200 bg-gray-50/80 flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-gray-100 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end pt-4">
          <div className="inline-flex rounded-[3px] border border-gray-200 overflow-hidden text-[12px]">
            <button
              disabled
              className="px-2.5 py-1 text-gray-400 bg-white border-r border-gray-200 cursor-not-allowed select-none"
            >
              &lt;
            </button>
            <span className="px-3 py-1 bg-[#20c997] text-white font-medium select-none">
              1
            </span>
            <button
              disabled
              className="px-2.5 py-1 text-gray-400 bg-white border-l border-gray-200 cursor-not-allowed select-none"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* CARD 2: Shipping Delivery Times (Width ~560px) */}
      {/* ========================================================= */}
      <div className="bg-white rounded border border-[#e4e7ea] p-6 shadow-sm w-full max-w-[560px]">
        {/* Card Header */}
        <div className="flex items-center justify-between pb-4 gap-4">
          <h2 className="text-[16px] font-semibold text-gray-800">
            Shipping Delivery Times
          </h2>
          <button
            type="button"
            onClick={handleOpenAddDeliveryModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#20c997] hover:bg-[#1bb285] text-white text-[12.5px] font-medium rounded-[3px] transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Delivery Time</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border-t border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-3.5 text-[12.5px] font-semibold text-gray-700 w-[78%]">
                  Option
                </th>
                <th className="py-3 px-3.5 text-[12.5px] font-semibold text-gray-700 w-[22%] text-center">
                  Options
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[13px]">
              {deliveryTimes.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3.5 px-3.5 text-gray-800 align-middle">
                    {item.option.en}
                  </td>
                  <td className="py-3.5 px-3.5 align-middle text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEditDeliveryModal(item)}
                        className="w-7 h-7 rounded border border-gray-200 bg-gray-50/80 flex items-center justify-center text-gray-600 hover:text-[#20c997] hover:bg-gray-100 transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteDeliveryTime(item.id)}
                        className="w-7 h-7 rounded border border-gray-200 bg-gray-50/80 flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-gray-100 transition-colors cursor-pointer"
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

        {/* Pagination */}
        <div className="flex justify-end pt-4">
          <div className="inline-flex rounded-[3px] border border-gray-200 overflow-hidden text-[12px]">
            <button
              disabled
              className="px-2.5 py-1 text-gray-400 bg-white border-r border-gray-200 cursor-not-allowed select-none"
            >
              &lt;
            </button>
            <span className="px-3 py-1 bg-[#20c997] text-white font-medium select-none">
              1
            </span>
            <button
              disabled
              className="px-2.5 py-1 text-gray-400 bg-white border-l border-gray-200 cursor-not-allowed select-none"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Helper Note / Warning (Full Width outside Card 2) */}
      <div className="bg-[#e6f7f9] border border-[#bee5eb] rounded-[3px] p-3 text-[12.5px] text-[#0c5460] leading-relaxed">
        You can add shipping delivery times from here (E.g: Ready to ship in 1 Business Day)
      </div>

      {/* Add / Edit Delivery Time Modal */}
      <AddDeliveryTimeModal
        isOpen={isDeliveryModalOpen}
        onClose={() => setIsDeliveryModalOpen(false)}
        onSave={handleSaveDeliveryTime}
        initialData={editingDeliveryTime}
      />
    </div>
  );
}
