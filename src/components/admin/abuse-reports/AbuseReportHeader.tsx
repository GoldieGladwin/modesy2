import React from "react";

interface AbuseReportHeaderProps {
  title?: string;
}

export default function AbuseReportHeader({ title = "Abuse Reports" }: AbuseReportHeaderProps) {
  return (
    <div className="mb-4">
      <h1 className="text-[17px] font-semibold text-[#333] tracking-tight">
        {title}
      </h1>
    </div>
  );
}
