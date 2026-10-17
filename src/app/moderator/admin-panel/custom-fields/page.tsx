'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Plus, Upload, X, ChevronDown, Edit, Trash2, List, Check, AlertCircle } from 'lucide-react';

interface CustomFieldItem {
  id: number;
  name: string;
  type: string;
  inFilters: boolean;
  required: string;
  order: number;
  status: 'Active' | 'Inactive';
}

const initialFields: CustomFieldItem[] = [
  {
    id: 2,
    name: 'Material',
    type: 'Multi Select',
    inFilters: true,
    required: 'Yes',
    order: 2,
    status: 'Active',
  },
  {
    id: 1,
    name: 'Fabric',
    type: 'Multi Select',
    inFilters: true,
    required: 'Yes',
    order: 1,
    status: 'Active',
  },
];

export default function ModeratorCustomFieldsPage() {
  const [fields, setFields] = useState<CustomFieldItem[]>(initialFields);
  const [showCount, setShowCount] = useState<number>(15);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSearchFilter, setActiveSearchFilter] = useState<string>('');
  
  // Dropdown options state
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState<boolean>(false);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState<boolean>(false);
  const [selectedFieldForOptions, setSelectedFieldForOptions] = useState<CustomFieldItem | null>(null);

  // New field form state
  const [newFieldName, setNewFieldName] = useState<string>('');
  const [newFieldType, setNewFieldType] = useState<string>('Multi Select');
  const [newFieldRequired, setNewFieldRequired] = useState<string>('Yes');
  const [newFieldOrder, setNewFieldOrder] = useState<number>(3);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter fields based on search
  const filteredFields = fields.filter((item) => {
    if (!activeSearchFilter) return true;
    return (
      item.name.toLowerCase().includes(activeSearchFilter.toLowerCase()) ||
      item.type.toLowerCase().includes(activeSearchFilter.toLowerCase()) ||
      item.id.toString().includes(activeSearchFilter)
    );
  });

  const handleApplyFilter = () => {
    setActiveSearchFilter(searchQuery);
  };

  const handleToggleProductFilter = (id: number) => {
    setFields((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = !item.inFilters;
          showToast(
            updated
              ? `"${item.name}" added to Product Filters`
              : `"${item.name}" removed from Product Filters`
          );
          return { ...item, inFilters: updated };
        }
        return item;
      })
    );
  };

  const handleDeleteField = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete custom field "${name}"?`)) {
      setFields((prev) => prev.filter((item) => item.id !== id));
      setOpenDropdownId(null);
      showToast(`Custom field "${name}" deleted successfully`);
    }
  };

  const handleCreateField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFieldName.trim()) return;

    const newField: CustomFieldItem = {
      id: Math.max(...fields.map((f) => f.id), 0) + 1,
      name: newFieldName.trim(),
      type: newFieldType,
      inFilters: true,
      required: newFieldRequired,
      order: Number(newFieldOrder) || 1,
      status: 'Active',
    };

    setFields([newField, ...fields]);
    setIsAddModalOpen(false);
    setNewFieldName('');
    showToast(`Custom field "${newField.name}" added successfully`);
  };

  return (
    <div className="w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#00a65a] text-white px-4 py-2.5 rounded shadow-lg text-sm font-medium transition-all flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Card Utama */}
      <div className="bg-white border border-gray-200 rounded-[4px] p-6 shadow-none">
        {/* Header Card & Tombol */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-100">
          <h1 className="text-[20px] font-medium text-[#333] tracking-tight">
            Custom Fields
          </h1>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* + Add Custom Field Button */}
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#20c997] hover:bg-[#1baa80] text-white px-3.5 py-2 rounded-[3px] text-sm font-medium flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Custom Field</span>
            </button>

            {/* Bulk Custom Field Upload Button */}
            <button
              type="button"
              onClick={() => setIsBulkModalOpen(true)}
              className="bg-[#17a2b8] hover:bg-[#138496] text-white px-3.5 py-2 rounded-[3px] text-sm font-medium flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Bulk Custom Field Upload</span>
            </button>
          </div>
        </div>

        {/* Baris Filter */}
        <div className="flex flex-wrap items-end gap-4 my-6">
          {/* Show dropdown */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Show
            </label>
            <select
              value={showCount}
              onChange={(e) => setShowCount(Number(e.target.value))}
              className="border border-gray-300 rounded-[3px] px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-blue-500 bg-white min-w-[75px]"
            >
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="60">60</option>
              <option value="100">100</option>
            </select>
          </div>

          {/* Search input & Filter button */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Search
            </label>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleApplyFilter()}
                className="border border-gray-300 rounded-l-[3px] px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-blue-500 w-44"
              />
              <button
                type="button"
                onClick={handleApplyFilter}
                className="bg-[#6f42c1] hover:bg-[#5a32a3] text-white px-4 py-1.5 text-sm font-medium rounded-r-[3px] transition-colors cursor-pointer"
              >
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-gray-200 text-sm">
            <thead>
              <tr className="bg-white text-gray-800 font-semibold border-b border-gray-200">
                <th className="border border-gray-200 px-4 py-3 w-16">Id</th>
                <th className="border border-gray-200 px-4 py-3">Name</th>
                <th className="border border-gray-200 px-4 py-3">Type</th>
                <th className="border border-gray-200 px-4 py-3"></th>
                <th className="border border-gray-200 px-4 py-3">Required</th>
                <th className="border border-gray-200 px-4 py-3 w-20">Order</th>
                <th className="border border-gray-200 px-4 py-3 w-28">Status</th>
                <th className="border border-gray-200 px-4 py-3 w-44">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {filteredFields.slice(0, showCount).map((field) => (
                <tr key={field.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="border border-gray-200 px-4 py-3 text-gray-700 font-normal">
                    {field.id}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-800 font-normal">
                    {field.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700 font-normal">
                    {field.type}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {field.inFilters ? (
                      <button
                        type="button"
                        onClick={() => handleToggleProductFilter(field.id)}
                        className="bg-[#dc3545] hover:bg-[#c82333] text-white text-xs font-normal px-2.5 py-1.5 rounded-[3px] inline-flex items-center gap-1 transition-colors cursor-pointer shadow-none"
                      >
                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Remove from Product Filters</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleToggleProductFilter(field.id)}
                        className="bg-[#007bff] hover:bg-[#0069d9] text-white text-xs font-normal px-2.5 py-1.5 rounded-[3px] inline-flex items-center gap-1 transition-colors cursor-pointer shadow-none"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Add to Product Filters</span>
                      </button>
                    )}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700 font-normal">
                    {field.required}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-gray-700 font-normal">
                    {field.order}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    <span className="bg-[#28a745] text-white text-[11px] font-medium px-2 py-0.5 rounded-[3px] inline-block">
                      {field.status}
                    </span>
                  </td>
                  <td className="border border-gray-200 px-4 py-3 relative">
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDropdownId(openDropdownId === field.id ? null : field.id)
                        }
                        className="bg-[#6f42c1] hover:bg-[#5a32a3] text-white text-xs font-medium px-3 py-1.5 rounded-[3px] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-none"
                      >
                        <span>Select an option</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>

                      {openDropdownId === field.id && (
                        <div
                          ref={dropdownRef}
                          className="absolute left-0 mt-1 w-44 rounded-[3px] bg-white shadow-lg border border-gray-200 z-30 py-1 text-xs text-gray-700"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setOpenDropdownId(null);
                              showToast(`Editing custom field "${field.name}"`);
                            }}
                            className="w-full text-left px-3.5 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5 text-blue-600" />
                            <span>Edit</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedFieldForOptions(field);
                              setIsOptionsModalOpen(true);
                              setOpenDropdownId(null);
                            }}
                            className="w-full text-left px-3.5 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                          >
                            <List className="w-3.5 h-3.5 text-teal-600" />
                            <span>Custom Field Options</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteField(field.id, field.name)}
                            className="w-full text-left px-3.5 py-2 hover:bg-gray-100 text-red-600 flex items-center gap-2 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-600" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[4px] shadow-xl w-full max-w-lg border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <h2 className="text-base font-semibold text-gray-800">Add Custom Field</h2>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateField} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Field Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Size, Color, Warranty"
                  value={newFieldName}
                  onChange={(e) => setNewFieldName(e.target.value)}
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={newFieldType}
                  onChange={(e) => setNewFieldType(e.target.value)}
                  className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-500 bg-white"
                >
                  <option value="Multi Select">Multi Select</option>
                  <option value="Dropdown">Dropdown</option>
                  <option value="Radio Buttons">Radio Buttons</option>
                  <option value="Text">Text</option>
                  <option value="Number">Number</option>
                  <option value="Checkbox">Checkbox</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Required
                  </label>
                  <select
                    value={newFieldRequired}
                    onChange={(e) => setNewFieldRequired(e.target.value)}
                    className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Order
                  </label>
                  <input
                    type="number"
                    value={newFieldOrder}
                    onChange={(e) => setNewFieldOrder(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-[3px] px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-[3px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-white bg-[#20c997] hover:bg-[#1baa80] rounded-[3px] cursor-pointer"
                >
                  Save Field
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[4px] shadow-xl w-full max-w-lg border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <h2 className="text-base font-semibold text-gray-800">Bulk Custom Field Upload</h2>
              <button
                type="button"
                onClick={() => setIsBulkModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-teal-500 transition-colors">
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Choose CSV or Excel file</p>
                <p className="text-xs text-gray-400 mt-1">Supported formats: .csv, .xlsx</p>
                <label className="mt-3 inline-block px-4 py-1.5 bg-[#17a2b8] text-white text-xs font-medium rounded-[3px] cursor-pointer hover:bg-[#138496]">
                  Browse File
                  <input type="file" accept=".csv, .xlsx" className="hidden" />
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsBulkModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-[3px] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isOptionsModalOpen && selectedFieldForOptions && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[4px] shadow-xl w-full max-w-md border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <h2 className="text-base font-semibold text-gray-800">
                Options: {selectedFieldForOptions.name}
              </h2>
              <button
                type="button"
                onClick={() => setIsOptionsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1.5 border border-gray-200 rounded p-3 bg-gray-50/50 max-h-48 overflow-y-auto text-xs">
                {['Option 1', 'Option 2', 'Option 3'].map((opt, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-white px-2.5 py-1.5 border border-gray-200 rounded-xs"
                  >
                    <span className="font-medium text-gray-700">{opt}</span>
                    <button className="text-red-500 hover:text-red-700">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOptionsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-[3px] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
