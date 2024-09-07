"use client";

import { useSessionStore } from "@/hooks/useSessionStore";
import { ReactNode } from "react";
import { NavigationItems } from "../navigation";
import { redirect } from "next/navigation";

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const user = useSessionStore((state) => state.session);
  if (user?.user?.paymentPlan) {
    return redirect("/checkout");
  }

  return (
    <main className="scroll-smooth overflow-x-hidden">
      <NavigationItems user={user?.user} />
      <div className="pt-[4.5rem]">{children}</div>
      {/* <Footer /> */}
    </main>
  );
};
