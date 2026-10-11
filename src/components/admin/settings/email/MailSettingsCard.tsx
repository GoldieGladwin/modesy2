"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { MailServerConfig } from "./types";

interface MailSettingsCardProps {
  initialConfig?: MailServerConfig;
  onSave: (config: MailServerConfig) => void;
}

export default function MailSettingsCard({
  initialConfig = {
    mailService: "php_mailer",
    mailProtocol: "smtp",
    encryption: "tls",
    mailHost: "mail.host",
    mailPort: "587",
    mailUsername: "admin@modesy.net",
    mailPassword: "••••••••",
    mailTitle: "Modesy Marketplace",
    replyTo: "noreply@modesy.net",
  },
  onSave,
}: MailSettingsCardProps) {
  const [config, setConfig] = useState<MailServerConfig>(initialConfig);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(config);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-[3px] shadow-2xs p-5 space-y-4"
    >
      <h2 className="text-sm font-bold text-gray-800 pb-2 border-b border-gray-100">
        Email Settings
      </h2>

      <div className="space-y-3.5 text-xs">
        {/* Mail Service */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Mail Service
          </label>
          <div className="relative">
            <select
              value={config.mailService}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, mailService: e.target.value }))
              }
              className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-700 pr-8 appearance-none focus:outline-none focus:border-[#00a99d]"
            >
              <option value="php_mailer">PHP Mailer</option>
              <option value="swift_mailer">Swift Mailer</option>
              <option value="mailgun">Mailgun</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Mail Protocol */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Mail Protocol
          </label>
          <div className="relative">
            <select
              value={config.mailProtocol}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, mailProtocol: e.target.value }))
              }
              className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-700 pr-8 appearance-none focus:outline-none focus:border-[#00a99d]"
            >
              <option value="smtp">SMTP</option>
              <option value="mail">Mail</option>
              <option value="sendmail">Sendmail</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Encryption */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Encryption
          </label>
          <div className="relative">
            <select
              value={config.encryption}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, encryption: e.target.value }))
              }
              className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-700 pr-8 appearance-none focus:outline-none focus:border-[#00a99d]"
            >
              <option value="tls">TLS</option>
              <option value="ssl">SSL</option>
              <option value="none">None</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-2 pointer-events-none" />
          </div>
        </div>

        {/* Mail Host */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Mail Host
          </label>
          <input
            type="text"
            value={config.mailHost}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, mailHost: e.target.value }))
            }
            placeholder="mail.host"
            className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
          />
        </div>

        {/* Mail Port */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Mail Port
          </label>
          <input
            type="text"
            value={config.mailPort}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, mailPort: e.target.value }))
            }
            placeholder="587"
            className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
          />
        </div>

        {/* Mail Username */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Mail Username
          </label>
          <input
            type="text"
            value={config.mailUsername}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, mailUsername: e.target.value }))
            }
            placeholder="admin@modesy.net"
            className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
          />
        </div>

        {/* Mail Password */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Mail Password
          </label>
          <input
            type="password"
            value={config.mailPassword}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, mailPassword: e.target.value }))
            }
            placeholder="Mail Password"
            className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
          />
        </div>

        {/* Mail Title */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Mail Title
          </label>
          <input
            type="text"
            value={config.mailTitle}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, mailTitle: e.target.value }))
            }
            placeholder="Mail Title"
            className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
          />
        </div>

        {/* Reply-To */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Reply-To
          </label>
          <input
            type="text"
            value={config.replyTo}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, replyTo: e.target.value }))
            }
            placeholder="Reply-To"
            className="w-full bg-white border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00a99d]"
          />
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
