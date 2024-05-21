"use client";

import { cn } from "@/lib/utils";
import { Box, Home2, Profile2User, Setting2, SmsStar } from "iconsax-react";
import { LogOut, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { Tooltip } from "./tooltip";

export const sidebarIconsTop = [
  {
    name: "Home",
    Icon: Home2,
    link: "/dashboard",
  },
  {
    name: "Analytics",
    Icon: SmsStar,
    link: "/analytics",
  },
  {
    name: "User",
    Icon: Profile2User,
    link: "/user",
  },
  {
    name: "Messages",
    Icon: Box,
    link: "/messages",
  },
  {
    name: "Setting",
    Icon: Setting2,
    link: "/settings",
  },
];
export const Sidebar = () => {
  const path = usePathname();

  return (
    <div className="flex flex-col items-center py-4 space-y-4 h-full">
      <div className="w-fit p-2 lg:mx-auto mx-2 rounded-full cursor-pointer">
        <Zap className="size-6" />
      </div>
      <div className="flex flex-col w-full flex-1 justify-center space-y-4">
        {sidebarIconsTop.map(({ name, Icon, link }) => (
          <Tooltip name={name} key={name}>
            <div
              role="button"
              className="w-full relative group flex p-1 space-x-2"
            >
              <Icon
                className={cn(
                  "w-5 h-5 md:h-6 md:w-6 lg:mx-auto mx-2 text-gray-500 group-hover:text-black dark:group-hover:text-white",
                  path === link && "text-black dark:text-white"
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
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
