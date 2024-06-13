import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Referral, User } from "@prisma/client";
import { useSocket } from "@/components/providers/socket-provider";

type UserWithReferrals = User & {
  referrals: Referral[];
};

export const useUserSocket = ({ queryKey }: { queryKey: string }) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(queryKey, (user: any) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        console.log({
          oldData,
          user,
        });
        return {
          ...user,
        };
      });
    });

    return () => {
      socket.off(queryKey);
    };
  }, [queryClient, queryKey, socket]);
};
