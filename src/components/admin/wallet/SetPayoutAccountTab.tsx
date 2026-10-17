"use client";

import React, { useState } from "react";
import { PayoutMethodType, PayoutAccountSettings } from "./types";
import { CheckCircle2 } from "lucide-react";

interface SetPayoutAccountTabProps {
  settings: PayoutAccountSettings;
  onSaveSettings: (updated: PayoutAccountSettings) => void;
}

export default function SetPayoutAccountTab({
  settings,
  onSaveSettings,
}: SetPayoutAccountTabProps) {
  const [activeMethod, setActiveMethod] = useState<PayoutMethodType>("paypal");
  const [formData, setFormData] = useState<PayoutAccountSettings>(settings);
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setShowSavedFeedback(true);
    setTimeout(() => {
      setShowSavedFeedback(false);
    }, 3000);
  };

  return (
    <div className="bg-white border border-gray-200/90 rounded-sm shadow-xs p-6">
      {/* Sub-tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setActiveMethod("paypal")}
          className={`px-4 py-2 text-[13px] font-medium rounded-[3px] transition cursor-pointer ${
            activeMethod === "paypal"
              ? "bg-[#00a99d] text-white"
              : "bg-[#f1f3f5] hover:bg-gray-200 text-[#495057]"
          }`}
        >
          PayPal
        </button>
        <button
          type="button"
          onClick={() => setActiveMethod("bitcoin")}
          className={`px-4 py-2 text-[13px] font-medium rounded-[3px] transition cursor-pointer ${
            activeMethod === "bitcoin"
              ? "bg-[#00a99d] text-white"
              : "bg-[#f1f3f5] hover:bg-gray-200 text-[#495057]"
          }`}
        >
          Bitcoin (BTC)
        </button>
        <button
          type="button"
          onClick={() => setActiveMethod("iban")}
          className={`px-4 py-2 text-[13px] font-medium rounded-[3px] transition cursor-pointer ${
            activeMethod === "iban"
              ? "bg-[#00a99d] text-white"
              : "bg-[#f1f3f5] hover:bg-gray-200 text-[#495057]"
          }`}
        >
          IBAN
        </button>
        <button
          type="button"
          onClick={() => setActiveMethod("swift")}
          className={`px-4 py-2 text-[13px] font-medium rounded-[3px] transition cursor-pointer ${
            activeMethod === "swift"
              ? "bg-[#00a99d] text-white"
              : "bg-[#f1f3f5] hover:bg-gray-200 text-[#495057]"
          }`}
        >
          SWIFT
        </button>
      </div>

      {showSavedFeedback && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Payout account details have been updated successfully!</span>
        </div>
      )}

      {/* Form Content */}
      <form onSubmit={handleSubmit}>
        {activeMethod === "paypal" && (
          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              PayPal Email Address*
            </label>
            <input
              type="email"
              required
              value={formData.paypalEmail}
              onChange={(e) =>
                setFormData({ ...formData, paypalEmail: e.target.value })
              }
              className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-[#00a99d] transition text-gray-800"
              placeholder="e.g. your-paypal@domain.com"
            />
          </div>
        )}

        {activeMethod === "bitcoin" && (
          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              BTC Address*
            </label>
            <input
              type="text"
              required
              value={formData.btcAddress}
              onChange={(e) =>
                setFormData({ ...formData, btcAddress: e.target.value })
              }
              className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-[#00a99d] transition text-gray-800 font-mono"
              placeholder="e.g. 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
            />
          </div>
        )}

        {activeMethod === "iban" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Full Name*
              </label>
              <input
                type="text"
                required
                value={formData.iban.fullName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    iban: { ...formData.iban, fullName: e.target.value },
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-[#00a99d] transition text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Country*
              </label>
              <input
                type="text"
                required
                value={formData.iban.country}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    iban: { ...formData.iban, country: e.target.value },
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-[#00a99d] transition text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Bank Name*
              </label>
              <input
                type="text"
                required
                value={formData.iban.bankName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    iban: { ...formData.iban, bankName: e.target.value },
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-[#00a99d] transition text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                IBAN Number*
              </label>
              <input
                type="text"
                required
                value={formData.iban.ibanNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    iban: { ...formData.iban, ibanNumber: e.target.value },
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-[#00a99d] transition text-gray-800 uppercase"
              />
            </div>
          </div>
        )}

        {activeMethod === "swift" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Full Name*
              </label>
              <input
                type="text"
                required
                value={formData.swift.fullName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    swift: { ...formData.swift, fullName: e.target.value },
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-[#00a99d] transition text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Country*
              </label>
              <input
                type="text"
                required
                value={formData.swift.country}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    swift: { ...formData.swift, country: e.target.value },
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-[#00a99d] transition text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Bank Name*
              </label>
              <input
                type="text"
                required
                value={formData.swift.bankName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    swift: { ...formData.swift, bankName: e.target.value },
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-[#00a99d] transition text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Branch Name
              </label>
              <input
                type="text"
                value={formData.swift.branchName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    swift: { ...formData.swift, branchName: e.target.value },
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-[#00a99d] transition text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Account Number / IBAN*
              </label>
              <input
                type="text"
                required
                value={formData.swift.accountNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    swift: { ...formData.swift, accountNumber: e.target.value },
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-[#00a99d] transition text-gray-800"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                SWIFT Code*
              </label>
              <input
                type="text"
                required
                value={formData.swift.swiftCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    swift: { ...formData.swift, swiftCode: e.target.value },
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-[#00a99d] transition text-gray-800 uppercase"
              />
            </div>
          </div>
        )}

        {/* Submit Button aligned right */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 bg-[#00a99d] hover:bg-[#008f85] text-white text-xs font-semibold rounded-sm transition shadow-xs cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
