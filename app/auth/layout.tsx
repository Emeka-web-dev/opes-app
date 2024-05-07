import { NavigationItems } from "@/components/navigation";
import React from "react";

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <NavigationItems />
      <div className="mt-[3.8rem] md:mt-[4.5rem] py-8">{children}</div>
    </div>
  );
};

export default LayoutPage;
