import React from "react";
import { EmailSettings } from "@/components/admin/settings";

export const metadata = {
  title: "Email Settings - Modesy Admin",
  description: "Configure SMTP server, mail templates, and send test email",
};

export default function AdminEmailSettingsPage() {
  return <EmailSettings />;
}
