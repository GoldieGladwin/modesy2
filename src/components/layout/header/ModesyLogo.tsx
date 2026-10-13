import React from "react";

export default function ModesyLogo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <img
      src="/assets/img/logo.svg"
      alt="Modesy"
      width={140}
      height={45}
      className={`h-9 w-auto object-contain select-none ${className}`}
    />
  );
}
