'use client';

import React, { useState } from 'react';
import { Check, Cloud, X, Copy, CheckCheck } from 'lucide-react';

interface SitemapItem {
  id: string;
  name: string;
}

const initialSitemaps: SitemapItem[] = [
  { id: '1', name: 'sitemap_blog_categories-1.xml' },
  { id: '2', name: 'sitemap_blog_posts-1.xml' },
  { id: '3', name: 'sitemap_categories-1.xml' },
  { id: '4', name: 'sitemap_products-1.xml' },
  { id: '5', name: 'sitemap_static.xml' },
];

export default function AdminSeoToolsPage() {
  // Radio button states
  const [frequency, setFrequency] = useState<'auto' | 'none'>('auto');
  const [lastModification, setLastModification] = useState<'auto' | 'none'>('auto');
  const [priority, setPriority] = useState<'auto' | 'none'>('auto');

  // Google Analytics state
  const [analyticsCode, setAnalyticsCode] = useState<string>('');

  // Generated sitemaps list state
  const [sitemaps, setSitemaps] = useState<SitemapItem[]>(initialSitemaps);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedCron, setCopiedCron] = useState<boolean>(false);

  const cronUrl = 'https://modesy.codingest.net/cron/update-sitemap';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleGenerateSitemap = () => {
    showToast('Sitemaps generated successfully!');
  };

  const handleSaveAnalytics = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Google Analytics Code saved successfully!');
  };

  const handleDeleteSitemap = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      setSitemaps((prev) => prev.filter((item) => item.id !== id));
      showToast(`Deleted ${name}`);
    }
  };

  const handleDownloadSitemap = (name: string) => {
    showToast(`Downloading ${name}...`);
  };

  const handleCopyCron = () => {
    navigator.clipboard.writeText(cronUrl);
    setCopiedCron(true);
    showToast('Cron Job URL copied to clipboard');
    setTimeout(() => {
      setCopiedCron(false);
    }, 2000);
  };

  return (
    <div className="space-y-5">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#00a65a] text-white px-4 py-2.5 rounded shadow-lg text-sm font-medium transition-all flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Title */}
      <h1 className="text-[22px] font-medium text-[#333] tracking-tight">SEO Tools</h1>

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column */}
        <div className="space-y-6">
          {/* CARD 1: Sitemap */}
          <div className="bg-white border border-gray-200/90 rounded-[4px] p-6 shadow-none">
            <h2 className="text-[17px] font-semibold text-gray-800 mb-5">Sitemap</h2>

            <div className="space-y-6">
              {/* Sub-section 1: Frequency */}
              <div>
                <div className="mb-3">
                  <span className="text-sm font-semibold text-gray-800">Frequency</span>
                  <span className="text-xs text-gray-500 font-normal ml-1">
                    (This value indicates how frequently the content at a particular URL is likely to change )
                  </span>
                </div>

                <div className="flex items-center gap-8">
                  {/* Option: Automatically Calculated */}
                  <div
                    onClick={() => setFrequency('auto')}
                    className="cursor-pointer group flex items-start gap-2.5"
                  >
                    {frequency === 'auto' ? (
                      <div className="w-[18px] h-[18px] rounded-full bg-[#555299] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-300 shrink-0 mt-0.5 group-hover:border-gray-400" />
                    )}
                    <div className="select-none leading-snug">
                      <span className="text-sm font-semibold text-gray-800 block">Automatically</span>
                      <span className="text-sm text-gray-700 block">Calculated</span>
                    </div>
                  </div>

                  {/* Option: None */}
                  <div
                    onClick={() => setFrequency('none')}
                    className="cursor-pointer group flex items-start gap-2.5"
                  >
                    {frequency === 'none' ? (
                      <div className="w-[18px] h-[18px] rounded-full bg-[#555299] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-300 shrink-0 mt-0.5 group-hover:border-gray-400" />
                    )}
                    <div className="select-none leading-snug">
                      <span className="text-sm font-semibold text-gray-800 block">None</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-section 2: Last Modification */}
              <div>
                <div className="mb-3">
                  <span className="text-sm font-semibold text-gray-800">Last Modification</span>
                  <span className="text-xs text-gray-500 font-normal ml-1">
                    (The time the URL was last modified)
                  </span>
                </div>

                <div className="flex items-center gap-8">
                  {/* Option: Automatically Calculated */}
                  <div
                    onClick={() => setLastModification('auto')}
                    className="cursor-pointer group flex items-start gap-2.5"
                  >
                    {lastModification === 'auto' ? (
                      <div className="w-[18px] h-[18px] rounded-full bg-[#555299] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-300 shrink-0 mt-0.5 group-hover:border-gray-400" />
                    )}
                    <div className="select-none leading-snug">
                      <span className="text-sm font-semibold text-gray-800 block">Automatically</span>
                      <span className="text-sm text-gray-700 block">Calculated</span>
                    </div>
                  </div>

                  {/* Option: None */}
                  <div
                    onClick={() => setLastModification('none')}
                    className="cursor-pointer group flex items-start gap-2.5"
                  >
                    {lastModification === 'none' ? (
                      <div className="w-[18px] h-[18px] rounded-full bg-[#555299] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-300 shrink-0 mt-0.5 group-hover:border-gray-400" />
                    )}
                    <div className="select-none leading-snug">
                      <span className="text-sm font-semibold text-gray-800 block">None</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-section 3: Priority */}
              <div>
                <div className="mb-3">
                  <span className="text-sm font-semibold text-gray-800">Priority</span>
                  <span className="text-xs text-gray-500 font-normal ml-1">
                    (The priority of a particular URL relative to other pages on the same site)
                  </span>
                </div>

                <div className="flex items-center gap-8">
                  {/* Option: Automatically Calculated */}
                  <div
                    onClick={() => setPriority('auto')}
                    className="cursor-pointer group flex items-start gap-2.5"
                  >
                    {priority === 'auto' ? (
                      <div className="w-[18px] h-[18px] rounded-full bg-[#555299] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-300 shrink-0 mt-0.5 group-hover:border-gray-400" />
                    )}
                    <div className="select-none leading-snug">
                      <span className="text-sm font-semibold text-gray-800 block">Automatically</span>
                      <span className="text-sm text-gray-700 block">Calculated</span>
                    </div>
                  </div>

                  {/* Option: None */}
                  <div
                    onClick={() => setPriority('none')}
                    className="cursor-pointer group flex items-start gap-2.5"
                  >
                    {priority === 'none' ? (
                      <div className="w-[18px] h-[18px] rounded-full bg-[#555299] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-300 shrink-0 mt-0.5 group-hover:border-gray-400" />
                    )}
                    <div className="select-none leading-snug">
                      <span className="text-sm font-semibold text-gray-800 block">None</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Sitemap Button */}
            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={handleGenerateSitemap}
                className="bg-[#007bff] hover:bg-[#0069d9] active:bg-[#0062cc] text-white text-sm font-medium px-4 py-2 rounded-[3px] shadow-xs transition-colors cursor-pointer"
              >
                Generate Sitemap
              </button>
            </div>
          </div>

          {/* CARD 3: Generated Sitemaps */}
          <div className="bg-white border border-gray-200/90 rounded-[4px] p-6 shadow-none">
            <h2 className="text-[17px] font-semibold text-gray-800 mb-5">Generated Sitemaps</h2>

            <div className="space-y-3.5">
              {sitemaps.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 py-1 border-b border-gray-100 last:border-b-0"
                >
                  {/* Sitemap Filename (Blue text link) */}
                  <span className="text-sm font-medium text-[#007bff] hover:underline cursor-pointer select-none">
                    {item.name}
                  </span>

                  {/* Action Buttons: Green Cloud & Red X */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Green Button: Download (Cloud) */}
                    <button
                      type="button"
                      title="Download Sitemap"
                      onClick={() => handleDownloadSitemap(item.name)}
                      className="w-7 h-7 bg-[#28a745] hover:bg-[#218838] text-white rounded-[3px] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                    >
                      <Cloud className="w-4 h-4 fill-white" />
                    </button>

                    {/* Red Button: Delete (X) */}
                    <button
                      type="button"
                      title="Delete Sitemap"
                      onClick={() => handleDeleteSitemap(item.id, item.name)}
                      className="w-7 h-7 bg-[#dc3545] hover:bg-[#c82333] text-white rounded-[3px] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                    >
                      <X className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              ))}

              {sitemaps.length === 0 && (
                <div className="text-sm text-gray-500 py-3 text-center">
                  No sitemaps generated yet.
                </div>
              )}
            </div>
          </div>

          {/* CARD 4: Cron Job */}
          <div className="bg-white border border-gray-200/90 border-l-4 border-l-[#007bff] rounded-[4px] p-6 shadow-none">
            <h2 className="text-[17px] font-semibold text-gray-800 mb-3">Cron Job</h2>

            <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
              <span className="text-sm font-bold text-[#224466] break-all">
                {cronUrl}
              </span>
              <button
                type="button"
                onClick={handleCopyCron}
                className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer shrink-0"
                title="Copy Cron URL"
              >
                {copiedCron ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-green-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gray-500" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-gray-500 font-normal">
              With this URL you can automatically update your sitemap.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* CARD 2: Google Analytics Code */}
          <div className="bg-white border border-gray-200/90 rounded-[4px] p-6 shadow-none">
            <h2 className="text-[17px] font-semibold text-gray-800 mb-5">Google Analytics Code</h2>

            <form onSubmit={handleSaveAnalytics}>
              <div className="mb-6">
                <textarea
                  rows={7}
                  value={analyticsCode}
                  onChange={(e) => setAnalyticsCode(e.target.value)}
                  placeholder="Google Analytics Code"
                  className="w-full border border-gray-300 rounded-[3px] p-3 text-sm text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono resize-y min-h-[160px]"
                />
              </div>

              {/* Save Changes Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#007bff] hover:bg-[#0069d9] active:bg-[#0062cc] text-white text-sm font-medium px-4 py-2 rounded-[3px] shadow-xs transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
