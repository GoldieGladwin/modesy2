"use client";

import React, { useState } from "react";

interface BankTransferCardProps {
  initialInfo?: string;
  onSave: (info: string) => void;
}

export default function BankTransferCard({
  initialInfo = `Bank Name: Chase Bank\nAccount Name: Modesy Inc.\nAccount Number: 1234567890\nRouting Number: 987654321\nIBAN / SWIFT: CHASEUS33XXX`,
  onSave,
}: BankTransferCardProps) {
  const [bankInfo, setBankInfo] = useState(initialInfo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(bankInfo);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5 flex flex-col justify-between h-full space-y-4"
    >
      <div>
        <h2 className="text-sm font-bold text-gray-800 pb-2 border-b border-gray-100 mb-4">
          Bank Accounts
        </h2>

        <div className="space-y-1.5 text-xs text-gray-700">
          <label className="block font-semibold text-gray-700">
            Bank Accounts Information
          </label>
          <textarea
            rows={5}
            value={bankInfo}
            onChange={(e) => setBankInfo(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-[3px] p-2.5 text-xs text-gray-800 font-mono focus:outline-none focus:border-[#00a99d] transition resize-y"
          />
        </div>
      </div>

      <div className="flex justify-end pt-3 border-t border-gray-100">
        <button
          type="submit"
          className="bg-[#007bff] hover:bg-[#0069d9] text-white text-xs font-semibold px-4 py-1.5 rounded-[3px] shadow-xs transition cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
