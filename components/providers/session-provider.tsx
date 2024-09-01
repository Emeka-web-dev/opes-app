"use client";

import { logout } from "@/actions/logout";
import { useSessionStore } from "@/hooks/useSessionStore";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const SessionProviders = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  const pathName = usePathname();
  const setSession = useSessionStore((state) => state.setSession);
  // const getSession = useSessionStore((state) => state.session);

  useEffect(() => {
    setSession(session);
  }, [setSession, session]);

  // useEffect(() => {
  //   if (
  //     session?.user &&
  //     session?.user?.customExpiration! < Math.floor(Date.now() / 1000)
  //   ) {
  //     const signOut = async () => {
  //       await logout();
  //       window.location.reload();
  //     };
  //     signOut();
  //     signOut();
  //   }
  // }, [session, pathName]);

  return <>{children}</>;
};
