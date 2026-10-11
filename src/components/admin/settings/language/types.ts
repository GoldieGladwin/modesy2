export interface LanguageItem {
  id: number;
  name: string;
  shortForm: string;
  languageCode: string;
  order: number;
  textDirection: "ltr" | "rtl";
  textEditorLanguage?: string;
  flagUrl?: string;
  isActive: boolean;
  isDefault: boolean;
}

export interface NewLanguagePayload {
  name: string;
  shortForm: string;
  languageCode: string;
  order: number;
  textDirection: "ltr" | "rtl";
  textEditorLanguage: string;
  flagImage?: string;
  isActive: boolean;
}
