"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Send } from "lucide-react";

interface Message {
  id: string;
  sender: "admin" | "other";
  text: string;
  time: string;
}

interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  product: string;
  lastMessageSnippet: string;
  time: string;
  messages: Message[];
}

export default function AdminMessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [inputMessage, setInputMessage] = useState("");

  const initialChats: ChatContact[] = [
    {
      id: "peter-jone",
      name: "Peter Jone",
      avatar: "/images/peter-jone-avatar.jpg",
      isOnline: true,
      product: "Modern grey couch...",
      lastMessageSnippet: "Hi, is this modern grey couch still available?",
      time: "10 mins ago",
      messages: [
        {
          id: "m1",
          sender: "other",
          text: "Hi, is this modern grey couch still available?",
          time: "15 mins ago",
        },
        {
          id: "m2",
          sender: "admin",
          text: "Hello Peter! Yes, it's still available and ready for delivery.",
          time: "10 mins ago",
        },
      ],
    },
    {
      id: "trendshop-1",
      name: "Trendshop",
      avatar: "/images/trendshop-avatar.jpg",
      isOnline: false,
      product: "Black midi skirt with white flowers",
      lastMessageSnippet: "Black midi skirt with white flowers",
      time: "1 month ago",
      messages: [
        {
          id: "ts-m1",
          sender: "admin",
          text: "hi",
          time: "1 month ago",
        },
      ],
    },
    {
      id: "trendshop-2",
      name: "Trendshop",
      avatar: "/images/trendshop-avatar.jpg",
      isOnline: false,
      product: "Summer fashion top lace",
      lastMessageSnippet: "Summer fashion top lace",
      time: "1 day ago",
      messages: [
        {
          id: "ts2-m1",
          sender: "other",
          text: "Hello! We have restocked the Summer fashion top lace in all sizes.",
          time: "1 day ago",
        },
      ],
    },
    {
      id: "trendshop-3",
      name: "Trendshop",
      avatar: "/images/trendshop-avatar.jpg",
      isOnline: false,
      product: "Black fashion women backpack",
      lastMessageSnippet: "Black fashion women backpack",
      time: "11 days ago",
      messages: [
        {
          id: "ts3-m1",
          sender: "admin",
          text: "Is the black fashion backpack made of waterproof leather?",
          time: "11 days ago",
        },
        {
          id: "ts3-m2",
          sender: "other",
          text: "Yes, it is high-grade water-resistant vegan leather.",
          time: "11 days ago",
        },
      ],
    },
    {
      id: "trendshop-4",
      name: "Trendshop",
      avatar: "/images/trendshop-avatar.jpg",
      isOnline: false,
      product: "Sun hat for women protection cap",
      lastMessageSnippet: "Sun hat for women protection cap",
      time: "21 days ago",
      messages: [
        {
          id: "ts4-m1",
          sender: "other",
          text: "New UV protection sun hats have arrived for summer season.",
          time: "21 days ago",
        },
      ],
    },
    {
      id: "trendshop-5",
      name: "Trendshop",
      avatar: "/images/trendshop-avatar.jpg",
      isOnline: false,
      product: "Videokonferenz am Donnerstag ...",
      lastMessageSnippet: "Videokonferenz am Donnerstag ...",
      time: "27 days ago",
      messages: [
        {
          id: "ts5-m1",
          sender: "other",
          text: "Videokonferenz am Donnerstag um 14:00 Uhr bestätigt.",
          time: "27 days ago",
        },
      ],
    },
    {
      id: "trendshop-6",
      name: "Trendshop",
      avatar: "/images/trendshop-avatar.jpg",
      isOnline: false,
      product: "Sun hat for women protection cap",
      lastMessageSnippet: "Sun hat for women protection cap",
      time: "1 month ago",
      messages: [
        {
          id: "ts6-m1",
          sender: "admin",
          text: "Thank you for the fast shipping!",
          time: "1 month ago",
        },
      ],
    },
  ];

  const [chats, setChats] = useState<ChatContact[]>(initialChats);
  const [activeChatId, setActiveChatId] = useState<string>("peter-jone");

  const activeChat =
    chats.find((c) => c.id === activeChatId) || chats[0];

  const filteredChats = chats.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessageSnippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: "m-" + Date.now(),
      sender: "admin",
      text: inputMessage.trim(),
      time: "Just now",
    };

    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChat.id
          ? {
              ...c,
              messages: [...c.messages, newMessage],
              lastMessageSnippet: newMessage.text,
              time: "Just now",
            }
          : c
      )
    );

    setInputMessage("");
  };

  // Nebula Admin Avatar Circle matching Modesy Admin
  const renderAdminAvatar = (sizeClass = "w-11 h-11") => (
    <div
      className={`${sizeClass} rounded-full overflow-hidden shrink-0 shadow-xs ring-1 ring-black/10 relative flex items-center justify-center bg-slate-900`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-700 via-purple-600 to-pink-500 opacity-90" />
      <div className="absolute w-5 h-5 rounded-full bg-cyan-300/50 blur-[2px] -top-0.5 -left-0.5" />
      <div className="absolute w-5 h-5 rounded-full bg-pink-400/50 blur-[2px] bottom-0 right-0" />
      <div className="absolute w-3 h-3 rounded-full bg-amber-300/60 blur-[1px] top-1 right-1" />
    </div>
  );

  return (
    <div className="w-full py-4 sm:py-6 font-sans text-gray-800">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <nav className="text-[13px] text-gray-500 mb-4 flex items-center gap-1.5 font-normal">
          <Link href="/admin" className="hover:text-gray-800 transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500">Messages</span>
        </nav>

        {/* 2-Column Chat Box Interface (WhatsApp Web style) */}
        <div className="bg-white border border-[#e4e7ea] rounded-md shadow-[0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col md:flex-row h-[630px]">
          {/* Kolom Kiri: Daftar Chat */}
          <div className="w-full md:w-[320px] lg:w-[340px] shrink-0 border-r border-[#e4e7ea] flex flex-col bg-white">
            {/* Profil Admin */}
            <div className="p-4 pb-3 flex items-center gap-3">
              {renderAdminAvatar("w-11 h-11")}
              <span className="font-semibold text-[15px] text-gray-800">
                Admin
              </span>
            </div>

            {/* Kotak Search */}
            <div className="px-4 pb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-[#e4e7ea] rounded-md text-[13px] pl-3.5 pr-9 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.75]" />
              </div>
            </div>

            {/* Section Recent Chats */}
            <div className="px-4 pt-1 pb-2">
              <h2 className="text-[13px] font-semibold text-gray-500">
                Recent Chats
              </h2>
            </div>

            {/* Daftar Obrolan (Scrollable) */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-100/50">
              {filteredChats.map((chat) => {
                const isSelected = chat.id === activeChat.id;
                return (
                  <button
                    key={chat.id}
                    type="button"
                    onClick={() => setActiveChatId(chat.id)}
                    className={`w-full text-left px-4 py-3 cursor-pointer transition-colors flex items-start gap-3 ${
                      isSelected
                        ? "bg-[#f1f5f9]/70"
                        : "hover:bg-gray-50 bg-white"
                    }`}
                  >
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-11 h-11 rounded-full object-cover shrink-0 border border-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[13px] font-semibold text-gray-800 truncate">
                          {chat.name}
                        </span>
                      </div>
                      <p className="text-[12px] text-gray-500 truncate mt-0.5">
                        {chat.lastMessageSnippet}
                      </p>
                      <span className="text-[11px] text-gray-400 block mt-0.5">
                        {chat.time}
                      </span>
                    </div>
                  </button>
                );
              })}

              {filteredChats.length === 0 && (
                <div className="p-6 text-center text-xs text-gray-400">
                  No conversations found
                </div>
              )}
            </div>
          </div>

          {/* Kolom Kanan: Area Chat */}
          <div className="flex-1 flex flex-col bg-white min-w-0">
            {/* Header Chat */}
            <div className="p-4 border-b border-[#e4e7ea] flex items-center justify-between bg-white">
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={activeChat.avatar}
                  alt={activeChat.name}
                  className="w-11 h-11 rounded-full object-cover shrink-0 border border-gray-100"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[14px] font-semibold text-gray-900 truncate">
                      {activeChat.name}
                    </h3>
                    <span className="flex items-center gap-1 text-[11px] text-gray-500 font-normal">
                      <span
                        className={`w-2 h-2 rounded-full inline-block ${
                          activeChat.isOnline ? "bg-emerald-500" : "bg-gray-400"
                        }`}
                      />
                      {activeChat.isOnline ? "Online" : "Offline"}
                    </span>
                  </div>
                  {activeChat.product && (
                    <p className="text-[12px] text-gray-600 hover:text-teal-600 transition-colors truncate cursor-pointer mt-0.5">
                      {activeChat.product}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Gelembung Pesan (Chat Bubbles) */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-white flex flex-col justify-end">
              {activeChat.messages.map((msg) => {
                if (msg.sender === "admin") {
                  // Outgoing bubble (biru di kanan dengan avatar admin di sebelah kanan)
                  return (
                    <div
                      key={msg.id}
                      className="flex flex-col items-end gap-1 w-full"
                    >
                      <div className="flex items-end gap-2 max-w-[80%] sm:max-w-[70%]">
                        <div className="bg-[#007bff] text-white text-[13px] px-3.5 py-2 rounded-lg shadow-2xs leading-relaxed break-words">
                          {msg.text}
                        </div>
                        {renderAdminAvatar("w-7 h-7")}
                      </div>
                      <span className="text-[11px] text-gray-400 pr-9">
                        {msg.time}
                      </span>
                    </div>
                  );
                } else {
                  // Incoming bubble (balon putih di kiri dengan avatar lawan bicara di sebelah kiri)
                  return (
                    <div
                      key={msg.id}
                      className="flex flex-col items-start gap-1 w-full"
                    >
                      <div className="flex items-end gap-2 max-w-[80%] sm:max-w-[70%]">
                        <img
                          src={activeChat.avatar}
                          alt={activeChat.name}
                          className="w-7 h-7 rounded-full object-cover shrink-0 border border-gray-100"
                        />
                        <div className="bg-white border border-[#e4e7ea] text-gray-800 text-[13px] px-3.5 py-2 rounded-lg shadow-2xs leading-relaxed break-words">
                          {msg.text}
                        </div>
                      </div>
                      <span className="text-[11px] text-gray-400 pl-9">
                        {msg.time}
                      </span>
                    </div>
                  );
                }
              })}
            </div>

            {/* Kotak Input Pesan dengan Ikon Send di Paling Bawah */}
            <div className="p-4 border-t border-[#e4e7ea] bg-white">
              <form onSubmit={handleSendMessage} className="relative w-full">
                <input
                  type="text"
                  placeholder="Write a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="w-full bg-[#f8f9fa] border border-[#e4e7ea] rounded-md text-[13px] pl-4 pr-10 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors cursor-pointer ${
                    inputMessage.trim()
                      ? "text-blue-600 hover:text-blue-700"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4 stroke-[1.75]" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
