import React from "react";
import Link from "next/link";
import { Mail, MessageSquare } from "lucide-react";

export default function ModeratorMessagesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/moderator" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <Link href="/moderator/dashboard" className="hover:text-[#00a99d]">Dashboard</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Messages</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm p-6">
        <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-100 mb-4">
          <Mail className="w-5 h-5 text-amber-600" />
          Staff &amp; Moderation Messages
        </h1>
        <div className="py-16 text-center text-gray-400 text-xs">
          <MessageSquare className="w-10 h-10 mx-auto text-gray-300 mb-2 stroke-[1.5]" />
          <p className="font-semibold text-gray-600">No staff messages</p>
          <p className="mt-1">Internal communications and escalated tickets will appear here.</p>
        </div>
      </div>
    </div>
  );
}
