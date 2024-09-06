"use client";

import { cn } from "@/lib/utils";
import {
  ArrowCircleRight2,
  Box,
  Category,
  DiscountShape,
  InfoCircle,
  Profile2User,
  Setting2,
  SmsStar,
} from "iconsax-react";
import { LogOut, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { Tooltip } from "@/components/tooltip";

export const AdminSidebar = () => {
  const path = usePathname();
  const sidebarIconsTop = [
    {
      name: "Overview",
      Icon: Category,
      link: "/",
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
      name: "Product",
      Icon: DiscountShape,
      link: "/product",
    },
    {
      name: "Support",
      Icon: InfoCircle,
      link: "/support",
    },
  ];
  const sidebarIconBottom = [
    { Icon: ArrowCircleRight2 },
    { Icon: Setting2 },
    { Icon: LogOut },
  ];
  return (
    <div className="flex flex-col justify-between items-center h-[95%] py-6">
      <div className="flex flex-col w-full space-y-4">
        <div className="bg-[#63cba5] w-fit p-2 lg:mx-auto mx-2 rounded-full cursor-pointer">
          <Zap className="w-6 h-6  text-white" />
        </div>
        <div className="flex flex-col space-y-6">
          {sidebarIconsTop.map(({ name, Icon, link }) => (
            <Tooltip name={name} key={name}>
              <div
                role="button"
                className="w-full relative group flex p-1 space-x-2"
              >
                <Icon
                  className={cn(
                    "w-5 h-5 md:h-6 md:w-6 lg:mx-auto mx-2 text-gray-500 group-hover:text-black",
                    path === link && "text-black"
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
                    "absolute right-0 top-0 h-full w-[4px] group-hover:bg-black rounded-tl-full rounded-bl-full",
                    path === link && "bg-black h-full"
                  )}
                />
              </div>
            </Tooltip>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center space-y-6">
        {sidebarIconBottom.map(({ Icon }, i) => (
          <div key={i} className="">
            <Icon className="w-5 h-5 md:w-6 md:h-6 text" />
          </div>
        ))}
      </div>
    </div>
  );
};
