import { NavigationItems } from "@/components/navigation";
import React from "react";

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-[#1d2144]">
      <NavigationItems />
      <div className="md:pt-[5rem] py-8">{children}</div>
    </div>
  );
};

export default LayoutPage;
