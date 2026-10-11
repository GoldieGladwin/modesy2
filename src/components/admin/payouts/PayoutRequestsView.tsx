"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  X,
  Trash2,
  Check,
  Ban,
} from "lucide-react";
import { PayoutRequestItem, PayoutStatus } from "./types";
import {
  getStoredPayoutRequests,
  updatePayoutStatus,
  deletePayoutRequest,
} from "./payoutsData";

export default function PayoutRequestsView() {
  const [requests, setRequests] = useState<PayoutRequestItem[]>([]);
  const [pageSize, setPageSize] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchUserId, setSearchUserId] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<string>("");

  // Modals & dropdowns
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [detailsModalItem, setDetailsModalItem] = useState<PayoutRequestItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PayoutRequestItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRequests(getStoredPayoutRequests());
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const triggerToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApplyFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSearch(searchUserId.trim());
    setCurrentPage(1);
  };

  const handleStatusChange = (id: number, newStatus: PayoutStatus) => {
    const updated = updatePayoutStatus(id, newStatus);
    setRequests(updated);
    setOpenDropdownId(null);
    triggerToast(`Payout #${id} marked as ${newStatus}!`);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const updated = deletePayoutRequest(deleteTarget.id);
    setRequests(updated);
    triggerToast(`Payout request #${deleteTarget.id} deleted successfully!`);
    setDeleteTarget(null);
  };

  // Filtered Items
  const filteredRequests = useMemo(() => {
    let result = [...requests];

    if (statusFilter !== "All") {
      result = result.filter((r) => r.status === statusFilter);
    }

    if (appliedSearch) {
      result = result.filter(
        (r) =>
          r.userId.toString().includes(appliedSearch) ||
          r.userName.toLowerCase().includes(appliedSearch.toLowerCase())
      );
    }

    return result;
  }, [requests, statusFilter, appliedSearch]);

  const totalPages = Math.ceil(filteredRequests.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const displayedRequests = filteredRequests.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-[3px] shadow-lg text-white text-xs font-medium bg-[#00a65a] animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SEE DETAILS MODAL */}
      {detailsModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-[3px] shadow-xl max-w-md w-full p-5 border border-gray-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-[15px] font-semibold text-gray-800">
                Payout Details #{detailsModalItem.id}
              </h3>
              <button
                type="button"
                onClick={() => setDetailsModalItem(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-[13px] text-gray-700">
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500">User:</span>
                <span className="font-medium text-gray-900">
                  {detailsModalItem.userName} {detailsModalItem.userShop} (ID:{" "}
                  {detailsModalItem.userId})
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500">Method:</span>
                <span className="font-medium text-gray-900">
                  {detailsModalItem.withdrawalMethod}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500">Amount:</span>
                <span className="font-bold text-[#0073b7]">
                  ${detailsModalItem.withdrawalAmount}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-500">Status:</span>
                <span
                  className={`px-2 py-0.5 rounded-[2px] text-[11px] font-semibold text-white ${
                    detailsModalItem.status === "Pending"
                      ? "bg-[#f39c12]"
                      : detailsModalItem.status === "Completed"
                      ? "bg-[#00a65a]"
                      : "bg-[#dd4b39]"
                  }`}
                >
                  {detailsModalItem.status}
                </span>
              </div>
              {detailsModalItem.details?.email && (
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-500">PayPal Email:</span>
                  <span className="font-mono text-gray-900">
                    {detailsModalItem.details.email}
                  </span>
                </div>
              )}
              {detailsModalItem.details?.iban && (
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-500">IBAN:</span>
                  <span className="font-mono text-gray-900">
                    {detailsModalItem.details.iban}
                  </span>
                </div>
              )}
              {detailsModalItem.details?.swiftCode && (
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-500">SWIFT Code:</span>
                  <span className="font-mono text-gray-900">
                    {detailsModalItem.details.swiftCode}
                  </span>
                </div>
              )}
              {detailsModalItem.details?.btcAddress && (
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-500">BTC Address:</span>
                  <span className="font-mono text-gray-900 break-all text-right">
                    {detailsModalItem.details.btcAddress}
                  </span>
                </div>
              )}
              <div className="flex justify-between pb-1">
                <span className="text-gray-500">Requested Date:</span>
                <span className="text-gray-800">{detailsModalItem.date}</span>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setDetailsModalItem(null)}
                className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-[3px] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-[3px] shadow-xl max-w-sm w-full p-5 border border-gray-200">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-[15px] font-semibold text-gray-800">
                Delete Payout Request
              </h3>
            </div>
            <p className="text-xs text-gray-600 mb-5 leading-relaxed">
              Are you sure you want to delete payout request{" "}
              <strong>"#{deleteTarget.id}"</strong> for{" "}
              <strong>{deleteTarget.userName}</strong>?
            </p>
            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-3.5 py-1.5 text-xs text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-[3px] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-3.5 py-1.5 text-xs text-white bg-[#dd4b39] hover:bg-[#c23321] rounded-[3px] font-medium cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CARD: PAYOUT REQUESTS (Matches Screenshot 3) */}
      <div
        className="bg-white border border-[#d2d6de]/60 rounded-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] p-5"
        ref={dropdownRef}
      >
        {/* Header: Title on Left, Green '+ Add Payout' button on Right */}
        <div className="flex items-center justify-between pb-3 border-b border-[#f4f4f4] mb-4">
          <h1 className="text-[16px] font-normal text-[#333333]">
            Payout Requests
          </h1>
          <Link
            href="/admin/admin-panel/payouts/add-payout"
            className="px-3.5 py-1.5 bg-[#00a65a] hover:bg-[#008d4c] text-white text-[12.5px] rounded-[3px] inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs font-normal"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Payout</span>
          </Link>
        </div>

        {/* Filter Controls Row (Matches Screenshot 3) */}
        <form
          onSubmit={handleApplyFilter}
          className="flex flex-wrap items-center gap-3 mb-5 text-[13px]"
        >
          {/* Show */}
          <div className="flex flex-col gap-1">
            <span className="text-[#555] text-xs">Show</span>
            <div className="relative">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white border border-[#d2d6de] text-[13px] text-[#444] px-2.5 py-1.5 rounded-[3px] appearance-none pr-7 focus:outline-none focus:border-[#0073b7] min-w-[65px]"
              >
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={60}>60</option>
                <option value={100}>100</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1">
            <span className="text-[#555] text-xs">Status</span>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-white border border-[#d2d6de] text-[13px] text-[#444] px-3 py-1.5 rounded-[3px] appearance-none pr-8 focus:outline-none focus:border-[#0073b7] min-w-[120px]"
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Search */}
          <div className="flex flex-col gap-1">
            <span className="text-[#555] text-xs">Search</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="User Id"
                value={searchUserId}
                onChange={(e) => setSearchUserId(e.target.value)}
                className="border border-[#d2d6de] rounded-[3px] px-3 py-1.5 text-[13px] text-[#444] focus:outline-none focus:border-[#0073b7] min-w-[140px]"
              />
              <button
                type="submit"
                className="bg-[#605ca8] hover:bg-[#545096] text-white text-[12.5px] px-3.5 py-1.5 rounded-[3px] font-normal transition-colors cursor-pointer shadow-2xs"
              >
                Filter
              </button>
            </div>
          </div>
        </form>

        {/* Table (Screenshot 3: Id | User | Withdrawal Method | Withdrawal Amount | Status | Date | Options) */}
        <div className="overflow-x-auto border-t border-gray-100">
          <table className="w-full text-left text-[13px] text-[#333333]">
            <thead>
              <tr className="border-b border-[#f4f4f4] text-[#444] font-semibold text-[13px]">
                <th className="py-2.5 px-3 w-12">Id</th>
                <th className="py-2.5 px-3 min-w-[220px]">User</th>
                <th className="py-2.5 px-3 min-w-[150px]">Withdrawal Method</th>
                <th className="py-2.5 px-3 min-w-[130px]">Withdrawal Amount</th>
                <th className="py-2.5 px-3 w-28">Status</th>
                <th className="py-2.5 px-3 min-w-[130px]">Date</th>
                <th className="py-2.5 px-3 w-36">Options</th>
              </tr>
            </thead>
            <tbody>
              {displayedRequests.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-6 text-center text-gray-500 text-xs"
                  >
                    No payout requests found.
                  </td>
                </tr>
              ) : (
                displayedRequests.map((req) => (
                  <tr
                    key={req.id}
                    className="border-b border-[#f4f4f4] hover:bg-[#fcfcfc] transition-colors"
                  >
                    {/* Id */}
                    <td className="py-3.5 px-3 text-[#555] font-normal align-middle">
                      {req.id}
                    </td>

                    {/* User */}
                    <td className="py-3.5 px-3 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="relative w-11 h-11 rounded-[3px] overflow-hidden border border-gray-200 bg-gray-50 shrink-0">
                          <Image
                            src={req.userAvatar}
                            alt={req.userName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[12px] text-[#777]">
                            User Id: {req.userId}
                          </div>
                          <div className="text-[13px] text-[#333] font-normal truncate">
                            {req.userName} {req.userShop}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Withdrawal Method */}
                    <td className="py-3.5 px-3 align-middle">
                      <div>
                        <div className="text-[13px] text-[#333] font-normal">
                          {req.withdrawalMethod}
                        </div>
                        <button
                          type="button"
                          onClick={() => setDetailsModalItem(req)}
                          className="mt-1 bg-[#0073b7] hover:bg-[#005a92] text-white text-[11px] px-2 py-0.5 rounded-[2px] transition-colors cursor-pointer shadow-2xs"
                        >
                          See Details
                        </button>
                      </div>
                    </td>

                    {/* Withdrawal Amount */}
                    <td className="py-3.5 px-3 text-[#333] font-normal align-middle">
                      ${req.withdrawalAmount}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-3 align-middle">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-[3px] text-[11px] font-semibold text-white ${
                          req.status === "Pending"
                            ? "bg-[#f39c12]"
                            : req.status === "Completed"
                            ? "bg-[#00a65a]"
                            : "bg-[#dd4b39]"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-3 text-[#555] text-[12.5px] align-middle">
                      {req.date}
                    </td>

                    {/* Options */}
                    <td className="py-3.5 px-3 align-middle">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenDropdownId(
                              openDropdownId === req.id ? null : req.id
                            )
                          }
                          className="bg-[#605ca8] hover:bg-[#545096] text-white text-[12px] px-3 py-1.5 rounded-[3px] inline-flex items-center gap-2 font-normal transition-colors cursor-pointer focus:outline-none shadow-2xs"
                        >
                          <span>Select an option</span>
                          <span className="text-[9px] leading-none">▼</span>
                        </button>

                        {openDropdownId === req.id && (
                          <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-[3px] shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
                            {req.status !== "Completed" && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleStatusChange(req.id, "Completed")
                                }
                                className="w-full text-left px-3.5 py-1.5 text-[12px] text-green-700 hover:bg-green-50 flex items-center gap-2 transition-colors cursor-pointer"
                              >
                                <Check className="w-3.5 h-3.5 text-green-600" />
                                <span>Complete</span>
                              </button>
                            )}
                            {req.status !== "Cancelled" && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleStatusChange(req.id, "Cancelled")
                                }
                                className="w-full text-left px-3.5 py-1.5 text-[12px] text-amber-700 hover:bg-amber-50 flex items-center gap-2 transition-colors cursor-pointer"
                              >
                                <Ban className="w-3.5 h-3.5 text-amber-600" />
                                <span>Cancel</span>
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => {
                                setOpenDropdownId(null);
                                setDeleteTarget(req);
                              }}
                              className="w-full text-left px-3.5 py-1.5 text-[12px] text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-500" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-end">
          <div className="inline-flex items-center gap-1 select-none text-xs">
            <button
              type="button"
              disabled={currentPage <= 1 || displayedRequests.length === 0}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-2.5 py-1 border border-[#ddd] bg-white text-[#337ab7] rounded-[3px] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              &lt;
            </button>
            <span className="px-3 py-1 bg-[#337ab7] text-white border border-[#337ab7] rounded-[3px] font-medium">
              {currentPage}
            </span>
            <button
              type="button"
              disabled={
                currentPage >= totalPages || displayedRequests.length === 0
              }
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-2.5 py-1 border border-[#ddd] bg-white text-[#337ab7] rounded-[3px] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
