'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Send, Trash2, Check } from 'lucide-react';
import ModesyHeader from '@/components/layout/guest/ModesyHeader';
import ModesyFooter from '@/components/layout/guest/ModesyFooter';

interface Message {
  id: string;
  sender: 'me' | 'other';
  text: string;
  time: string;
}

interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  product: string;
  time: string;
  messages: Message[];
}

const INITIAL_CHATS: ChatContact[] = [
  {
    id: 'chat-1',
    name: 'Admin',
    avatar: '/assets/img/admin-avatar.jpg',
    isOnline: false,
    product: 'Summer fashion top lace',
    time: '6 days ago',
    messages: [
      {
        id: 'msg-1',
        sender: 'other',
        text: 'Price',
        time: '6 days ago',
      },
    ],
  },
  {
    id: 'chat-2',
    name: 'Admin',
    avatar: '/assets/img/admin-avatar.jpg',
    isOnline: false,
    product: 'Black fashion women backpack',
    time: '15 days ago',
    messages: [
      {
        id: 'msg-2-1',
        sender: 'other',
        text: 'Hello, is this backpack available in black color?',
        time: '15 days ago',
      },
    ],
  },
  {
    id: 'chat-3',
    name: 'Admin',
    avatar: '/assets/img/admin-avatar.jpg',
    isOnline: false,
    product: 'Sun hat for women protection cap',
    time: '25 days ago',
    messages: [
      {
        id: 'msg-3-1',
        sender: 'other',
        text: 'Can this sun hat be folded for packing in luggage?',
        time: '25 days ago',
      },
    ],
  },
  {
    id: 'chat-4',
    name: 'Admin',
    avatar: '/assets/img/admin-avatar.jpg',
    isOnline: false,
    product: 'Videokonferenz am Donnerstag...',
    time: '1 month ago',
    messages: [
      {
        id: 'msg-4-1',
        sender: 'other',
        text: 'Videokonferenz am Donnerstag um 14:00 Uhr.',
        time: '1 month ago',
      },
    ],
  },
  {
    id: 'chat-5',
    name: 'Admin',
    avatar: '/assets/img/admin-avatar.jpg',
    isOnline: false,
    product: 'Black midi skirt with white flowers',
    time: '1 month ago',
    messages: [
      {
        id: 'msg-5-1',
        sender: 'other',
        text: 'Do you have size L available for this skirt?',
        time: '1 month ago',
      },
    ],
  },
  {
    id: 'chat-6',
    name: 'Admin',
    avatar: '/assets/img/admin-avatar.jpg',
    isOnline: false,
    product: 'Sun hat for women protection cap',
    time: '1 month ago',
    messages: [
      {
        id: 'msg-6-1',
        sender: 'other',
        text: 'What is the material composition of the protection cap?',
        time: '1 month ago',
      },
    ],
  },
  {
    id: 'chat-7',
    name: 'Admin',
    avatar: '/assets/img/admin-avatar.jpg',
    isOnline: false,
    product: 'Sun hat for women protection cap',
    time: '1 month ago',
    messages: [
      {
        id: 'msg-7-1',
        sender: 'other',
        text: 'Thank you for the quick shipping and response!',
        time: '1 month ago',
      },
    ],
  },
];

export default function VendorMessagesView() {
  const [chats, setChats] = useState<ChatContact[]>(INITIAL_CHATS);
  // Default to chat-1 or null to allow toggling
  const [activeChatId, setActiveChatId] = useState<string | null>('chat-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const activeChat = chats.find((c) => c.id === activeChatId) || null;

  const filteredChats = chats.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    if (!activeChat) {
      showToast('Please select a chat conversation first.');
      return;
    }

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      text: inputMessage.trim(),
      time: 'Just now',
    };

    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChat.id
          ? {
              ...c,
              messages: [...c.messages, newMessage],
              time: 'Just now',
            }
          : c
      )
    );

    setInputMessage('');
  };

  const handleDeleteChat = () => {
    if (!activeChat) return;
    const deletedName = activeChat.product;
    setChats((prev) => prev.filter((c) => c.id !== activeChat.id));
    setActiveChatId(null);
    showToast(`Conversation "${deletedName}" has been deleted.`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-800 antialiased">
      {/* 1. Header (Trendshop Profile) */}
      <ModesyHeader
        currentUser={{
          name: 'Trendshop',
          email: 'trendshop@gmail.com',
          avatar: '/assets/img/trendshop-avatar.jpg',
          role: 'vendor',
        }}
        cartCount={3}
      />

      {/* 2. Main Content */}
      <main className="flex-1 w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-6 text-gray-800">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 p-4 bg-emerald-600 text-white text-xs font-medium rounded shadow-lg flex items-center gap-2 animate-in slide-in-from-top-3 duration-200">
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Breadcrumb matching Screenshot: Home / Messages */}
        <nav className="text-[12px] text-gray-500 mb-4 flex items-center gap-1.5 font-normal">
          <Link href="/" className="hover:text-[#00a99d] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700">Messages</span>
        </nav>

        {/* 2-Column Messages Container matching Screenshot */}
        <div className="bg-white border border-[#e4e7ea] rounded-[4px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col md:flex-row h-[630px] overflow-hidden mb-12">
          {/* Left Panel: Profile + Search + Recent Chats List */}
          <div className="w-full md:w-[320px] lg:w-[340px] shrink-0 border-r border-[#e4e7ea] flex flex-col bg-white">
            {/* User Profile Header matching screenshot: Trendshop avatar + Trendshop name */}
            <div className="p-4 pb-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-100 relative bg-[#f5d76e]">
                <Image
                  src="/assets/img/trendshop-avatar.jpg"
                  alt="Trendshop"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="font-semibold text-[14px] text-[#222222] truncate">
                Trendshop
              </div>
            </div>

            {/* Search Input Box */}
            <div className="px-4 pb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-[3px] text-xs pl-3.5 pr-9 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#00a99d] transition-colors"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.8]" />
              </div>
            </div>

            {/* Recent Chats Section Heading */}
            <div className="px-4 pb-2">
              <span className="text-[11px] font-medium text-gray-400">
                Recent Chats
              </span>
            </div>

            {/* Chat Contact Items List matching screenshot */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
              {filteredChats.map((chat) => {
                const isSelected = chat.id === activeChatId;
                return (
                  <button
                    key={chat.id}
                    type="button"
                    onClick={() => setActiveChatId(chat.id)}
                    className={`w-full text-left px-4 py-3 cursor-pointer transition-colors flex items-start gap-3 ${
                      isSelected ? 'bg-[#f8f9fa]' : 'hover:bg-gray-50/70 bg-white'
                    }`}
                  >
                    {/* Circular Avatar */}
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 relative border border-gray-100 bg-[#f8f9fa]">
                      <Image
                        src={chat.avatar}
                        alt={chat.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>

                    {/* Chat Text Details */}
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="font-semibold text-[13px] text-gray-900 leading-tight">
                        {chat.name}
                      </div>
                      <div className="text-[12px] text-gray-600 truncate font-normal">
                        {chat.product}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {chat.time}
                      </div>
                    </div>
                  </button>
                );
              })}

              {filteredChats.length === 0 && (
                <div className="p-8 text-center text-xs text-gray-400">
                  No chats found.
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Chat Room Area */}
          <div className="flex-1 flex flex-col bg-white min-w-0">
            {activeChat ? (
              <>
                {/* Chat Top Header: Admin avatar + Admin name + Offline + Product Title + Trash Button */}
                <div className="p-4 border-b border-[#e4e7ea] flex items-center justify-between bg-white">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 relative border border-gray-100 bg-[#f8f9fa]">
                      <Image
                        src={activeChat.avatar}
                        alt={activeChat.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-900 truncate">
                          {activeChat.name}
                        </span>
                        <span className="text-[11px] text-gray-400 font-normal flex items-center gap-1">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400" />
                          Offline
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 truncate mt-0.5">
                        {activeChat.product}
                      </div>
                    </div>
                  </div>

                  {/* Delete Conversation Button matching Screenshot 2 */}
                  <button
                    type="button"
                    onClick={handleDeleteChat}
                    title="Delete Conversation"
                    className="w-8 h-8 rounded-[3px] bg-[#f8f9fa] hover:bg-red-50 text-gray-400 hover:text-red-500 border border-gray-200 transition-colors flex items-center justify-center cursor-pointer shadow-2xs"
                  >
                    <Trash2 className="w-3.5 h-3.5 stroke-[2]" />
                  </button>
                </div>

                {/* Chat Messages Body */}
                <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-white">
                  {activeChat.messages.map((msg) => {
                    if (msg.sender === 'me') {
                      return (
                        <div
                          key={msg.id}
                          className="flex flex-col items-end gap-1 w-full"
                        >
                          <div className="flex items-end gap-2 max-w-[80%] sm:max-w-[70%]">
                            <div className="bg-[#00a99d] text-white text-xs px-4 py-2.5 rounded-[4px] shadow-2xs leading-relaxed break-words">
                              {msg.text}
                            </div>
                            <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 relative border border-gray-200">
                              <Image
                                src="/assets/img/trendshop-avatar.jpg"
                                alt="Trendshop"
                                fill
                                sizes="28px"
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <span className="text-[10px] text-gray-400 pr-9">
                            {msg.time}
                          </span>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={msg.id}
                          className="flex flex-col items-start gap-1 w-full"
                        >
                          <div className="flex items-start gap-2.5 max-w-[80%] sm:max-w-[70%]">
                            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 relative border border-gray-100 bg-[#f8f9fa]">
                              <Image
                                src={activeChat.avatar}
                                alt={activeChat.name}
                                fill
                                sizes="32px"
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="bg-[#eef2f5] text-gray-800 text-xs px-4 py-2 rounded-[4px] leading-relaxed break-words">
                                {msg.text}
                              </div>
                              <span className="text-[10px] text-gray-400 block mt-1">
                                {msg.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </>
            ) : (
              /* Empty State matching Screenshot 1 */
              <div className="flex-1 flex items-center justify-center bg-white p-6">
                <div className="rounded-full bg-[#f0f2f5] px-6 py-2 text-xs text-gray-500 font-normal">
                  Select a chat to start messaging
                </div>
              </div>
            )}

            {/* Bottom Input Message Form matching Screenshot 1 & 2 */}
            <div className="p-3.5 border-t border-[#e4e7ea] bg-white">
              <form onSubmit={handleSendMessage} className="relative w-full">
                <input
                  type="text"
                  placeholder="Write a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="w-full bg-[#f8f9fa] border border-[#e4e7ea] rounded-[3px] text-xs pl-4 pr-11 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#00a99d] focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors cursor-pointer ${
                    inputMessage.trim()
                      ? 'text-[#00a99d] hover:text-[#008f85]'
                      : 'text-gray-300 pointer-events-none'
                  }`}
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4 stroke-[1.8]" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Footer */}
      <ModesyFooter />
    </div>
  );
}
