"use client";
import { Balance } from "@/components/dashboard/balance";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { InvitePeople } from "@/components/dashboard/invite-people";
import { Linechart } from "@/components/dashboard/line-chart";
import {
  IntervalType,
  LineChartDropDown,
} from "@/components/dashboard/line-chart-dropdown";
import { ReferralLink } from "@/components/dashboard/referral-link";
import { UserContainter } from "@/components/dashboard/user-dashboard-container";
import { UserItemComponent } from "@/components/user-item-component";
import { useUserQuery } from "@/hooks/use-user-query";
import { useUserSocket } from "@/hooks/use-user-socket";
import { useSessionStore } from "@/hooks/useSessionStore";
import { useState } from "react";

const DashboardPage = () => {
  const [selectedValue, setSelectedValue] = useState<IntervalType>("daily");
  const session = useSessionStore((state) => state.session);
  const queryKey = "getUserData";

  const { data, status } = useUserQuery({
    apiUrl: "/api/currentUser",
    queryKey,
  });

  useUserSocket({ queryKey, eventId: `user:${session?.user?.id}` });

  const onChange = (value: IntervalType) => {
    setSelectedValue(value);
  };

  if (status === "pending") {
    return <DashboardSkeleton />;
  }
  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div className="mt-4">
      <h3 className="px-2 text-gray-700 dark:text-gray-200">
        Welcome, {session?.user?.name}
      </h3>
      <div className="flex flex-col gap-y-4">
        <UserContainter
          left={
            <Balance
              earning={data?.user?.earnings}
              withdrawableEarning={data?.user?.withdrawableEarnings}
            />
          }
          right={<ReferralLink refLink={data?.user?.invitationCode} />}
        />

        <UserContainter
          left={
            <UserItemComponent
              title="Earnings"
              navigation={<LineChartDropDown onChange={onChange} />}
            >
              <Linechart selectedValue={selectedValue} data={data?.earnings} />
            </UserItemComponent>
          }
          right={<InvitePeople />}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
