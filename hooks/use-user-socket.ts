import { pusherClient } from "@/lib/pusher";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { UserData } from "./use-user-query";
import { EarningHistory, User } from "@prisma/client";

export const useUserSocket = ({
  queryKey,
  eventId,
}: {
  queryKey: string;
  eventId: string;
}) => {
  const queryClient = useQueryClient();

  type DataProps = {
    earnings: EarningHistory[];
    user: User;
  };
  useEffect(() => {
    pusherClient.subscribe(queryKey);

    pusherClient.bind(eventId, (user: DataProps) => {
      queryClient.setQueryData([queryKey], (oldData: DataProps) => {
        console.log({ oldData, user });
        return {
          ...oldData,
          user: user?.user,
          earnings: oldData?.earnings.concat(user?.earnings),
        };
      });
    });

    return () => {
      pusherClient.unsubscribe(queryKey);
    };
  }, [queryKey, queryClient, eventId]);
};
