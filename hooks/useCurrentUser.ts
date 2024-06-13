import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const { data, status } = useSession();

  if (data) return data.user;
  return null;
};
