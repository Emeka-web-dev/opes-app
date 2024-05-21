"use client";
import { cn } from "@/lib/utils";
import { sidebarIconsTop } from "./sidebar";
import { usePathname } from "next/navigation";
export const Footer = () => {
  const path = usePathname();
  return (
    <div className="flex items-center justify-evenly w-full">
      {sidebarIconsTop.map(({ name, Icon, link }) => (
        <Icon
          className={cn(
            "size-6 mx-2 text-gray-500 dark:hover:text-white hover:text-black",
            path === link && "text-black dark:text-white"
          )}
          key={link}
        />
      ))}
    </div>
  );
};
