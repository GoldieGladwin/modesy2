import React from "react";
import { Metadata } from "next";
import SelectMembershipPlanView from "@/components/vendor/membership/SelectMembershipPlanView";

export const metadata: Metadata = {
  title: "Select Your Plan - Modesy",
  description: "Select your membership plan to continue selling on Modesy.",
};

export default function SelectMembershipPlanUnderscorePage() {
  return <SelectMembershipPlanView />;
}
