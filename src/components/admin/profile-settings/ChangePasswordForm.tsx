"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

export const ChangePasswordForm: React.FC = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    setToastMessage("Password changed successfully!");
    setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
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
        <div>
          <label className="block text-[13px] font-medium text-[#495057] mb-1.5">
            Old Password
          </label>
          <input
            type="password"
            required
            placeholder="Old Password"
            value={formData.oldPassword}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, oldPassword: e.target.value }))
            }
            className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder:text-[#6c757d] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] transition-colors"
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-[#495057] mb-1.5">
            New Password
          </label>
          <input
            type="password"
            required
            placeholder="New Password"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, newPassword: e.target.value }))
            }
            className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder:text-[#6c757d] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] transition-colors"
          />
        </div>

        <div>
          <label className="block text-[13px] font-medium text-[#495057] mb-1.5">
            Password Confirmation
          </label>
          <input
            type="password"
            required
            placeholder="Password Confirmation"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            className="w-full h-[40px] px-3.5 text-[14px] text-[#495057] placeholder:text-[#6c757d] bg-white border border-[#ced4da] rounded-[2px] focus:outline-none focus:border-[#00a99d] transition-colors"
          />
        </div>

        <div className="pt-3">
          <button
            type="submit"
            className="bg-[#00a99d] hover:bg-[#008f85] text-white font-normal text-[14px] px-6 py-2.5 rounded-[2px] transition-colors cursor-pointer shadow-xs"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};
