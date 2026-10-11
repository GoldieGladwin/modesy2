"use client";

import React from "react";

interface DigitalSalesHeaderProps {
  title?: string;
}

export default function DigitalSalesHeader({
  title = "Digital Sales",
}: DigitalSalesHeaderProps) {
  return (
    <div className="mb-4">
      <h1 className="text-[20px] font-semibold text-[#333333] tracking-tight">
        {title}
      </h1>
    </div>
  );
}
