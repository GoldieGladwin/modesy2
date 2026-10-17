"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, Send, User, Trash2, CheckCircle2 } from "lucide-react";

interface MessageItem {
  id: string;
  sender: string;
  avatar?: string;
  subject: string;
  date: string;
  messages: {
    id: string;
    sender: string;
    text: string;
    time: string;
    isMe: boolean;
  }[];
}

export default function ModeratorMessagesPage() {
  const [conversations, setConversations] = useState<MessageItem[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const activeConversation = conversations.find((c) => c.id === selectedConversationId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeConversation) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: "Roger Novak",
      text: replyText.trim(),
      time: "Just now",
      isMe: true,
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversation.id
          ? { ...c, messages: [...c.messages, newMessage] }
          : c
      )
    );
    setReplyText("");
    showToast("Message sent successfully!");
  };

  return (
    <div className="bg-white min-h-[600px] w-full font-sans text-gray-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#00a99d] text-white px-4 py-3 rounded-[3px] shadow-lg flex items-center gap-2.5 text-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-[1320px] mx-auto px-4 py-6">
        {/* Breadcrumb matching Screenshot 1:1 */}
        <nav className="text-[13px] text-[#777777] mb-6 flex items-center gap-1.5">
          <Link
            href="/moderator"
            className="text-[#666666] hover:text-[#00a99d] transition-colors"
          >
            Home
          </Link>
          <span className="text-[#999999]">/</span>
          <span className="text-[#333333] font-normal">Messages</span>
        </nav>

        {/* Empty State matching Screenshot 1:1 */}
        {conversations.length === 0 ? (
          <div className="py-24 text-center text-[#777777] text-[14px]">
            No messages found!
          </div>
        ) : (
          /* Conversation Inbox when messages exist */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white border border-[#e5e5e5] rounded-[4px] overflow-hidden min-h-[480px]">
            {/* Conversation List */}
            <div className="md:col-span-4 border-r border-[#e5e5e5] divide-y divide-[#f0f0f0]">
              <div className="p-4 bg-[#f8f9fa] border-b border-[#e5e5e5] font-bold text-[14px] text-gray-800">
                Inbox
              </div>
              {conversations.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedConversationId(c.id)}
                  className={`p-4 cursor-pointer transition ${
                    selectedConversationId === c.id
                      ? "bg-teal-50/50 border-l-4 border-[#00a99d]"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-900 text-xs">
                      {c.sender}
                    </span>
                    <span className="text-[11px] text-gray-400">{c.date}</span>
                  </div>
                  <p className="text-xs text-gray-600 truncate">{c.subject}</p>
                </div>
              ))}
            </div>

            {/* Chat Box Area */}
            <div className="md:col-span-8 flex flex-col justify-between p-6">
              {activeConversation ? (
                <>
                  <div className="border-b border-gray-100 pb-3 mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">
                        {activeConversation.subject}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Conversation with {activeConversation.sender}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 flex-1 overflow-y-auto mb-4 max-h-[360px]">
                    {activeConversation.messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex flex-col ${
                          m.isMe ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`max-w-[75%] rounded-[4px] px-3.5 py-2 text-xs ${
                            m.isMe
                              ? "bg-[#00a99d] text-white"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p>{m.text}</p>
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1">
                          {m.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write your message..."
                      className="flex-1 border border-gray-300 rounded-[3px] px-3.5 py-2 text-xs focus:outline-none focus:border-[#00a99d]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-[3px] transition flex items-center gap-1 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400 text-xs">
                  Select a conversation to read
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
