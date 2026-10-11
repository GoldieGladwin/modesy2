import React from "react";
import Link from "next/link";
import { Mail, Search, MessageSquare, Send, User, CheckCheck } from "lucide-react";

export default function AdminMessagesPage() {
  const conversations = [
    {
      id: "1",
      user: "Sarah Jenkins (Buyer)",
      lastMessage: "Hi admin, does the summer promotion apply to digital downloads?",
      time: "10 mins ago",
      unread: true,
    },
    {
      id: "2",
      user: "Apex Tech Store (Vendor)",
      lastMessage: "Payout request details have been confirmed. Thank you!",
      time: "2 hours ago",
      unread: false,
    },
    {
      id: "3",
      user: "Support Team",
      lastMessage: "Automated daily system health audit report is ready.",
      time: "Yesterday",
      unread: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1.5">
        <Link href="/admin" className="hover:text-[#00a99d]">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Messages</span>
      </nav>

      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col md:flex-row min-h-[550px]">
        {/* Sidebar Conversations */}
        <div className="w-full md:w-80 border-r border-gray-200 flex flex-col bg-gray-50/50">
          <div className="p-4 border-b border-gray-200 bg-white">
            <h1 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#00a99d]" /> Messages
            </h1>
            <div className="mt-3 relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full text-xs pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-[#00a99d]"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {conversations.map((conv, idx) => (
              <div
                key={conv.id}
                className={`p-3.5 hover:bg-gray-100/70 cursor-pointer transition flex items-start gap-3 ${
                  idx === 0 ? "bg-teal-50/40 border-l-4 border-[#00a99d]" : ""
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-gray-200 text-gray-700 font-bold flex items-center justify-center text-xs shrink-0">
                  {conv.user.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-gray-900 truncate">{conv.user}</h3>
                    <span className="text-[10px] text-gray-400 shrink-0">{conv.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{conv.lastMessage}</p>
                </div>
                {conv.unread && (
                  <span className="w-2 h-2 rounded-full bg-[#00a99d] shrink-0 mt-1.5" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-teal-100 text-[#00a99d] font-bold flex items-center justify-center text-xs">
                S
              </div>
              <div>
                <h2 className="text-xs font-bold text-gray-900">Sarah Jenkins (Buyer)</h2>
                <span className="text-[10px] text-emerald-600 font-medium">● Online</span>
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50/30">
            <div className="flex items-start gap-2 max-w-md">
              <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 text-xs flex items-center justify-center shrink-0">
                S
              </div>
              <div className="bg-white border border-gray-200 p-3 rounded-lg text-xs text-gray-700 shadow-xs">
                Hi admin, does the summer promotion apply to digital downloads?
                <div className="text-[9px] text-gray-400 mt-1 text-right">10:14 AM</div>
              </div>
            </div>

            <div className="flex items-start gap-2 max-w-md ml-auto justify-end">
              <div className="bg-[#00a99d] text-white p-3 rounded-lg text-xs shadow-xs">
                Hello Sarah! Yes, you can use the code WELCOME20 on eligible digital catalog products as well!
                <div className="text-[9px] text-teal-100 mt-1 text-right flex items-center justify-end gap-1">
                  10:18 AM <CheckCheck className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 border-t border-gray-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your reply..."
              className="flex-1 text-xs px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-[#00a99d]"
            />
            <button className="px-4 py-2.5 bg-[#00a99d] hover:bg-[#008f85] text-white rounded text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer">
              <Send className="w-3.5 h-3.5" /> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
