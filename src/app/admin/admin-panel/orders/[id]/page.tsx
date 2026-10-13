import React from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default async function AdminPanelOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/admin-panel/orders"
          className="p-2 bg-white border border-gray-200 rounded hover:bg-gray-50 text-gray-600"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#00a99d]" /> Order #{id}
          </h1>
          <p className="text-xs text-gray-500">Order details and items overview</p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded p-6">
        <p className="text-sm text-gray-600">Viewing order details for #{id}</p>
      </div>
    </div>
  );
}
