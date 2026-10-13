export interface FontItem {
  id: number;
  name: string;
  fontFamily: string;
  url?: string;
  isDefault?: boolean;
}

export interface SiteFontConfig {
  language: string;
  siteFont: string;
  dashboardFont: string;
}

export interface NewFontPayload {
  name: string;
  url: string;
  fontFamily: string;
}
