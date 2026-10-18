import React from "react";

interface AbuseReportEntryCountProps {
  count: number;
}

export default function AbuseReportEntryCount({ count }: AbuseReportEntryCountProps) {
  return (
    <div className="mt-4 text-[13px] text-[#555]">
      Number of Entries: <span className="font-bold text-[#222]">{count}</span>
    </div>
  );
}
