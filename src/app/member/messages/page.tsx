import React from "react";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

export default function MemberMessagesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/member" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Messages</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-100">
          <Mail className="w-5 h-5 text-[#00a99d]" />
          Messages
        </h1>
        <div className="py-16 text-center text-gray-400 text-sm">
          <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300 stroke-[1.5]" />
          <p className="font-medium text-gray-600">No messages found</p>
          <p className="text-xs text-gray-400 mt-1">Direct inquiries with shop owners and support will appear here.</p>
        </div>
      </div>
    </div>
  );
}
