'use client';

import React, { useState } from 'react';
import { Check, Star, Heart, Search } from 'lucide-react';

export default function AdminThemePage() {
  // Form State
  const [menuLimit, setMenuLimit] = useState<string>('8');
  const [navigationTemplate, setNavigationTemplate] = useState<'1' | '2'>('1');
  const [featuredCategories, setFeaturedCategories] = useState<'grid' | 'round'>('round');
  const [productImageDisplayMode, setProductImageDisplayMode] = useState<'fill' | 'fit'>('fill');

  // Feedback toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = (section: string) => {
    setToastMessage(`${section} settings saved successfully!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
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
      <h1 className="text-[22px] font-medium text-[#333] tracking-tight">Theme</h1>

      {/* 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column */}
        <div className="space-y-6">
          {/* CARD 1: Navigation */}
          <div className="bg-white border border-gray-200/90 rounded-[4px] p-6 shadow-none">
            <h2 className="text-[17px] font-semibold text-gray-800 mb-5">Navigation</h2>

            {/* Menu Limit Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Menu Limit (The number of links that appear in the menu)
              </label>
              <input
                type="number"
                value={menuLimit}
                onChange={(e) => setMenuLimit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-[3px] text-sm text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="8"
              />
            </div>

            {/* Navigation Template Sub-heading */}
            <div className="mb-4">
              <span className="block text-sm font-semibold text-gray-800">Navigation Template</span>
            </div>

            {/* Navigation Options (2 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: Navigation 1 */}
              <div
                onClick={() => setNavigationTemplate('1')}
                className="cursor-pointer group flex flex-col space-y-3"
              >
                <div className="flex items-center gap-2.5">
                  {navigationTemplate === '1' ? (
                    <div className="w-[18px] h-[18px] rounded-full bg-[#555299] flex items-center justify-center text-white shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-300 shrink-0 group-hover:border-gray-400" />
                  )}
                  <span className="text-sm font-semibold text-gray-800 select-none">Navigation 1</span>
                </div>

                {/* Thumbnail: Navigation 1 */}
                <div
                  className={`border rounded-[3px] p-2 bg-white transition-all overflow-hidden h-[135px] flex flex-col justify-between ${
                    navigationTemplate === '1'
                      ? 'border-gray-300 ring-1 ring-gray-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Top Header Mockup */}
                  <div className="border-b border-gray-100 pb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[8px] text-gray-800 tracking-tight">Modesy</span>
                      <div className="h-2.5 w-20 bg-gray-50 border border-gray-200 rounded-full flex items-center px-1">
                        <Search className="w-1.5 h-1.5 text-gray-400 mr-0.5" />
                        <span className="text-[5px] text-gray-400">Search...</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
                    </div>
                  </div>

                  {/* Horizontal Menu Bar */}
                  <div className="flex items-center gap-1.5 py-1 text-[6px] text-gray-600 font-medium border-b border-gray-100">
                    <span className="text-gray-900 font-bold">Clothing</span>
                    <span>Shoes &amp; Bags</span>
                    <span>Health &amp; Beauty</span>
                    <span>Electronics</span>
                    <span>Home &amp; Living</span>
                  </div>

                  {/* Mega Menu Dropdown Mockup */}
                  <div className="grid grid-cols-12 gap-1 py-1 flex-1">
                    {/* Columns 1-3: Subcategories */}
                    <div className="col-span-8 grid grid-cols-3 gap-1">
                      <div>
                        <div className="text-[5.5px] font-bold text-gray-800 mb-0.5">Men's</div>
                        <div className="space-y-0.5">
                          <div className="h-1 w-full bg-gray-200 rounded-xs" />
                          <div className="h-1 w-4/5 bg-gray-200 rounded-xs" />
                          <div className="h-1 w-3/4 bg-gray-200 rounded-xs" />
                          <div className="h-1 w-2/3 bg-gray-200 rounded-xs" />
                        </div>
                      </div>
                      <div>
                        <div className="text-[5.5px] font-bold text-gray-800 mb-0.5">Women's</div>
                        <div className="space-y-0.5">
                          <div className="h-1 w-full bg-gray-200 rounded-xs" />
                          <div className="h-1 w-5/6 bg-gray-200 rounded-xs" />
                          <div className="h-1 w-2/3 bg-gray-200 rounded-xs" />
                          <div className="h-1 w-3/4 bg-gray-200 rounded-xs" />
                        </div>
                      </div>
                      <div>
                        <div className="text-[5.5px] font-bold text-gray-800 mb-0.5">Shoes</div>
                        <div className="space-y-0.5">
                          <div className="h-1 w-full bg-gray-200 rounded-xs" />
                          <div className="h-1 w-3/4 bg-gray-200 rounded-xs" />
                          <div className="h-1 w-4/5 bg-gray-200 rounded-xs" />
                        </div>
                      </div>
                    </div>

                    {/* Promotional Banners */}
                    <div className="col-span-4 flex items-center gap-1 justify-end">
                      <div className="h-11 w-8 bg-slate-200 rounded-xs border border-gray-200 flex flex-col justify-end p-0.5">
                        <div className="h-1.5 w-full bg-slate-400 rounded-xs" />
                      </div>
                      <div className="h-11 w-8 bg-amber-100 rounded-xs border border-amber-200 flex flex-col justify-end p-0.5">
                        <div className="h-1.5 w-full bg-amber-400 rounded-xs" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Option 2: Navigation 2 */}
              <div
                onClick={() => setNavigationTemplate('2')}
                className="cursor-pointer group flex flex-col space-y-3"
              >
                <div className="flex items-center gap-2.5">
                  {navigationTemplate === '2' ? (
                    <div className="w-[18px] h-[18px] rounded-full bg-[#555299] flex items-center justify-center text-white shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-300 shrink-0 group-hover:border-gray-400" />
                  )}
                  <span className="text-sm font-semibold text-gray-800 select-none">Navigation 2</span>
                </div>

                {/* Thumbnail: Navigation 2 */}
                <div
                  className={`border rounded-[3px] p-2 bg-white transition-all overflow-hidden h-[135px] flex flex-col justify-between ${
                    navigationTemplate === '2'
                      ? 'border-gray-300 ring-1 ring-gray-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Top Header Mockup */}
                  <div className="border-b border-gray-100 pb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[8px] text-gray-800 tracking-tight">Modesy</span>
                      <div className="h-2.5 w-20 bg-gray-50 border border-gray-200 rounded-full flex items-center px-1">
                        <Search className="w-1.5 h-1.5 text-gray-400 mr-0.5" />
                        <span className="text-[5px] text-gray-400">Search...</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
                    </div>
                  </div>

                  {/* Horizontal Menu Bar */}
                  <div className="flex items-center gap-1.5 py-1 text-[6px] text-gray-600 font-medium border-b border-gray-100">
                    <span>Clothing</span>
                    <span>Shoes &amp; Bags</span>
                    <span>Accessories</span>
                    <span>Electronics</span>
                  </div>

                  {/* Vertical Sidebar / Flyout Menu Mockup */}
                  <div className="grid grid-cols-12 gap-1.5 py-1 flex-1">
                    {/* Left Vertical List */}
                    <div className="col-span-4 border-r border-gray-100 pr-1 space-y-1">
                      <div className="text-[5px] font-bold text-gray-800 flex justify-between">
                        <span>Clothing</span>
                        <span>›</span>
                      </div>
                      <div className="text-[5px] text-gray-500 flex justify-between">
                        <span>Shoes</span>
                        <span>›</span>
                      </div>
                      <div className="text-[5px] text-gray-500 flex justify-between">
                        <span>Bags</span>
                        <span>›</span>
                      </div>
                      <div className="text-[5px] text-gray-500 flex justify-between">
                        <span>Electronics</span>
                        <span>›</span>
                      </div>
                    </div>

                    {/* Right Flyout Details */}
                    <div className="col-span-8 pl-1 space-y-1">
                      <div className="text-[5.5px] font-bold text-gray-800">Men's &amp; Women's Fashion</div>
                      <div className="grid grid-cols-2 gap-1 pt-0.5">
                        <div className="space-y-0.5">
                          <div className="h-1 w-full bg-gray-200 rounded-xs" />
                          <div className="h-1 w-4/5 bg-gray-200 rounded-xs" />
                          <div className="h-1 w-2/3 bg-gray-200 rounded-xs" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="h-1 w-full bg-gray-200 rounded-xs" />
                          <div className="h-1 w-3/4 bg-gray-200 rounded-xs" />
                          <div className="h-1 w-4/5 bg-gray-200 rounded-xs" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer: Save Changes Button */}
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => handleSave('Navigation')}
                className="bg-[#007bff] hover:bg-[#0069d9] active:bg-[#0062cc] text-white text-sm font-medium px-4 py-2 rounded-[3px] shadow-xs transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* CARD 3: Product Image Display Mode */}
          <div className="bg-white border border-gray-200/90 rounded-[4px] p-6 shadow-none">
            <h2 className="text-[17px] font-semibold text-gray-800 mb-5">Product Image Display Mode</h2>

            {/* Display Mode Options (2 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Option 1: Fill Container (Crop to Fit) */}
              <div
                onClick={() => setProductImageDisplayMode('fill')}
                className="cursor-pointer group flex flex-col space-y-3"
              >
                <div className="flex items-start gap-2.5">
                  {productImageDisplayMode === 'fill' ? (
                    <div className="w-[18px] h-[18px] rounded-full bg-[#555299] flex items-center justify-center text-white shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-300 shrink-0 mt-0.5 group-hover:border-gray-400" />
                  )}
                  <div className="select-none leading-snug">
                    <span className="text-sm font-semibold text-gray-800 block">Fill Container</span>
                    <span className="text-xs text-gray-500 font-normal">(Crop to Fit)</span>
                  </div>
                </div>

                {/* Product Card Thumbnail 1: Fill Container */}
                <div
                  className={`border rounded-[3px] p-2.5 bg-white transition-all w-full max-w-[210px] ${
                    productImageDisplayMode === 'fill'
                      ? 'border-gray-300 ring-1 ring-gray-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Image area: tall gray rectangle filling the box */}
                  <div className="w-full h-[140px] bg-[#e2e8f0] rounded-xs" />

                  {/* Product Details */}
                  <div className="mt-2.5 space-y-0.5">
                    <div className="text-xs font-semibold text-gray-800 leading-tight">Test product</div>
                    <div className="text-[10px] text-gray-400">Admin</div>

                    {/* Star Rating and Wishlist */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 text-gray-300 stroke-[1.5]" />
                        ))}
                      </div>
                      <div className="flex items-center gap-0.5 text-[10px] text-gray-400">
                        <Heart className="w-2.5 h-2.5 text-gray-400 stroke-[1.5]" />
                        <span>0</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-xs font-bold text-gray-900 pt-0.5">$45</div>
                  </div>
                </div>
              </div>

              {/* Option 2: Show Full Image (Fit Inside) */}
              <div
                onClick={() => setProductImageDisplayMode('fit')}
                className="cursor-pointer group flex flex-col space-y-3"
              >
                <div className="flex items-start gap-2.5">
                  {productImageDisplayMode === 'fit' ? (
                    <div className="w-[18px] h-[18px] rounded-full bg-[#555299] flex items-center justify-center text-white shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-300 shrink-0 mt-0.5 group-hover:border-gray-400" />
                  )}
                  <div className="select-none leading-snug">
                    <span className="text-sm font-semibold text-gray-800 block">Show Full Image</span>
                    <span className="text-xs text-gray-500 font-normal">(Fit Inside)</span>
                  </div>
                </div>

                {/* Product Card Thumbnail 2: Show Full Image */}
                <div
                  className={`border rounded-[3px] p-2.5 bg-white transition-all w-full max-w-[210px] ${
                    productImageDisplayMode === 'fit'
                      ? 'border-gray-300 ring-1 ring-gray-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Image area: letterboxed gray rectangle fitting inside container */}
                  <div className="w-full h-[140px] flex items-center justify-center bg-transparent">
                    <div className="w-full h-[88px] bg-[#e2e8f0] rounded-xs" />
                  </div>

                  {/* Product Details */}
                  <div className="mt-2.5 space-y-0.5">
                    <div className="text-xs font-semibold text-gray-800 leading-tight">Test product</div>
                    <div className="text-[10px] text-gray-400">Admin</div>

                    {/* Star Rating and Wishlist */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 text-gray-300 stroke-[1.5]" />
                        ))}
                      </div>
                      <div className="flex items-center gap-0.5 text-[10px] text-gray-400">
                        <Heart className="w-2.5 h-2.5 text-gray-400 stroke-[1.5]" />
                        <span>0</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-xs font-bold text-gray-900 pt-0.5">$45</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer: Save Changes Button */}
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => handleSave('Product Image Display Mode')}
                className="bg-[#007bff] hover:bg-[#0069d9] active:bg-[#0062cc] text-white text-sm font-medium px-4 py-2 rounded-[3px] shadow-xs transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* CARD 2: Featured Categories */}
          <div className="bg-white border border-gray-200/90 rounded-[4px] p-6 shadow-none">
            <h2 className="text-[17px] font-semibold text-gray-800 mb-5">Featured Categories</h2>

            {/* Categories Display Mode (2 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: Grid Layout */}
              <div
                onClick={() => setFeaturedCategories('grid')}
                className="cursor-pointer group flex flex-col space-y-3"
              >
                <div className="flex items-center gap-2.5">
                  {featuredCategories === 'grid' ? (
                    <div className="w-[18px] h-[18px] rounded-full bg-[#555299] flex items-center justify-center text-white shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-300 shrink-0 group-hover:border-gray-400" />
                  )}
                  <span className="text-sm font-semibold text-gray-800 select-none">Grid Layout</span>
                </div>

                {/* Thumbnail: Grid Layout */}
                <div
                  className={`border rounded-[3px] p-2 bg-white transition-all h-[145px] flex items-center justify-center ${
                    featuredCategories === 'grid'
                      ? 'border-gray-300 ring-1 ring-gray-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-full h-full grid grid-cols-4 gap-1.5 p-1">
                    {/* Left Column (2 boxes) */}
                    <div className="col-span-1 flex flex-col gap-1.5">
                      <div className="flex-1 bg-[#f8f9fa] border border-[#e9ecef] rounded-xs relative flex items-center justify-center">
                        <span className="h-1.5 w-6 bg-[#6c757d] rounded-xs inline-block" />
                      </div>
                      <div className="flex-1 bg-[#f8f9fa] border border-[#e9ecef] rounded-xs relative flex items-center justify-center">
                        <span className="h-1.5 w-6 bg-[#6c757d] rounded-xs inline-block" />
                      </div>
                    </div>

                    {/* Center Large Box */}
                    <div className="col-span-2 bg-[#f8f9fa] border border-[#e9ecef] rounded-xs relative flex items-center justify-center">
                      <span className="h-1.5 w-8 bg-[#6c757d] rounded-xs inline-block" />
                    </div>

                    {/* Right Column (2 boxes) */}
                    <div className="col-span-1 flex flex-col gap-1.5">
                      <div className="flex-1 bg-[#f8f9fa] border border-[#e9ecef] rounded-xs relative flex items-center justify-center">
                        <span className="h-1.5 w-6 bg-[#6c757d] rounded-xs inline-block" />
                      </div>
                      <div className="flex-1 bg-[#f8f9fa] border border-[#e9ecef] rounded-xs relative flex items-center justify-center">
                        <span className="h-1.5 w-6 bg-[#6c757d] rounded-xs inline-block" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Option 2: Round Boxes */}
              <div
                onClick={() => setFeaturedCategories('round')}
                className="cursor-pointer group flex flex-col space-y-3"
              >
                <div className="flex items-center gap-2.5">
                  {featuredCategories === 'round' ? (
                    <div className="w-[18px] h-[18px] rounded-full bg-[#555299] flex items-center justify-center text-white shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-300 shrink-0 group-hover:border-gray-400" />
                  )}
                  <span className="text-sm font-semibold text-gray-800 select-none">Round Boxes</span>
                </div>

                {/* Thumbnail: Round Boxes */}
                <div
                  className={`border rounded-[3px] p-2 bg-white transition-all h-[145px] flex flex-col justify-center gap-2 ${
                    featuredCategories === 'round'
                      ? 'border-gray-300 ring-1 ring-gray-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Row 1 (5 circular categories) */}
                  <div className="grid grid-cols-5 gap-1 text-center">
                    {[
                      { name: 'Clothing' },
                      { name: 'Shoes' },
                      { name: 'Bags' },
                      { name: 'Watches' },
                      { name: 'Jewelry' },
                    ].map((cat, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200/80" />
                        <span className="text-[5.5px] text-gray-500 font-medium mt-1 truncate max-w-full">
                          {cat.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Row 2 (5 circular categories) */}
                  <div className="grid grid-cols-5 gap-1 text-center">
                    {[
                      { name: 'Electronics' },
                      { name: 'Home' },
                      { name: 'Beauty' },
                      { name: 'Baby' },
                      { name: 'Sports' },
                    ].map((cat, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200/80" />
                        <span className="text-[5.5px] text-gray-500 font-medium mt-1 truncate max-w-full">
                          {cat.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer: Save Changes Button */}
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => handleSave('Featured Categories')}
                className="bg-[#007bff] hover:bg-[#0069d9] active:bg-[#0062cc] text-white text-sm font-medium px-4 py-2 rounded-[3px] shadow-xs transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
