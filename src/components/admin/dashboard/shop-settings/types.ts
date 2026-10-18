export interface ShopSettingsData {
  shopName: string;
  shopDescription: string;
  showWhatsApp: boolean;
  whatsAppNumber: string;
  rssFeeds: boolean;
}

export interface VacationModeData {
  status: boolean; // true = Enable, false = Disable
  vacationMessage: string;
}

export interface VatLocationItem {
  id: string;
  location: string;
  taxRate: number;
}

export interface VatSettingsData {
  setFixedVat: boolean;
  rates: VatLocationItem[];
}
