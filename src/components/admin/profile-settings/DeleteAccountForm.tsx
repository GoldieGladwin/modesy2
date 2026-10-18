"use client";

import React, { useState } from "react";
import { AlertTriangle, Check } from "lucide-react";

export const DeleteAccountForm: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      alert("Please enter your current password to confirm account deletion.");
      return;
    }
    if (!confirmDelete) {
      alert("Please check the confirmation box.");
      return;
    }
    setToastMessage("Account deletion request has been submitted.");
    setPassword("");
    setConfirmDelete(false);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="w-full">
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-[#00a99d] text-white px-5 py-3 rounded-[3px] shadow-lg text-[14px]">
          <Check className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div className="bg-[#fff5f5] border border-[#ffc9c9] rounded-[3px] p-4 flex items-start gap-3 text-[#c92a2a] text-[13px]">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-[14px] mb-1">Delete Account Notice</h4>
            <p className="leading-relaxed">
              When you delete your account, your personal details, shop listings, and access credentials will be permanently erased. This action cannot be reversed.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-medium text-[#495057] mb-1.5">
            Password
          </label>
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder:text-[#6c757d] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>

        <div className="pt-1">
          <label
            onClick={() => setConfirmDelete(!confirmDelete)}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div
              className={`w-[18px] h-[18px] rounded-[2px] flex items-center justify-center transition-colors ${
                confirmDelete
                  ? "bg-red-600 text-white"
                  : "border border-[#ced4da] bg-white"
              }`}
            >
              {confirmDelete && <Check className="w-[13px] h-[13px] stroke-[3]" />}
            </div>
            <span className="text-[13px] text-[#495057]">
              I understand that deleting my account is irreversible.
            </span>
          </label>
        </div>

        <div className="pt-3">
          <button
            type="submit"
            className="bg-[#dc3545] hover:bg-[#c82333] text-white font-normal text-[14px] px-6 py-2.5 rounded-[2px] transition-colors cursor-pointer shadow-xs"
          >
            Delete My Account
          </button>
        </div>
      </form>
    </div>
  );
};
