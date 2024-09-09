"use client";

import { useSessionStore } from "@/hooks/useSessionStore";
import { ReactNode } from "react";
import { NavigationItems } from "../navigation";
import { redirect } from "next/navigation";
import TawkToWidget from "./tawkto-widget-provider";
import { Footer } from "../footer";
import { LayoutFooter } from "../layout-footer";

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
        <TawkToWidget />
        <div className="pt-[4.5rem]">{children}</div>
      </div>
      <LayoutFooter />
    </main>
  );
};
