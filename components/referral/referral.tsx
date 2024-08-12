"use client";

import { useUserQuery } from "@/hooks/use-user-query";
import { TreeChart } from "./tree-chart";
import demoData from "@/data.json";
import { fillEmptySpots } from "@/hooks/fill-empty-spot";
import { UserWithReferral } from "@/app/api/getUserReferrals/route";
import { PaymentPlan, UserRole } from "@prisma/client";
import { useSessionStore } from "@/hooks/useSessionStore";

export const ReferralPage = () => {
  const session = useSessionStore((session) => session.session);
  const queryKey = "getUserReferral";
  const { data, status } = useUserQuery({
    apiUrl: "/api/getUserReferrals",
    queryKey,
  });
  const userData: UserWithReferral = data;
  const generation = {
    [PaymentPlan.BASIC]: 3,
    [PaymentPlan.POPULAR]: 4,
    [PaymentPlan.GOLDEN]: 3,
  };

  let user;
  if (data) {
    user = fillEmptySpots(userData, 5, generation[session?.user?.paymentPlan!]);
  }

  if (status === "pending") {
    return <div>Pending...</div>;
  }
  if (status === "error") {
    return <div>Pending</div>;
  }

  return (
    <div>
      <TreeChart data={user!} />
    </div>
  );
};
