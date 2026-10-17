"use client";

import { ShippingZone, DeliveryTime } from "./types";
import { INITIAL_SHIPPING_ZONES, INITIAL_DELIVERY_TIMES } from "./mockData";

let shippingZonesState: ShippingZone[] = [...INITIAL_SHIPPING_ZONES];
let deliveryTimesState: DeliveryTime[] = [...INITIAL_DELIVERY_TIMES];

const listeners: Array<() => void> = [];

function notify() {
  listeners.forEach((l) => l());
}

export function subscribeShipping(listener: () => void) {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

export function getShippingZones(): ShippingZone[] {
  return shippingZonesState;
}

export function getShippingZoneById(id: string): ShippingZone | undefined {
  return shippingZonesState.find((z) => z.id === id);
}

export function addShippingZone(zone: Omit<ShippingZone, "id">): ShippingZone {
  const newZone: ShippingZone = {
    ...zone,
    id: String(Date.now()),
  };
  shippingZonesState = [newZone, ...shippingZonesState];
  notify();
  return newZone;
}

export function updateShippingZone(id: string, updated: Partial<ShippingZone>) {
  shippingZonesState = shippingZonesState.map((z) =>
    z.id === id ? { ...z, ...updated } : z
  );
  notify();
}

export function deleteShippingZone(id: string) {
  shippingZonesState = shippingZonesState.filter((z) => z.id !== id);
  notify();
}

export function getDeliveryTimes(): DeliveryTime[] {
  return deliveryTimesState;
}

export function addDeliveryTime(time: { en: string; ar: string }): DeliveryTime {
  const newTime: DeliveryTime = {
    id: `d_${Date.now()}`,
    option: time,
  };
  deliveryTimesState = [...deliveryTimesState, newTime];
  notify();
  return newTime;
}

export function updateDeliveryTime(id: string, time: { en: string; ar: string }) {
  deliveryTimesState = deliveryTimesState.map((d) =>
    d.id === id ? { ...d, option: time } : d
  );
  notify();
}

export function deleteDeliveryTime(id: string) {
  deliveryTimesState = deliveryTimesState.filter((d) => d.id !== id);
  notify();
}
