"use client";

import React, { useState } from "react";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import { DeliveryTimeItem } from "./types";
import DeliveryTimeModal from "./DeliveryTimeModal";

interface ShippingDeliveryTimesTableProps {
  deliveryTimes: DeliveryTimeItem[];
  onAddDeliveryTime: (item: DeliveryTimeItem) => void;
  onUpdateDeliveryTime: (item: DeliveryTimeItem) => void;
  onDeleteDeliveryTime: (id: string | number) => void;
}

export default function ShippingDeliveryTimesTable({
  deliveryTimes,
  onAddDeliveryTime,
  onUpdateDeliveryTime,
  onDeleteDeliveryTime,
}: ShippingDeliveryTimesTableProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DeliveryTimeItem | null>(null);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: DeliveryTimeItem) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleSaveModal = (item: DeliveryTimeItem) => {
    if (editingItem) {
      onUpdateDeliveryTime(item);
    } else {
      onAddDeliveryTime(item);
    }
  };

  const handleDelete = (id: string | number, option: string) => {
    if (confirm(`Are you sure you want to delete "${option}"?`)) {
      onDeleteDeliveryTime(id);
    }
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="bg-white border border-[#ebebeb] rounded-[4px] p-6 shadow-xs font-sans">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[#f4f4f4] mb-4">
          <h2 className="text-[16px] font-bold text-[#2d3748]">
            Shipping Delivery Times
          </h2>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold px-3 py-1.5 rounded-[3px] shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Delivery Time</span>
          </button>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#e9ecef] text-[#333e48] font-bold">
                <th className="py-3 px-3 font-bold">Option</th>
                <th className="py-3 px-3 font-bold w-24 text-center">Options</th>
              </tr>
            </thead>
            <tbody>
              {deliveryTimes.length === 0 ? (
                <tr>
                  <td
                    colSpan={2}
                    className="py-12 text-center text-[#555] text-xs font-normal"
                  >
                    No records found!
                  </td>
                </tr>
              ) : (
                deliveryTimes.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#f1f3f5] hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-3.5 px-3 text-[#333e48] align-middle">
                      {item.option}
                    </td>
                    <td className="py-3.5 px-3 text-center align-middle whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          title="Edit"
                          className="bg-[#eaedf1] hover:bg-[#dfe3e8] text-[#556270] p-1.5 rounded-[3px] transition-colors cursor-pointer"
                        >
                          <SquarePen className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.option)}
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
      </div>

      {/* Info Alert Box matching screenshot */}
      <div className="bg-[#dcf3f6] border border-[#b8e8ed] text-[#006a65] rounded-[4px] p-3.5 text-xs leading-relaxed">
        You can add shipping delivery times from here (E.g: Ready to ship in 1
        Business Day)
      </div>

      {/* Modal */}
      <DeliveryTimeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        deliveryTime={editingItem}
        onSave={handleSaveModal}
      />
    </div>
  );
}
