"use client";

import React from "react";
import { PromotionPaymentsTable } from "@/components/admin/dashboard/payments";

export default function PromotionPaymentsPage() {
  return (
    <div className="py-2 sm:py-4">
      <PromotionPaymentsTable />
    </div>
  );
}
