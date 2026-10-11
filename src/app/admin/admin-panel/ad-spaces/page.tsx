import React from "react";
import { Tv, Edit, Eye } from "lucide-react";

export default function AdminAdSpacesPage() {
  const adSpaces = [
    { id: 1, position: "Header Banner", dimensions: "728x90 px", type: "Image / Responsive Banner", status: "Active" },
    { id: 2, position: "Homepage Middle Section", dimensions: "1140x120 px", type: "Google AdSense", status: "Active" },
    { id: 3, position: "Sidebar Left Banner", dimensions: "300x250 px", type: "Custom HTML Code", status: "Active" },
    { id: 4, position: "Product Details Bottom", dimensions: "728x90 px", type: "Image / Banner Link", status: "Active" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Tv className="w-5 h-5 text-[#00a99d]" /> Ad Spaces
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Configure monetization banners, Google AdSense tags, and promotional slots</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200 uppercase">
              <tr>
                <th className="py-2.5 px-3">Ad Slot Position</th>
                <th className="py-2.5 px-3">Dimensions</th>
                <th className="py-2.5 px-3">Ad Format</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {adSpaces.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50/70">
                  <td className="py-3 px-3 font-semibold text-gray-900">{a.position}</td>
                  <td className="py-3 px-3 font-mono text-gray-500">{a.dimensions}</td>
                  <td className="py-3 px-3 text-gray-600">{a.type}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-[10px] font-bold">
                      {a.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button className="px-2.5 py-1 bg-gray-100 hover:bg-[#00a99d] hover:text-white rounded text-[11px] font-medium transition cursor-pointer">
                      Edit Ad Code
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
