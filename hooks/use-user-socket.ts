import { pusherClient } from "@/lib/pusher";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { UserData } from "./use-user-query";

export const useUserSocket = ({
  queryKey,
  eventId,
}: {
  queryKey: string;
  eventId: string;
}) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    pusherClient.subscribe(queryKey);

    pusherClient.bind(eventId, (user: any) => {
      queryClient.setQueryData([queryKey], (oldData: UserData) => {
        return {
          ...oldData,
          ...user,
        };
      });
    });

    return () => {
      pusherClient.unsubscribe(queryKey);
    };
  }, [queryKey, queryClient, eventId]);
};
