import { ShopSettingsData, VacationModeData, VatLocationItem } from "./types";

export const initialShopSettings: ShopSettingsData = {
  shopName: "Admin",
  shopDescription:
    "We offer a wide variety of products ranging from everyday essentials to specialty items, all carefully selected to meet your needs and exceed your expectations.",
  showWhatsApp: true,
  whatsAppNumber: "123",
  rssFeeds: true,
};

export const initialVacationMode: VacationModeData = {
  status: false, // Disable
  vacationMessage: `Dear Customers,

This vendor is currently on vacation and is not available to process orders or respond to messages. They will return on [return date]. We apologize for any inconvenience this may cause and appreciate your understanding.

Thank you for your patience and continued support.

Best regards,`,
};

export const initialVatLocations: VatLocationItem[] = [
  { id: "af-bamyan", location: "Afghanistan/Bamyan", taxRate: 0 },
  { id: "af-daykundi", location: "Afghanistan/Daykundi", taxRate: 0 },
  { id: "af-farah", location: "Afghanistan/Farah", taxRate: 0 },
  { id: "af-faryab", location: "Afghanistan/Faryab", taxRate: 0 },
  { id: "af-ghazni", location: "Afghanistan/Ghazni", taxRate: 0 },
  { id: "af-ghowr", location: "Afghanistan/Ghowr", taxRate: 0 },
  { id: "af-helmand", location: "Afghanistan/Helmand", taxRate: 0 },
  { id: "af-herat", location: "Afghanistan/Herat", taxRate: 0 },
  { id: "af-jowzjan", location: "Afghanistan/Jowzjan", taxRate: 0 },
  { id: "af-kabul", location: "Afghanistan/Kabul", taxRate: 0 },
  { id: "af-kandahar", location: "Afghanistan/Kandahar", taxRate: 0 },
  { id: "af-kapisa", location: "Afghanistan/Kapisa", taxRate: 0 },
  { id: "af-khost", location: "Afghanistan/Khost", taxRate: 0 },
  { id: "af-kunar", location: "Afghanistan/Kunar", taxRate: 0 },
  { id: "af-kunduz", location: "Afghanistan/Kunduz", taxRate: 0 },
  { id: "af-nangarhar", location: "Afghanistan/Nangarhar", taxRate: 0 },
  { id: "id-jakarta", location: "Indonesia/Jakarta", taxRate: 11 },
  { id: "id-bali", location: "Indonesia/Bali", taxRate: 11 },
  { id: "us-california", location: "United States/California", taxRate: 7.25 },
  { id: "us-newyork", location: "United States/New York", taxRate: 4 },
];
