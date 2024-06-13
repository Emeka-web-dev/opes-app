"use client";

import { useSessionStore } from "@/hooks/useSessionStore";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

export const SessionProviders = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  const name = useState("");
  const setSession = useSessionStore((state) => state.setSession);
  useEffect(() => {
    setSession(session);
  }, [setSession, session]);

  return <div>{children}</div>;
};
