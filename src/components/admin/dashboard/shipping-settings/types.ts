export interface ShippingZoneItem {
  id: string | number;
  name: string;
  regions: string[];
  shippingMethods: string[];
}

export interface DeliveryTimeItem {
  id: string | number;
  option: string;
}
