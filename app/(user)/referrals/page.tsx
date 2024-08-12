"use client";
import { ReferralPage } from "@/components/referral/referral";
import { TreeChart } from "@/components/referral/tree-chart";
import data from "@/data.json";
import { useUserQuery } from "@/hooks/use-user-query";

const page = () => {
  return <ReferralPage />;
};

export default page;
