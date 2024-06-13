import { useQuery } from "@tanstack/react-query";
import { useSocket } from "@/components/providers/socket-provider";

interface UserQuery {
  queryKey: string;
  apiUrl: string;
}

export const useUserQuery = ({ queryKey, apiUrl }: UserQuery) => {
  const { isConnected } = useSocket();

  const fetchUser = async () => {
    const res = await fetch(apiUrl);
    return res.json();
  };

  const { data, status } = useQuery({
    queryKey: [queryKey],
    queryFn: fetchUser,
    refetchInterval: isConnected ? false : 1000,
  });

  return {
    data,
    status,
  };
};
