import React from "react";
import { Layers, PlusCircle, Trash2, Edit } from "lucide-react";

export default function AdminCustomFieldsPage() {
  const fields = [
    { id: 1, name: "Material", category: "Clothing, Furniture", fieldType: "Dropdown", isRequired: "Yes", order: 1 },
    { id: 2, name: "Warranty Period", category: "Electronics", fieldType: "Text Input", isRequired: "No", order: 2 },
    { id: 3, name: "Shoe Size", category: "Clothing & Shoes", fieldType: "Radio Buttons", isRequired: "Yes", order: 3 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#00a99d]" /> Custom Fields
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Define category-specific custom attributes, filters, and product specifications</p>
        </div>
        <button className="px-3.5 py-1.5 bg-[#00a99d] text-white text-xs font-bold rounded hover:bg-[#008f85] transition flex items-center gap-1.5 cursor-pointer">
          <PlusCircle className="w-3.5 h-3.5" /> Add Custom Field
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200 uppercase">
              <tr>
                <th className="py-2.5 px-3">Field Name</th>
                <th className="py-2.5 px-3">Assigned Category</th>
                <th className="py-2.5 px-3">Field Type</th>
                <th className="py-2.5 px-3">Required</th>
                <th className="py-2.5 px-3">Sort Order</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {fields.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50/70">
                  <td className="py-3 px-3 font-semibold text-gray-900">{f.name}</td>
                  <td className="py-3 px-3 text-gray-600">{f.category}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-[10px] font-medium">
                      {f.fieldType}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-medium text-gray-700">{f.isRequired}</td>
                  <td className="py-3 px-3 font-mono text-gray-400">#{f.order}</td>
                  <td className="py-3 px-3 text-right space-x-2">
                    <button className="text-gray-500 hover:text-[#00a99d]"><Edit className="w-3.5 h-3.5 inline" /></button>
                    <button className="text-gray-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5 inline" /></button>
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
