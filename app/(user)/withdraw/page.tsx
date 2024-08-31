"use client";

import { Withdraw } from "@/components/withdrawal";
import { useUserQuery } from "@/hooks/use-user-query";
import { useUserSocket } from "@/hooks/use-user-socket";
import { useSessionStore } from "@/hooks/useSessionStore";
import { WithdrawalData } from "@/typings";

const WithdrawPage = () => {
  const session = useSessionStore((state) => state.session);
  const queryKey = "getUserDetails";
  const { data, status } = useUserQuery({
    apiUrl: "/api/currentUserPayment",
    queryKey,
  });

  useUserSocket({ queryKey, eventId: `user:${session?.user?.id}` });

  if (status === "pending") {
    return <div>Pending...</div>;
  }
  if (status === "error") {
    return <div>Pending</div>;
  }

  return data?.user?.bankDetails ? (
    <Withdraw data={data?.user as WithdrawalData} />
  ) : (
    <div>No bank details</div>
  );
};

export default WithdrawPage;
