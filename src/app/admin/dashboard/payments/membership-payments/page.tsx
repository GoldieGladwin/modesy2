"use client";

import React from "react";
import { MembershipPaymentsTable } from "@/components/admin/dashboard/payments";

export default function MembershipPaymentsPage() {
  return (
    <div className="py-2 sm:py-4">
      <MembershipPaymentsTable />
    </div>
  );
}
