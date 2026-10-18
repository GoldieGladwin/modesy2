import React from "react";
import VendorBulkUploadView from "@/components/vendor/products/VendorBulkUploadView";

export const metadata = {
  title: "Bulk Product Upload - Dashboard - Modesy",
  description: "You can add your products with a CSV file from this section",
};

export default function BulkProductUploadKebabPage() {
  return <VendorBulkUploadView />;
}
