import React from "react";

export default function MembershipPlanCard() {
  return (
    <div className="bg-white border border-[#ebebeb] rounded-[4px] p-6 shadow-xs font-sans">
      <h2 className="text-[16px] font-bold text-[#2d3748] mb-4">
        Membership Plan
      </h2>

      <div className="bg-[#dcf3f6] border border-[#b8e8ed] text-[#006a65] rounded-[4px] p-4 text-xs leading-relaxed">
        Admin role does not require a membership plan.
      </div>
    </div>
  );
}
