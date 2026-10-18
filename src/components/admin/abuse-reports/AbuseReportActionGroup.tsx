import React from "react";
import { FileText, Trash2 } from "lucide-react";
import { AbuseReport } from "./types";

interface AbuseReportActionGroupProps {
  report: AbuseReport;
  onViewContent: (report: AbuseReport) => void;
  onDelete: (id: number) => void;
}

export default function AbuseReportActionGroup({
  report,
  onViewContent,
  onDelete,
}: AbuseReportActionGroupProps) {
  return (
    <div className="inline-flex items-center rounded-[3px] border border-[#d2d6de] shadow-2xs overflow-hidden bg-white">
      <button
        type="button"
        onClick={() => onViewContent(report)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[12px] text-[#333] bg-[#f8f9fa] hover:bg-[#eaecef] transition-colors cursor-pointer border-r border-[#d2d6de]"
        title="View Content"
      >
        <FileText className="w-3.5 h-3.5 text-[#333] shrink-0" />
        <span>View Content</span>
      </button>
      <button
        type="button"
        onClick={() => onDelete(report.id)}
        className="inline-flex items-center justify-center px-2 py-1 text-[12px] text-[#555] bg-[#f8f9fa] hover:bg-[#eaecef] hover:text-red-600 transition-colors cursor-pointer"
        title="Delete Report"
      >
        <Trash2 className="w-3.5 h-3.5 shrink-0" />
      </button>
    </div>
  );
}
