"use client";
import { useSessionStore } from "@/hooks/useSessionStore";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const session = useSessionStore((state) => state.session);
  const router = useRouter();
  if (session?.user && session?.user?.role !== ("ADMIN" || "MODERATOR")) {
    return router.push("/");
  }
  return <div>{children}</div>;
};

export default AdminLayout;
