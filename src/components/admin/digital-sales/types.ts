export interface DigitalSale {
  id: number;
  order: string;
  purchaseCode: string;
  seller: string;
  buyer: string;
  total: string;
  currency: string;
  date: string;
}

export type ExportFormat = "csv" | "xml" | "xlsx";
