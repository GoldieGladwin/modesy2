import { CurrencyItem } from "./types";

export const initialCurrenciesData: CurrencyItem[] = [
  { id: 1, name: "US Dollar", code: "USD", symbol: "$", rate: "Default", isActive: true, isDefault: true },
  { id: 2, name: "Euro", code: "EUR", symbol: "€", rate: 0.8973, isActive: true },
  { id: 23, name: "Saudi Riyal", code: "SAR", symbol: "SR", rate: 3.6541, isActive: true },
  { id: 47, name: "United Kingdom Pound", code: "GBP", symbol: "£", rate: 0.75515004, isActive: true },
  { id: 50, name: "Indonesian Rupiah", code: "IDR", symbol: "Rp", rate: 16432.35, isActive: true },
  { id: 52, name: "India Rupee", code: "INR", symbol: "₹", rate: 84.044, isActive: true },
  { id: 102, name: "Nigeria Naira", code: "NGN", symbol: "₦", rate: 1586.34, isActive: true },
  { id: 104, name: "Kenyan Shilling", code: "KES", symbol: "KSh", rate: 143.839001, isActive: true },
  { id: 108, name: "Russian Ruble", code: "RUB", symbol: "₽", rate: 91.2461003, isActive: true },
  { id: 3, name: "Canadian Dollar", code: "CAD", symbol: "$", rate: 1.344775, isActive: false },
  { id: 4, name: "UAE Dirham", code: "AED", symbol: "د.إ", rate: 3.570044, isActive: false },
  { id: 5, name: "Afghanistan Afghani", code: "AFN", symbol: "Af", rate: 68.9430007, isActive: false },
  { id: 6, name: "Albanian Lek", code: "ALL", symbol: "L", rate: 90.011804, isActive: false },
  { id: 7, name: "Armenian Dram", code: "AMD", symbol: "֏", rate: 384.2705, isActive: false },
  { id: 8, name: "Netherlands Antillean Guilder", code: "ANG", symbol: "ƒ", rate: 1.789400544, isActive: false },
];
