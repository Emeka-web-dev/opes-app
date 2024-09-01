import { User } from "@prisma/client";
import { EarningHistory } from "@/typings";
import { useQuery } from "@tanstack/react-query";

interface UserQuery {
  queryKey: string;
  apiUrl: string;
}

export type UserData = {
  data: {
    earnings: EarningHistory[];
    user: User;
  };
  status: "pending" | "error" | "success";
};

export const useUserQuery = ({ queryKey, apiUrl }: UserQuery) => {
  const fetchUser = async () => {
    const res = await fetch(apiUrl);
    return res.json();
  };

  const { data, status } = useQuery({
    queryKey: [queryKey],
    queryFn: fetchUser,
    refetchInterval: false,
  });

  return {
    data,
    status,
  };
};
