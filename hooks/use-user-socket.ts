import { pusherClient } from "@/lib/pusher";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

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
      queryClient.setQueryData([queryKey], (oldData: any) => {
        console.log({
          user,
          oldData,
        });

        return {
          ...user,
        };
      });
    });

    return () => {
      pusherClient.unsubscribe(queryKey);
    };
  }, [queryKey, queryClient]);
};
