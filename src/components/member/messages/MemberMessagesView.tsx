"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, Send, Trash2, X, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface MessageEntry {
  id: string;
  sender: "Peter Jone" | "Admin";
  text: string;
  timestamp: string;
}

interface ChatConversation {
  id: string;
  partnerName: string;
  partnerAvatar: string;
  partnerStatus: "Online" | "Offline";
  productTitle: string;
  productLink: string;
  lastUpdated: string;
  messages: MessageEntry[];
}

export default function MemberMessagesView() {
  const { user } = useAuth();
  const displayName = user?.name || "Peter Jone";
  const displayAvatar = user?.avatar || "/images/peter-jone-avatar.jpg";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChatId, setActiveChatId] = useState<string>("chat-1");
  const [inputMessage, setInputMessage] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial Conversations matching Screenshot
  const [conversations, setConversations] = useState<ChatConversation[]>([
    {
      id: "chat-1",
      partnerName: "Admin",
      partnerAvatar: "/assets/img/admin-avatar.jpg",
      partnerStatus: "Offline",
      productTitle: "Modern grey couch and pillows",
      productLink: "/guest/category/home-living",
      lastUpdated: "4 days ago",
      messages: [
        {
          id: "m-1",
          sender: "Peter Jone",
          text: "Available?",
          timestamp: "1 month ago",
        },
        {
          id: "m-2",
          sender: "Admin",
          text: "Sold out.",
          timestamp: "1 month ago",
        },
        {
          id: "m-3",
          sender: "Admin",
          text: "Ok",
          timestamp: "5 days ago",
        },
        {
          id: "m-4",
          sender: "Admin",
          text: "yee",
          timestamp: "4 days ago",
        },
        {
          id: "m-5",
          sender: "Peter Jone",
          text: "tes",
          timestamp: "4 days ago",
        },
        {
          id: "m-6",
          sender: "Admin",
          text: "hh",
          timestamp: "4 days ago",
        },
      ],
    },
    {
      id: "chat-2",
      partnerName: "Admin",
      partnerAvatar: "/assets/img/admin-avatar.jpg",
      partnerStatus: "Offline",
      productTitle: "Adorable animals photo pack",
      productLink: "/guest/category/clothing",
      lastUpdated: "21 days ago",
      messages: [
        {
          id: "m-7",
          sender: "Peter Jone",
          text: "Hi Admin, I have a question about the license for the digital animal photo pack.",
          timestamp: "21 days ago",
        },
        {
          id: "m-8",
          sender: "Admin",
          text: "Hello Peter! It includes personal and commercial usage rights.",
          timestamp: "21 days ago",
        },
      ],
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter conversations according to search query
  const filteredConversations = conversations.filter((chat) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const matchPartner = chat.partnerName.toLowerCase().includes(q);
    const matchProduct = chat.productTitle.toLowerCase().includes(q);
    const matchMessage = chat.messages.some((m) =>
      m.text.toLowerCase().includes(q)
    );
    return matchPartner || matchProduct || matchMessage;
  });

  const activeChat =
    filteredConversations.find((c) => c.id === activeChatId) ||
    filteredConversations[0] ||
    null;

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeChat) return;

    const newMsg: MessageEntry = {
      id: `m-${Date.now()}`,
      sender: "Peter Jone",
      text: inputMessage.trim(),
      timestamp: "Just Now",
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeChat.id
          ? {
              ...c,
              lastUpdated: "Just Now",
              messages: [...c.messages, newMsg],
            }
          : c
      )
    );

    setInputMessage("");

    // Simulated response after 1.2 seconds
    setTimeout(() => {
      const autoReply: MessageEntry = {
        id: `m-${Date.now() + 1}`,
        sender: "Admin",
        text: "Thanks for your message! We will get back to you shortly.",
        timestamp: "Just Now",
      };
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeChat.id
            ? {
                ...c,
                messages: [...c.messages, autoReply],
              }
            : c
        )
      );
    }, 1200);
  };

  const handleConfirmDelete = () => {
    if (!activeChat) return;
    const remaining = conversations.filter((c) => c.id !== activeChat.id);
    setConversations(remaining);
    setDeleteModalOpen(false);
    showToast("Conversation deleted successfully.");
    if (remaining.length > 0) {
      setActiveChatId(remaining[0].id);
    }
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-[calc(100vh-280px)] py-8 font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#00a99d] text-white px-4 py-3 rounded-[3px] shadow-lg flex items-center gap-2.5 text-xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SweetAlert style Delete Confirmation Modal */}
      {deleteModalOpen && activeChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[4px] shadow-2xl p-7 max-w-[420px] w-full text-center transform transition-all animate-in zoom-in-95 duration-150">
            {/* Warning Circle Icon */}
            <div className="w-[72px] h-[72px] rounded-full border-4 border-[#facea8] flex items-center justify-center mx-auto mb-5">
              <svg
                width="32"
                height="46"
                viewBox="0 0 32 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="16"
                  y1="8"
                  x2="16"
                  y2="28"
                  stroke="#f8bb86"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <circle cx="16" cy="38" r="2.2" fill="#f8bb86" />
              </svg>
            </div>

            {/* Warning Message */}
            <p className="text-[16px] sm:text-[17px] text-[#545454] font-normal leading-normal mb-7">
              Are you sure you want to delete this conversation?
            </p>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-[14px] font-medium rounded-[3px] transition-colors cursor-pointer border-0"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-8 py-2.5 bg-[#00a99d] hover:bg-[#008f85] text-white text-[14px] font-medium rounded-[3px] transition-colors cursor-pointer border-0 outline-none focus:ring-2 focus:ring-[#00a99d]/30"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1320px] mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-[13px] text-gray-500 mb-6 flex items-center gap-1.5 font-normal">
          <Link href="/member" className="hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700">Messages</span>
        </nav>

        {/* Main Chat Box matching Screenshot */}
        <div className="bg-white border border-[#ebebeb] rounded-sm shadow-[0_1px_3px_rgba(0,0,0,0.03)] grid grid-cols-1 md:grid-cols-12 min-h-[580px] overflow-hidden">
          {/* LEFT SIDEBAR: User Info, Search & Recent Chats */}
          <div className="md:col-span-4 lg:col-span-3 border-b md:border-b-0 md:border-r border-[#ebebeb] p-5 flex flex-col bg-white">
            {/* User Profile Header */}
            <div className="flex items-center gap-3 pb-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 border border-gray-100">
                  <img
                    src={displayAvatar}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Green online dot */}
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#3ecf8e] ring-2 ring-white"></span>
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-gray-900 leading-tight">
                  {displayName}
                </h3>
              </div>
            </div>

            {/* Search Input with Search Icon */}
            <div className="relative my-3">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-[2px] pl-3.5 pr-9 py-2 text-xs text-gray-800 placeholder-gray-400 focus:border-[#00a99d] focus:outline-none transition bg-white"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer bg-transparent border-0 p-0"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              )}
            </div>

            {/* Recent Chats Section Header */}
            <div className="text-[12px] text-gray-400 font-medium my-2">
              Recent Chats
            </div>

            {/* Conversations List */}
            <div className="space-y-1.5 flex-1 overflow-y-auto max-h-[420px]">
              {filteredConversations.length === 0 ? (
                <div className="py-8 text-center text-xs text-gray-400">
                  No chats found for &ldquo;{searchQuery}&rdquo;
                </div>
              ) : (
                filteredConversations.map((chat) => {
                  const isSelected = activeChat?.id === chat.id;
                  return (
                    <div
                      key={chat.id}
                      onClick={() => setActiveChatId(chat.id)}
                      className={`flex items-start gap-3 p-2.5 rounded-[2px] transition cursor-pointer ${
                        isSelected
                          ? "bg-[#f1f3f5]"
                          : "hover:bg-gray-50 bg-white"
                      }`}
                    >
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-100 mt-0.5">
                        <img
                          src={chat.partnerAvatar}
                          alt={chat.partnerName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-bold text-gray-900 leading-snug">
                          {chat.partnerName}
                        </div>
                        <div className="text-[12px] text-gray-500 truncate mt-0.5 leading-snug">
                          {chat.productTitle}
                        </div>
                        <div className="text-[11px] text-gray-400 mt-0.5">
                          {chat.lastUpdated}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT PANEL: Chat Conversation Area */}
          <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-between bg-white">
            {activeChat ? (
              <>
                {/* Header */}
                <div className="px-6 py-4 border-b border-[#ebebeb] flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-full overflow-hidden shrink-0 border border-gray-100">
                      <img
                        src={activeChat.partnerAvatar}
                        alt={activeChat.partnerName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-[14px] font-bold text-gray-900 leading-tight">
                          {activeChat.partnerName}
                        </h2>
                        <span className="flex items-center gap-1 text-[11px] text-gray-500">
                          <span className="w-2 h-2 rounded-full bg-gray-300 inline-block"></span>
                          Offline
                        </span>
                      </div>
                      <Link
                        href={activeChat.productLink}
                        className="text-xs text-gray-700 underline hover:text-[#00a99d] transition-colors mt-0.5 block"
                      >
                        {activeChat.productTitle}
                      </Link>
                    </div>
                  </div>

                  {/* Delete Conversation Button */}
                  <button
                    type="button"
                    onClick={() => setDeleteModalOpen(true)}
                    className="p-2 bg-[#f8f9fa] hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-[2px] transition cursor-pointer border-0"
                    title="Delete conversation"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Messages Thread */}
                <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[460px] min-h-[380px] bg-white">
                  {activeChat.messages.map((msg) => {
                    const isMe = msg.sender === "Peter Jone";

                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${
                          isMe ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`flex items-end gap-2.5 max-w-[85%] sm:max-w-[70%] ${
                            isMe ? "flex-row-reverse" : "flex-row"
                          }`}
                        >
                          {/* Avatar */}
                          <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-gray-100">
                            <img
                              src={
                                isMe
                                  ? "/images/peter-jone-avatar.jpg"
                                  : activeChat.partnerAvatar
                              }
                              alt={msg.sender}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Message Bubble */}
                          <div
                            className={`rounded-[3px] px-3.5 py-2 text-xs font-normal leading-relaxed ${
                              isMe
                                ? "bg-[#3b82f6] text-white"
                                : "bg-[#f1f3f5] text-gray-800"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>

                        {/* Timestamp */}
                        <div
                          className={`text-[10px] text-gray-400 mt-1 ${
                            isMe ? "pr-9" : "pl-9"
                          }`}
                        >
                          {msg.timestamp}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Bottom Message Input Box */}
                <div className="p-4 border-t border-[#ebebeb] bg-white">
                  <form
                    onSubmit={handleSendMessage}
                    className="relative flex items-center"
                  >
                    <input
                      type="text"
                      placeholder="Write a message..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      className="w-full bg-[#f8f9fa] border border-gray-200 rounded-[2px] pl-4 pr-12 py-3 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d] transition"
                    />
                    <button
                      type="submit"
                      disabled={!inputMessage.trim()}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00a99d] disabled:text-gray-300 transition cursor-pointer bg-transparent border-0 p-1"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-sm text-gray-400 py-24 px-4 text-center">
                <Search className="w-10 h-10 text-gray-300 mb-3 stroke-[1.5]" />
                <p className="font-semibold text-gray-600 text-sm">No conversations found</p>
                <p className="text-xs text-gray-400 mt-1">
                  {searchQuery ? `No chats match "${searchQuery}"` : "Select a conversation to start chatting"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
