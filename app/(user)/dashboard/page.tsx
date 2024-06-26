"use client";
import { Balance } from "@/components/dashboard/balance";
import { Barchart } from "@/components/dashboard/bar-chart";
import { LineChartDropDown } from "@/components/dashboard/line-chart-dropdown";
import { ReferralLink } from "@/components/dashboard/referral-link";
import { UserContainter } from "@/components/dashboard/user-dashboard-container";
import { UserItemComponent } from "@/components/user-item-component";
import { useUserQuery } from "@/hooks/use-user-query";
import { useUserSocket } from "@/hooks/use-user-socket";
import { useSessionStore } from "@/hooks/useSessionStore";

const DashboardPage = () => {
  const session = useSessionStore((state) => state.session);
  const queryKey = "getUserData";

  const { data, status } = useUserQuery({
    apiUrl: "/api/currentUser",
    queryKey,
  });

  useUserSocket({ queryKey, eventId: `user:${session?.user?.id}` });
  return (
    <div className="mt-4">
      <h3 className="px-2 text-gray-700 dark:text-gray-200">
        Welcome, {session?.user?.name}
      </h3>
      {status === "pending" && "Loading..."}
      {status === "error" && "Error..."}
      {status === "success" && (
        <div>
          <UserContainter
            left={<Balance earning={data?.earnings} />}
            right={<ReferralLink refLink={data?.invitationCode} />}
          />

          <UserContainter
            left={
              <UserItemComponent
                title="Earnings"
                navigation={<LineChartDropDown />}
              >
                <Barchart />
              </UserItemComponent>
            }
            right={<p>right</p>}
          />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
