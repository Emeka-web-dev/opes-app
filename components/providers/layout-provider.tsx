"use client";

import { useSessionStore } from "@/hooks/useSessionStore";
import { ReactNode } from "react";
import { LayoutFooter } from "../layout-footer";
import { NavigationItems } from "../navigation";

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const user = useSessionStore((state) => state.session);
  // const
  //   if (user?.user?.paymentPlan) {
  //     return redirect("/checkout");
  //   }

  return (
    <main className="h-screen flex flex-col">
      <div className="flex-1">
        <NavigationItems user={user?.user} />
        <div className="pt-[4.5rem] h-full">{children}</div>
      </div>
      <LayoutFooter />
    </main>
  );
};
