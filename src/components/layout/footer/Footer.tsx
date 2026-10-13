import React from "react";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div><h3 className="text-lg font-bold mb-4">MODESY</h3><p className="text-gray-400">Classified Ads Script</p></div>
        <div><h3 className="text-lg font-bold mb-4">Quick Links</h3><ul className="space-y-2 text-gray-400"><li>Home</li><li>Contact</li></ul></div>
      </div>
    </footer>
  );
}