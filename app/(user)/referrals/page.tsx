"use client";
import { UserWithReferral } from "@/app/api/getUserReferrals/route";
import { DataTable } from "@/components/referral/data-table";
import { ReferralSkeleton } from "@/components/referral/referral-skeleton";
import { TreeChart } from "@/components/referral/tree-chart";
import { collectAndSortByIndex } from "@/hooks/collect-and-sort-by-index";
import { fillEmptySpots } from "@/hooks/fill-empty-spot";
import { useUserQuery } from "@/hooks/use-user-query";
import { useSessionStore } from "@/hooks/useSessionStore";
import { PaymentPlan } from "@prisma/client";

const ReferralPage = () => {
  const session = useSessionStore((session) => session.session);

  const queryKey = "getUserTree";
  const { data, status } = useUserQuery({
    apiUrl: "/api/getUserReferrals",
    queryKey,
  });

  const userData: UserWithReferral = data;

  const generation = {
    [PaymentPlan.BASIC]: 3,
    [PaymentPlan.POPULAR]: 4,
    [PaymentPlan.GOLDEN]: 5,
  };

  let dataTable, userReferal;

  if (data) {
    dataTable = collectAndSortByIndex(userData);
    userReferal = fillEmptySpots(
      userData,
      5,
      generation[session?.user?.paymentPlan!]
    );
  }

  if (status === "pending") {
    return <ReferralSkeleton />;
  }
  if (status === "error") {
    return <div>Pending</div>;
  }

  return (
    <div className="pb-3">
      <TreeChart data={userReferal!} />
      <div className="grid grid-cols-10">
        <div className="col-span-10  p-1">
          <DataTable data={dataTable!} />
        </div>
      </div>
    </div>
  );
};

export default ReferralPage;
