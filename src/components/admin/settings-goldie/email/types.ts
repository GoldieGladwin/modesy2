export interface MailServerConfig {
  mailService: string;
  mailProtocol: string;
  encryption: string;
  mailHost: string;
  mailPort: string;
  mailUsername: string;
  mailPassword: string;
  mailTitle: string;
  replyTo: string;
}

export interface EmailOptionsConfig {
  emailVerification: boolean;
  sendEmailNewProduct: boolean;
  sendEmailOrderSummary: boolean;
  sendEmailOrderShipped: boolean;
  sendContactMessages: boolean;
  shopOpeningRequests: boolean;
  biddingSystemEmails: boolean;
  supportSystemEmails: boolean;
  adminNotificationEmail: string;
}
