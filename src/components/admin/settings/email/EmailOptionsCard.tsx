"use client";

import React, { useState } from "react";
import { EmailOptionsConfig } from "./types";

interface EmailOptionsCardProps {
  initialConfig?: EmailOptionsConfig;
  onSave: (config: EmailOptionsConfig) => void;
}

export default function EmailOptionsCard({
  initialConfig = {
    emailVerification: false,
    sendEmailNewProduct: false,
    sendEmailOrderSummary: false,
    sendEmailOrderShipped: false,
    sendContactMessages: false,
    shopOpeningRequests: false,
    biddingSystemEmails: false,
    supportSystemEmails: false,
    adminNotificationEmail: "admin@modesy.net",
  },
  onSave,
}: EmailOptionsCardProps) {
  const [config, setConfig] = useState<EmailOptionsConfig>(initialConfig);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(config);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5 flex flex-col justify-between h-full space-y-4"
    >
      <div>
        <h2 className="text-sm font-bold text-gray-800 pb-2 border-b border-gray-100 mb-4">
          Email Options
        </h2>

        <div className="space-y-4 text-xs">
          {/* Email Verification */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Email Verification
            </label>
            <div className="flex items-center gap-6 text-gray-700">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="emailVerification"
                  checked={config.emailVerification === true}
                  onChange={() =>
                    setConfig((prev) => ({ ...prev, emailVerification: true }))
                  }
                  className="text-[#007bff]"
                />
                <span>Enable</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="emailVerification"
                  checked={config.emailVerification === false}
                  onChange={() =>
                    setConfig((prev) => ({ ...prev, emailVerification: false }))
                  }
                  className="text-[#007bff]"
                />
                <span>Disable</span>
              </label>
            </div>
          </div>

          {/* Send email when a new product is added */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Send email when a new product is added
            </label>
            <div className="flex items-center gap-6 text-gray-700">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sendEmailNewProduct"
                  checked={config.sendEmailNewProduct === true}
                  onChange={() =>
                    setConfig((prev) => ({ ...prev, sendEmailNewProduct: true }))
                  }
                  className="text-[#007bff]"
                />
                <span>Yes</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sendEmailNewProduct"
                  checked={config.sendEmailNewProduct === false}
                  onChange={() =>
                    setConfig((prev) => ({ ...prev, sendEmailNewProduct: false }))
                  }
                  className="text-[#007bff]"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Send email to buyer after purchase */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Send email to buyer after purchase (Send order summary)
            </label>
            <div className="flex items-center gap-6 text-gray-700">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sendEmailOrderSummary"
                  checked={config.sendEmailOrderSummary === true}
                  onChange={() =>
                    setConfig((prev) => ({ ...prev, sendEmailOrderSummary: true }))
                  }
                  className="text-[#007bff]"
                />
                <span>Yes</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sendEmailOrderSummary"
                  checked={config.sendEmailOrderSummary === false}
                  onChange={() =>
                    setConfig((prev) => ({
                      ...prev,
                      sendEmailOrderSummary: false,
                    }))
                  }
                  className="text-[#007bff]"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Send email to buyer when order shipped */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Send email to buyer when order shipped
            </label>
            <div className="flex items-center gap-6 text-gray-700">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sendEmailOrderShipped"
                  checked={config.sendEmailOrderShipped === true}
                  onChange={() =>
                    setConfig((prev) => ({ ...prev, sendEmailOrderShipped: true }))
                  }
                  className="text-[#007bff]"
                />
                <span>Yes</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sendEmailOrderShipped"
                  checked={config.sendEmailOrderShipped === false}
                  onChange={() =>
                    setConfig((prev) => ({
                      ...prev,
                      sendEmailOrderShipped: false,
                    }))
                  }
                  className="text-[#007bff]"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Send contact messages to email address */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Send contact messages to email address
            </label>
            <div className="flex items-center gap-6 text-gray-700">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sendContactMessages"
                  checked={config.sendContactMessages === true}
                  onChange={() =>
                    setConfig((prev) => ({ ...prev, sendContactMessages: true }))
                  }
                  className="text-[#007bff]"
                />
                <span>Yes</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sendContactMessages"
                  checked={config.sendContactMessages === false}
                  onChange={() =>
                    setConfig((prev) => ({ ...prev, sendContactMessages: false }))
                  }
                  className="text-[#007bff]"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Shop opening request emails */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Shop opening request emails
            </label>
            <div className="flex items-center gap-6 text-gray-700">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="shopOpeningRequests"
                  checked={config.shopOpeningRequests === true}
                  onChange={() =>
                    setConfig((prev) => ({ ...prev, shopOpeningRequests: true }))
                  }
                  className="text-[#007bff]"
                />
                <span>Yes</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="shopOpeningRequests"
                  checked={config.shopOpeningRequests === false}
                  onChange={() =>
                    setConfig((prev) => ({
                      ...prev,
                      shopOpeningRequests: false,
                    }))
                  }
                  className="text-[#007bff]"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Bidding system emails */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Bidding system emails
            </label>
            <div className="flex items-center gap-6 text-gray-700">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="biddingSystemEmails"
                  checked={config.biddingSystemEmails === true}
                  onChange={() =>
                    setConfig((prev) => ({ ...prev, biddingSystemEmails: true }))
                  }
                  className="text-[#007bff]"
                />
                <span>Enable</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="biddingSystemEmails"
                  checked={config.biddingSystemEmails === false}
                  onChange={() =>
                    setConfig((prev) => ({
                      ...prev,
                      biddingSystemEmails: false,
                    }))
                  }
                  className="text-[#007bff]"
                />
                <span>Disable</span>
              </label>
            </div>
          </div>

          {/* Support system emails */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1.5">
              Support system emails
            </label>
            <div className="flex items-center gap-6 text-gray-700">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="supportSystemEmails"
                  checked={config.supportSystemEmails === true}
                  onChange={() =>
                    setConfig((prev) => ({ ...prev, supportSystemEmails: true }))
                  }
                  className="text-[#007bff]"
                />
                <span>Enable</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="supportSystemEmails"
                  checked={config.supportSystemEmails === false}
                  onChange={() =>
                    setConfig((prev) => ({
                      ...prev,
                      supportSystemEmails: false,
                    }))
                  }
                  className="text-[#007bff]"
                />
                <span>Disable</span>
              </label>
            </div>
          </div>

          {/* Admin Email Address input */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Email Address (Admin emails will be sent to this address)
            </label>
            <input
              type="email"
              value={config.adminNotificationEmail}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  adminNotificationEmail: e.target.value,
                }))
              }
              placeholder="Email Address"
              className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
            />
          </div>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          className="bg-[#007bff] hover:bg-[#0069d9] text-white text-xs font-semibold px-4 py-2 rounded-[3px] shadow-xs transition cursor-pointer"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
