"use client";

import React from "react";
import { ProductItem } from "./types";
import ProductTableRow from "./ProductTableRow";

interface ProductTableProps {
  products: ProductItem[];
  emptyMessage?: string;
  showPromote?: boolean;
  onEdit: (product: ProductItem) => void;
  onClone: (product: ProductItem) => void;
  onDelete: (id: number) => void;
  onOpenPromote: (product: ProductItem) => void;
}

export default function ProductTable({
  products,
  emptyMessage = "No records found!",
  showPromote = true,
  onEdit,
  onClone,
  onDelete,
  onOpenPromote,
}: ProductTableProps) {
  return (
    <div className="w-full overflow-x-auto border-t border-[#f0f0f0]">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-[#e2e8f0] bg-white text-[#333] font-semibold">
            <th className="py-3 px-3 w-10 text-center font-semibold">Id</th>
            <th className="py-3 px-3 min-w-[220px] font-semibold">Product</th>
            <th className="py-3 px-3 w-24 font-semibold whitespace-nowrap">Product Type</th>
            <th className="py-3 px-3 w-28 font-semibold">Category</th>
            <th className="py-3 px-3 w-32 font-semibold whitespace-nowrap">Purchased Plan</th>
            <th className="py-3 px-3 w-16 font-semibold">Price</th>
            <th className="py-3 px-3 w-28 font-semibold whitespace-nowrap">Stock/Status</th>
            <th className="py-3 px-3 w-20 font-semibold whitespace-nowrap">Page Views</th>
            <th className="py-3 px-3 w-36 font-semibold">Date</th>
            <th className="py-3 px-3 w-24 font-semibold text-center">Options</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <ProductTableRow
                key={p.id}
                product={p}
                showPromote={showPromote}
                onEdit={onEdit}
                onClone={onClone}
                onDelete={onDelete}
                onOpenPromote={onOpenPromote}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={10}
                className="py-10 text-center text-[#555] text-xs font-normal"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
