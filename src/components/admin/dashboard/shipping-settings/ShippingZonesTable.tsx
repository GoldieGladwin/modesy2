"use client";

import React, { useState, useMemo } from "react";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import { ShippingZoneItem } from "./types";
import ShippingZoneModal from "./ShippingZoneModal";

interface ShippingZonesTableProps {
  zones: ShippingZoneItem[];
  onAddZone: (zone: ShippingZoneItem) => void;
  onUpdateZone: (zone: ShippingZoneItem) => void;
  onDeleteZone: (id: string | number) => void;
}

export default function ShippingZonesTable({
  zones,
  onAddZone,
  onUpdateZone,
  onDeleteZone,
}: ShippingZonesTableProps) {
  const [pageSize, setPageSize] = useState<number>(15);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<ShippingZoneItem | null>(null);

  const filteredZones = useMemo(() => {
    return zones.filter((z) => {
      const q = searchQuery.toLowerCase();
      const matchName = z.name.toLowerCase().includes(q);
      const matchRegion = z.regions.some((r) => r.toLowerCase().includes(q));
      const matchMethods = z.shippingMethods.some((m) =>
        m.toLowerCase().includes(q)
      );
      return matchName || matchRegion || matchMethods;
    });
  }, [zones, searchQuery]);

  const handleOpenAdd = () => {
    setEditingZone(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (zone: ShippingZoneItem) => {
    setEditingZone(zone);
    setModalOpen(true);
  };

  const handleSaveModal = (zone: ShippingZoneItem) => {
    if (editingZone) {
      onUpdateZone(zone);
    } else {
      onAddZone(zone);
    }
  };

  const handleDelete = (id: string | number, name: string) => {
    if (confirm(`Are you sure you want to delete shipping zone "${name}"?`)) {
      onDeleteZone(id);
    }
  };

  return (
    <div className="bg-white border border-[#ebebeb] rounded-[4px] p-6 shadow-xs font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-5 border-b border-[#f4f4f4] mb-5">
        <h2 className="text-[16px] font-bold text-[#2d3748]">Shipping Zones</h2>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Shipping Zone</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        {/* Show Entries */}
        <div className="flex items-center gap-2 text-xs text-[#555]">
          <span>Show</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border border-[#d1d5db] rounded-[3px] px-2 py-1 text-xs focus:outline-none focus:border-[#00a99d] bg-white cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 text-xs text-[#555]">
          <span>Search:</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-[#d1d5db] rounded-[3px] px-2.5 py-1 text-xs focus:outline-none focus:border-[#00a99d] text-[#333e48]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#e9ecef] text-[#333e48] font-bold">
              <th className="py-3 px-3 font-bold w-48">Zone Name</th>
              <th className="py-3 px-3 font-bold">Regions</th>
              <th className="py-3 px-3 font-bold">Shipping Methods</th>
              <th className="py-3 px-3 font-bold w-24 text-center">Options</th>
            </tr>
          </thead>
          <tbody>
            {filteredZones.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-12 text-center text-[#555] text-xs font-normal"
                >
                  No records found!
                </td>
              </tr>
            ) : (
              filteredZones.map((zone) => (
                <tr
                  key={zone.id}
                  className="border-b border-[#f1f3f5] hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4 px-3 text-[#333e48] font-medium align-middle">
                    {zone.name}
                  </td>
                  <td className="py-4 px-3 align-middle">
                    <div className="flex flex-wrap gap-1.5">
                      {zone.regions.map((reg, idx) => (
                        <span
                          key={idx}
                          className="bg-[#eaedf1] text-[#495057] text-[11px] font-medium px-2 py-0.5 rounded-[3px]"
                        >
                          {reg}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-3 text-[#555] align-middle">
                    {zone.shippingMethods.join(", ")}
                  </td>
                  <td className="py-4 px-3 text-center align-middle whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(zone)}
                        title="Edit"
                        className="bg-[#eaedf1] hover:bg-[#dfe3e8] text-[#556270] p-1.5 rounded-[3px] transition-colors cursor-pointer"
                      >
                        <SquarePen className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(zone.id, zone.name)}
                        title="Delete"
                        className="bg-[#eaedf1] hover:bg-red-50 hover:text-red-600 text-[#556270] p-1.5 rounded-[3px] transition-colors cursor-pointer"
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

      {/* Pagination Footer */}
      <div className="flex justify-end mt-4">
        <div className="inline-flex items-center -space-x-px text-xs">
          <button
            type="button"
            disabled
            className="px-2.5 py-1 border border-[#e2e8f0] text-gray-400 rounded-l-[3px] hover:bg-gray-50 disabled:opacity-50 cursor-default"
          >
            &lt;
          </button>
          <button
            type="button"
            className="px-3 py-1 bg-[#00a99d] border border-[#00a99d] text-white font-semibold cursor-pointer"
          >
            1
          </button>
          <button
            type="button"
            disabled
            className="px-2.5 py-1 border border-[#e2e8f0] text-gray-400 rounded-r-[3px] hover:bg-gray-50 disabled:opacity-50 cursor-default"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Modal */}
      <ShippingZoneModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        zone={editingZone}
        onSave={handleSaveModal}
      />
    </div>
  );
}
