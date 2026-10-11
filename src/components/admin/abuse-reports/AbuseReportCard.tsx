import React from "react";
import AbuseReportHeader from "./AbuseReportHeader";
import AbuseReportTable from "./AbuseReportTable";
import AbuseReportEntryCount from "./AbuseReportEntryCount";
import { AbuseReport } from "./types";

interface AbuseReportCardProps {
  reports: AbuseReport[];
  onViewContent: (report: AbuseReport) => void;
  onDelete: (id: number) => void;
}

export default function AbuseReportCard({
  reports,
  onViewContent,
  onDelete,
}: AbuseReportCardProps) {
  return (
    <div className="bg-white border border-[#d2d6de] rounded-[3px] p-5 shadow-xs">
      {/* Title */}
      <AbuseReportHeader title="Abuse Reports" />

      {/* Table */}
      <AbuseReportTable
        reports={reports}
        onViewContent={onViewContent}
        onDelete={onDelete}
      />

      {/* Footer / Entry count */}
      <AbuseReportEntryCount count={reports.length} />
    </div>
  );
}
