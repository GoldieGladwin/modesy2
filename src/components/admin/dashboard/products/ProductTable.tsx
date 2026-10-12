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
          <tr className="border-b border-[#e2e8f0] bg-white text-[#333] font-bold">
            <th className="py-3 px-2.5 w-10 font-bold">Id</th>
            <th className="py-3 px-2.5 min-w-[220px] font-bold">Product</th>
            <th className="py-3 px-2.5 w-24 font-bold">Product Type</th>
            <th className="py-3 px-2.5 w-28 font-bold">Category</th>
            <th className="py-3 px-2.5 w-32 font-bold">Purchased Plan</th>
            <th className="py-3 px-2.5 w-16 font-bold">Price</th>
            <th className="py-3 px-2.5 w-28 font-bold">Stock/Status</th>
            <th className="py-3 px-2.5 w-20 font-bold">Page Views</th>
            <th className="py-3 px-2.5 w-32 font-bold">Date</th>
            <th className="py-3 px-2.5 w-24 font-bold text-center">Options</th>
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
