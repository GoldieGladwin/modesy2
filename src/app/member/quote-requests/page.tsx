import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

export default function MemberQuoteRequestsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/member" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Quote Requests</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-100">
          <FileText className="w-5 h-5 text-[#00a99d]" />
          Quote Requests
        </h1>
        <div className="py-16 text-center text-gray-400 text-sm">
          <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300 stroke-[1.5]" />
          <p className="font-medium text-gray-600">No quote requests found</p>
          <p className="text-xs text-gray-400 mt-1">You haven&apos;t requested any custom pricing quotes from vendors yet.</p>
        </div>
      </div>
    </div>
  );
}
