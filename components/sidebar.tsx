"use client";

import { cn } from "@/lib/utils";
import { Box, Home2, Profile2User, Setting2, SmsStar } from "iconsax-react";
import { LogOut, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { Tooltip } from "./tooltip";
import Link from "next/link";

export const sidebarIconsTop = [
  {
    name: "Home",
    Icon: Home2,
    link: "/dashboard",
  },
  {
    name: "Referrals",
    Icon: Profile2User,
    link: "/referrals",
  },
  {
    name: "Notifications",
    Icon: SmsStar,
    link: "/notification",
  },
  {
    name: "Settings",
    Icon: Setting2,
    link: "/settings",
  },
];
export const Sidebar = () => {
  const path = usePathname();

  return (
    <div className="flex flex-col items-center py-4 space-y-4 h-full">
      <div className="flex flex-col w-full flex-1 justify-center space-y-4">
        {sidebarIconsTop.map(({ name, Icon, link }) => (
          <Tooltip name={name} key={name}>
            <Link
              href={link}
              role="button"
              className="my-2 relative group flex p-1 gap-x-2"
            >
              <Icon
                className={cn(
                  "size-5 md:size-6 lg:mx-auto mx-2 text-gray-500 transition duration-200 ease-in group-hover:size-6 group-hover:md:size-7 group-hover:text-black dark:group-hover:text-white",
                  path === link && "text-black size-6 md:size-7 dark:text-white"
                )}
              />
              <p
                className={cn(
                  "flex lg:hidden group-hover:font-bold",
                  path === link && "font-bold"
                )}
              >
                {name}
              </p>
              <div
                className={cn(
                  "absolute right-0 top-0 h-full w-[4px] group-hover:bg-black dark:group-hover:bg-white rounded-tl-full rounded-bl-full",
                  path === link && "bg-black dark:bg-white h-full"
                )}
              />
            </Link>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
