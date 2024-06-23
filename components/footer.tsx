"use client";
import { cn } from "@/lib/utils";
import { sidebarIconsTop } from "./sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
export const Footer = () => {
  const path = usePathname();
  return (
    <div className="flex items-center justify-evenly w-full">
      {sidebarIconsTop.map(({ name, Icon, link }) => (
        <Link key={link} href="/dashboard" className="group">
          <Icon
            className={cn(
              "size-5 group-hover:size-6 text-gray-500 dark:text-gray-400 dark:hover:text-white hover:text-black",
              path === link &&
                "text-black font-extrabold text-4xl dark:text-white size-6"
            )}
          />
        </Link>
      ))}
    </div>
  );
};
