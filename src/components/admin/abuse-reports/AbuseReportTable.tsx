import React from "react";
import { AbuseReport } from "./types";
import AbuseReportActionGroup from "./AbuseReportActionGroup";

interface AbuseReportTableProps {
  reports: AbuseReport[];
  onViewContent: (report: AbuseReport) => void;
  onDelete: (id: number) => void;
}

export default function AbuseReportTable({
  reports,
  onViewContent,
  onDelete,
}: AbuseReportTableProps) {
  return (
    <div className="w-full overflow-x-auto border border-[#f1f3f5] rounded-[3px]">
      <table className="w-full border-collapse text-left text-[13px]">
        <thead>
          <tr className="bg-white border-b border-[#f1f3f5]">
            <th className="py-3 px-4 font-semibold text-[#333] border-r border-[#f1f3f5] w-14">
              Id
            </th>
            <th className="py-3 px-4 font-semibold text-[#333] border-r border-[#f1f3f5] min-w-[150px]">
              Reported Content
            </th>
            <th className="py-3 px-4 font-semibold text-[#333] border-r border-[#f1f3f5] min-w-[120px]">
              Sent By
            </th>
            <th className="py-3 px-4 font-semibold text-[#333] border-r border-[#f1f3f5] min-w-[240px]">
              Description
            </th>
            <th className="py-3 px-4 font-semibold text-[#333] border-r border-[#f1f3f5] min-w-[160px]">
              Date
            </th>
            <th className="py-3 px-4 font-semibold text-[#333] min-w-[170px]">
              Options
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f1f3f5]">
          {reports.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-8 text-center text-gray-400">
                No abuse reports found.
              </td>
            </tr>
          ) : (
            reports.map((report) => (
              <tr
                key={report.id}
                className="hover:bg-[#fbfcfd] transition-colors bg-white"
              >
                <td className="py-3 px-4 text-[#495057] border-r border-[#f1f3f5]">
                  {report.id}
                </td>
                <td className="py-3 px-4 text-[#495057] border-r border-[#f1f3f5]">
                  {report.reportedContent}
                </td>
                <td className="py-3 px-4 text-[#495057] border-r border-[#f1f3f5]">
                  {report.sentBy}
                </td>
                <td className="py-3 px-4 text-[#495057] border-r border-[#f1f3f5]">
                  {report.description}
                </td>
                <td className="py-3 px-4 text-[#495057] border-r border-[#f1f3f5]">
                  {report.date}
                </td>
                <td className="py-3 px-4 text-[#495057]">
                  <AbuseReportActionGroup
                    report={report}
                    onViewContent={onViewContent}
                    onDelete={onDelete}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
