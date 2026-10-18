"use client";

import React, { useState } from "react";
import { ShippingZoneItem, DeliveryTimeItem } from "./types";
import { initialShippingZones, initialDeliveryTimes } from "./mockData";
import ShippingZonesTable from "./ShippingZonesTable";
import ShippingDeliveryTimesTable from "./ShippingDeliveryTimesTable";

export default function ShippingSettingsView() {
  const [zones, setZones] = useState<ShippingZoneItem[]>(initialShippingZones);
  const [deliveryTimes, setDeliveryTimes] =
    useState<DeliveryTimeItem[]>(initialDeliveryTimes);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Zone handlers
  const handleAddZone = (newZone: ShippingZoneItem) => {
    setZones((prev) => [newZone, ...prev]);
    showNotification(`Shipping zone "${newZone.name}" added successfully.`);
  };

  const handleUpdateZone = (updatedZone: ShippingZoneItem) => {
    setZones((prev) =>
      prev.map((z) => (z.id === updatedZone.id ? updatedZone : z))
    );
    showNotification(`Shipping zone "${updatedZone.name}" updated successfully.`);
  };

  const handleDeleteZone = (id: string | number) => {
    setZones((prev) => prev.filter((z) => z.id !== id));
    showNotification("Shipping zone deleted successfully.");
  };

  // Delivery time handlers
  const handleAddDeliveryTime = (newItem: DeliveryTimeItem) => {
    setDeliveryTimes((prev) => [...prev, newItem]);
    showNotification("Delivery time option added successfully.");
  };

  const handleUpdateDeliveryTime = (updatedItem: DeliveryTimeItem) => {
    setDeliveryTimes((prev) =>
      prev.map((d) => (d.id === updatedItem.id ? updatedItem : d))
    );
    showNotification("Delivery time option updated successfully.");
  };

  const handleDeleteDeliveryTime = (id: string | number) => {
    setDeliveryTimes((prev) => prev.filter((d) => d.id !== id));
    showNotification("Delivery time option deleted successfully.");
  };

  return (
    <div className="font-sans max-w-7xl space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="bg-[#d4edda] border border-[#c3e6cb] text-[#155724] px-4 py-2.5 rounded-[3px] text-xs font-medium flex items-center justify-between shadow-2xs transition-all">
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

      {/* 1. Top Section: Shipping Zones */}
      <ShippingZonesTable
        zones={zones}
        onAddZone={handleAddZone}
        onUpdateZone={handleUpdateZone}
        onDeleteZone={handleDeleteZone}
      />

      {/* 2. Bottom Section: Shipping Delivery Times */}
      <ShippingDeliveryTimesTable
        deliveryTimes={deliveryTimes}
        onAddDeliveryTime={handleAddDeliveryTime}
        onUpdateDeliveryTime={handleUpdateDeliveryTime}
        onDeleteDeliveryTime={handleDeleteDeliveryTime}
      />
    </div>
  );
}
