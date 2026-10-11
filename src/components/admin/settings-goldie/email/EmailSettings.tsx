"use client";

import React, { useState } from "react";
import MailSettingsCard from "./MailSettingsCard";
import SendTestEmailCard from "./SendTestEmailCard";
import EmailOptionsCard from "./EmailOptionsCard";

export default function EmailSettings() {
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-800 tracking-tight">
        Email Settings
      </h1>

      {/* Notification Toast */}
      {notification && (
        <div className="bg-[#d4edda] border border-[#c3e6cb] text-[#155724] px-4 py-2.5 rounded-[3px] text-xs font-medium flex items-center justify-between shadow-xs">
          <span>{notification}</span>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-[#155724] font-bold text-sm cursor-pointer ml-4"
          >
            ×
          </button>
        </div>
      )}

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Email Server Settings + Send Test Email */}
        <div className="space-y-6">
          <MailSettingsCard
            onSave={() => showNotification("Email server settings saved successfully.")}
          />
          <SendTestEmailCard
            onSendTestEmail={(email) =>
              showNotification(`Test email successfully sent to ${email}`)
            }
          />
        </div>

        {/* Right Column: Email Options */}
        <div>
          <EmailOptionsCard
            onSave={() => showNotification("Email options saved successfully.")}
          />
        </div>
      </div>
    </div>
  );
}
