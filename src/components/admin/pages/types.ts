export type CMSPageType = "Custom" | "Default";

export interface CMSPage {
  id: number;
  title: string;
  language: string;
  location: string;
  isVisible: boolean;
  pageType: CMSPageType;
  date: string;
}

export interface PagesFilterState {
  pageSize: number;
  language: string;
  search: string;
}
