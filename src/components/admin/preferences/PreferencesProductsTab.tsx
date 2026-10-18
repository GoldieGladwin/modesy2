"use client";

import React from "react";
import PreferencesRadioGroup from "./PreferencesRadioGroup";
import { ProductsPreferences } from "./types";
import { DEFAULT_PRODUCTS_PREFERENCES } from "./initialData";

interface PreferencesProductsTabProps {
  preferences?: ProductsPreferences;
  onChange?: (updated: ProductsPreferences) => void;
}

export default function PreferencesProductsTab({
  preferences = DEFAULT_PRODUCTS_PREFERENCES,
  onChange,
}: PreferencesProductsTabProps) {
  const updateField = <K extends keyof ProductsPreferences>(
    key: K,
    val: ProductsPreferences[K]
  ) => {
    onChange?.({ ...preferences, [key]: val });
  };

  return (
    <div className="space-y-4">
      {/* 1. Product Approval for New Products */}
      <PreferencesRadioGroup<boolean>
        label="Product Approval for New Products"
        value={preferences.approvalNewProducts}
        onChange={(val) => updateField("approvalNewProducts", val)}
      />

      {/* 2. Product Approval for Edited Products (3 Options) */}
      <PreferencesRadioGroup<"do_not_hide" | "hide_until_approved" | "disable">
        label="Product Approval for Edited Products"
        options={[
          { label: "Enable, Do Not Hide Products", value: "do_not_hide" },
          { label: "Enable, Hide Products Until Approved", value: "hide_until_approved" },
          { label: "Disable", value: "disable" },
        ]}
        value={preferences.approvalEditedProducts}
        onChange={(val) => updateField("approvalEditedProducts", val)}
      />

      {/* 3. Featured Products System */}
      <PreferencesRadioGroup<boolean>
        label="Featured Products System"
        value={preferences.featuredProducts}
        onChange={(val) => updateField("featuredProducts", val)}
      />

      {/* 4. Vendor Bulk Product Upload */}
      <PreferencesRadioGroup<boolean>
        label="Vendor Bulk Product Upload"
        value={preferences.vendorBulkUpload}
        onChange={(val) => updateField("vendorBulkUpload", val)}
      />

      {/* 5. Show Sold Products on the Site */}
      <PreferencesRadioGroup<boolean>
        label="Show Sold Products on the Site"
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
        value={preferences.showSoldProducts}
        onChange={(val) => updateField("showSoldProducts", val)}
      />

      {/* 6. Product Link Structure */}
      <PreferencesRadioGroup<"slug_id" | "id_slug">
        label="Product Link Structure"
        options={[
          { label: "domain.com/slug-id", value: "slug_id" },
          { label: "domain.com/id-slug", value: "id_slug" },
        ]}
        value={preferences.linkStructure}
        onChange={(val) => updateField("linkStructure", val)}
      />

      {/* 7. Reviews */}
      <PreferencesRadioGroup<boolean>
        label="Reviews"
        value={preferences.reviews}
        onChange={(val) => updateField("reviews", val)}
      />

      {/* 8. Product Comments */}
      <PreferencesRadioGroup<boolean>
        label="Product Comments"
        value={preferences.productComments}
        onChange={(val) => updateField("productComments", val)}
      />

      {/* 9. Blog Comments */}
      <PreferencesRadioGroup<boolean>
        label="Blog Comments"
        value={preferences.blogComments}
        onChange={(val) => updateField("blogComments", val)}
      />

      {/* 10. Comment Approval System */}
      <PreferencesRadioGroup<boolean>
        label="Comment Approval System"
        value={preferences.commentApproval}
        onChange={(val) => updateField("commentApproval", val)}
      />
    </div>
  );
}
