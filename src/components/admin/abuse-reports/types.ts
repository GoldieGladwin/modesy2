export interface AbuseReport {
  id: number;
  reportedContent: string;
  sentBy: string;
  description: string;
  date: string;
  targetUrl?: string;
}
