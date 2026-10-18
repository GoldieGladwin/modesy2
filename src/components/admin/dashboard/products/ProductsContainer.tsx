"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ProductFilterSection from "./ProductFilterSection";
import ProductTable from "./ProductTable";
import ProductPaginationBar from "./ProductPaginationBar";
import ProductPromoteModal from "./ProductPromoteModal";
import ProductDeleteModal from "./ProductDeleteModal";
import { ProductFilterState, ProductItem } from "./types";
import { initialDashboardProducts } from "./mockData";
import { getProducts, deleteProduct, createProduct, updateProduct } from "@/lib/supabase/products";
import { isSupabaseConfigured } from "@/lib/supabase/client";

import { matchesProductCategory } from "./categoryData";

interface ProductsContainerProps {
  title?: string;
  initialItems?: ProductItem[];
  emptyMessage?: string;
  pageSize?: number;
  showPromote?: boolean;
}

function ProductsContainerContent({
  title = "Products",
  initialItems = initialDashboardProducts,
  emptyMessage = "No records found!",
  pageSize = 15,
  showPromote = true,
}: ProductsContainerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageParam = searchParams.get("page");
  const initialPage = pageParam ? parseInt(pageParam, 10) || 1 : 1;

  const [products, setProducts] = useState<ProductItem[]>(initialItems);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [promoteProduct, setPromoteProduct] = useState<ProductItem | null>(null);
  const [deleteProductTarget, setDeleteProductTarget] = useState<ProductItem | null>(null);

  useEffect(() => {
    async function loadSupabaseProducts() {
      if (isSupabaseConfigured()) {
        try {
          const { data } = await getProducts();
          if (data && data.length > 0) {
            const mapped: ProductItem[] = data.map((db, idx) => {
              const primaryImg =
                db.product_images?.find((img) => img.is_primary)?.image_url ||
                db.product_images?.[0]?.image_url ||
                "/images/products/midi-skirt.webp";

              return {
                id: idx + 1000,
                uuid: db.id,
                title: db.title,
                sku: db.sku || "",
                productType: db.product_type === "digital" ? "Digital" : "Physical",
                listingType: db.listing_type === "sell_on_site" ? "Sell Now" : "Classified Ads",
                category: db.categories?.name || "General",
                price: `$${Number(db.price).toFixed(2)}`,
                stock: db.stock > 0 ? `In Stock (${db.stock})` : "Out of Stock",
                pageViews: Number(db.views_count) || 0,
                date: new Date(db.created_at).toISOString().slice(0, 10),
                isFeatured: db.is_featured,
                image: primaryImg,
              };
            });
            setProducts(mapped);
          }
        } catch (e) {
          console.error("Error loading products from Supabase:", e);
        }
      }
    }
    loadSupabaseProducts();
  }, []);

  useEffect(() => {
    if (pageParam) {
      const p = parseInt(pageParam, 10);
      if (!isNaN(p) && p !== currentPage) {
        setCurrentPage(p);
      }
    }
  }, [pageParam]);

  const [filter, setFilter] = useState<ProductFilterState>({
    listingType: "All",
    productType: "All",
    category: "All",
    subcategory: "All",
    stock: "All",
    search: "",
  });

  const [appliedFilter, setAppliedFilter] = useState<ProductFilterState>(filter);

  const handleFilterChange = (newFilter: Partial<ProductFilterState>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  const handleApplyFilter = () => {
    setAppliedFilter({ ...filter });
    setCurrentPage(1);
    if (searchParams.get("page")) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      const query = params.toString() ? `?${params.toString()}` : "";
      router.push(`${pathname}${query}`, { scroll: false });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams.toString());
    if (page > 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }
    const query = params.toString() ? `?${params.toString()}` : "";
    router.push(`${pathname}${query}`, { scroll: false });
  };

  const handleExport = (format: "csv" | "excel" | "xml") => {
    const exportData = filtered.length > 0 ? filtered : products;

    if (format === "xml") {
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<products>\n';
      exportData.forEach((p) => {
        xml += "  <product>\n";
        xml += `    <id>${p.id}</id>\n`;
        xml += `    <title>${p.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</title>\n`;
        xml += `    <sku>${(p.sku || "").replace(/&/g, "&amp;")}</sku>\n`;
        xml += `    <product_type>${p.productType}</product_type>\n`;
        xml += `    <category>${p.category}</category>\n`;
        xml += `    <price>${p.price}</price>\n`;
        xml += `    <stock>${p.stock}</stock>\n`;
        xml += `    <page_views>${p.pageViews}</page_views>\n`;
        xml += `    <date>${p.date}</date>\n`;
        xml += "  </product>\n";
      });
      xml += "</products>";

      const blob = new Blob([xml], {
        type: "application/xml;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `products_export_${new Date().toISOString().slice(0, 10)}.xml`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return;
    }

    if (format === "excel") {
      const headers = [
        "ID",
        "Title",
        "SKU",
        "Product Type",
        "Category",
        "Price",
        "Stock",
        "Views",
        "Date",
      ];
      const rows = exportData.map((p) => [
        p.id,
        p.title,
        p.sku || "",
        p.productType,
        p.category,
        p.price,
        p.stock,
        p.pageViews,
        p.date,
      ]);
      const content = [
        headers.join("\t"),
        ...rows.map((r) => r.join("\t")),
      ].join("\n");
      const blob = new Blob([content], {
        type: "application/vnd.ms-excel;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `products_export_${new Date().toISOString().slice(0, 10)}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return;
    }

    const csvHeader =
      "ID,Title,SKU,Product Type,Category,Price,Stock,Views,Date\n";
    const csvRows = exportData
      .map(
        (p) =>
          `"${p.id}","${p.title}","${p.sku || ""}","${p.productType}","${p.category}","${p.price}","${p.stock}","${p.pageViews}","${p.date}"`
      )
      .join("\n");

    const blob = new Blob([csvHeader + csvRows], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `products_export_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleEdit = (prod: ProductItem) => {
    router.push(`/dashboard/edit_product/${prod.id}`);
  };

  const handleClone = async (prod: ProductItem) => {
    const newId = Math.max(...products.map((p) => p.id), 0) + 1;
    let newUuid: string | undefined;

    if (isSupabaseConfigured()) {
      const priceNum = parseFloat(prod.price.replace(/[^0-9.]/g, "")) || 0;
      const { data } = await createProduct({
        title: `${prod.title} (Copy)`,
        sku: `${prod.sku || "PROD"}-COPY`,
        price: priceNum,
        product_type: prod.productType === "Digital" ? "digital" : "physical",
        images: prod.image ? [prod.image] : undefined,
      });
      if (data) newUuid = data.id;
    }

    const cloned: ProductItem = {
      ...prod,
      id: newId,
      uuid: newUuid,
      title: `${prod.title} (Copy)`,
      sku: `${prod.sku}-COPY`,
      date: new Date().toISOString().slice(0, 10) + " / 12:00",
      editedAgo: "Edited: just now",
    };
    setProducts((prev) => [cloned, ...prev]);
  };

  const handleDelete = (id: number) => {
    const target = products.find((p) => p.id === id);
    if (target) {
      setDeleteProductTarget(target);
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteProductTarget) {
      if (deleteProductTarget.uuid) {
        await deleteProduct(deleteProductTarget.uuid);
      }
      setProducts((prev) => prev.filter((p) => p.id !== deleteProductTarget.id));
      setDeleteProductTarget(null);
    }
  };

  const handlePromoteSuccess = async (id: number, planName: string) => {
    const target = products.find((p) => p.id === id);
    if (target?.uuid) {
      await updateProduct({ id: target.uuid, is_promoted: true, is_featured: true });
    }
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, purchasedPlan: planName, isFeatured: true } : p
      )
    );
  };

  // Filtered items
  const filtered = products.filter((p) => {
    // 1. Listing Type
    if (appliedFilter.listingType !== "All") {
      const pLt = (p.listingType || "").toLowerCase();
      const targetLt = appliedFilter.listingType.toLowerCase();

      let matches = false;
      if (targetLt.includes("marketplace") || targetLt.includes("selling products")) {
        matches =
          pLt.includes("sell") ||
          pLt.includes("marketplace") ||
          pLt === "sell now" ||
          pLt === "sell_on_site";
      } else if (targetLt.includes("classified") || targetLt.includes("ordinary")) {
        matches =
          pLt.includes("classified") ||
          pLt.includes("ordinary") ||
          pLt === "ordinary_listing";
      } else if (targetLt.includes("bidding") || targetLt.includes("quote")) {
        matches =
          pLt.includes("bidding") ||
          pLt.includes("quote") ||
          pLt === "quote_request";
      } else if (targetLt.includes("license")) {
        matches = pLt.includes("license") || pLt === "license_keys";
      } else {
        matches = pLt.includes(targetLt) || targetLt.includes(pLt);
      }

      if (!matches) {
        return false;
      }
    }

    // 2. Product Type
    if (
      appliedFilter.productType !== "All" &&
      p.productType.toLowerCase() !== appliedFilter.productType.toLowerCase()
    ) {
      return false;
    }

    // 3. Category & Subcategory matching
    if (!matchesProductCategory(p, appliedFilter.category, appliedFilter.subcategory)) {
      return false;
    }

    // 4. Stock
    if (appliedFilter.stock !== "All") {
      const stockLower = (p.stock || "").toLowerCase();
      const isOut = stockLower.includes("out") || stockLower.includes("(0)");
      if (appliedFilter.stock === "In Stock" && isOut) return false;
      if (appliedFilter.stock === "Out of Stock" && !isOut) return false;
    }

    // 5. Search
    if (appliedFilter.search.trim()) {
      const q = appliedFilter.search.toLowerCase().trim();
      const match =
        p.title.toLowerCase().includes(q) ||
        (p.sku && p.sku.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
        (p.parentCategory && p.parentCategory.toLowerCase().includes(q)) ||
        p.id.toString() === q;
      if (!match) return false;
    }

    return true;
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const displayedProducts = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-white border border-[#ebebeb] rounded-[3px] p-6 shadow-xs">
      {/* Title */}
      <div className="mb-5">
        <h1 className="text-[15px] font-semibold text-[#333]">{title}</h1>
      </div>

      {/* Filter Section */}
      <ProductFilterSection
        filter={filter}
        onChange={handleFilterChange}
        onApplyFilter={handleApplyFilter}
        onExport={handleExport}
      />

      {/* Table */}
      <ProductTable
        products={displayedProducts}
        emptyMessage={emptyMessage}
        showPromote={showPromote}
        onEdit={handleEdit}
        onClone={handleClone}
        onDelete={handleDelete}
        onOpenPromote={(prod) => setPromoteProduct(prod)}
      />

      {/* Pagination Footer */}
      {filtered.length > 0 && (
        <ProductPaginationBar
          totalEntries={filtered.length}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Promote Modal */}
      <ProductPromoteModal
        product={promoteProduct}
        isOpen={Boolean(promoteProduct)}
        onClose={() => setPromoteProduct(null)}
        onPromoteSuccess={handlePromoteSuccess}
      />

      {/* Delete Confirmation Modal */}
      <ProductDeleteModal
        product={deleteProductTarget}
        isOpen={Boolean(deleteProductTarget)}
        onClose={() => setDeleteProductTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default function ProductsContainer(props: ProductsContainerProps) {
  return (
    <Suspense fallback={<div className="p-6 text-xs text-gray-500">Loading products...</div>}>
      <ProductsContainerContent {...props} />
    </Suspense>
  );
}
