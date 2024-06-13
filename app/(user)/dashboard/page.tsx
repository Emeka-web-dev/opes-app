"use client";
import { Balance } from "@/components/dashboard/balance";
import { ReferralLink } from "@/components/dashboard/referral-link";
import { UserContainter } from "@/components/dashboard/user-dashboard-container";
import { useUserQuery } from "@/hooks/use-user-query";
import { useUserSocket } from "@/hooks/use-user-socket";
import { useSessionStore } from "@/hooks/useSessionStore";

const DashboardPage = () => {
  const session = useSessionStore((state) => state.session);
  const queryKey = `user:${session?.user?.id}`;

  const { data, status } = useUserQuery({
    apiUrl: "/api/currentUser",
    queryKey,
  });
  useUserSocket({ queryKey });

  return (
    <div className="">
      {status === "pending" && "Loading..."}
      {status === "error" && "Error..."}
      {status === "success" && (
        <UserContainter
          left={<Balance earning={data?.earnings} />}
          right={<ReferralLink refLink={data?.invitationCode} />}
        />
      )}
    </div>
  );
};

export default DashboardPage;
