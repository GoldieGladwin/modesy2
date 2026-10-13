import { CodTransactionItem, CodStatus } from "./types";

export const initialCodTransactions: CodTransactionItem[] = [];

export const initialCodSettings = {
  debt: "$0",
  debtLimit: "$30",
  status: "disable" as CodStatus,
};
