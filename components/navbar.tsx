"use client";
import Link from "next/link";

import { useSessionStore } from "@/hooks/useSessionStore";
import { NavbarDropDownMenu } from "./navbar-dropDownMenu";

export const Navbar = () => {
  const user = useSessionStore((state) => state.session);

  return (
    <div className="flex justify-between items-center px-2 w-full">
      {/* left navbar */}
      <div className="flex">
        <Link
          href={user?.user?.role === "USER" ? "/dashboard" : "/admin/dashboard"}
          className="font-semibold text-xl"
        >
          Opes
        </Link>
      </div>

      {/* right navbar */}
      <div className="col-span-4 flex justify-around items-center space-x-3 sm:space-x-4 pr-2">
        {/* TODO: fill in the spot */}
        {/* <Button variant={"outline"} className="rounded-full p-2">
          <Bell className="w-5 h-5" />
        </Button> */}
        {/* <ModeToggle /> */}
        <NavbarDropDownMenu user={user?.user} />
      </div>
    </div>
  );
};
