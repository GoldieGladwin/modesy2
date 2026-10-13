import { ShippingZoneItem, DeliveryTimeItem } from "./types";

export const initialShippingZones: ShippingZoneItem[] = [
  {
    id: 1,
    name: "International",
    regions: ["Europe", "Asia", "Africa", "South America"],
    shippingMethods: ["Free Shipping", "Flat Rate"],
  },
  {
    id: 2,
    name: "Domestic",
    regions: ["North America/United States"],
    shippingMethods: ["Free Shipping", "Local Pickup", "Flat Rate"],
  },
];

export const initialDeliveryTimes: DeliveryTimeItem[] = [
  {
    id: 1,
    option: "Ready to ship in 8-15 Business Days",
  },
  {
    id: 2,
    option: "Ready to ship in 4-7 Business Days",
  },
  {
    id: 3,
    option: "Ready to ship in 2-3 Business Days",
  },
  {
    id: 4,
    option: "Ready to ship in 1 Business Day",
  },
];
