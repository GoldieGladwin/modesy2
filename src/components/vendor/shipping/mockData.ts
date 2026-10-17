import { ShippingZone, DeliveryTime } from "./types";

export const INITIAL_SHIPPING_ZONES: ShippingZone[] = [
  {
    id: "5",
    name: {
      en: "International",
      ar: "دولي",
    },
    estimatedDelivery: {
      en: "20-25 Days",
      ar: "20-25 يوماً",
    },
    regions: [
      "Europe",
      "Asia",
      "North America",
      "South America",
      "Oceania",
      "Antarctica",
    ],
    methods: [
      {
        id: "m1",
        type: "free",
        name: {
          en: "Free Shipping",
          ar: "الشحن مجانا",
        },
        status: true,
        minOrderAmount: "200",
      },
      {
        id: "m2",
        type: "flat_rate",
        name: {
          en: "Flat Rate",
          ar: "سعر موحد",
        },
        status: true,
        cost: "10",
      },
    ],
  },
  {
    id: "2",
    name: {
      en: "Germany",
      ar: "ألمانيا",
    },
    estimatedDelivery: {
      en: "3-5 Days",
      ar: "3-5 أيام",
    },
    regions: ["Europe/Germany"],
    methods: [
      {
        id: "m3",
        type: "free",
        name: {
          en: "Free Shipping",
          ar: "الشحن مجانا",
        },
        status: true,
        minOrderAmount: "50",
      },
      {
        id: "m4",
        type: "local_pickup",
        name: {
          en: "Local Pickup",
          ar: "استلام شخصي",
        },
        status: true,
      },
      {
        id: "m5",
        type: "flat_rate",
        name: {
          en: "Flat Rate",
          ar: "سعر موحد",
        },
        status: true,
        cost: "5",
      },
    ],
  },
  {
    id: "1",
    name: {
      en: "Europe",
      ar: "أوروبا",
    },
    estimatedDelivery: {
      en: "5-10 Days",
      ar: "5-10 أيام",
    },
    regions: ["Europe"],
    methods: [
      {
        id: "m6",
        type: "free",
        name: {
          en: "Free Shipping",
          ar: "الشحن مجانا",
        },
        status: true,
        minOrderAmount: "100",
      },
      {
        id: "m7",
        type: "local_pickup",
        name: {
          en: "Local Pickup",
          ar: "استلام شخصي",
        },
        status: true,
      },
      {
        id: "m8",
        type: "flat_rate",
        name: {
          en: "Flat Rate",
          ar: "سعر موحد",
        },
        status: true,
        cost: "8",
      },
    ],
  },
];

export const INITIAL_DELIVERY_TIMES: DeliveryTime[] = [
  {
    id: "d1",
    option: {
      en: "Ready to ship in 8-15 Business Days",
      ar: "جاهز للشحن خلال 8-15 يوم عمل",
    },
  },
  {
    id: "d2",
    option: {
      en: "Ready to ship in 4-7 Business Days",
      ar: "جاهز للشحن خلال 4-7 أيام عمل",
    },
  },
  {
    id: "d3",
    option: {
      en: "Ready to ship in 2-3 Business Days",
      ar: "جاهز للشحن خلال 2-3 أيام عمل",
    },
  },
  {
    id: "d4",
    option: {
      en: "Ready to ship in 1 Business Day",
      ar: "جاهز للشحن خلال يوم عمل واحد",
    },
  },
];

export const AVAILABLE_CONTINENTS = [
  "Europe",
  "Asia",
  "North America",
  "South America",
  "Oceania",
  "Antarctica",
  "Africa",
];
