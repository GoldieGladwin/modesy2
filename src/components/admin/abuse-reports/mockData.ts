import { AbuseReport } from "./types";

export const INITIAL_ABUSE_REPORTS: AbuseReport[] = [
  {
    id: 2,
    reportedContent: "Product",
    sentBy: "Admin",
    description: "testing Report function",
    date: "2026-10-03 / 19:53",
    targetUrl: "/admin/admin-panel/products",
  },
  {
    id: 1,
    reportedContent: "Product",
    sentBy: "Admin",
    description: "Test report",
    date: "2026-08-06 / 13:29",
    targetUrl: "/admin/admin-panel/products",
  },
];
