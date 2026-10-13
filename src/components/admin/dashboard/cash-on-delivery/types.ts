export interface CodTransactionItem {
  id: number;
  orderNumber: string;
  commission: string;
  date: string;
}

export type CodStatus = "enable" | "disable";
