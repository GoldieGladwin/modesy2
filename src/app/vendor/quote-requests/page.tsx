import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

export default function VendorQuoteRequestsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/vendor" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <Link href="/vendor/dashboard" className="hover:text-[#00a99d]">Dashboard</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Quote Requests</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-100 mb-4">
          <FileText className="w-5 h-5 text-[#00a99d]" />
          Custom Quote Requests from Customers
        </h1>
        <div className="py-16 text-center text-gray-400 text-xs">
          <FileText className="w-10 h-10 mx-auto text-gray-300 mb-2 stroke-[1.5]" />
          <p className="font-semibold text-gray-600">No quote requests received yet</p>
          <p className="mt-1">When buyers request custom bulk pricing or quotes on your products, they will appear here.</p>
        </div>
      </div>
    </div>
  );
}
