"use client";

import React, { useState } from "react";
import AbuseReportCard from "@/components/admin/abuse-reports/AbuseReportCard";
import ViewContentModal from "@/components/admin/abuse-reports/ViewContentModal";
import { INITIAL_ABUSE_REPORTS } from "@/components/admin/abuse-reports/mockData";
import { AbuseReport } from "@/components/admin/abuse-reports/types";

export default function AdminAbuseReportsPage() {
  const [reports, setReports] = useState<AbuseReport[]>(INITIAL_ABUSE_REPORTS);
  const [activeModalReport, setActiveModalReport] = useState<AbuseReport | null>(null);

  const handleViewContent = (report: AbuseReport) => {
    setActiveModalReport(report);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      setReports((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleCloseModal = () => {
    setActiveModalReport(null);
  };

  return (
    <div className="max-w-[1440px] mx-auto font-sans text-[#333]">
      <AbuseReportCard
        reports={reports}
        onViewContent={handleViewContent}
        onDelete={handleDelete}
      />

      <ViewContentModal
        report={activeModalReport}
        onClose={handleCloseModal}
      />
    </div>
  );
}
