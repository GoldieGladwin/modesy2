import { LanguageItem } from "./types";

export const initialLanguagesData: LanguageItem[] = [
  {
    id: 2,
    name: "Arabic",
    shortForm: "ar",
    languageCode: "ar-SA",
    order: 2,
    textDirection: "rtl",
    textEditorLanguage: "Arabic",
    isActive: true,
    isDefault: false,
  },
  {
    id: 1,
    name: "English",
    shortForm: "en",
    languageCode: "en-US",
    order: 1,
    textDirection: "ltr",
    textEditorLanguage: "English",
    isActive: true,
    isDefault: true,
  },
];
