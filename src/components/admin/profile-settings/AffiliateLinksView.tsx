"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { AffiliateLinkItem } from "./types";
import { initialAffiliateLinks } from "./mockData";

export const AffiliateLinksView: React.FC = () => {
  const [links, setLinks] = useState<AffiliateLinkItem[]>(initialAffiliateLinks);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this affiliate link?")) {
      setLinks((prev) => prev.filter((l) => l.id !== id));
      showToast("Affiliate link deleted successfully!");
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast("Affiliate link copied to clipboard!");
  };

  return (
    <div className="w-full">
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-[#00a99d] text-white px-5 py-3 rounded-[3px] shadow-lg text-[14px]">
          <Check className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="overflow-x-auto border border-[#f1f3f5] rounded-[3px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#f1f3f5]">
              <th className="py-3 px-4 text-[13px] font-bold text-[#222222] w-1/3">
                Product
              </th>
              <th className="py-3 px-4 text-[13px] font-bold text-[#222222] w-1/2">
                Affiliate Link
              </th>
              <th className="py-3 px-4 text-[13px] font-bold text-[#222222] w-1/6">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f3f5]">
            {links.length > 0 ? (
              links.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-4 text-[13px] text-[#495057] align-top">
                    {item.productTitle}
                  </td>
                  <td className="py-4 px-4 text-[13px] text-[#495057] align-top">
                    <div className="flex items-center gap-2">
                      <span className="break-all">{item.affiliateUrl}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyLink(item.affiliateUrl)}
                        title="Copy Affiliate Link"
                        className="text-gray-400 hover:text-[#00a99d] transition-colors shrink-0 cursor-pointer p-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[13px] text-[#495057] align-top">
                    <div>{item.date}</div>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="text-[#dc3545] hover:underline text-[13px] mt-1 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="py-8 text-center text-gray-500 text-[13px]"
                >
                  No affiliate links found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
