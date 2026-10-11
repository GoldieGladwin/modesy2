import React from "react";
import { X, ExternalLink, AlertCircle } from "lucide-react";
import { AbuseReport } from "./types";

interface ViewContentModalProps {
  report: AbuseReport | null;
  onClose: () => void;
}

export default function ViewContentModal({ report, onClose }: ViewContentModalProps) {
  if (!report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-[4px] shadow-lg max-w-lg w-full overflow-hidden border border-[#d2d6de] animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e9ecef] bg-[#f8f9fa]">
          <h3 className="text-[15px] font-semibold text-[#333] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#00a99d]" />
            Reported Content Details (ID: #{report.id})
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-[13px] text-[#495057]">
          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
            <span className="font-semibold text-[#333]">Reported Type:</span>
            <span className="col-span-2">{report.reportedContent}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
            <span className="font-semibold text-[#333]">Sent By:</span>
            <span className="col-span-2">{report.sentBy}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
            <span className="font-semibold text-[#333]">Reported Date:</span>
            <span className="col-span-2">{report.date}</span>
          </div>

          <div className="py-1">
            <span className="font-semibold text-[#333] block mb-1">Description:</span>
            <div className="p-3 bg-[#f8f9fa] border border-[#e9ecef] rounded text-[#333] text-[13px]">
              {report.description}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-[#e9ecef] bg-[#fafafa]">
          {report.targetUrl && (
            <a
              href={report.targetUrl}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-white bg-[#00a99d] hover:bg-[#008e84] rounded-[3px] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Visit Reported Item
            </a>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-[12px] font-medium text-[#495057] bg-white border border-[#d2d6de] hover:bg-gray-50 rounded-[3px] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
