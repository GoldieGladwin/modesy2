"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  ChevronDown,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  Send,
  MessageCircle,
} from "lucide-react";
import { ChatMessageItem } from "./types";
import {
  getStoredChatMessages,
  deleteStoredChatMessage,
  saveStoredChatMessages,
} from "./chatMessagesData";

export default function ChatMessagesTable() {
  const [chats, setChats] = useState<ChatMessageItem[]>([]);
  const [pageSize, setPageSize] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Search filter
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<string>("");

  // Modal states
  const [selectedChat, setSelectedChat] = useState<ChatMessageItem | null>(null);
  const [replyMessage, setReplyMessage] = useState<string>("");
  const [deleteTarget, setDeleteTarget] = useState<ChatMessageItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setChats(getStoredChatMessages());
  }, []);

  const triggerToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSearch(searchKeyword.trim());
    setCurrentPage(1);
  };

  const filteredChats = useMemo(() => {
    if (!appliedSearch) return chats;
    const q = appliedSearch.toLowerCase();
    return chats.filter(
      (c) =>
        c.subject.toLowerCase().includes(q) ||
        c.product.toLowerCase().includes(q) ||
        c.sender.toLowerCase().includes(q) ||
        c.receiver.toLowerCase().includes(q) ||
        c.id.toString().includes(q) ||
        c.date.toLowerCase().includes(q) ||
        c.updated.toLowerCase().includes(q)
    );
  }, [chats, appliedSearch]);

  const totalPages = Math.ceil(filteredChats.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const displayedChats = filteredChats.slice(
    startIndex,
    startIndex + pageSize
  );

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const updated = deleteStoredChatMessage(deleteTarget.id);
    setChats(updated);
    triggerToast(`Chat thread #${deleteTarget.id} deleted successfully!`);
    setDeleteTarget(null);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChat || !replyMessage.trim()) return;

    const now = new Date();
    const formatted = `${now.toISOString().split("T")[0]} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newReply = {
      sender: "Admin",
      message: replyMessage.trim(),
      date: formatted,
      isAdmin: true,
    };

    const currentMessages = selectedChat.messages || [];
    const updatedChat: ChatMessageItem = {
      ...selectedChat,
      updated: "Just now",
      messages: [...currentMessages, newReply],
    };

    const allChats = getStoredChatMessages();
    const idx = allChats.findIndex((c) => c.id === selectedChat.id);
    if (idx >= 0) {
      allChats[idx] = updatedChat;
      saveStoredChatMessages(allChats);
      setChats(allChats);
      setSelectedChat(updatedChat);
      setReplyMessage("");
      triggerToast("Reply sent successfully!");
    }
  };

  return (
    <div className="bg-white border border-[#d2d6de]/60 rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] p-5 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-[3px] shadow-lg text-white text-xs font-medium bg-[#00a65a] animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-[3px] shadow-xl max-w-sm w-full p-5 border border-gray-200">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-[15px] font-semibold text-gray-800">
                Delete Chat Thread
              </h3>
            </div>
            <p className="text-xs text-gray-600 mb-5 leading-relaxed">
              Are you sure you want to delete chat thread{" "}
              <strong>"#{deleteTarget.id} {deleteTarget.subject}"</strong>?
            </p>
            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-3.5 py-1.5 text-xs text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-[3px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-3.5 py-1.5 text-xs text-white bg-[#dd4b39] hover:bg-[#c23321] rounded-[3px] font-medium cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MESSAGES MODAL POPUP (Exact Layout from User Screenshot) */}
      {selectedChat && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedChat(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[0.5px] p-4 animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-[3px] shadow-2xl max-w-2xl w-full border border-gray-300 flex flex-col overflow-hidden animate-in zoom-in-95 duration-100">
            {/* Modal Header: "#{id} {subject}" with '×' */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e5e5e5]">
              <h3 className="text-[15px] font-semibold text-[#333333]">
                #{selectedChat.id} {selectedChat.subject}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedChat(null)}
                className="text-[#999999] hover:text-[#333333] text-[22px] font-light leading-none p-1 cursor-pointer transition-colors"
                title="Close"
              >
                &times;
              </button>
            </div>

            {/* Modal Body: Clean white area matching user's screenshot */}
            <div className="p-6 min-h-[140px] text-[13px] text-[#444444] bg-white overflow-y-auto max-h-[50vh]">
              {selectedChat.messages && selectedChat.messages.length > 0 ? (
                <div className="space-y-3">
                  {selectedChat.messages.map((m, idx) => (
                    <div
                      key={idx}
                      className="pb-3 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span className="font-semibold text-gray-800">
                          {m.sender}
                        </span>
                        <span>{m.date}</span>
                      </div>
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {m.message}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Modal Footer: 'Close' button at bottom right (Matches Screenshot) */}
            <div className="px-5 py-3 border-t border-[#e5e5e5] bg-white flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedChat(null)}
                className="px-4 py-1.5 bg-[#f4f4f4] hover:bg-[#e9e9e9] border border-[#d2d6de] text-[#444444] text-[13px] rounded-[3px] cursor-pointer transition-colors font-normal shadow-2xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER: Title (Matches Screenshot 1) */}
      <h1 className="text-[18px] font-normal text-[#333333] mb-4">
        Chat Messages
      </h1>

      {/* FILTER ROW: Show & Search + Filter Button (Matches Screenshot 1) */}
      <form onSubmit={handleFilter} className="flex items-end gap-3 mb-5">
        {/* Show */}
        <div>
          <label className="block text-[12.5px] text-[#555555] mb-1">
            Show
          </label>
          <div className="relative">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-1.5 rounded-[3px] appearance-none pr-8 focus:outline-none focus:border-[#0073b7] min-w-[70px]"
            >
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={60}>60</option>
              <option value={100}>100</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Search */}
        <div>
          <label className="block text-[12.5px] text-[#555555] mb-1">
            Search
          </label>
          <input
            type="text"
            placeholder="Search"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-1.5 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-[#0073b7] min-w-[150px]"
          />
        </div>

        {/* Purple 'Filter' Button (Matches Screenshot 1) */}
        <div>
          <button
            type="submit"
            className="px-4 py-1.5 bg-[#605ca8] hover:bg-[#545096] text-white text-[13px] rounded-[3px] font-normal transition-colors cursor-pointer shadow-2xs"
          >
            Filter
          </button>
        </div>
      </form>

      {/* TABLE (Matches Screenshot 1 Columns and Styling) */}
      <div className="overflow-x-auto border-t border-gray-100">
        <table className="w-full text-left text-[13px] text-[#333333]">
          <thead>
            <tr className="border-b border-[#f4f4f4] text-[#444] font-semibold text-[13px]">
              <th className="py-2.5 px-3 w-12">Id</th>
              <th className="py-2.5 px-3 min-w-[200px]">Subject</th>
              <th className="py-2.5 px-3 min-w-[200px]">Product</th>
              <th className="py-2.5 px-3 w-32">Sender</th>
              <th className="py-2.5 px-3 w-32">Receiver</th>
              <th className="py-2.5 px-3 w-32">Updated</th>
              <th className="py-2.5 px-3 w-40">Date</th>
              <th className="py-2.5 px-3 w-32 text-right sm:text-left">Options</th>
            </tr>
          </thead>
          <tbody>
            {displayedChats.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-6 text-center text-[13px] text-[#555] bg-[#f9f9f9]"
                >
                  No records found!
                </td>
              </tr>
            ) : (
              displayedChats.map((chat) => (
                <tr
                  key={chat.id}
                  className="border-b border-[#f4f4f4] hover:bg-[#fcfcfc] transition-colors"
                >
                  <td className="py-3 px-3 text-[#555] font-normal">
                    {chat.id}
                  </td>
                  <td className="py-3 px-3 text-[#333] font-normal">
                    {chat.subject}
                  </td>
                  <td className="py-3 px-3 text-[#555] font-normal">
                    {chat.product || ""}
                  </td>
                  <td className="py-3 px-3 text-[#555] font-normal">
                    {chat.sender}
                  </td>
                  <td className="py-3 px-3 text-[#555] font-normal">
                    {chat.receiver}
                  </td>
                  <td className="py-3 px-3 text-[#555] text-xs">
                    {chat.updated}
                  </td>
                  <td className="py-3 px-3 text-[#555] text-xs">
                    {chat.date}
                  </td>
                  <td className="py-3 px-3 text-right sm:text-left">
                    <div className="inline-flex items-center -space-x-px">
                      {/* Messages Button (Opens modal in Screenshot 2) */}
                      <button
                        type="button"
                        onClick={() => setSelectedChat(chat)}
                        className="px-3 py-1 bg-white border border-[#d2d6de] hover:bg-gray-50 text-[12px] text-[#555] rounded-l-[3px] transition-colors cursor-pointer shadow-2xs font-normal"
                      >
                        Messages
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(chat)}
                        className="p-1.5 bg-white border border-[#d2d6de] hover:border-red-400 text-gray-500 hover:text-red-600 rounded-r-[3px] transition-colors cursor-pointer shadow-2xs"
                        title="Delete Chat Thread"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION (Bottom Right) */}
      <div className="mt-4 flex justify-end">
        <div className="inline-flex items-center -space-x-px select-none">
          <button
            type="button"
            disabled={currentPage <= 1 || displayedChats.length === 0}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1.5 text-[12px] border border-[#ddd] bg-white text-[#777] rounded-l-[3px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors cursor-pointer"
          >
            &lt;
          </button>
          <button
            type="button"
            disabled={
              currentPage >= totalPages || displayedChats.length === 0
            }
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-3 py-1.5 text-[12px] border border-[#ddd] bg-white text-[#777] rounded-r-[3px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors cursor-pointer"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
