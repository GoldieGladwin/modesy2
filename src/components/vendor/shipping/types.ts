export interface LocalizedString {
  en: string;
  ar: string;
}

export interface ShippingMethod {
  id: string;
  type: "free" | "flat_rate" | "local_pickup";
  name: LocalizedString;
  status: boolean;
  minOrderAmount?: string;
  cost?: string;
}

export interface ShippingZone {
  id: string;
  name: LocalizedString;
  estimatedDelivery: LocalizedString;
  regions: string[];
  methods: ShippingMethod[];
}

export interface DeliveryTime {
  id: string;
  option: LocalizedString;
}
