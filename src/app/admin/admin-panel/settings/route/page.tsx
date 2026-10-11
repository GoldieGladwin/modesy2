import React from "react";
import { RouteSettings } from "@/components/admin/settings";

export const metadata = {
  title: "Route Settings - Modesy Admin",
  description: "Customize custom URL slugs and system routing paths",
};

export default function AdminRouteSettingsPage() {
  return <RouteSettings />;
}
